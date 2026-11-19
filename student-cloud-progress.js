/* Great Minds AI — authenticated cloud progress helper.
 * Requires supabase-config.js and Supabase JS v2 to be loaded first.
 * Uses the signed-in account only; database RLS is the authority.
 * Student inserts are rejected unless an active guardian relationship exists.
 */
(function () {
  "use strict";
  const MAX_SUBJECT = 60, MAX_ACTIVITY = 120, MAX_SOURCE = 40;
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  function clean(value, max) {
    return String(value == null ? "" : value).trim().slice(0, max);
  }
  async function saveProgress(record) {
    if (!record || typeof record !== "object" || Array.isArray(record)) return {saved:false,localSaved:false,reason:"A valid progress record is required."};
    const subject = clean(record.subject, MAX_SUBJECT);
    const activityKey = clean(record.activity_key, MAX_ACTIVITY);
    const source = clean(record.source || "lesson", MAX_SOURCE);
    const score = Number(record.score);
    const maxScore = Number(record.max_score);
    const correct = record.correct_count == null ? null : Number(record.correct_count);
    const questions = record.question_count == null ? null : Number(record.question_count);
    const operationId = record.id == null ? null : clean(record.id, 36);
    if (!subject || !activityKey || !source || !Number.isInteger(score) || !Number.isInteger(maxScore) || maxScore <= 0 || score < 0 || score > maxScore || (correct !== null && (!Number.isInteger(correct) || correct < 0 || correct > maxScore)) || (questions !== null && (!Number.isInteger(questions) || questions <= 0)) || (correct !== null && questions !== null && correct > questions) || (operationId !== null && !UUID_RE.test(operationId))) return { saved:false, localSaved:false, reason:"The progress record did not pass validation." };
    const level = ["beginner","pro","advanced"].includes(String(record.level || "").toLowerCase()) ? String(record.level).toLowerCase() : null;
    const localRecord = {id:operationId,subject,activity_key:activityKey,score,max_score:maxScore,correct_count:correct,question_count:questions,source,level,completed_at:new Date().toISOString()};
    let localSaved = false;
    try { const key="gm_independent_pending_progress"; const old=JSON.parse(localStorage.getItem(key)||"[]"); const rows=Array.isArray(old)?old:[]; if(operationId){const existingIndex=rows.findIndex(item=>item&&item.id===operationId);if(existingIndex>=0)rows[existingIndex]=localRecord;else rows.push(localRecord);}else rows.push(localRecord); localStorage.setItem(key,JSON.stringify(rows.slice(-300))); localSaved = true; } catch(e) { console.warn("Local independent progress could not be stored:",e); }
    const db=window.greatMindsDB;
    if (!db || !db.auth || !db.from) return {saved:false,localSaved,reason:localSaved?"Saved on this device. Secure cloud sync is not connected on this page.":"Your progress could not be saved on this device or to the cloud."};
    try {
      const {data:userData,error:userError}=await db.auth.getUser(); if(userError) throw userError;
      const user=userData && userData.user;
      if(!user) return {saved:false,localSaved,reason:localSaved?"Saved on this device. Sign in with an approved student account for secure cloud sync.":"Your progress could not be saved on this device or to the cloud."};
      const row={...(operationId?{id:operationId}:{}),student_id:user.id,subject,activity_key:activityKey,score,max_score:maxScore,correct_count:correct,question_count:questions,source};
      const {error}=await db.from("student_learning_progress").insert(row);
      if(error){
        if(error.code==="23505"&&operationId){
          const {data:existing,error:lookupError}=await db.from("student_learning_progress").select("id,student_id,subject,activity_key,score,max_score,correct_count,question_count,source").eq("id",operationId).maybeSingle();
          if(lookupError)throw lookupError;
          if(existing&&existing.student_id===user.id&&existing.subject===subject&&existing.activity_key===activityKey&&existing.score===score&&existing.max_score===maxScore&&existing.correct_count===correct&&existing.question_count===questions&&existing.source===source)return {saved:true,localSaved:true,idempotent:true};
          return {saved:false,localSaved,reason:"This save ID already exists with different progress. Please contact support before retrying."};
        }
        if(error.code==="42501"||error.code==="PGRST301")return {saved:false,localSaved,reason:localSaved?"Saved on this device. Cloud sync needs approved parent/guardian consent or account access.":"Your progress could not be saved on this device or to the cloud."};
        throw error;
      }
      return {saved:true,localSaved:true};
    } catch(error) { console.warn("Great Minds AI cloud progress was not saved:",error); return {saved:false,localSaved,reason:localSaved?"Saved on this device. Cloud sync could not be completed.":"Your progress could not be saved on this device or to the cloud."}; }
  }
  async function loadMyProgress() {
    const db = window.greatMindsDB;
    if (!db || !db.auth || !db.from) {
      return { loaded: false, reason: "Supabase is not available on this page.", rows: [] };
    }
    try {
      const { data: userData, error: userError } = await db.auth.getUser();
      if (userError) throw userError;
      if (!userData || !userData.user) {
        return { loaded: false, reason: "Sign in with the student, parent/guardian or approved teacher account first.", rows: [] };
      }
      const { data, error } = await db.from("student_learning_progress")
        .select("subject,activity_key,score,max_score,correct_count,question_count,source,completed_at")
        .order("completed_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return { loaded: true, rows: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.warn("Great Minds AI cloud progress could not be loaded:", error);
      return { loaded: false, reason: "Cloud progress could not be loaded for this account.", rows: [] };
    }
  }
  window.gmSaveStudentProgress = saveProgress;
  window.gmLoadMyStudentProgress = loadMyProgress;
})();

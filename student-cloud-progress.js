/* Great Minds AI — authenticated cloud progress helper.
 * Requires supabase-config.js and Supabase JS v2 to be loaded first.
 * Uses the signed-in account only; database RLS is the authority.
 * Student inserts are rejected unless an active guardian relationship exists.
 */
(function () {
  "use strict";
  const MAX_SUBJECT = 60, MAX_ACTIVITY = 120, MAX_SOURCE = 40;
  function clean(value, max) {
    return String(value == null ? "" : value).trim().slice(0, max);
  }
  async function saveProgress(record) {
    const db = window.greatMindsDB;
    if (!db || !db.auth || !db.from) {
      return { saved: false, reason: "Supabase is not available on this page." };
    }
    try {
      const { data: userData, error: userError } = await db.auth.getUser();
      if (userError) throw userError;
      const user = userData && userData.user;
      if (!user) return { saved: false, reason: "Sign in with the student account first." };
      const subject = clean(record.subject, MAX_SUBJECT);
      const activityKey = clean(record.activity_key, MAX_ACTIVITY);
      const source = clean(record.source || "lesson", MAX_SOURCE);
      const score = Number(record.score);
      const maxScore = Number(record.max_score);
      const correct = record.correct_count == null ? null : Number(record.correct_count);
      const questions = record.question_count == null ? null : Number(record.question_count);
      if (!subject || !activityKey || !source ||
          !Number.isInteger(score) || !Number.isInteger(maxScore) ||
          maxScore <= 0 || score < 0 || score > maxScore ||
          (correct !== null && (!Number.isInteger(correct) || correct < 0)) ||
          (questions !== null && (!Number.isInteger(questions) || questions <= 0)) ||
          (correct !== null && questions !== null && correct > questions)) {
        return { saved: false, reason: "The progress record did not pass validation." };
      }
      const row = {
        student_id: user.id,
        subject,
        activity_key: activityKey,
        score,
        max_score: maxScore,
        correct_count: correct,
        question_count: questions,
        source
      };
      const { error } = await db.from("student_learning_progress").insert(row);
      if (error) {
        if (error.code === "42501" || error.code === "PGRST301") {
          return { saved: false, reason: "Parent/guardian consent or account access is not yet approved." };
        }
        throw error;
      }
      return { saved: true };
    } catch (error) {
      console.warn("Great Minds AI cloud progress was not saved:", error);
      return { saved: false, reason: "Cloud save could not be completed. Your quiz result remains on this device." };
    }
  }
  window.gmSaveStudentProgress = saveProgress;
})();

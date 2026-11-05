/* Great Minds AI — secure classroom homework client.
 * Load Supabase JS v2 and supabase-config.js before this file.
 * RLS policies are the authorization boundary; UI roles are never trusted.
 */
(function(){
 "use strict";
 const db=()=>window.greatMindsDB;
 async function currentUser(){
  const client=db(); if(!client||!client.auth)return {user:null,error:new Error("Supabase is not configured on this page.")};
  const {data,error}=await client.auth.getUser(); return {user:data&&data.user,error};
 }
 async function createAssignment(input){
  const client=db(); if(!client)return {ok:false,message:"Supabase is not configured."};
  const {user,error:userError}=await currentUser(); if(userError||!user)return {ok:false,message:"Sign in with the approved teacher account first."};
  const row={
   classroom_id:Number(input.classroom_id), teacher_id:user.id,
   subject:String(input.subject||"").trim().slice(0,60),
   title:String(input.title||"").trim().slice(0,90),
   instructions:String(input.instructions||"").trim().slice(0,1500),
   answer_type:"text", due_at:String(input.due_at||""),
   max_points:Number(input.max_points)
  };
  if(!Number.isSafeInteger(row.classroom_id)||row.classroom_id<=0||!row.subject||!row.title||!row.instructions||!row.due_at||!Number.isInteger(row.max_points)||row.max_points<1||row.max_points>100)
   return {ok:false,message:"Check the classroom ID and all assignment fields."};
  const {error}=await client.from("homework_assignments").insert(row);
  if(error){console.warn("Homework assignment insert failed:",error);return {ok:false,message:"Could not save. Check that this is your approved classroom and try again."};}
  return {ok:true,message:"Homework assignment saved to the classroom."};
 }
 async function listAssignments(classroomId){
  const client=db();if(!client)return {ok:false,rows:[],message:"Supabase is not configured."};
  let query=client.from("homework_assignments").select("id,classroom_id,teacher_id,subject,title,instructions,due_at,max_points,created_at").order("created_at",{ascending:false}).limit(100);
  if(classroomId){const id=Number(classroomId);if(!Number.isSafeInteger(id)||id<=0)return {ok:false,rows:[],message:"Enter a valid classroom ID."};query=query.eq("classroom_id",id);}
  const {data,error}=await query;if(error){console.warn("Homework list failed:",error);return {ok:false,rows:[],message:"Could not load assignments for this account."};}
  return {ok:true,rows:data||[],message:"Loaded "+(data||[]).length+" assignment(s)."};
 }
 async function submitAnswer(assignmentId,answer){
  const client=db();if(!client)return {ok:false,message:"Supabase is not configured."};
  const {user,error:userError}=await currentUser();if(userError||!user)return {ok:false,message:"Sign in with the student account first."};
  const id=String(assignmentId||"").trim(),text=String(answer||"").trim().slice(0,3000);
  if(!id||!text)return {ok:false,message:"Enter an answer first."};
  const {error}=await client.from("homework_submissions").insert({assignment_id:id,student_id:user.id,answer:text});
  if(error){console.warn("Homework submission failed:",error);return {ok:false,message:error.code==="23505"?"You have already submitted this assignment.":"Submission not accepted. Check your approved classroom membership and parent consent."};}
  return {ok:true,message:"Homework submitted to your classroom."};
 }
 async function isEnrolledStudent(classroomId){
  const client=db();if(!client)return {ok:false,isStudent:false};
  const {user,error:userError}=await currentUser();if(userError||!user)return {ok:false,isStudent:false};
  const id=Number(classroomId);if(!Number.isSafeInteger(id)||id<=0)return {ok:false,isStudent:false};
  const {data,error}=await client.from("classroom_members").select("id")
   .eq("classroom_id",id).eq("user_id",user.id)
   .eq("membership_status","approved").eq("parent_consent_status","approved").maybeSingle();
  if(error){console.warn("Student membership check failed:",error);return {ok:false,isStudent:false};}
  return {ok:true,isStudent:!!data};
 }
 async function listSubmissions(assignmentId){
  const client=db();if(!client)return {ok:false,rows:[],message:"Supabase is not configured."};
  let query=client.from("homework_submissions").select("id,assignment_id,student_id,answer,submitted_at,score,feedback,marked_by,marked_at").order("submitted_at",{ascending:false}).limit(200);
  if(assignmentId)query=query.eq("assignment_id",String(assignmentId));
  const {data,error}=await query;if(error){console.warn("Submission list failed:",error);return {ok:false,rows:[],message:"Could not load submissions for this account."};}
  return {ok:true,rows:data||[],message:"Loaded "+(data||[]).length+" submission(s)."};
 }
 async function markSubmission(submissionId,score,feedback){
  const client=db();if(!client)return {ok:false,message:"Supabase is not configured."};
  const {user,error:userError}=await currentUser();if(userError||!user)return {ok:false,message:"Sign in with the approved teacher account first."};
  const id=String(submissionId||"").trim();
  const n=Number(score);
  if(!Number.isInteger(n)||n<0||!id)return {ok:false,message:"Enter a valid non-negative whole-number score."};
  // Check the assignment maximum before marking; database RLS still decides whether this teacher may update it.
  const {data:submission,error:submissionError}=await client.from("homework_submissions").select("assignment_id").eq("id",id).maybeSingle();
  if(submissionError||!submission)return {ok:false,message:"The submission could not be found for this teacher account."};
  const {data:assignment,error:assignmentError}=await client.from("homework_assignments").select("max_points").eq("id",submission.assignment_id).maybeSingle();
  if(assignmentError||!assignment)return {ok:false,message:"The assignment details could not be loaded for this teacher account."};
  if(n>Number(assignment.max_points))return {ok:false,message:"The score cannot be higher than the assignment maximum of "+assignment.max_points+" points."};
  const {error}=await client.from("homework_submissions").update({score:n,feedback:String(feedback||"").trim().slice(0,1500),marked_by:user.id,marked_at:new Date().toISOString()}).eq("id",id);
  if(error){console.warn("Homework marking failed:",error);return {ok:false,message:"Marking not accepted. Only the approved classroom teacher can mark this work."};}
  return {ok:true,message:"Mark and feedback saved."};
 }
 window.gmHomeworkCloud={currentUser,createAssignment,listAssignments,isEnrolledStudent,submitAnswer,listSubmissions,markSubmission};
})();
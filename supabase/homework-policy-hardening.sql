-- Great Minds AI — homework policy hardening applied 2026-11-05.
-- This is the follow-up hardening migration for classroom-homework.sql.

create index if not exists homework_assignments_teacher_idx on public.homework_assignments(teacher_id);
create index if not exists homework_submissions_marked_by_idx on public.homework_submissions(marked_by);

drop policy if exists "Consented classroom students and guardians read assignments" on public.homework_assignments;
create policy "Consented classroom students and guardians read assignments"
on public.homework_assignments for select to authenticated
using (exists (
 select 1 from public.classroom_members cm
 join public.guardian_relationships active_guardian
   on active_guardian.student_id=cm.user_id
  and active_guardian.relationship_status='active'
 where cm.classroom_id=homework_assignments.classroom_id
  and cm.membership_status='approved'
  and cm.parent_consent_status='approved'
  and (
   cm.user_id=(select auth.uid())
   or exists (
    select 1 from public.guardian_relationships gr
    where gr.student_id=cm.user_id
     and gr.guardian_id=(select auth.uid())
     and gr.relationship_status='active'
   )
  )
));

drop policy if exists "Students submit own homework with approved consent" on public.homework_submissions;
create policy "Students submit own homework with approved consent"
on public.homework_submissions for insert to authenticated
with check (
 student_id=(select auth.uid())
 and exists (
  select 1
  from public.homework_assignments ha
  join public.classroom_members cm on cm.classroom_id=ha.classroom_id
  join public.guardian_relationships gr on gr.student_id=cm.user_id
  where ha.id=homework_submissions.assignment_id
   and cm.user_id=(select auth.uid())
   and cm.membership_status='approved'
   and cm.parent_consent_status='approved'
   and gr.relationship_status='active'
 )
);

drop policy if exists "Students guardians and classroom teachers read submissions" on public.homework_submissions;
create policy "Students guardians and classroom teachers read submissions"
on public.homework_submissions for select to authenticated
using (
 student_id=(select auth.uid())
 or exists (
  select 1 from public.guardian_relationships gr
  where gr.student_id=homework_submissions.student_id
   and gr.guardian_id=(select auth.uid())
   and gr.relationship_status='active'
 )
 or exists (
  select 1
  from public.homework_assignments ha
  join public.teacher_profiles tp on tp.user_id=ha.teacher_id
  join public.classroom_members cm on cm.classroom_id=ha.classroom_id
  join public.guardian_relationships gr on gr.student_id=cm.user_id
  where ha.id=homework_submissions.assignment_id
   and cm.user_id=homework_submissions.student_id
   and cm.membership_status='approved'
   and cm.parent_consent_status='approved'
   and gr.relationship_status='active'
   and ha.teacher_id=(select auth.uid())
   and tp.approved=true
 )
);

drop policy if exists "Approved classroom teachers mark submissions" on public.homework_submissions;
create policy "Approved classroom teachers mark submissions"
on public.homework_submissions for update to authenticated
using (
 exists (
  select 1
  from public.homework_assignments ha
  join public.teacher_profiles tp on tp.user_id=ha.teacher_id
  join public.classroom_members cm on cm.classroom_id=ha.classroom_id
  join public.guardian_relationships gr on gr.student_id=cm.user_id
  where ha.id=homework_submissions.assignment_id
   and cm.user_id=homework_submissions.student_id
   and cm.membership_status='approved'
   and cm.parent_consent_status='approved'
   and gr.relationship_status='active'
   and ha.teacher_id=(select auth.uid())
   and tp.approved=true
 )
)
with check (
 marked_by=(select auth.uid())
 and (score is null or score <= (
  select ha.max_points from public.homework_assignments ha
  where ha.id=homework_submissions.assignment_id
 ))
 and exists (
  select 1
  from public.homework_assignments ha
  join public.teacher_profiles tp on tp.user_id=ha.teacher_id
  join public.classroom_members cm on cm.classroom_id=ha.classroom_id
  join public.guardian_relationships gr on gr.student_id=cm.user_id
  where ha.id=homework_submissions.assignment_id
   and cm.user_id=homework_submissions.student_id
   and cm.membership_status='approved'
   and cm.parent_consent_status='approved'
   and gr.relationship_status='active'
   and ha.teacher_id=(select auth.uid())
   and tp.approved=true
 )
);

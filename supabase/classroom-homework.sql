-- Great Minds AI: secure classroom homework assignments and submissions.
-- Applied to Supabase project ryuchmmnyjyldwouidyy on 2026-11-05.
-- Assignment access requires an approved teacher-owned classroom.
-- Student participation requires approved membership AND parent consent.
-- Guardians can read homework and submissions for active linked children.
-- Students can submit once per assignment; only classroom teacher can mark.

create table if not exists public.homework_assignments (
  id uuid primary key default gen_random_uuid(),
  classroom_id bigint not null references public.classrooms(id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  subject text not null check (length(trim(subject)) between 1 and 60),
  title text not null check (length(trim(title)) between 1 and 90),
  instructions text not null check (length(trim(instructions)) between 1 and 1500),
  answer_type text not null default 'text' check (answer_type in ('text','exact')),
  due_at date not null,
  max_points integer not null default 10 check (max_points between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.homework_assignments(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  answer text not null check (length(trim(answer)) between 1 and 3000),
  submitted_at timestamptz not null default now(),
  score integer check (score is null or score >= 0),
  feedback text check (feedback is null or length(feedback) <= 1500),
  marked_by uuid references auth.users(id) on delete set null,
  marked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (assignment_id, student_id),
  check ((score is null and marked_at is null) or (score is not null and marked_at is not null))
);

create index if not exists homework_assignments_classroom_due_idx on public.homework_assignments(classroom_id,due_at);
create index if not exists homework_submissions_student_idx on public.homework_submissions(student_id,submitted_at desc);
create index if not exists homework_submissions_assignment_idx on public.homework_submissions(assignment_id);

alter table public.homework_assignments enable row level security;
alter table public.homework_submissions enable row level security;
revoke all on table public.homework_assignments,public.homework_submissions from public,anon,authenticated;
grant select,insert,update,delete on public.homework_assignments to authenticated;
grant select,insert on public.homework_submissions to authenticated;
grant update(score,feedback,marked_by,marked_at) on public.homework_submissions to authenticated;

drop policy if exists "Approved teachers manage own classroom assignments" on public.homework_assignments;
create policy "Approved teachers manage own classroom assignments" on public.homework_assignments for all to authenticated
using (teacher_id=(select auth.uid()) and exists (
 select 1 from public.classrooms c join public.teacher_profiles tp on tp.user_id=c.teacher_id
 where c.id=homework_assignments.classroom_id and c.teacher_id=(select auth.uid()) and tp.approved=true
))
with check (teacher_id=(select auth.uid()) and exists (
 select 1 from public.classrooms c join public.teacher_profiles tp on tp.user_id=c.teacher_id
 where c.id=homework_assignments.classroom_id and c.teacher_id=(select auth.uid()) and tp.approved=true
));

drop policy if exists "Consented classroom students and guardians read assignments" on public.homework_assignments;
create policy "Consented classroom students and guardians read assignments" on public.homework_assignments for select to authenticated
using (exists (
 select 1 from public.classroom_members cm
 where cm.classroom_id=homework_assignments.classroom_id
 and cm.membership_status='approved' and cm.parent_consent_status='approved'
 and (cm.user_id=(select auth.uid()) or exists (
  select 1 from public.guardian_relationships gr
  where gr.student_id=cm.user_id and gr.guardian_id=(select auth.uid()) and gr.relationship_status='active'
 ))
));

drop policy if exists "Students submit own homework with approved consent" on public.homework_submissions;
create policy "Students submit own homework with approved consent" on public.homework_submissions for insert to authenticated
with check (student_id=(select auth.uid()) and exists (
 select 1 from public.homework_assignments ha join public.classroom_members cm on cm.classroom_id=ha.classroom_id
 where ha.id=homework_submissions.assignment_id and cm.user_id=(select auth.uid())
 and cm.membership_status='approved' and cm.parent_consent_status='approved'
));

drop policy if exists "Students guardians and classroom teachers read submissions" on public.homework_submissions;
create policy "Students guardians and classroom teachers read submissions" on public.homework_submissions for select to authenticated
using (student_id=(select auth.uid()) or exists (
 select 1 from public.guardian_relationships gr where gr.student_id=homework_submissions.student_id
 and gr.guardian_id=(select auth.uid()) and gr.relationship_status='active'
) or exists (
 select 1 from public.homework_assignments ha join public.teacher_profiles tp on tp.user_id=ha.teacher_id
 where ha.id=homework_submissions.assignment_id and ha.teacher_id=(select auth.uid()) and tp.approved=true
));

drop policy if exists "Approved classroom teachers mark submissions" on public.homework_submissions;
create policy "Approved classroom teachers mark submissions" on public.homework_submissions for update to authenticated
using (exists (
 select 1 from public.homework_assignments ha join public.teacher_profiles tp on tp.user_id=ha.teacher_id
 where ha.id=homework_submissions.assignment_id and ha.teacher_id=(select auth.uid()) and tp.approved=true
))
with check (marked_by=(select auth.uid()) and exists (
 select 1 from public.homework_assignments ha join public.teacher_profiles tp on tp.user_id=ha.teacher_id
 where ha.id=homework_submissions.assignment_id and ha.teacher_id=(select auth.uid()) and tp.approved=true
));

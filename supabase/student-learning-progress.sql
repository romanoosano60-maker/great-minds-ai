-- Great Minds AI — student learning progress storage
-- Applied directly to the connected Supabase project on 2026-11-05.
-- RLS and policies verified after creation. Keep this table append-only for
-- student clients: no UPDATE or DELETE privileges are granted to authenticated.
-- Student INSERT requires an active guardian_relationships link.
-- Students, their active guardian, and approved teachers in an approved,
-- parent-consented classroom can read the relevant records.

create table if not exists public.student_learning_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  subject text not null check (length(trim(subject)) between 1 and 60),
  activity_key text not null check (length(trim(activity_key)) between 1 and 120),
  score integer not null check (score >= 0),
  max_score integer not null check (max_score > 0 and score <= max_score),
  correct_count integer check (correct_count is null or correct_count >= 0),
  question_count integer check (question_count is null or question_count > 0),
  source text not null default 'lesson' check (length(trim(source)) between 1 and 40),
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check (correct_count is null or question_count is null or correct_count <= question_count)
);

alter table public.student_learning_progress enable row level security;
revoke all on table public.student_learning_progress from public, anon, authenticated;
grant select, insert on table public.student_learning_progress to authenticated;

drop policy if exists "Students insert own progress with active guardian link" on public.student_learning_progress;
create policy "Students insert own progress with active guardian link"
on public.student_learning_progress for insert to authenticated
with check (
  student_id = (select auth.uid())
  and exists (
    select 1 from public.guardian_relationships gr
    where gr.student_id = (select auth.uid())
      and gr.relationship_status = 'active'
  )
);

drop policy if exists "Students read own progress" on public.student_learning_progress;
create policy "Students read own progress"
on public.student_learning_progress for select to authenticated
using (student_id = (select auth.uid()));

drop policy if exists "Active guardians read linked student progress" on public.student_learning_progress;
create policy "Active guardians read linked student progress"
on public.student_learning_progress for select to authenticated
using (
  exists (
    select 1 from public.guardian_relationships gr
    where gr.student_id = student_learning_progress.student_id
      and gr.guardian_id = (select auth.uid())
      and gr.relationship_status = 'active'
  )
);

drop policy if exists "Approved classroom teachers read consented student progress" on public.student_learning_progress;
create policy "Approved classroom teachers read consented student progress"
on public.student_learning_progress for select to authenticated
using (
  exists (
    select 1
    from public.classroom_members cm
    join public.classrooms c on c.id = cm.classroom_id
    join public.teacher_profiles tp on tp.user_id = c.teacher_id
    where cm.user_id = student_learning_progress.student_id
      and cm.membership_status = 'approved'
      and cm.parent_consent_status = 'approved'
      and c.teacher_id = (select auth.uid())
      and tp.approved = true
  )
);

create index if not exists student_learning_progress_student_completed_idx
on public.student_learning_progress(student_id, completed_at desc);

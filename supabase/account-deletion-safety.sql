-- Great Minds AI account-deletion safety constraint
-- Applied and validated on 2026-11-09.
--
-- Classroom ownership must be transferred or the classroom explicitly removed
-- before deleting a teacher account. This prevents orphaned classroom rows
-- and accidental loss of student work through an unreviewed cascade.
--
-- This migration does NOT delete users, classrooms, homework, submissions,
-- progress, consent records, or storage objects.

do $block$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid='public.classrooms'::regclass
      and conname='classrooms_teacher_id_auth_user_fkey'
  ) then
    alter table public.classrooms
      add constraint classrooms_teacher_id_auth_user_fkey
      foreign key (teacher_id)
      references auth.users(id)
      on delete restrict
      not valid;
  end if;
end
$block$;

alter table public.classrooms
  validate constraint classrooms_teacher_id_auth_user_fkey;

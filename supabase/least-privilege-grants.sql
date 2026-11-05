-- Great Minds AI — least-privilege grants for existing classroom/progress tables
-- Applied to the connected Supabase project on 2026-11-05.
-- RLS policies remain the row-level authorization boundary.
-- Do not grant anon access to these child/classroom tables.
begin;
revoke all privileges on table public.classrooms, public.teacher_profiles,
  public.classroom_members, public.guardian_relationships,
  public.student_learning_progress from public, anon, authenticated;
grant select, insert on table public.classrooms to authenticated;
grant select on table public.teacher_profiles to authenticated;
grant select, update on table public.classroom_members to authenticated;
grant select on table public.guardian_relationships to authenticated;
grant select, insert on table public.student_learning_progress to authenticated;
commit;

-- Note: guardian relationship creation/redeeming and classroom join-code
-- operations are handled through the existing restricted RPC functions.
-- Teacher approval updates are restricted by the classroom_members UPDATE RLS
-- policy and must only be performed by an approved classroom owner.

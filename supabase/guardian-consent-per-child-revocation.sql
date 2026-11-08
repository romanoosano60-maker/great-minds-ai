-- Great Minds AI: revoke guardian consent for one child only.
-- Safe replacement for the former account-wide revocation action.
-- Applied after reviewing the live function and guardian relationship constraints.

create or replace function private.revoke_guardian_consent_for_student(p_student_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_guardian uuid := auth.uid();
  v_revoked_student uuid;
  v_memberships_blocked integer := 0;
begin
  if v_guardian is null then
    raise exception 'Sign in to the guardian account first';
  end if;

  if p_student_id is null then
    raise exception 'Choose the child whose consent you want to revoke';
  end if;

  update public.guardian_relationships
  set relationship_status = 'revoked',
      revoked_at = now()
  where guardian_id = v_guardian
    and student_id = p_student_id
    and relationship_status = 'active'
  returning student_id into v_revoked_student;

  if v_revoked_student is null then
    raise exception 'No active guardian relationship for this child was found';
  end if;

  update public.classroom_members
  set parent_consent_status = 'rejected',
      membership_status = 'rejected'
  where user_id = v_revoked_student
    and (parent_consent_status <> 'rejected'
         or membership_status <> 'rejected');

  get diagnostics v_memberships_blocked = row_count;

  return 'Consent revoked for the selected child. ' ||
    v_memberships_blocked::text ||
    ' classroom membership request(s) blocked. Other linked children were not changed.';
end;
$function$;

revoke all on function private.revoke_guardian_consent_for_student(uuid)
  from public, anon, authenticated;
grant execute on function private.revoke_guardian_consent_for_student(uuid)
  to authenticated;

create or replace function public.revoke_guardian_consent_for_student(p_student_id uuid)
returns text
language sql
security invoker
set search_path = ''
as $function$
  select private.revoke_guardian_consent_for_student(p_student_id);
$function$;

revoke all on function public.revoke_guardian_consent_for_student(uuid)
  from public, anon, authenticated;
grant execute on function public.revoke_guardian_consent_for_student(uuid)
  to authenticated;

-- Disable the former account-wide action so an old client cannot revoke
-- consent for every child linked to the same guardian account.
revoke all on function private.revoke_guardian_consent()
  from public, anon, authenticated;
revoke all on function public.revoke_guardian_consent()
  from public, anon, authenticated;

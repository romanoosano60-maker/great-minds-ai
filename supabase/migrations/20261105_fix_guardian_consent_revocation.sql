-- Great Minds AI: correct guardian-consent revocation result handling.
-- Apply through the Supabase SQL migration workflow after reviewing this file.
-- This replaces only the private revocation function; it does not change RLS policies.

create or replace function private.revoke_guardian_consent()
returns text
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_guardian uuid := auth.uid();
  v_students uuid[];
  v_memberships_blocked integer := 0;
begin
  if v_guardian is null then
    raise exception 'Sign in to the guardian account first';
  end if;

  with revoked as (
    update public.guardian_relationships
    set relationship_status = 'revoked',
        revoked_at = now()
    where guardian_id = v_guardian
      and relationship_status = 'active'
    returning student_id
  )
  select array_agg(student_id)
    into v_students
  from revoked;

  if coalesce(cardinality(v_students), 0) = 0 then
    raise exception 'No active guardian link was found';
  end if;

  update public.classroom_members
  set parent_consent_status = 'rejected',
      membership_status = 'rejected'
  where user_id = any(v_students)
    and (parent_consent_status <> 'rejected'
         or membership_status <> 'rejected');

  get diagnostics v_memberships_blocked = row_count;

  return 'Guardian consent revoked. ' ||
    v_memberships_blocked::text ||
    ' classroom membership request(s) blocked.';
end;
$function$;

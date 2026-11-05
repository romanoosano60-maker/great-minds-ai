-- Great Minds AI: prevent homework scores exceeding the assignment maximum.
-- Apply through the Supabase migration workflow after review.
-- This is a database-side guard; the browser helper also validates for friendly feedback.

create or replace function private.enforce_homework_score_max()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_max_points integer;
begin
  if new.score is null then
    return new;
  end if;

  select ha.max_points
    into v_max_points
  from public.homework_assignments ha
  where ha.id = new.assignment_id;

  if v_max_points is null then
    raise exception 'The homework assignment could not be found';
  end if;

  if new.score < 0 or new.score > v_max_points then
    raise exception 'The score must be between 0 and % points', v_max_points;
  end if;

  return new;
end;
$function$;

revoke all on function private.enforce_homework_score_max() from public, anon, authenticated;

drop trigger if exists enforce_homework_score_max on public.homework_submissions;
create trigger enforce_homework_score_max
before insert or update of score, assignment_id
on public.homework_submissions
for each row
execute function private.enforce_homework_score_max();

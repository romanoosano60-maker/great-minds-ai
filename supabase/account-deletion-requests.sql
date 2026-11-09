-- Great Minds AI: live, non-destructive account deletion request intake.
-- Applied to the connected Supabase project as migration account_deletion_request_intake.
create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references auth.users(id) on delete set null,
  status text not null default 'requested'
    check (status in ('requested','under_review','needs_classroom_transfer','approved','completed','rejected','cancelled')),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  completed_at timestamptz,
  admin_note text
);
create index if not exists account_deletion_requests_requester_time_idx
  on public.account_deletion_requests (requester_id, requested_at desc);
create unique index if not exists account_deletion_requests_one_open_per_user
  on public.account_deletion_requests (requester_id)
  where requester_id is not null
    and status in ('requested','under_review','needs_classroom_transfer','approved');
alter table public.account_deletion_requests enable row level security;
revoke all on public.account_deletion_requests from anon, authenticated;
grant all on public.account_deletion_requests to service_role;

# Great Minds AI — Account deletion workflow (request-only preparation)

## Current status
This repository contains a request-only implementation draft. It is NOT deployed or enabled. No account deletion is performed by this endpoint.

## Safeguards (four work areas)
1. **Authenticated request:** require a valid Supabase user session and an explicit confirmation. The server verifies the bearer token; clients cannot insert request rows directly.
2. **Child/guardian protection:** do not delete a child account solely from a child's session. A verified guardian must initiate and affirm the request; support must review the guardian relationship and any applicable legal requirements. Email verification and a checkbox alone do not prove legal guardianship.
3. **Teacher/classroom protection:** the live database now has a validated RESTRICT foreign key from classrooms.teacher_id to auth.users.id. Before deleting a teacher, transfer classroom ownership to another approved teacher or formally close the classroom after resolving memberships and preserving records. Never silently cascade-delete student work.
4. **Controlled processing and verification:** the request is reviewed by an authorized operator. Re-authenticate the requester, check ownership and child/guardian dependencies, export or preserve records only where legally required, process eligible deletion server-side using Supabase Admin API, revoke sessions, verify cascades and retained records, and record a minimal audit outcome. The Admin API credential must exist only as a server-side Edge Function secret; never put it in GitHub Pages, HTML, JavaScript, or a phone screenshot.

## Files
- `supabase/account-deletion-requests.sql`: schema draft for private-to-client request intake (RLS enabled; no anon/authenticated table access; service_role only).
- `supabase/functions/account-deletion-request/index.ts`: Edge Function draft that authenticates and records a request only. It never deletes users.
- The SQL must be applied before deploying the function. Deploy only after setting and verifying server-side secrets `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

## Explicitly not automated
- No Auth user deletion.
- No classroom transfer or closure.
- No deletion of child learning progress, homework, consent records, or security logs.
- No automatic purge of expired or revoked records.
- No fixed retention period: the product owner must approve a territory-specific retention schedule after legal/privacy review.
- No claim of legal guardian verification from email verification alone.

## Required pre-launch tests
Use disposable test accounts and synthetic data only:
- Student cannot submit a guardian deletion request.
- Guardian request is authenticated and recorded once; duplicate requests do not create duplicates.
- A teacher owning a classroom is blocked from deletion until transfer/closure is completed.
- Transfer preserves classroom and student work.
- A test deletion removes only eligible user-linked records; required audit records remain.
- Existing JWT/session behaviour is checked after deletion; signing out/revoking sessions is part of the procedure.
- Cross-device test with separate teacher and guardian accounts.

## Retention schedule decision
Do not invent durations. Before launch, approve retention periods and legal basis for account identity, guardian consent evidence, classroom records, learning progress, homework, support records, and security/rate-limit logs. Document backup expiry and processor deletion too.

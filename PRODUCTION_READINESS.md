# Great Minds AI — Production Readiness Checklist

Last reviewed: 9 November 2026

This document separates source-code work from live-service and device verification. A page that works with browser storage is a prototype, not a connected account or international classroom.

## Confirmed from repository review

- The root app and learning subject pages are present.
- The Supabase browser configuration uses the project's URL and a publishable key. A publishable/anon key is designed to be visible in browser code; it is not an authorization mechanism.
- Student, Teacher and Parent "Connected" dashboards currently use the same `localStorage` demo record. They explicitly warn that this is not a secure account system.
- The international classroom V3 page explicitly identifies itself as a local demonstration. Its messages and approvals remain in this browser.
- Group Learning is a local quiz demonstration, not a live multi-country classroom.
- The Supabase connection test page is separate from the demo dashboards. Its existence does not establish that the dashboards are integrated.
- No service-role key was present in the reviewed `supabase-config.js`. Never put a service-role or secret key in GitHub Pages or any browser JavaScript.

## Required before real student accounts

- [ ] Configure Supabase Auth providers and allowed redirect URLs for the production GitHub Pages origin.
- [ ] Create and verify separate teacher, parent and student authentication flows.
- [ ] Define trusted role assignment. A user must not be able to make themselves an approved teacher by editing browser data or choosing a role in a form.
- [ ] Enforce role and record ownership with Row Level Security (RLS) on every table exposed through the Data API.
- [ ] Verify classroom membership server-side and ensure a teacher can only manage classrooms they own or are explicitly assigned to.
- [ ] Link a child account to a verified parent/guardian consent record before enabling classroom participation.
- [ ] Minimise child data; use nicknames where possible. Do not expose email, phone, precise location or private profile data to other students.
- [ ] Test access using separate approved teacher, unapproved teacher, parent and student accounts. Confirm forbidden reads and writes fail.
- [ ] Review Realtime subscriptions so each user receives only events for classrooms they are authorized to access.
- [ ] Add reporting, blocking, moderation, audit logging, retention/deletion procedures and an adult escalation path before enabling child-to-child messaging.
- [ ] Test cross-device and cross-country access with real accounts and a controlled test classroom.

## Required before AI Teacher is live

- [ ] Deploy a server-side endpoint that holds the AI provider secret; never call the AI provider with a secret embedded in browser code.
- [ ] Authenticate requests and apply per-user and per-child rate limits.
- [ ] Minimise prompt data and avoid sending child identifiers or sensitive profile information.
- [ ] Add age-appropriate response rules, abuse/safety handling, logging limits and a parent/teacher escalation route.
- [ ] Test microphone permissions, speech recognition, text-to-speech and stop controls on supported Android browsers.
- [ ] Verify the actual backend response path end-to-end. A microphone or speech button alone is not an AI conversation.

## Required before publishing

- [ ] Test every home-screen link and every primary action on an Android phone.
- [ ] Check responsive layout, keyboard access, focus states, readable contrast and screen-reader labels.
- [ ] Test offline/slow-network behaviour and meaningful error messages.
- [ ] Confirm privacy policy, child-safety policy, parent consent, terms, support contact and data deletion process.
- [ ] Confirm legal requirements for each intended launch country and app-store child-directed app policies.
- [ ] Complete security review, backup/restore test and production monitoring.
- [ ] Complete Play Store and Apple App Store assets, declarations, age rating and review submissions.

## Current truthful status

The learning pages and several local dashboard/classroom demonstrations are built. The repository's Supabase configuration and connection-test page exist. However, live authentication, trusted role approval, parent consent, RLS behaviour under real accounts, cross-device classrooms, realtime messaging and the AI backend have not been independently verified in production. Do not describe these features as live until the tests above pass.

A successful GitHub Pages deployment confirms that the site was deployed; it does not prove that Supabase, AI services, or every page works at runtime.


## 2026-11-05 implementation update

Historical 5 November checkpoint: the Cloudflare Worker was prepared as an alternative template, but it was not the active endpoint. The current website calls the deployed Supabase AI Teacher Edge Function; see the authoritative 10 November reconciliation below. The Cloudflare Worker is not required by the current frontend.

The Mathematics, English, Science, Social Studies, History, Geography, Home Science, Computer Studies and General Knowledge lesson quizzes use the cloud progress helper. On 5 November, the guardian-consent revocation correction and homework maximum-score trigger were applied and rollback-tested, as recorded in DATABASE_SECURITY_VERIFICATION_2026-11-05.md. connected-progress.html now displays RLS-filtered cloud progress records separately from local demo points and stars. connected-practice.html also offers its results to secure cloud progress. Real-account and cross-device tests are still required.


## 2026-11-06 source audit update

- Rechecked the homepage routes and the linked learning, practice, student, parent/teacher, classroom, homework and connected-dashboard pages. The practice routes `english-extra.html` and `computer-extra.html` exist; the connected dashboard targets inspected exist. Static route checks do not replace Android click-through testing.
- Added a homepage Stop Voice control, narrowed homepage narration to the introductory content, and made the Start Learning scroll respect reduced-motion preferences.
- Added visible Stop Voice controls to Computer Studies, General Knowledge, English, Vocabulary, Dictionary, Home Science and the five extra subject practice pages. The controls cancel browser speech synthesis; source presence is verified, but Android playback/cancellation remains untested.
- Static DOM-reference checks on the main subject pages, student profile, parent/teacher centre, classroom/homework pages and connected dashboards found no missing literal `getElementById` targets in the inspected files.
- Language support remains partial: the shared language script itself states that lesson text is not fully translated. Menu/label translations do not prove complete lesson, quiz-feedback or AI-response translation. Urdu and Swahili are not complete app-wide translation packs.
- Historical 6 November checkpoint: at that time no live AI endpoint had been accepted. This was superseded by the deployed Supabase AI Teacher endpoint recorded in the 10 November reconciliation below; live authenticated response and Android speech acceptance remain open.
- The following remain launch blockers: real Android microphone/audio and language voice tests; real student/parent/teacher account and guardian-consent flows; server-enforced RLS and realtime authorization tests; cross-device/cross-country classroom tests; complete translation review; accessibility and device navigation; privacy/legal approval; native app packaging and store submission.

Source-code repairs above are development progress only. Do not change the production-ready or launch-ready status until the listed device, backend, safety and publishing checks pass.

- Follow-up audio repair: the shared `gm-language.js` toolbar now includes a Stop Voice control for page narration and avoids adding a duplicate when a page already has its dedicated `gm-stop-voice` control. Commit `7c8fc87717cf01bbcc9cca0c7aed85a47fd035bb`; re-fetched and source-verified. Android behaviour remains untested.


## 2026-11-09 AI Teacher deployment audit

- Supabase project `ryuchmmnyjyldwouidyy` lists the `ai-teacher` Edge Function as ACTIVE, version 4, with JWT verification enabled.
- `ai-teacher-config.js` currently points to the Supabase Edge Function URL; the frontend obtains the signed-in access token and sends subject, teaching language, question and recent text turns.
- The deployed function verifies the Supabase user and checks for an approved teacher profile or active guardian relationship before allowing a request. It consumes a database-enforced quota of 10 requests per account and 100 requests service-wide per UTC day before making a paid AI call.
- The function calls the OpenAI Responses API with `store:false`, applies child-focused safety instructions, and does not send the student's email, account ID or profile fields in the prompt.
- A real authenticated question-and-answer test, unauthorised-account rejection test, secret-presence check and Android microphone/text-to-speech test remain outstanding. Function deployment and source inspection do not prove successful live AI responses.
- Historical 9 November finding: `private.ai_teacher_daily_usage` was then reported with RLS disabled. The owner approved enabling RLS later on 9 November; the transaction/privilege test and current no-policy advisor notice are recorded in the following RLS-hardening section. Do not reapply the old suggested statement.
- Leaked Password Protection remains disabled in Supabase Auth. Enable it if the current project plan supports it.
- The existing Cloudflare Worker source is an alternative template, not the endpoint currently configured in the website.


## 2026-11-09 AI quota-table RLS hardening — owner approved and tested

- Owner approved enabling RLS on `private.ai_teacher_daily_usage`; the statement was applied successfully.
- Verified `relrowsecurity=true`, zero policies, and no direct SELECT or INSERT privileges for either `anon` or `authenticated`.
- This is deliberate: the private table is accessed only through the `SECURITY DEFINER` quota function owned by `postgres`; direct browser access remains blocked.
- Ran `public.consume_ai_teacher_quota()` under the `authenticated` database role with a simulated JWT subject inside a transaction, then rolled back the transaction. Result: `allowed=true`, `user_remaining=9`, `service_remaining=99`. This verifies the database function path with RLS enabled but is not a real signed-in end-user request or a live AI answer test.
- Security Advisor no longer flags RLS as disabled. It now emits an informational `RLS Enabled No Policy` notice for the private usage table, which is intentional. The separate `Leaked Password Protection Disabled` warning remains open.


## Current implementation correction — 10 November 2026

Older statements in this document saying that no Supabase AI Teacher endpoint is deployed are superseded by the current implementation:

- Frontend: `ai-teacher.html` uses `ai-teacher-config.js` and calls the Supabase Edge Function endpoint.
- Backend: `ai-teacher` is currently ACTIVE version 6 with JWT verification enabled. The OpenAI key is read from server-side Function Secrets. The browser request includes both the public Supabase `apikey` and the user's bearer token.
- Status: deployed and configured in source, but not accepted as live until an authenticated answer, an unauthorised-account rejection and Android speech tests pass. Natural low-latency voice-to-voice streaming is not implemented.

### Additional child-consent hardening
- The teacher UPDATE policy requires `parent_consent_status='approved'` before membership can be approved. Authenticated clients cannot update that consent column; the guardian-consent server-side RPC sets it only after validating the one-time code and active relationship.
- The classroom-call token endpoint independently verifies the student's active guardian relationship before issuing a student token.
- `classroom-call-token` is currently ACTIVE version 7 with JWT verification and WSS-only LiveKit URLs. Microphone and camera start OFF and require deliberate participant action.
- Supabase confirms RLS is enabled on all 11 inspected application tables and no direct anon table privileges are present. Three intentionally closed tables continue to produce informational no-policy notices.

### Repository integrity checks
- All 56 HTML pages were checked for local `href` and `src` references; no missing local targets were found.
- The current 202-file repository has no exact duplicate Git blobs identified by the earlier scan. Legacy demos and connected pages are different implementations, not duplicate copies, and were not deleted.
- Latest application-code Pages build for commit `4bca9d69c03090727974d5a9538e385a2c9d17e7` completed successfully.

The application remains not launch-ready until all owner/device tests, actual secret configuration checks, child-privacy/legal review, retention/deletion decisions, backups/monitoring and native packaging requirements are completed.


### Database duplicate-index cleanup — 10 November 2026
- Removed redundant `classrooms_classroom_code_normalized_uidx`; retained `classrooms_classroom_code_unique` with equivalent normalized uniqueness enforcement.
- Updated the repository SQL setup script so it no longer recreates the duplicate.
- Rechecked valid public index definitions: no exact structural duplicates remain. No classroom data changed.


### Teacher access policy correction — 10 November 2026
Teacher-side homework and progress policies were updated so they do not query the private guardian-link table as the teacher. They now rely on approved classroom membership and the consent-status column, which authenticated clients cannot update. Student/guardian paths continue to verify their own active relationship. Separate-account tests are still required.


## 2026-11-10 authoritative status reconciliation

This section supersedes older historical status bullets above wherever they conflict with the current live backend and repository audit.

- The live Supabase project currently lists `ai-teacher` v6, `classroom-call-token` v7 and `account-deletion-request` v5 as ACTIVE with JWT verification enabled. Older v4/v5/v6 function references elsewhere in this document are historical snapshots.
- The latest security advisor reports RLS enabled but no direct policies on `private.ai_teacher_daily_usage`, `private.classroom_join_attempts` and `public.account_deletion_requests`. These are intentionally restricted tables; do not add broad client policies. Leaked-password protection remains disabled.
- The current AI Teacher is an authenticated text-answer API with browser/device speech recognition and browser speech synthesis. It is not continuous voice-to-voice AI. Live approved-account response and rejected-account tests remain owner actions.
- The account-deletion endpoint is a request-only, verified-adult/manual-review process. It does not delete Auth accounts, revoke all sessions or erase child learning data. A documented retention schedule and approved deletion execution process remain launch blockers.
- The latest repository inventory contains 202 tracked files and no Android project, Capacitor configuration, package manifest, web-app manifest or service worker. Native Android packaging has not started.
- A historical Pages build was recorded as successful for commit `4bca9d69c03090727974d5a9538e385a2c9d17e7`; this does not prove the latest source changes are deployed or that the current public URL is reachable. The current live deployment/final URL remains unconfirmed, and the latest source commits have no reported CI workflow/status results.
- The owner has reported successful teacher/student/parent coordination in an earlier test session; that report is retained. A fresh persisted end-to-end homework/consent/revocation acceptance pass is still required before marking the complete workflow verified.
- The earlier note that the AI usage table had RLS disabled is superseded: the current advisor reports RLS enabled with no client policy.

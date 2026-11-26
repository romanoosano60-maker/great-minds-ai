# Great Minds AI — Consolidated Completion Package

**Audit snapshot:** 24 November 2026  
**Repository:** `romanoosano60-maker/great-minds-ai`  
**Default branch:** `main`  
**Supabase project:** `ryuchmmnyjyldwouidyy` (London region, project status ACTIVE_HEALTHY)

This document is the current consolidated handover. It separates work that is present in source or confirmed in the backend from work that still requires real-device, real-account, legal, or publisher action. A checklist or source file is not evidence that a live test passed.

## 1. Product baseline to preserve

- Keep the permanent colourful rocket home screen as the app entry point.
- Keep the compact three-page home dashboard and current subject navigation.
- Keep Student, Teacher and Parent areas distinct and protected.
- Keep the Picture Library and 3D graphics as existing owner-confirmed features; do not repeatedly count them as new engineering blockers.
- Keep Great Minds AI separate from the Dubai Life project.
- Use fictional test data only until the child privacy and consent process is approved.

## 2. Source and feature inventory

The current repository contains the main home page, subject learning pages, English/vocabulary/story content, games and rewards, student profile, parent/teacher/student areas, connected dashboards, classroom and homework pages, graphics assets, Supabase configuration, three Edge Function sources, database SQL/migrations, and engineering/acceptance documentation.

The home page routes to the core learning areas and includes the independent student space, picture stories, sign-in, and the unified learning/classroom hub. The current source includes mobile layout refinements, accessible focus states, reduced-motion handling, home-page pagination, and shared language controls. Translation remains partial; selecting a language does not mean every lesson, quiz, or AI response is fully translated.

## 3. Backend snapshot verified on 24 November 2026

Supabase project status: **ACTIVE_HEALTHY**.

Active Edge Functions, all with JWT verification enabled:
- `ai-teacher` — version 9 (updated during this continuation).
- `classroom-call-token` — version 9.
- `account-deletion-request` — version 7.

The AI Teacher frontend points to the Supabase Edge Function, not the old Cloudflare `/ask` route. The current source authenticates the user, checks approved-teacher or active-guardian/student-link eligibility, validates the request, applies the database quota, and calls the AI provider server-side. During this continuation, a concrete response-parsing defect was corrected: the function previously read `output_text` from the raw REST JSON only, although the raw Responses API can return generated text under `output[].content[]`. Version 9 now reads both formats, logs only non-sensitive configuration/status diagnostics, and applies a 25-second upstream timeout. The provider key must remain in Supabase Function Secrets. The secret value/presence cannot be read through this audit, and a successful authenticated AI answer has not been confirmed. The previously reported configuration message remains an end-to-end test item because server secret presence cannot be inspected through this audit. The earlier HTTP 502 empty-answer path has been addressed in version 9, but a successful authenticated answer is still not confirmed.

The classroom call function checks classroom ownership/membership and active guardian links before issuing tokens. The account-deletion function accepts an eligible adult's request for manual review; it does not delete the account or child data automatically.

## 4. Database security review

The current database policy inspection confirms owner/role-scoped rules for the reviewed classroom membership, classrooms, guardian relationships, homework assignments/submissions, student progress, and teacher-profile tables. Examples include approved classroom-teacher checks, linked-guardian visibility, consent-gated student submissions, and linked-parent progress reads.

Current Supabase Security Advisor snapshot:
- Three informational “RLS enabled, no policy” notices: private operational tables `private.ai_teacher_daily_usage` and `private.classroom_join_attempts`, plus `public.account_deletion_requests`. These tables are intentionally not exposed for direct client access; do not add broad policies merely to silence the notices.
- One warning remains: **Leaked Password Protection Disabled**. Enable it in Supabase Auth settings if supported by the project plan, then re-check the advisor.
- Health advisor returned no findings.

No production user, child learning record, classroom, RLS policy, schema, index, or secret was changed during this snapshot.

## 5. What is source/backend prepared

- Permanent home and learning navigation are present.
- Subject lesson pages, vocabulary, story and practice areas are present.
- Audio stop/cleanup protections were added to reviewed learning pages.
- AI Teacher server-side integration and eligibility/quota checks are implemented in source and deployed as Edge Function version 9; raw Responses API output parsing and upstream timeout handling were repaired in this continuation.
- Student, Parent and Teacher cloud dashboards now label dashboard snapshots as points totals rather than quiz scores; lesson quiz results continue to display as scores. This is a source-level display correction only and did not change database schema, permissions, or stored records.
- Supervised classroom call-token authorization is implemented in source and deployed as version 9.
- Adult account-deletion request intake is deployed as version 7 and explicitly remains manual-review only.
- Classroom, consent, homework, student progress and role-specific RLS policies exist in the reviewed database.
- Repository static-audit workflow is configured to check local HTML references and standalone JavaScript syntax on pushes and pull requests.

These are engineering facts, not a claim that every page, account role, device, audio path, or service has passed acceptance testing.

## 6. Remaining acceptance and release blockers

### A. Owner/device tests
1. Open the published home page on the Android phone and test all home tiles, page pagination, login links, and the unified hub.
2. Test sign-in, sign-out, password reset, and session expiry using separate adult-controlled test accounts.
3. Test AI Teacher with an approved teacher or properly linked test account: ask a Mathematics question and confirm a live generated answer. Test an unrelated account and confirm it is rejected. Then test microphone, Listen, Stop, language choice, and leaving the page.
4. Test English alphabet, picture/word matching, vowels, vocabulary, stories, and audio stop/navigation on Android.
5. Test a classroom with separate approved teacher, student, and guardian accounts: join code, consent, teacher approval, access revocation, and denial after revocation.
6. Complete one secure homework cycle: teacher publishes, consented student submits, teacher marks, linked parent views the result on a second device.
7. Test classroom audio/video calls on separate devices: camera and microphone start OFF, teacher-only start/end, guardian observer-only, and disconnect cleanup.
8. Recheck student progress and parent visibility across a second device; confirm an unrelated parent/student cannot read the records.
9. Check slow-network recovery, mobile layout, sound, and missing/404 links.

### B. Privacy, child safety and legal review
- The current consent workflow records verified email plus an affirmative guardian declaration; it does not independently prove legal guardianship. Obtain a suitable guardian-verification process and qualified legal/privacy review for each launch territory.
- Finalise privacy notice, child/parent consent language, data inventory and vendor/processor disclosures.
- Decide retention periods, deletion, export/correction, backup retention, and account-closure procedures before processing real deletion requests.
- Keep open child-to-child messaging disabled until moderation, reporting, blocking, adult escalation, retention, and realtime authorization are fully reviewed and tested.
- Do not represent the request-only deletion endpoint as automatic account or child-data deletion.

### C. Publishing and packaging
- Independently verify the public GitHub Pages deployment and final published URL.
- The repository does not currently contain a native Android project, Capacitor configuration, package manifest, web-app manifest, or service worker. Android/Play Store packaging has not started.
- After web and backend acceptance, choose and implement the Android packaging route, then complete store declarations, age rating, assets, and review submission.
- Do not call the product publicly launch-ready until device acceptance, backend authorization, child-safety/legal review, and publishing checks pass.

## 7. Completion reporting rule

Report four separate measures; do not combine them into one percentage:
1. **Source engineering:** repository code and documentation.
2. **Live service/deployment:** GitHub Pages, Supabase, AI and classroom service operation.
3. **Owner acceptance:** real Android, separate-account, audio/video and cross-device tests.
4. **Launch readiness:** child privacy/legal review, retention/deletion process, and app-store packaging.

A feature is complete only when its required evidence exists at the correct level. The owner's earlier development/testing percentages remain historical estimates and are not replaced by this audit snapshot.

## 8. Safe next sequence

1. Enable leaked-password protection if available and verify the advisor again.
2. Resolve the AI Teacher configuration/response issue by checking Supabase function logs and the Function Secret configuration in the owner's dashboard; never expose secret values in chat or browser code.
3. Run the consolidated Android and separate-account acceptance session above.
4. Fix only defects demonstrated by those tests; preserve the confirmed home-screen baseline.
5. Complete privacy/legal and retention decisions, then Android packaging and store preparation.

**Current conclusion:** the source and backend contain substantial completed work, but Great Minds AI is not yet independently verified as a fully working, child-safe, store-ready product. The remaining work is concentrated in live AI verification, separate-account/cross-device acceptance, Android audio/call tests, guardian/legal safeguards, deployment confirmation, and native packaging.

## 9. Performance advisor snapshot — 24 November 2026

The performance advisor also reports five informational unused-index notices and two warnings about multiple permissive SELECT policies:
- Unused-index notices affect indexes on homework assignments, homework submissions, classrooms, and account-deletion requests.
- Multiple permissive SELECT policies affect homework assignments and student learning progress. These policies represent distinct teacher, student, and linked-guardian access paths.

Do not remove indexes or merge policies solely to clear advisor notices. First capture representative query plans/workload evidence and prove that any proposed policy consolidation preserves every teacher, student, and guardian access boundary. These findings are performance-review items, not permission to weaken RLS.


## 10. Classroom, guardian-consent and student-progress source audit — 24 November 2026

A further source-level review was completed after the initial consolidated audit. This section records what was verified in repository code; it does not claim that separate accounts or Android devices have passed live tests.

### Supervised classroom call page
- The call page accepts only a numeric classroom identifier and the supported audio/video modes and start/join/end actions.
- It obtains the current signed-in Supabase session and sends the user's access token to the JWT-protected `classroom-call-token` Edge Function.
- Microphone and camera are not enabled automatically. The participant must deliberately opt in; guardian-observer controls remain disabled.
- If the teacher disconnects, student/guardian clients disconnect and reset local media controls. A local media-control failure also triggers fail-closed disconnection.
- Leaving, ending, or navigating away attempts local room disconnection and media cleanup. The UI distinguishes a failed server-side end confirmation from a successful local leave.
- The backend independently checks teacher ownership/approval, approved membership, active guardian relationship, teacher presence before student/guardian join, observer-only guardian permissions, encrypted WSS endpoint, and 10-minute token lifetime.
- LiveKit secret configuration and real two-device call behavior remain unverified. Do not claim that calls are operational until the owner completes the separate-device test.

### Guardian consent and revocation
- The student-generated consent code is a 64-character high-entropy token, stored as a SHA-256 hash for new codes, expires after 24 hours, and is displayed once for private sharing.
- Redemption requires a signed-in guardian account with verified email and an explicit affirmative guardian declaration. A student cannot approve their own consent.
- A guardian relationship is created through the protected database function; classroom membership still requires teacher approval.
- The interface supports revoking consent for one selected child. The database function blocks that child's classroom memberships and leaves other linked children unchanged.
- This is account-based consent, not independent proof of legal guardianship. Legal/privacy review and any stronger guardian-verification requirement remain launch blockers.

### Secure student progress helper
- The shared helper validates subject/activity lengths, integer score bounds, optional correct/question counts, level values and UUID operation IDs before attempting a cloud insert.
- It writes a device-local history copy and then uses the current signed-in account for the cloud insert; database RLS remains the authority for who may write/read progress.
- When a UUID operation ID is supplied, duplicate retries are checked against the existing row and accepted only when the stored record matches the attempted record. A conflicting reuse is rejected.
- Cloud failures are reported separately from local device saves; the local independent-student history is explicitly device-only and is not a secure cross-device parent sync.
- Some lesson integrations call the helper without a stable operation ID. Those records rely on the database-generated row ID and are not guaranteed idempotent on repeated submissions. This is a retry/duplicate-review item; do not claim every lesson save is duplicate-proof.

### Source audit conclusion
The code contains meaningful fail-closed call controls, guardian consent protections and progress validation. No policy relaxation or database mutation was made during this source review. Required owner acceptance still includes real teacher/student/guardian accounts, consent and revocation, unrelated-account denial, cross-device parent visibility, LiveKit configuration, and Android call/media tests.


## 11. Cross-document comparison and authoritative status — 24 November 2026

The current completion package was compared against `GREAT_MINDS_MASTER_GUIDE.md`, `PRODUCTION_READINESS.md`, `OWNER_ACTIONS.md`, `PROJECT_STATUS.md`, and `README.md`. The older records contain useful dated history, but several opening summaries and older entries predate later backend/source changes. They must not be read as current deployment status.

### Document authority and how to use the records

| Document | Purpose after reconciliation | Authority |
|---|---|---|
| `FINAL_COMPLETION_PACKAGE_2026-11-24.md` | Single current status, verified source/backend facts, risks, acceptance gates and launch decision | **Primary source of truth** |
| `GREAT_MINDS_MASTER_GUIDE.md` | Integration architecture and detailed working guide | Supporting guide; follow the 24 Nov addendum for current status |
| `PRODUCTION_READINESS.md` | Launch and child-safety gate checklist | Supporting checklist; 24 Nov addendum supersedes older opening snapshot |
| `OWNER_ACTIONS.md` | Detailed chronological test and engineering log | Historical evidence; older version numbers/status entries are superseded by dated later entries and this package |
| `PROJECT_STATUS.md` | Historical engineering record and task chronology | Historical log; do not use older statements as present-day deployment facts |
| `README.md` | Entry point to project and current package | Points to this primary package |

### Reconciled facts

- **Backend inventory (current recheck):** `ai-teacher` v9 ACTIVE, `classroom-call-token` v9 ACTIVE, and `account-deletion-request` v7 ACTIVE; JWT verification is enabled on all three. Older references to AI Teacher v6/v8, call-token v7, or deletion-request v5 are historical snapshots, not the current inventory.
- **AI Teacher:** parser/timeout repair is deployed in v9. A successful authenticated child-safe answer and secret presence have not been verified; this remains an acceptance test, not a completed runtime feature.
- **Classroom calling:** source-level authorization and media safeguards were reviewed. LiveKit secret presence and real teacher/student/guardian device calls remain unverified.
- **Connected dashboards:** cloud panels use signed-in sessions and database RLS; shared-browser demo panels remain demonstrations and must not be confused with secure cloud records.
- **Independent Student space:** nickname and history are browser/device local. It is not cross-device parent sync.
- **Learning progress:** the shared helper now generates UUID operation IDs, rejects conflicting duplicate records, and provides a bounded identity-bound retry queue for new authenticated progress. The queue is deployed, never auto-uploads legacy anonymous history, and retries only after the same account is verified. Seventeen automated tests pass; real Android and separate-account RLS acceptance tests remain outstanding. Some older activity pages still omit caller-supplied per-attempt IDs, so a separate user-triggered completion call without the original ID is treated as a new operation.
- **Guardian consent:** high-entropy one-time code, hash storage, expiry, verified guardian email, explicit guardian declaration, and per-child revocation are present in the reviewed flow. This does not independently prove legal guardianship.
- **Security:** three informational no-client-policy notices are intentional for closed tables; leaked-password protection remains disabled. Do not broaden RLS to silence notices.
- **Performance:** five unused-index notices and two multiple-permissive-SELECT notices remain for evidence-led review; do not remove indexes or merge policies without query plans and authorization-equivalence review.
- **Child safety and launch:** privacy/consent/legal review, retention/deletion/export procedures, real account boundary tests, Android acceptance and native packaging remain launch gates.

### Final completion decision

The repository documentation and backend inventory have been reconciled into one package. This completes the documentation consolidation and source-level audit work that can be responsibly completed without owner-controlled accounts/devices or legal decisions. It does **not** mean the app is fully launch-ready. The remaining work is explicitly separated into owner acceptance, administrator configuration, legal/privacy approval, and Android packaging. Preserve the working home screen and do not use real children's personal data until those gates pass.


## 12. Unified source-code completion package — 24 November 2026

A dedicated source-code package has been added at `SOURCE_CODE_COMPLETION_PACKAGE_2026-11-24.md`. It maps each subject and companion page, shared frontend helpers, role dashboards, classroom and homework components, Supabase SQL and Edge Functions. It defines one integration order and a common definition of done for every module.

The source package also makes the following known gaps explicit so they are not mistakenly reported as complete:
- Family, Local School and International Network are not yet distinct database network types; country-based RLS boundaries are not implemented/tested.
- Some subject/activity progress integrations do not pass their own stable per-attempt UUID. The helper generates an ID for each invocation and preserves it for internal queue retries, but a later separate invocation without the original ID is a new operation.
- Identity-bound deferred cloud synchronization is now implemented and deployed for new authenticated progress records; real Android and separate-account RLS acceptance remains outstanding. Legacy anonymous local records are not automatically uploaded.
- AI Teacher authenticated runtime, LiveKit separate-device calls, Android acceptance, privacy/legal approval and native Android packaging remain unverified or outstanding.

This is a source architecture/index and audit package, not a monolithic code bundle. Keep modules separate, preserve the working home screen, and make only evidence-based, reversible changes. The source package does not alter learner data, RLS policies, database schema or secrets.


## Update — 24 November 2026: Discovery & Creativity Centre

Added `discovery-creativity.html` and linked it from the home dashboard's Complete Educational Subjects page. The centre contains eight child-friendly stations: Young Inventors Lab, Space Explorer, Animal Kingdom, Creative Art Studio, Young Entrepreneurs, World Explorer, Science Experiment Centre, and Puzzle & Logic Centre. Interactive browser activities include idea prompts, factual questions, a pretend-coin arithmetic challenge, a pattern puzzle, and a supervised shadow-observation guide. The page does not request or submit personal information and does not claim cloud progress tracking. Source-level checks confirmed eight station cards, unique activity element IDs, the home-page link, and the expected interaction functions. **Still required:** open the GitHub Pages deployment on an Android device and test the link, layout, buttons, and activity feedback. This addition does not close the separate security, cloud-sync, AI Teacher, classroom-call, privacy/legal, or release-readiness items listed above.


## 24 November 2026 — subject expansion reconciliation

Two additional learning destinations are now part of the home dashboard source:
- **Discovery & Creativity Centre** — eight activity stations, including inventing, space, animals, art, entrepreneurship, world exploration, science observation and puzzles. Source addition and home link were previously recorded in the source completion package.
- **Life Skills & Wellbeing** — eight learning areas covering feelings, kind communication, healthy habits, personal safety, digital safety, responsibility, teamwork and calm problem-solving, with an eight-question quiz. GitHub accepted the page commit `3c35ec0bc7aa5bf1499ca43ff84768f188c87d5d` and home-link commit `6fa94d9d7fc751b89922f0a91603f083c3a6539c`.

These are committed source changes, not proof of a successful live Pages or Android test. The subject additions do not close the separate AI Teacher authenticated-response, LiveKit configuration/cross-device call, network separation, progress idempotency/deferred sync, leaked-password protection, privacy/legal, Android packaging or owner acceptance gates. Use the source completion package for the detailed subject map and technical acceptance checklist.


## Automated repository audit and deployment — 24 November 2026

**Verified latest main commit:** `0783b5226c7d9a8040d1a5cfc0a268aacaecbdc9`.

GitHub Actions run results for that exact commit:
- Static repository checks run [45393641709](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45393641709): completed successfully.
- Static audit log: scanned **63 HTML files** and **10 standalone JavaScript files**, checked **619 local `href`/`src` references**, and reported PASS with no missing local references and no JavaScript syntax failures.
- GitHub Pages build/deployment run [45393642325](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45393642325): build, artifact upload and deploy jobs all completed successfully.

**What this establishes:** the latest repository revision passed the repository's configured local-reference and standalone-JavaScript syntax checks, and the GitHub Pages deployment workflow completed successfully for that revision.

**What this does not establish:** every interactive control works in a browser, every HTML inline script has been runtime-tested, Supabase policies pass positive/negative account tests, AI Teacher returns an authenticated answer, LiveKit calls work on separate devices, Android microphone/camera/audio work, or legal/privacy approval has been obtained. The audit script does not perform HTML validation, accessibility testing, external image/CDN checks, SQL migration execution, or browser end-to-end tests.

The new Discovery & Creativity and Life Skills pages are included in the repository revision covered by this automated audit. Their source links and local references passed the audit; their interactive behaviour still needs Android acceptance.


## Extended inline-script audit and source corrections — 24 November 2026

The static audit was extended to parse executable inline JavaScript in HTML pages as well as standalone `.js` files. On commit `6dbe648b3d10b035c8b120942e8c8d98fb0716c2`, GitHub Actions run [45394883512](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45394883512) passed:
- 63 HTML files scanned.
- 10 standalone JavaScript files parsed.
- 132 executable inline script blocks parsed.
- 619 local `href`/`src` references checked.
- No missing local references or JavaScript syntax failures.

The stricter pass exposed and source corrections were committed for:
- `connected-parent.html`: replaced the parent progress-list HTML-string rendering with DOM nodes and `textContent`, avoiding HTML interpretation of record values.
- `connected-practice.html`: corrected a missing statement separator after the answer-handler assignment.
- `english.html`: closed the English additional-practice initialization IIFE.

These are source corrections. They do not replace browser/device interaction tests or Supabase authorization tests.

## Safe architecture design prepared — 24 November 2026

Added [SAFE_CLOUD_SYNC_AND_NETWORK_SEPARATION_DESIGN_2026-11-24.md](SAFE_CLOUD_SYNC_AND_NETWORK_SEPARATION_DESIGN_2026-11-24.md). It records the current device-local versus immediate cloud-save behaviour, explains why anonymous legacy local progress must not be automatically uploaded, specifies identity-bound idempotent deferred-sync acceptance tests, separates Family relationships from Local/International classroom types, and lays out a reviewed migration/RLS test sequence. **No network schema migration or automatic upload process was deployed.**


## Short owner handover

For the next real-device session, start with [TOMORROW_OWNER_TEST_SESSION_2026-11-24.md](TOMORROW_OWNER_TEST_SESSION_2026-11-24.md). It groups the Android, AI Teacher, audio, separate-account, guardian-consent, homework and optional call checks into one ordered run.


## Live Supabase configuration and advisor audit — 24 November 2026

Read-only checks against project `ryuchmmnyjyldwouidyy` confirmed:
- Project status: `ACTIVE_HEALTHY`; PostgreSQL 17.11.
- Edge Functions: `ai-teacher` ACTIVE v9, `classroom-call-token` ACTIVE v9, `account-deletion-request` ACTIVE v7; JWT verification enabled for all three.
- Applied migration history currently ends at `20261110` entries. The repository file `supabase/migrations/20261120_rate_limit_guardian_consent_codes.sql` is **not present in the live applied migration list**. Read-only SQL also confirmed `private.guardian_consent_code_issuance` does not yet exist, while `private.create_guardian_consent_code()` exists and is executable by `authenticated`, not `anon`. Therefore the additional three-per-hour code-issuance limit in that file is not active in production. It remains pending a properly versioned, reviewed migration; do not assume the source file alone changed the live database.
- Organization plan: **Free**. Supabase's current [password security documentation](https://supabase.com/docs/guides/auth/password-security) says leaked-password protection is available on Pro and above. The Auth advisor still reports it disabled; enabling it requires an owner plan decision/upgrade, not a source-code edit.

### Security Advisor

- Three informational `RLS Enabled No Policy` findings: `private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`.
- Read-only privilege checks confirmed `anon` and `authenticated` have no direct SELECT/INSERT/UPDATE/DELETE privileges on these three tables. The private tables are intentionally closed; `account_deletion_requests` is accessed through the privileged server-side workflow. Do not add broad client policies merely to silence the notices.
- One warning: `Leaked Password Protection Disabled`, constrained by the current Free plan as described above.

### Performance and health advisors

- Health advisor: no findings.
- Performance advisor: five indexes are currently reported unused, and two tables have multiple permissive SELECT policies (`homework_assignments`, `student_learning_progress`). In this low-traffic project, unused-index notices are not grounds to remove protective/query-support indexes. The SELECT policies represent separate teacher, student and guardian access paths; do not merge or weaken them without a measured query-plan review and full positive/negative RLS tests.

No Supabase schema, policies, secrets, or plan settings were changed during this read-only audit. Provider secret presence and authenticated AI/LiveKit runtime success remain unverified.


## 12. Follow-up engineering and live-service audit — 26 November 2026

A further read-only audit and a small source reliability improvement were completed on 26 November. This addendum supersedes earlier assumptions only where it states a newer verified fact.

### Live Supabase recheck

- Project `ryuchmmnyjyldwouidyy` remains `ACTIVE_HEALTHY`, running PostgreSQL 17.11.
- Applied migration history still ends with entries dated 10 November 2026. The repository migration `supabase/migrations/20261120_rate_limit_guardian_consent_codes.sql` is not applied.
- The live private function `private.create_guardian_consent_code()` is owned by `postgres`, is `SECURITY DEFINER`, has an empty search path, and its current execute ACL is limited to `postgres` and `authenticated`. Its current body generates a 64-character random code, stores a SHA-256 hash, expires it after 24 hours, and marks prior unused codes as used. **It does not yet enforce the proposed three-code-per-hour issuance limit.**
- The issuance-counter table `private.guardian_consent_code_issuance` does not exist in production. The migration remains a pending production security improvement and must be applied through a reviewed/versioned workflow after owner approval.
- Live RLS policy inspection reconfirmed that student progress inserts require `student_id = auth.uid()` and an active guardian relationship. Students can read their own progress; active linked guardians can read the linked learner's progress; approved teachers can read only progress for approved, consented classroom members.
- The two current classroom country values are `Rwanda` and `UAE`. The existing classroom schema still has no normalized country-code or network-type fields. These two values are not sufficient evidence to classify a classroom as an approved international collaboration. Existing rows must remain unclassified for cross-border sharing until owners and guardian approvals are explicitly recorded.
- Current Security Advisor findings remain three informational RLS/no-policy notices on intentionally closed operational/request tables and one warning for disabled leaked-password protection. Health Advisor returned no findings. No database schema, policy, secret, user, classroom or progress row was changed during this read-only audit.

### Progress-save reliability improvement

- The shared `student-cloud-progress.js` helper now rejects a reused operation UUID when the existing device-local record has different immutable progress values. It no longer silently replaces that local record.
- Added nine automated Node tests covering input validation, device-only save behaviour, authenticated student ownership, no-session handling, RLS/guardian-consent denial, exact duplicate acceptance, conflicting cloud duplicate rejection, conflicting local duplicate protection, and bounded progress reads.
- The GitHub Actions workflow now runs these tests before the repository static audit.
- Draft PR: [#1 — Add automated student progress safety tests](https://github.com/romanoosano60-maker/great-minds-ai/pull/1). The first CI run passed all 9 tests and the existing static audit (63 HTML files, 10 standalone JavaScript files, 132 executable inline script blocks, and 619 local references). This PR remains separate from `main` until the final branch check and merge decision.
- This improvement does **not** implement deferred cloud sync. Legacy anonymous local records remain device-only and must not be automatically uploaded to whichever account later signs in. Some lesson integrations still omit stable operation IDs and need a separate caller-by-caller reliability pass.

### Current disposition

The source-side progress conflict guard and automated tests are prepared and CI-verified on the draft PR. Production rate limiting, safe deferred sync, network separation, live AI response, LiveKit calls, Android acceptance, legal/privacy review and Android packaging remain outstanding. No completion percentage is increased on the basis of a source test alone.


## 13. Identity-bound offline progress sync — source implementation prepared 26 November 2026

A source implementation of deferred progress retry was prepared on an engineering branch, verified by automated tests, and merged into `main` at commit `4619a60beb6b297599f87100030160befbac5aa0`. The GitHub Pages deployment completed successfully on 26 November (latest documentation/source workflow run `45779135226`). The source is published, but real Android and separate-account acceptance tests are still required.

- New queue key: `gm_authenticated_progress_sync_queue`.
- Queue entries are created only for new progress saves made while a signed-in account is verified, or while a cached session identifies the account during a network outage. Cached-session entries are **not uploaded** until a later server-side `getUser()` check confirms that the same account is signed in.
- Every queue entry carries a UUID operation ID and owner account UUID. The sync path compares the current verified account ID with the stored owner ID before attempting an insert. A different account cannot inherit the queued item.
- Retries use the existing `student_learning_progress` insert and its current RLS policies. No new policy, schema or elevated client permission was added.
- Queue size is capped at 100 entries and entries expire after 30 days. The queue contains only the minimum score/activity metadata; it does not contain learner nicknames, free-form writing, audio, contact details or location.
- Retry is triggered on initial authenticated session, sign-in, token refresh, network reconnection, and by the exposed `gmSyncPendingStudentProgress()` function.
- Legacy anonymous local history is not scanned or uploaded. It remains device-only.
- The test suite now has 17 passing cases, including same-account retry, account-switch isolation, cached-session/offline handling, legacy-history non-upload, queue bounds/expiry, duplicate verification and existing progress validation. The repository static audit also passes.
- PR [#2 — Add identity-bound offline progress sync](https://github.com/romanoosano60-maker/great-minds-ai/pull/2) is merged. CI passed with all 17 tests and the static audit. GitHub Pages deployment is confirmed successful in run `45779135226`.

**Not yet proven:** real Android offline/reconnect behaviour, real Supabase RLS denial and recovery with separate accounts, queue behaviour under browser storage restrictions, or parent visibility after cross-device sync. These remain owner acceptance tests. No Supabase database or production data was changed for this source implementation.


## 14. Classroom and network-separation schema recheck — 26 November 2026

A read-only inspection of the live classroom schema, RLS policies, constraints and database functions refined the network-separation design.

### What exists now

- `public.classrooms` stores `classroom_name`, `Subject`, free-text `Country`, `teacher_id`, and both legacy `classroom code` and `classroom_code` columns. It has no `network_type`, normalized ISO country code, or verified-country field.
- `public.teacher_profiles` contains only `user_id`, `approved`, and `created_at`. It has no country field or country-verification state.
- `public.classroom_members` stores `membership_status` and `parent_consent_status`. Its RLS allows a student, linked active guardian, or approved owning teacher to read the relevant membership; only an approved owning teacher can update membership status, and an approved membership cannot be set unless parent consent is approved.
- Classroom membership is inserted through `private.join_classroom_by_code(text)`, a `SECURITY DEFINER` function with an empty search path. It requires an authenticated user, limits join-code attempts to 20 per user per day, validates the code format, and creates a pending membership. It sets the membership's parent-consent status to approved when an active guardian relationship already exists. The function does not check country or network type.
- `public.guardian_relationships` records the active/revoked parent-child link. This is separate from classroom ownership and teacher approval.

### Safety conclusion

The current country value is teacher-entered free text, and there is no trusted country on the student, guardian or approved teacher profile. Therefore a database cannot reliably decide whether a student is in the same country as a classroom or whether a proposed collaboration is cross-border. Adding a `network_type` label alone would not enforce a real country boundary.

The existing Family Network is represented by guardian relationships. Local School and International Network remain intended product categories, not separate enforced database network types. Do not use real cross-border student data on the assumption that the current screens enforce country boundaries.

### Safe next implementation sequence

1. Decide the authoritative country source and verification process for approved school/teacher accounts. A teacher-entered country string alone must not be treated as verified.
2. Decide whether local-school access should be limited by the verified country of the learner's guardian, the school, or both.
3. Define international collaboration as an explicit school-to-school partnership, with approval from both approved teacher/school accounts and active guardian consent for each participating learner.
4. Only then add normalized country fields, network/partnership records, RLS checks and positive/negative tests. Keep old classroom rows unclassified until their country and ownership are reviewed.
5. Review whether the current global guardian link is intended to authorize every future classroom membership or whether consent must be recorded separately per classroom.

No schema, RLS policy, classroom, guardian relationship or membership was changed during this audit.


## 15. Guardian-consent rate-limit migration review — 26 November 2026

The pending migration `supabase/migrations/20261120_rate_limit_guardian_consent_codes.sql` has been reviewed against the live function, privileges and existing indexes. A controlled apply procedure and rollback plan are documented in [GUARDIAN_CONSENT_RATE_LIMIT_REVIEW_2026-11-26.md](GUARDIAN_CONSENT_RATE_LIMIT_REVIEW_2026-11-26.md).

The migration is **not applied**. The live database still has no issuance-counter table and the current code-generation function has no three-per-hour rate limit. Production application requires the owner's explicit approval. No consent codes, guardian links, classroom memberships or learner records were changed during review.

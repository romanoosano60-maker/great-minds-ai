# Great Minds AI — Owner Actions and Final Test Checklist

Last checked: 9 November 2026

This file lists only actions that still need the project owner or a real-device test. Source code and database configuration can be prepared from the connected tools, but a static code review cannot sign in as a real family, hear Android audio, or submit an app to an app store.

## 1. AI Teacher — live endpoint verification

**Prepared and deployed**
- Supabase Edge Function `ai-teacher` is ACTIVE at version 4, with JWT verification enabled.
- `ai-teacher-config.js` points the website to the project's Supabase Edge Function URL.
- `ai-teacher.html` obtains the signed-in Supabase access token and sends the selected subject, teaching language, question and recent text turns.
- The deployed function verifies the account, permits approved teachers or accounts with an active guardian relationship, applies database-enforced daily usage limits (10 requests per account and 100 requests service-wide, UTC day), and calls the OpenAI Responses API with `store:false`.
- The function's instructions include child-safety boundaries and avoid sending profile identifiers or contact details to OpenAI.
- `cloudflare/worker.js` remains an alternative source template; it is not the endpoint currently configured by the website.

**Owner actions**
1. Open the AI Teacher page: `https://romanoosano60-maker.github.io/great-minds-ai/ai-teacher.html`.
2. Sign in using an approved teacher test account, or a student test account with an active guardian relationship. Use adult-controlled test accounts only.
3. Select Mathematics and ask: “What is 8 + 7? Please show the steps.” Confirm the answer is generated live, follows the selected subject and appears in the reply area.
4. Tap Listen and test the microphone separately on Android. Check that the selected language voice is available; browser speech quality depends on installed device voices.
5. If available, repeat with an account that is not an approved teacher and has no active guardian relationship. Confirm access is rejected.
6. Do not share an OpenAI secret or a child's personal information in chat. The OpenAI secret must remain in Supabase Function Secrets.

**Not complete until:** a real authenticated test receives a live AI answer, an unauthorised test is rejected, and Android microphone/playback are checked. The function's secret values are not readable through this audit, so their presence is not independently confirmed.

**Security review item requiring owner approval**
- Supabase Security Advisor flags `private.ai_teacher_daily_usage` because Row Level Security is disabled. The table currently has zero rows, and this audit found no direct table grants to `anon` or `authenticated`; however, the finding should be resolved deliberately.
- **Completed 9 November 2026 with owner approval:** `ALTER TABLE private.ai_teacher_daily_usage ENABLE ROW LEVEL SECURITY;`
- Re-tested `public.consume_ai_teacher_quota()` as the `authenticated` database role with a simulated JWT subject inside a transaction that was rolled back. It returned `allowed: true`, `user_remaining: 9`, `service_remaining: 99`.
- Verified RLS is enabled, no client-facing policies exist, and `anon` and `authenticated` have no direct SELECT or INSERT privileges on the private usage table. This is intentional: quota access is through the `SECURITY DEFINER` function owned by `postgres`.
- Security Advisor no longer reports RLS disabled. It now reports an informational `RLS Enabled No Policy` notice for this private table; that is expected because clients must not access it directly. Leaked Password Protection remains a separate warning.
- A separate Supabase Auth warning remains: Leaked Password Protection is disabled. Enable it in Auth password/security settings if the current plan supports it.

## 2. International classrooms — real account and consent test

**Database state checked**
- Seven public tables exist and all seven have Row Level Security enabled: classrooms, teacher_profiles, classroom_members, guardian_relationships, student_learning_progress, homework_assignments, homework_submissions.
- Realtime publication includes classrooms, classroom_members, homework_assignments, homework_submissions and student_learning_progress.
- Current row counts: 1 classroom, 1 teacher profile, 1 active guardian relationship, 0 classroom memberships.
- No real student progress, homework assignments or homework submissions exist yet.

**Database correction applied and rollback-tested**
- Migration `20261105081455_fix_guardian_consent_revocation_result` has since been applied and rollback-tested, according to `DATABASE_SECURITY_VERIFICATION_2026-11-05.md`. The live function now reports success only when an active guardian link was actually revoked and blocks the linked student's classroom memberships. No further application of this migration is required.

**Owner actions**
1. In Supabase Auth, create/use adult-controlled test accounts for one approved teacher, one student, and one parent/guardian. Do not use a real child's personal details during testing.
2. Verify the guardian account's email and complete the explicit guardian-consent process on the International Classroom page.
3. Sign in as the student, request to join the existing test classroom using its code, and confirm the request remains pending until approval.
4. Sign in as the approved teacher and approve the consented membership.
5. Open the same classroom from the student account and verify it appears.
6. Revoke guardian consent in the guardian account and verify that the student can no longer submit new classroom work or use consent-gated features.

**Security setting still outstanding**
- Supabase Security Advisor currently reports **Leaked Password Protection Disabled**. Enable it in Auth password/security settings if the current Supabase plan supports it. Supabase documents this feature as available on Pro plan and above. If the project plan does not include it, record that limitation and do not assume it is enabled.

**Not complete until:** teacher, student and guardian flows pass with real authenticated sessions and the revoke path is tested.

**Additional database migration applied and rollback-tested**
- Migration `20261105081504_enforce_homework_submission_score_max` has since been applied and rollback-tested, according to `DATABASE_SECURITY_VERIFICATION_2026-11-05.md`. The database trigger rejects marks above an assignment's `max_points`; the browser helper also validates the maximum.

## 3. Student progress and homework — cross-device test

**Prepared in GitHub and Supabase**
- Subject quiz pages use the shared authenticated progress helper where integrated.
- The Student Profile has a cloud progress viewer and now offers a consent-gated cloud save when a quiz score is manually recorded there. The local profile history remains available if cloud saving is not authorised; manual homework completion is not uploaded as verified homework.
- Secure homework tables, client helper and separate cloud workflow are present.
- Older local-demo tabs remain local-device demonstrations and must not be mistaken for cloud records.

**Owner actions**
1. With the consented student test account, complete one quiz on a subject page and confirm the page reports that the cloud save succeeded.
2. Open the Student Profile / Connected Progress page and confirm that same result appears from Supabase.
3. Sign in as the linked guardian on a different browser/device and confirm the permitted progress is visible.
4. As the approved teacher, publish a test assignment to the classroom.
5. As the student, submit a short fictional answer.
6. As the teacher, mark the submission and add feedback.
7. As the guardian, confirm the assignment, answer, mark and feedback are visible.
8. Repeat a read on a second device to verify Realtime updates, not just local browser storage.

**Not complete until:** progress insert/read and homework publish/submit/mark/guardian-read all succeed under separate authenticated accounts on separate devices.

## 4. Graphics, audio and full app test

- Open the 3D Learning Graphics Gallery on the Android phone and confirm all embedded images display.
- Test English ABC, Twinkle Twinkle and Counting Song. Confirm both the beat and spoken words are audible. The current voice uses the phone/browser's speech voice; it is not a recorded singer.
- Tap every main home-screen tile and every dashboard link. Report any blank page, 404, missing image or button that does nothing.
- Test the app on a second screen size if available.

## 5. Business, privacy and publishing

- Confirm publisher/legal name, support contact, target age range and countries of operation.
- Confirm the actual data collected, third-party processors, retention, deletion and parent-consent procedures; then obtain appropriate privacy/legal review. The repository privacy document is a working draft, not a final policy.
- Decide whether subscriptions will exist and, if so, set prices and cancellation/refund terms.
- Prepare app icon, screenshots, store descriptions, age/content ratings and support website.
- Choose and complete a native Android/iOS packaging route. GitHub Pages alone is not a Play Store or Apple App Store submission.
- Complete Google Play Families / Apple Kids and privacy declarations accurately before submission.

## Current safety boundary

Do not enable child-to-child messaging or open international chat until account verification, guardian consent, membership approval, moderation/reporting, adult escalation, retention and deletion processes have been reviewed and tested.


## 6. Additional source audit — 5 November 2026

- Rechecked the international classroom account, guardian-consent, join-request, teacher-approval and realtime-refresh handlers. A duplicate fallback in consent-code response handling was removed from `international-classrooms.html`.
- Rechecked `homework.html` and `student-cloud-homework.js`: cloud homework is separate from the local role-play tabs; user-entered answers and feedback are inserted into the page with text nodes/textContent rather than interpreted as HTML. Database RLS remains the access-control boundary.
- Rechecked the AI Teacher Worker source: it restricts requests to the GitHub Pages origin, verifies the Supabase bearer token, requires an active guardian relationship, applies per-user rate limiting, bounds question/history input, and keeps the OpenAI key server-side. It remains a source template until deployed and tested.
- Rechecked lesson-page cloud progress integration. The main subject quiz pages and extra subject quiz pages use the shared cloud progress helper. Advanced Learning, selected Games, Reading/Writing story quizzes, and Vocabulary word-practice completion now have selected cloud-save paths. Writing text, local stars/wins, and certificate/reward summaries remain device-local; these modules are not fully cloud-synchronised.
- Confirmed `ai-teacher-config.js` is deliberately blank until a real Worker URL is deployed. No secrets were added to frontend files.
- Remaining live tests are unchanged: real separate-account classroom/consent journey, cross-device progress/homework, Android microphone/audio, Worker deployment and safe AI test, full device navigation, privacy/legal approval, and native store packaging.


## Owner test additions — cloud progress pages

After the approved student and guardian test accounts are ready, test the new save paths:
1. Complete one Advanced Learning five-question check-in while signed in as the consented student. Confirm the page says the cloud score was saved.
2. Complete one Math, Word Wizard, Science and Memory game. Confirm each completed score reports a successful cloud save. Local stars/wins remain local-only.
3. Complete both Reading and Writing story questions. Confirm the quiz score syncs, while the writing text remains on the device.
4. Open Connected Progress using the same student account and confirm the new rows appear. Then check permitted guardian visibility from a separate browser/device.
5. Repeat once while signed out or without guardian approval and confirm the page clearly reports that the score stayed local.

These new integrations passed source-level JavaScript syntax checks but are not considered complete until the authenticated live tests above pass.


## Additional GitHub-only improvement — Vocabulary privacy and progress

- `vocabulary.html` now loads the existing authenticated progress helper and offers a cloud record for a completed word-practice activity.
- The selected word's completion is recorded at most once per browser profile; the child's sentence text is never included in the cloud request or stored by this feature.
- This is a selected activity sync path, not full vocabulary or writing synchronisation. It still requires the approved student/guardian live test listed above.


## Additional GitHub-only improvement — Student Profile quiz progress

- `student-profile.html` now attempts a secure progress insert when a quiz result is recorded, using the shared authenticated helper and a 0–100 score validation.
- The page clearly reports whether the result was saved locally only or also confirmed in cloud progress, and temporarily disables the quiz-save button while the cloud request is in flight to reduce accidental duplicate taps. Manual self-marked homework remains local and is not represented as teacher-verified cloud homework.
- Live verification still requires the approved student sign-in and guardian consent test; no cloud success is assumed from the source change alone.


## Additional GitHub-only improvement — secure homework form resilience

- The secure classroom homework form now marks its required fields explicitly and validates the classroom ID and whole-number score maximum before sending a request.
- Publishing is temporarily disabled while the request is in progress to prevent duplicate taps; the button is restored after success or failure.
- Missing cloud helper, sign-in lookup failures, assignment-list failures, submission-list failures and membership-check failures now produce safe status messages instead of leaving the user with an unhandled page error.
- These are frontend safeguards only. Supabase authentication and Row Level Security remain the authority for who may publish, view, submit and mark work; no live classroom workflow is claimed until separate-account testing passes.
- Latest homework.html inline JavaScript syntax check passed.


## Additional GitHub-only improvement — AI Teacher language preference

- The AI Teacher now remembers the selected teaching/greeting language in this browser and restores it on the next visit. The preference stays on the device; it does not create a cloud profile record.
- Unsupported or invalid stored language values fall back to English. Live AI answers and voice quality still require the separate backend and Android/browser tests.
- Latest AI Teacher inline JavaScript syntax check passed.


## 2026-11-06 assistant-side source repairs (not owner tasks)

- Added homepage narration limited to the introduction, a Stop Voice control, and reduced-motion-aware Start Learning navigation.
- Added Stop Voice controls to English, Vocabulary, Dictionary, Home Science, Computer Studies, General Knowledge and all five extra practice pages.
- Added a shared Stop Voice control to the language toolbar for pages without their own dedicated stop control.
- Re-fetched the updated files and verified the controls and speech-cancellation handlers in source. These repairs do not replace the Android audio, voice, navigation, graphics or cross-device tests listed above.


## 2026-11-10 autonomous engineering review

### Completed without requiring the owner

- Rechecked Supabase Security, Performance and Health Advisors. Health has no findings.
- Confirmed three `RLS Enabled No Policy` notices: `private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`. These are intentionally not directly client-accessible; do not add permissive policies just to silence the informational notices.
- Confirmed the remaining Auth warning is Leaked Password Protection Disabled. It is plan-gated in this project; no upgrade or purchase was made.
- Confirmed the performance advisor still reports five unused-index notices and two sets of multiple permissive SELECT policies. No indexes or policies were removed or merged because low traffic and different access roles do not establish that those changes are safe.
- Re-fetched the deployed `account-deletion-request` function: ACTIVE version 4, JWT verification enabled. It accepts eligible adult requests for manual review only; it does not automatically delete accounts or child data.
- Re-fetched the deployed `ai-teacher` function: ACTIVE version 4, JWT verification enabled. Live authenticated AI answers, secret presence and Android audio still need owner/device testing.
- Hardened classroom calling: the token function now rejects any LiveKit URL that is not `wss://`; the insecure `ws://` fallback was removed. The matching GitHub source was committed and the Supabase Edge Function deployed as ACTIVE version 5 with JWT verification enabled.
- Re-fetched both GitHub source and deployed function to verify the WSS-only guard is present. This is a configuration/code hardening check, not a successful LiveKit call test.
- Updated `ACCOUNT_DELETION_WORKFLOW.md` to reflect deployed version 4.

### Owner/device work still required

1. Confirm the LiveKit secrets are configured in Supabase Function Secrets (never send the secret values in chat), then test teacher start, student join, guardian observer, teacher end, and unexpected teacher disconnect using adult-controlled test accounts.
2. Run the separate student/guardian/teacher classroom and homework flow on real accounts and a second device.
3. Test an authenticated AI Teacher answer and an unauthorised-account rejection; then test Android microphone and playback.
4. Decide launch territories and obtain qualified child-privacy/legal review before finalising guardian verification, retention and deletion rules.
5. The Pro-only leaked-password protection remains pending until the owner chooses whether to upgrade.

No database policies, indexes, student records, classroom records, or account data were changed during this review.

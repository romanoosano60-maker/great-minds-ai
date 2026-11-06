# Great Minds AI — Owner Actions and Final Test Checklist

Last checked: 6 November 2026

This file lists only actions that still need the project owner or a real-device test. Source code and database configuration can be prepared from the connected tools, but a static code review cannot sign in as a real family, deploy a Cloudflare Worker, hear Android audio, or submit an app to an app store.

## 1. AI Teacher — deploy and verify the secure endpoint

**Prepared in GitHub**
- `cloudflare/worker.js` contains the POST `/ask` endpoint and GET `/health`.
- The Worker verifies the Supabase access token, checks an active guardian relationship, limits requests per user, accepts nine approved subjects and twelve teaching languages (including Hindi, Bengali, Tamil, Telugu and Marathi), and calls the OpenAI Responses API with `store:false`.
- `ai-teacher.html` can call the endpoint when configured.
- `ai-teacher-config.js` is intentionally blank until the real Worker URL is known.

**Owner actions**
1. Open the existing Cloudflare Worker `great-minds-ai-backend`.
2. Deploy the current source from `cloudflare/worker.js` (latest GitHub source includes the five added Indian teaching languages).
3. Add the secret `OPENAI_API_KEY` in Cloudflare Secrets. Never put it in GitHub or browser code.
4. Add variables `SUPABASE_URL=https://ryuchmmnyjyldwouidy.supabase.co`, `SUPABASE_PUBLISHABLE_KEY` (public publishable key only), and `OPENAI_MODEL=gpt-5.4-mini`.
5. Add the `AI_RATE_LIMITER` binding required by the Worker source.
6. Test `GET /health`, then configure the actual deployed Worker URL ending in `/ask` in `ai-teacher-config.js`.
7. Test with an adult-controlled student test account that has an active guardian relationship. Confirm the chosen subject is included in the answer, unauthorised accounts are rejected, and rate limiting works.

**Not complete until:** Worker deployment, health check, configured frontend URL, and a successful consented test request are all verified.

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

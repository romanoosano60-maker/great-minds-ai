# Great Minds AI — Owner Actions and Final Test Checklist

Last checked: 19 November 2026

## Additional learning-flow coverage — 19 November 2026

Further reliability changes were committed:

- Story Studio comprehension now keeps a stable score operation ID and offers a retry button after an unconfirmed cloud save.
- Adaptive Learning check-ins now use a stable operation ID per completed check-in and provide a retry path.
- Home Science's five-question quiz now uses a stable operation ID and retryable cloud save; its device-local demo history remains separate from confirmed cloud progress.

No learner text, story writing, voice recording or other free-form child content was added to cloud score records by these changes. Only quiz score metadata is passed to the progress helper.

## Further score-save reliability work — 19 November 2026

Additional source changes were committed after the previous batch:

- General Knowledge quiz now uses a stable per-attempt operation ID, prevents duplicate answers, and exposes a retry action when cloud confirmation fails.
- Vocabulary challenge now keeps a stable operation ID through retries, reports device-local versus cloud-saved status, and handles storage/cloud failures without losing the visible result.
- English alphabet reading quiz now has a retryable cloud-save path.
- Learning games now keep a stable operation ID for each game run and offer a retry action; this applies to quiz games and Memory Match.
- Reading and Writing comprehension quiz now retains its save ID for retries and resets it only for a new attempt.

These remain source-level improvements. No new Android runtime, cross-account privacy, or live Supabase save pass is claimed. Pages with older cloud-save calls still need review; a repository search is a triage aid and not proof that every result path has been exhaustively tested.

## Additional engineering batch — 19 November 2026

The following source improvements were committed after the initial handoff review. They are source changes, not Android or live-account acceptance passes:

- Added stable operation IDs and retry buttons for failed cloud progress saves in Guided Research, English More Practice, Social Studies Foundations, Computer Studies Basics, the Social Studies main and expanded challenges, Connected Practice, and the Beginner/Pro/Advanced level challenge component used across subject pages.
- Improved `student-cloud-progress.js` validation and duplicate-record matching, including correct-answer and question-count fields.
- Earlier in this work session, the five extra-practice pages (Mathematics, Science, Computer Studies, Social Studies and English) were given clearer cloud-save status and retry behaviour.
- Corrected the AI Teacher readiness page: the active backend is Supabase Edge Function version 8, not the obsolete Cloudflare `POST /ask` route. Required secret names and the outstanding 503/502 end-to-end issue are now described accurately.
- Refreshed Supabase and classroom checklists to distinguish existing project setup and owner-reported classroom success from independent role/privacy tests.
- Added direct links from legacy local-only Parent and Teacher demos to their separate connected dashboards.

Verification boundary: repository static checks can confirm source structure and syntax, but they do not prove that Supabase secrets are present, that cloud inserts succeed, that role isolation is correct at runtime, or that the pages work on the Samsung Android device. The eight individual acceptance pages remain separate evidence tasks; demo checklist ticks are not live tests.

## Current engineering handoff — 19 November 2026 (historical detail below is date-labelled)

The following are the current deployed backend versions recorded in the latest source/deployment audit. Older version numbers in dated historical notes below describe earlier checkpoints and are not current:
- AI Teacher: ACTIVE version 8; JWT verification enabled.
- Classroom call token: ACTIVE version 9; JWT verification enabled; WSS-only LiveKit endpoint and server-side consent/membership checks.
- Account deletion request: ACTIVE version 7; JWT verification enabled; request-only, not automatic deletion.
- AI Teacher frontend is configured for the Supabase Edge Function. The Cloudflare `/ask` Worker is an older alternative template and is not the active frontend route.
- The OpenAI secret's actual value/presence cannot be read during this audit. Do not paste secrets into chat or browser code. A successful authenticated AI response has not yet been confirmed.

**One consolidated owner/device test session**
1. AI Teacher: sign in with an approved adult-controlled teacher account; ask a Mathematics question and confirm a live generated answer. Repeat with an unrelated account and confirm it is denied.
2. AI Teacher voice: test English and one other selected language; test microphone permission, speech-to-text, Listen, Stop, switching language, leaving the page and returning. Confirm no voice or microphone continues in the background.
3. English and Vocabulary: test individual words, example sentences, alphabet/ABC, story narration and every song; stop audio and navigate away while audio is active.
4. Subject audio: test Read/Stop on the 20 reviewed core subject/extension pages, including language selection. Confirm the chosen language is spoken and no unrelated-language fallback occurs.
5. Classroom calling: verify teacher start/end, student join only after approved membership and active guardian consent, guardian observer, microphone/camera OFF until opted in, permission-denial cleanup and unexpected teacher disconnect.
6. Classroom and learning records: use separate adult-controlled teacher, student and guardian accounts; test join request, approval, consent revocation, one quiz progress save, homework publish/submit/mark, guardian visibility and a second-device refresh.
7. Home/navigation/graphics: check all home tiles, dashboard links, 3D gallery and picture library on Android; record any 404, blank page, missing image or unresponsive control.
8. Account/privacy: verify password and session behaviour, guardian access boundaries, deletion-request wording and that a request is not represented as completed deletion. Do not use real child personal data.

**Not owner tests:** the source-level audio lifecycle fixes, 56-page local-reference check, exact duplicate-file check, targeted rendering-safety review, Supabase RLS/privilege checks and backend request hardening have been reviewed from source/live configuration. These do not replace the device/account tests above.

**Packaging status:** no Capacitor, Android project, package manifest or web-app manifest was found by the current repository code search. Android packaging has not started; choose the packaging route after the GitHub web app passes the final audit. GitHub Pages itself is not an installable Play Store package.


This file lists only actions that still need the project owner or a real-device test. Source code and database configuration can be prepared from the connected tools, but a static code review cannot sign in as a real family, hear Android audio, or submit an app to an app store.

Recent source repairs require an installed matching language voice rather than silently substituting a different language, and stop microphone recognition when AI Teacher or Advanced Learning is hidden or unloaded. Android verification remains outstanding.

## 1. AI Teacher — live endpoint verification

**Prepared and deployed**
- Supabase Edge Function `ai-teacher` is ACTIVE at version 6, with JWT verification enabled (latest deployment rechecked 10 November 2026).
- `ai-teacher-config.js` points the website to the project's Supabase Edge Function URL.
- `ai-teacher.html` obtains the signed-in Supabase access token and sends the selected subject, teaching language, question and recent text turns.
- The deployed function verifies the account, permits approved teachers or accounts with an active guardian relationship, applies database-enforced daily usage limits (10 requests per account and 100 requests service-wide, UTC day), and calls the OpenAI Responses API with `store:false`.
- The function's instructions include child-safety boundaries and avoid sending profile identifiers or contact details to OpenAI.
- `cloudflare/worker.js` remains an alternative source template; it is not the endpoint currently configured by the website.

**Owner actions**
1. After confirming the live GitHub Pages origin, open AI Teacher at that published origin. The conventional `romanoosano60-maker.github.io` address has not been independently verified and must not be treated as a confirmed deployment URL.
2. Sign in using an approved teacher test account, or a student test account with an active guardian relationship. Use adult-controlled test accounts only.
3. Select Mathematics and ask: “What is 8 + 7? Please show the steps.” Confirm the answer is generated live, follows the selected subject and appears in the reply area.
4. Tap Listen and test the microphone separately on Android. Check that the selected language voice is available; browser speech quality depends on installed device voices.
5. If available, repeat with an account that is not an approved teacher and has no active guardian relationship. Confirm access is rejected.
6. Before using Speak question, review the browser/device speech-recognition provider privacy settings. Recognition may send microphone audio to that provider; Great Minds receives recognized text only if it is submitted as a question. Confirm the microphone stops when navigating away from the page.
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
- Latest live row counts checked 10 November 2026: 2 classrooms, 1 teacher profile, 1 active guardian relationship, 0 classroom memberships, 3 student-learning-progress rows, 1 homework assignment, and 0 homework submissions.
- These counts confirm that some test/demo records exist, but do not prove that a real student joined with guardian consent or completed the full homework workflow. Treat the 3 progress rows and 1 assignment as unverified test data until the owner confirms their origin.

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
- Historical Cloudflare Worker source was reviewed as an alternative template only. It is not the active website route; the current frontend uses the deployed Supabase `ai-teacher` Edge Function v6. Live approved/unauthorised account tests and Android speech tests remain open.
- Rechecked lesson-page cloud progress integration. The main subject quiz pages and extra subject quiz pages use the shared cloud progress helper. Advanced Learning, selected Games, Reading/Writing story quizzes, and Vocabulary word-practice completion now have selected cloud-save paths. Writing text, local stars/wins, and certificate/reward summaries remain device-local; these modules are not fully cloud-synchronised.
- Current `ai-teacher-config.js` points to the Supabase Edge Function. No AI provider secret is embedded in the browser source; actual server-side secret presence cannot be independently read during this audit.
- Remaining live tests: real separate-account classroom/consent journey, cross-device progress/homework, approved and rejected AI Teacher account requests, Android microphone/audio, full device navigation, privacy/legal approval, and native store packaging. The Cloudflare Worker is not a required deployment path for the current website.


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


## Additional owner test checklist after 10 November security repairs

### Guardian-consent enforcement repair
- The teacher UPDATE policy requires `parent_consent_status='approved'` before membership can be approved. Authenticated clients can update `membership_status` but cannot update `parent_consent_status`; only the guardian-consent server-side RPC sets that field after validating the one-time code and active relationship.
- The classroom-call token service independently checks the student's active guardian relationship before issuing a student token.
- During the owner-led test, confirm a student without a guardian link cannot be approved for classroom participation or receive a call token; after a guardian link is active, teacher approval should allow access; after consent is revoked, further calls must be denied.
- The live call-token function is now ACTIVE version 6 with JWT verification. Its source and deployed version were rechecked.

### AI Teacher request-header repair
- The AI Teacher browser request now sends the Supabase publishable `apikey` header as well as the user's signed-in bearer token. Test one allowed account and one unrelated account. The backend remains ACTIVE version 4 with JWT verification.
- Do not share the OpenAI key, Supabase service-role key, LiveKit API secret, passwords or access tokens.

### Repository audit result
- 56 HTML pages checked for local file references: no missing local `href` or `src` targets found.
- 195 tracked files compared by exact Git blob SHA: no exact duplicate files found. Similar-looking demo/connected/redirect pages are intentionally different and were retained.
- The latest Pages workflow for commit `4bca9d69c03090727974d5a9538e385a2c9d17e7` completed successfully. The later status-documentation commit does not change application code.
- All 11 inspected application tables have RLS enabled; no direct anon table privileges were found. The three no-policy advisor notices are intentional closed tables.


### Duplicate index cleanup
- Removed the redundant classroom-code unique index. The retained `classrooms_classroom_code_unique` index still enforces case-insensitive, trimmed uniqueness. No classroom rows were changed.
- A fresh structural comparison found no remaining duplicate public index definitions.
- No owner action is needed for this cleanup.


### Teacher dashboard policy repair
- Teacher homework read/mark and student-progress read policies now use approved classroom membership plus the protected guardian-consent status. They no longer require teachers to read private guardian-link rows.
- Direct student/guardian operations retain their own active-link checks. Authenticated users cannot update the consent-status column; it is controlled by the guardian-consent RPC.
- Test as a teacher account that is not itself a guardian: confirm it can view and mark work for an approved, consented classroom student, but cannot access an unrelated student's work.


## Audio follow-up — Android verification still required
- After the latest GitHub Pages deployment, open `english.html` and `vocabulary.html` on Android. Start a vocabulary word, tap Stop, then quickly leave the page; confirm no delayed voice starts. Start each English song, switch apps or navigate away, then return; confirm the music and narration have stopped. Repeat with the phone screen locked if practical.
- Confirm individual word, example sentence, alphabet, story, speaking and song playback on the installed English voice. Source fixes do not prove that the device has an English voice installed or that GitHub Pages has deployed the latest commits.


### AI Teacher microphone privacy check — added 10 November 2026
- Read the notice on the published AI Teacher page before enabling the microphone.
- Confirm it explains that browser/device speech recognition may be processed by that provider and that Great Minds receives recognised text only after Ask Teacher is tapped.
- On Android, review the browser/device speech-recognition privacy settings. Do not speak passwords, names, addresses, school details, phone numbers or other private information.
- Confirm the wording is visible on the deployed page; the source update alone does not verify Pages deployment.


## Additional verified backend/security checks — 10 November 2026

Engineering has now completed a read-only review of live Edge Function source, database policies and security-definer RPC definitions.

### Verified from live source/database
- AI Teacher v6, classroom-call-token v7 and account-deletion-request v5 are ACTIVE; deployed function source exactly matches the current GitHub source and JWT verification is enabled.
- Classroom call access is limited to the approved owning teacher, an approved student with an active guardian relationship and approved membership, or a linked guardian observer with approved membership. Only the teacher can start/end. Student/guardian join is blocked unless the teacher is present. Guardian tokens cannot publish.
- Camera and microphone start OFF in the browser call page. Leaving the page disconnects the local room. Teacher departure disconnects supervised participants.
- Guardian consent requires a verified signed-in account, explicit confirmation and a one-time code; this is an account declaration, not independent legal identity verification.
- AI Teacher quotas are enforced in the database: 10 requests per account per day and 100 total per day.
- Account deletion is request-only/manual review; it does not delete Auth accounts or student learning data.
- Live RLS policy definitions were inspected. No broad policies were added to private tables.
- At this database snapshot there are 0 classroom membership rows and 0 homework submission rows. Repeat cross-device tests with controlled test accounts; do not interpret this snapshot as disproving the user's earlier test report.

### Owner/device acceptance still required
1. Verify LiveKit secret configuration is present in Supabase (do not copy or share secret values).
2. Test teacher start, student join, guardian observer, unauthorized account denial, teacher end and disconnect on separate devices.
3. Test parent consent approval and revocation, then verify the student's classroom access is blocked after revocation.
4. Test homework assignment → student submission → teacher marking → parent visibility across accounts.
5. Test adult account-deletion request and document the manual completion/retention procedure.
6. Check leaked-password protection in Supabase Auth; currently disabled in the security advisor snapshot.
7. Verify the public GitHub Pages deployment and then complete Android device testing.

No production schema, RLS policy, secret, account or user data was modified in this audit.


## Password and account-flow source audit — 2026-11-10

- Reviewed the sign-in and account creation flows in `international-classrooms.html`, `connected-dashboards.html`, `connected-parent.html` and `connected-teacher.html`.
- Repaired all four flows so password fields are cleared in a `finally` path after successful, rejected or interrupted sign-in attempts. Re-fetched each file after commit and confirmed the cleanup code is present.
- New test-account creation checks for at least 8 characters in the browser. This is only the client-side minimum check; the effective Supabase Auth password policy still needs owner verification in project settings.
- No in-app password reset or password-change flow was found in the reviewed pages. Add and test a secure email reset/change journey before public launch; configure its allowed redirect URL deliberately.
- Supabase Leaked Password Protection remains disabled and plan-gated in the current security-advisor snapshot. This is an outstanding hardening item, not a reason to weaken or bypass RLS.
- Account deletion remains a verified-adult request and manual-review workflow only. It does not currently delete the Auth account, revoke every device session, or erase learning records automatically. The retention and classroom-transfer procedure must be approved and tested before processing real requests.
- No password, service-role key, provider secret, user account or production database policy was changed during this pass.


- Additional legacy connection test page `supabase-connect.html` audited on 2026-11-10: password now clears after every login attempt; the Clear test session button now attempts Supabase Auth sign-out before reporting completion. The page was re-fetched and both changes confirmed.


## Final consolidated audit pass — 2026-11-10

- Added `ENGINEERING_HANDOVER_2026-11-10.md` as the consolidated engineering record, including verified work, current live backend evidence, security-advisor findings, honest feature boundaries, deployment/Android gaps, and the single owner acceptance sequence.
- Additional password edge cases fixed after the earlier role-page pass: Student Dashboard now clears the password on network/auth errors and service-unavailable exits, and on sign-out; Teacher Dashboard now clears the password if the cloud service is unavailable and on sign-out. Both files were re-fetched after commits and verified.
- Confirmed `homework.html` and `student-cloud-homework.js` exist in the current main-branch tree. The secure cloud homework area is separate from local demo tabs.
- Rechecked the current Supabase advisor snapshot: health has no findings; security has three restricted RLS/no-policy notices and leaked-password protection disabled; performance has five unused-index notices and two multiple-permissive-SELECT-policy notices. No broad policy changes or index removals were made.
- Rechecked the deployed Edge Function inventory: AI Teacher v6, classroom-call-token v7 and account-deletion-request v5 are ACTIVE with JWT verification enabled.
- Rechecked the repository tree: 202 tracked files. No Android project, Capacitor config, package manifest, web-app manifest or service worker is present. Public GitHub Pages deployment remains unconfirmed.
- Source changes are not a substitute for Android/runtime tests. Keep deployment, live backend, owner acceptance, and launch readiness as separate completion measures.


## Second source/privacy review — 10 November 2026

- Found and fixed a parent-dashboard sign-out display gap: cloud homework answers/feedback remained rendered after sign-out even though cloud progress was cleared. The current handler now clears both panels and the password field immediately, resets local user state, removes the Realtime channel and attempts Supabase Auth sign-out. Source was re-fetched and verified.
- Student Profile's local-history button now clearly states its limited scope: it clears only the V2 homework/quiz history on this device, not nickname, other local demo data, or Supabase cloud records.
- Spot-checked dynamic HTML rendering in connected dashboards: parent/student cloud data is escaped before HTML insertion; teacher cloud records are rendered with textContent. Dictionary rendering uses its bundled fixed word list. Local role-play pages continue to warn that they are not secure accounts and must use fictional data.
- Reconciled historical AI Teacher and secure-homework notes in the Master Guide. Current live status is in the 10 November authoritative sections; the old Cloudflare Worker endpoint is not the active website route.


## Sign-out privacy hardening across role pages — 10 November 2026

A broader pass found the same asynchronous sign-out/display issue could affect other role pages if Realtime channel cleanup failed before the auth sign-out call. The sign-out sequence has now been standardised in:
- Parent Dashboard: clears progress and homework/feedback panels.
- Student Dashboard: clears cloud learning-history panel.
- Teacher Dashboard: clears student progress and homework submission panels.
- International Classrooms: clears classroom/request details, consent code and consent checkbox.

All four pages now clear visible private data and the local signed-in page state immediately, attempt Supabase Auth sign-out independently, and attempt Realtime channel removal separately so a channel-cleanup failure does not prevent the sign-out request. Password fields are cleared as part of sign-out. All four updated files were re-fetched and the relevant handlers source-verified. Actual session invalidation under offline/network-failure conditions still needs owner testing.


## Automated static checks added — 10 November 2026

- Added scripts/static-audit.mjs to check local href/src references across HTML pages and parse standalone JavaScript files with Node.js.
- Added .github/workflows/static-audit.yml to run these checks on pushes and pull requests to main.
- The workflow and script were re-fetched from GitHub after commit. No commit status result is visible through the available status interface, and the available workflow-run lookup only reports pull-request-triggered runs; push-triggered execution has therefore not been independently confirmed. The automated check is installed in source, but no passing CI result is verified. Do not report it as a successful build until a run completes.


## Secure Homework Manager sign-out — 10 November 2026

- The secure cloud homework panel previously had no sign-out control of its own, even though it could display assignments, student answers and teacher feedback from the signed-in Supabase session.
- Added a dedicated cloud sign-out button. It clears the secure homework results immediately, attempts Supabase Auth sign-out, then removes the Realtime channel independently. The notice explicitly states that signing out does not delete homework or learning records.
- The updated Homework Manager was re-fetched and the button, scope notice and handler were source-verified. Live Android/session testing remains outstanding.

### New owner verification — sign-out during loading
The Student, Parent, and Teacher cloud dashboards now discard in-flight cloud results if sign-out occurs before a database request finishes. During the final Android acceptance pass, sign in to each role, start a refresh on a slow connection, and sign out before it finishes. Confirm the private progress/homework panels stay cleared. This source repair has not yet been runtime-tested on the device.
Additional follow-up: the same stale-response guard was added to `international-classrooms.html`. Classroom refreshes now discard in-flight classroom/member/guardian-link results if the account signs out or the auth session changes. Re-fetched the file and verified request-generation guards and logout/auth-state invalidation. Owner device testing remains required.


## 2026-11-10 follow-up — cross-tab sign-out privacy
- Student, Parent, and Teacher connected dashboards now listen for Supabase `SIGNED_OUT` events, including sign-out initiated from another page or browser tab. They clear private cloud panels, invalidate in-flight reads, and remove their Realtime channel.
- Homework Manager now does the same for its secure cloud assignment/submission panel. Its async refresh is guarded by a request generation so a response started before sign-out cannot repopulate the panel afterward.
- The four updated pages were fetched again from GitHub and the listener/request guards were verified in source. This is a source-level repair; separate-device/browser behavior and the deployed Pages build still require owner testing.
- Latest relevant repair commit: `9137ad969847859b7903e8f6ca21e970c41f5dfd` (Homework Manager); dashboard commits: `0edd47b3937028ace1aebac1383d804ec1093486`, `d4a0b53b64b360a5799e569f33ab839b4f492cda`, `b7c3340db40d663c2bd1cfbfb7ad765be1067269`.
- GitHub combined status and the available workflow-run lookup returned no results for the latest commit; do not count CI or deployment as passed.


## 2026-11-10 follow-up — AI Teacher session privacy and account recovery
- AI Teacher now listens for Supabase `SIGNED_OUT`. It clears the in-memory conversation and last answer, stops speech playback and microphone recognition, and invalidates any live answer request already in progress. A response started before sign-out is ignored and cannot be added to the conversation afterward.
- The AI Teacher change was re-fetched from GitHub after commit `5165881e7a3e25ab417d81f4c3eabecad0a1e682`; source contains the sign-out listener and request-generation checks. Runtime behavior still requires a live owner test.
- Repository search found no implemented `resetPasswordForEmail` or `updateUser({ password... })` flow in the reviewed authentication pages. Do not add a reset link until the production site origin and Supabase Auth redirect allowlist are confirmed; otherwise the recovery email may lead to an unapproved redirect.
- Supabase project metadata confirms the project is active and hosted in `eu-west-2`; the project metadata endpoint does not expose the Auth URL allowlist or password policy. Those settings remain owner/dashboard verification items. No Auth settings were changed.


## 2026-11-10 follow-up — browser configuration and learner-data review
- Rechecked `supabase-config.js`: browser code contains the Supabase project URL and a publishable key only. The service-role key and AI provider key are referenced only as server-side environment secrets in Edge Function source; no secret value was found in the reviewed browser configuration. Publishable keys are expected to be public; RLS and server authorization remain essential.
- Rechecked `student-cloud-progress.js` and `student-cloud-homework.js`: cloud reads/writes obtain the signed-in Supabase user and rely on RLS/server-side authorization rather than trusting a UI-selected role. These paths still need real account/device tests.
- Rechecked Reading & Writing: saved learner writing is explicitly stored in this browser only, with a visible clear action that removes the page's local saved draft. Parents should avoid entering sensitive personal information, and should clear drafts on shared devices.
- Rechecked the local role dashboards and practice/certificate pages: they are browser-local demonstration data, not secure cross-device student accounts. Continue using fictional names/details in those demo pages.
- Static-audit workflow source was reviewed. It checks local HTML href/src targets and standalone JavaScript syntax; it does not execute browser flows or parse inline scripts. A passing GitHub Actions run has not been verified, so this is not a build/test pass.
- No production database, Auth setting, secret, account, or child record was changed during this review.


## 2026-11-10 final engineering batch — recovery flow, CI and deployment
- Confirmed GitHub Pages deployment using the successful Pages workflow log for commit `83c1b0f9911db38103c436285a009307ecd77470`. The deployment log reports the published URL as `https://romanoosano60-maker.github.io/great-minds-ai/`. A newer Pages deployment is required after the password-recovery changes below.
- Added a shared **Forgot password?** request button to International Classrooms and the Student, Parent, and Teacher cloud sign-in pages. Added `auth-recovery.js`, `auth-recovery.html`, and `auth-recovery-page.js`. The flow calls Supabase `resetPasswordForEmail` with a same-site recovery-page redirect and `updateUser({ password })` after the recovery session is established. New passwords require at least 8 characters and a matching confirmation.
- **Owner configuration still required:** Supabase Dashboard → Authentication → URL Configuration. Confirm the Site URL is `https://romanoosano60-maker.github.io/great-minds-ai/` and add this exact Redirect URL: `https://romanoosano60-maker.github.io/great-minds-ai/auth-recovery.html`. The Auth redirect allowlist is not readable through the connected project metadata tools, so do not assume it is already configured. Do not call recovery complete until the owner saves this setting and completes a real test-account email round trip.
- Latest static repository check for commit `8605a29210b0379e1c308cca86006278acaa5458` completed successfully: 57 HTML files scanned, 9 standalone JavaScript files parsed, and 512 local href/src references checked. This validates local references and standalone JavaScript syntax only; it does not execute browser flows or parse inline scripts.
- Current Supabase security advisor snapshot: no health findings; leaked-password protection remains disabled (warning); three RLS-enabled/no-policy notices remain on `private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`. These no-policy tables must remain inaccessible to client roles; do not add broad policies to silence notices. Account-deletion requests remain manual-review requests, not automatic account/data erasure.
- Created `FINAL_ANDROID_ACCEPTANCE_TESTS.md` with the eight-part Android owner test and pass/fail evidence sheet.
- Supabase project is active/healthy in `eu-west-2`. No database schema, RLS policy, Auth setting, secret, user account, or child record was modified in this batch.
- Engineering source preparation is complete for the five workstreams, but live password recovery, latest deployment after these commits, and owner Android acceptance tests remain unverified. Do not label the app 100% complete until these pass.

- Extended the shared recovery button to the remaining teacher sign-in utility pages (`supabase-connect.html` and `connected-dashboards.html`), so all six reviewed sign-in entry pages expose the same recovery route. The helper relies on the shared public Supabase client configuration and never stores or logs the entered password.

## 15 November 2026 — learning levels and live AI Teacher source audit

- Re-fetched `assets/js/level-challenges.js`. The shared challenge engine currently defines Beginner, Pro and Advanced question sets for English, Mathematics, Science, Social Studies, Geography, History, Computer Studies, Home Science, Vocabulary, Creative Arts, General Knowledge and the Little Learners Encyclopedia. It also maps the English, Maths, Science and Social Studies extra practice pages to their matching sets.
- Each of those 12 subject sets currently contains five questions per level (15 per subject). The engine randomises answer order, prevents a second answer on the same question, shows feedback and a score, and attempts to save the final result through the cloud progress helper while also retaining a local score history. These are source-level findings; runtime operation and cloud acceptance still require device/account testing.
- The main Mathematics, Science and English pages also contain separate practice banks, including 20-question sections. These are additional to the five-question-per-level sets and should not be confused with them. The question banks are still finite; expand them and add more varied question formats before calling the learning library comprehensive.
- Live Supabase confirms `ai-teacher` is ACTIVE version 8 with JWT verification enabled. The deployed `index.ts` exactly matches `supabase/functions/ai-teacher/index.ts` in the current GitHub repository (7,654 characters).
- Source review confirms the endpoint checks the signed-in user with Supabase Auth, checks approved-teacher or active guardian/student relationship records, applies a database-enforced usage quota before the provider call, restricts subject/language values, limits request size/history, sends the provider request server-side with `store: false`, and returns a concise error rather than exposing upstream details. The provider secret is referenced only through the server environment; its value was not retrieved or exposed.
- This is a source/deployment audit only. No real signed-in approved-user AI answer, unrelated-account rejection, microphone permission, or Android speech test was performed. Do not mark AI Teacher fully tested or launch-ready on the basis of an ACTIVE function alone.
- No learning content, live function, Auth setting, secret, database policy, account or learner record was changed in this pass.

## 15 November 2026 — supervised classroom calling source audit

- Live Supabase confirms `classroom-call-token` is ACTIVE version 9 with JWT verification enabled. The deployed Edge Function source exactly matches `supabase/functions/classroom-call-token/index.ts` in GitHub (9,331 characters).
- The server verifies the bearer session through Supabase Auth, checks the classroom, requires the approved teacher who owns the classroom to start/end calls, checks student membership plus an active guardian relationship, and permits linked guardians only as observers. Students and guardians may join only while the teacher is actually connected.
- Call tokens expire after 600 seconds. The function requires a `wss://` LiveKit URL and applies request/rate checks. Guardian observer tokens do not receive microphone/camera publish permissions.
- `classroom-call.html` connects to the room without starting local media. Microphone and camera controls start disabled/off and are enabled only after the participant deliberately presses the corresponding control. This was source-inspected, not device-tested.
- Remaining tests: approved teacher start/end, approved student join, linked guardian observer, unrelated/unapproved account rejection, teacher-absent rejection, token expiry, camera/microphone permission denial, and Android leave/end cleanup.
- No call token was issued, no call was started, and no classroom or account data was changed during this source audit.


## 15 November 2026 — follow-up classroom privacy and learning-level source audit

Read-only checks performed against the current default-branch source and live Supabase catalog. No application code, learner data, database grants, RLS policies, accounts, or Edge Functions were changed.

### Learning levels
- `assets/js/level-challenges.js` defines Beginner, Pro, and Advanced banks for 12 subject areas.
- Each level currently contains five questions per subject (15 questions across the three levels per subject). The quiz shuffles answer order, prevents a second answer to the same question, gives feedback, calculates a score, and attempts to save progress through `gmSaveStudentProgress`; it also stores a local score history.
- This is a working source structure, not evidence that all 12 subjects render correctly or that cloud saving succeeds on a real account. The small five-question banks remain a content-depth task; expand in reviewed batches and test each subject before marking complete.

### Parent and teacher dashboard distinction
- `connected-parent.html` and `connected-teacher.html` explicitly label their shared-browser/localStorage panels as demos, not secure account systems. Their separate cloud panels use signed-in Supabase sessions and rely on database RLS for row filtering.
- `teacher-dashboard.html` is a local-only lesson-plan/feedback/practice overview. It is not the secure cloud teacher dashboard and must not be presented as cross-device or authenticated classroom management.
- The parent cloud panel displays only rows returned by its authenticated queries/RLS. Its progress details currently display a shortened student account UUID; consider replacing that with a non-identifying child label before public release. This is a source-review recommendation, not evidence of an account leak.
- Parent/teacher dashboard sign-in, cross-device refresh, guardian-link revocation, and unrelated-account denial still require controlled Android tests using synthetic accounts.

### Live database access-control snapshot
- Confirmed RLS enabled on all seven reviewed public tables: `classrooms`, `teacher_profiles`, `classroom_members`, `guardian_relationships`, `student_learning_progress`, `homework_assignments`, and `homework_submissions`.
- Confirmed no direct SELECT grant to `anon` on these seven tables. `authenticated` has table privileges only where needed; row access is further constrained by the live policies.
- Reviewed live policies: teacher classroom creation/visibility requires the signed-in owner and approved teacher profile; student and active linked guardian membership visibility is scoped; student progress reads are self-only plus active linked guardian and approved classroom teacher access; homework submissions are scoped to the student, active linked guardian, or approved classroom teacher; student homework submission requires the student's own ID and approved classroom membership/consent.
- This catalog inspection is not a full adversarial test of every policy path. Do not claim child privacy is fully certified until tests with separate student, linked guardian, unrelated guardian, approved teacher, and unrelated account prove both allowed and denied cases.

### Current owner/device tests still required
1. Verify a linked guardian sees only their own linked child's progress and homework on a second device.
2. Verify an unrelated guardian and an unapproved teacher cannot see those records.
3. Revoke a guardian link and confirm access is removed on refresh/new session.
4. Test all three learning levels across the subject pages and confirm the cloud-save status, not merely the local score.
5. Replace the shortened student UUID shown in parent progress details with a non-identifying display label before release.

### Documentation reconciliation note
Earlier sections of this checklist contain historical deployment versions and older row-count snapshots. Use the dated live-audit entries in the current handoff and the live Supabase deployment/catalog as the source of truth; do not treat old version numbers or historical counts as current.


## 15 November 2026 — learning challenge quality and reliability review

Reviewed the complete current `assets/js/level-challenges.js` source (read-only). No question-bank or application code was changed in this review.

### Confirmed structure
- 12 subject/learning areas × 3 levels × 5 questions = 180 authored multiple-choice questions in the level-challenge bank.
- Each question has three answer choices and an indexed correct answer.
- The runtime randomizes the displayed answer order, locks choices after one answer, provides correct/incorrect feedback, tracks the score, and attempts to save a completed challenge.
- The script supports explicit aliases for the English, Mathematics, Science, Social Studies, and Computer Studies extra pages.

### Quality findings and improvements to make
1. Five questions per level is too short for sustained practice and creates repeat exposure quickly. Expand in reviewed batches, initially targeting 10 questions per level per priority subject, then test every affected page.
2. Answer shuffling currently uses `sort(() => Math.random() - 0.5)`. Replace with a Fisher–Yates shuffle for a properly unbiased shuffle.
3. The cloud-save promise is deliberately caught with an empty handler. A learner can see “Challenge complete” even if cloud saving fails. Add a visible save state (saved / saved locally only / retry needed) and preserve local history as a fallback.
4. Add validation before rendering: each question must have exactly three distinct choices, a valid correct-answer index, non-empty prompt/choices, and no duplicate prompt within the same level.
5. Add age-appropriate review and more question formats over time (short response, matching, picture identification, ordering, and worked maths steps); do not label the current multiple-choice-only bank as a complete curriculum.
6. A few general-knowledge items rely on conventions or colloquial phrasing (for example, the commonly taught seven-continent model and “king of the jungle”). Make convention-dependent wording explicit and prefer precise factual wording.
7. Advanced questions vary significantly in reading difficulty across subjects. Review against a consistent age/grade band and explain unfamiliar terms in the lesson material.

### Acceptance checks before marking this feature complete
- All 12 subject pages load the correct bank without console errors.
- Beginner, Pro, and Advanced each complete all five questions; correct and incorrect feedback, score, next-question flow, and retry/level switching behave correctly.
- Answer order changes across repeated runs without changing the correct answer.
- Cloud-save success and failure are both visibly handled; local history remains available if offline.
- Android narrow-screen layout, keyboard/screen-reader labels, and tap targets are checked.

This is a source-quality review only. It does not certify runtime behavior, cloud persistence, or curriculum completeness.


## 15 November 2026 — challenge-page wiring and cloud-save trace

Read-only source trace completed for the five primary subject pages and the shared progress helper. No application code or learner data was changed.

### Page wiring confirmed
- `english.html`, `math.html`, `science.html`, `social-studies.html`, and `computer.html` each include `assets/js/level-challenges.js` with `defer`.
- The shared script maps those five filenames to their corresponding subject banks and renders Beginner, Pro, and Advanced levels.
- The level-bank script also defines Geography, History, Home Science, Vocabulary, Creative Arts, General Knowledge, and Little Learners Encyclopedia banks, and aliases the supported extra pages. This source inspection does not prove every mapped page exists or loads correctly in a browser.

### Cloud-save trace and reliability gap
- On completion, the level challenge calls `window.gmSaveStudentProgress` when available and passes the subject, activity key, score, maximum score, correct count, question count, source, and level.
- `student-cloud-progress.js` validates the core score fields, writes a local pending-progress record, checks the signed-in Supabase user, then attempts an insert into `student_learning_progress`. It returns a result distinguishing cloud-saved from local-only.
- The helper currently does not preserve the optional `level` field in the local pending record or cloud row. The challenge caller includes it, but the helper drops it; do not assume level-specific results are retained in the database.
- The challenge completion handler catches the save promise with an empty handler and displays only “Challenge complete” and the score. The returned `saved` / `localSaved` / `reason` state is not shown to the learner. Therefore, the interface can look complete even when cloud sync failed.
- The local pending records are stored, but this helper contains no retry/synchronisation worker that later uploads queued records. Treat them as device-local fallback records, not guaranteed deferred cloud sync.
- Some pages include their own existing quiz-save handlers in addition to the shared level challenge. These separate activities must be tested independently; one successful save does not prove every activity saves.

### Next safe implementation steps
1. Add visible completion save feedback for cloud success versus device-only fallback, using the helper's returned result and without exposing technical error details to children.
2. Decide and implement a deliberate retry/sync path for local pending records, with duplicate protection and server/RLS validation; do not silently upload old records without testing account changes and ownership.
3. Decide whether level should be stored in a dedicated database column or encoded in an approved, validated activity field. Do not attempt to insert an undeclared column into the live table.
4. Add automated/static checks for page script references, filename-to-bank mapping, and question structure.
5. Run Android tests for online save, offline completion, signed-out completion, later sign-in, and guardian-consent/RLS rejection. Mark cloud persistence complete only after the returned status and database row are verified for the intended account.

This remains a source trace, not a live browser or Android runtime test. No Supabase schema, policy, function, secret, learner record, or production app source was modified.


### Follow-up page inventory verification (15 November 2026)
- Checked the repository root: all 12 bank page files exist — English, Mathematics, Science, Social Studies, Geography, History, Computer Studies, Home Science, Vocabulary, Creative Arts, General Knowledge, and Encyclopedia.
- Checked each of the seven additional subject pages (Geography, History, Home Science, Vocabulary, Creative Arts, General Knowledge, and Encyclopedia): each includes the shared `assets/js/level-challenges.js` script reference. Together with the five primary pages above, all 12 subject pages are wired to the shared level script in source.
- Checked all seven declared extra-page aliases against the repository root: each alias page exists and maps to a defined primary bank.
- This verifies file presence and script references only; it does not replace browser execution, console inspection, or Android completion tests.


## 15 November 2026 — challenge save feedback and local record accuracy

Implemented a small reliability improvement in the shared level challenge flow:
- The challenge completion screen now waits for the save helper result and tells the learner whether the result reached the secure learning profile, was saved only on the device, or could not be saved.
- The existing local challenge score history remains in place as a separate fallback.
- Replaced the biased random-sort answer shuffle with Fisher–Yates shuffling; correct-answer indexes remain attached to the original choices.
- Updated `student-cloud-progress.js` to preserve a validated Beginner/Pro/Advanced level value in the device-local pending record only. No database column was assumed or added; the cloud row remains unchanged and the activity key already includes the level.
- The helper now reports `localSaved` according to whether the local-storage write actually succeeded, rather than unconditionally claiming it did.

Validation: fetched both updated files again from GitHub and passed JavaScript syntax compilation for each. This is source-level validation only. No browser, Android, offline, authenticated cloud-save, or RLS runtime test was performed. No Supabase schema, policy, function, secret, account, or learner data was changed.


## 15 November 2026 — remaining quiz save-flow audit

Reviewed the repository's other quiz completion handlers after the shared level-challenge improvement. Findings from source inspection:

- English's 20-question practice and English Explorer both call `gmSaveStudentProgress`, but their rejection handlers are empty. A failed cloud save can therefore leave the learner without an honest final save-status message.
- Social Studies and Computer Studies append a cloud-pending message when the helper returns an unsuccessful result. Computer Studies also handles promise rejection; the inspected Social Studies handler has no rejection handler.
- Creative Arts calls the helper but suppresses rejection and does not display the returned save result.
- Guided Research calls the helper but suppresses rejection and does not display whether cloud saving succeeded.
- Connected Practice and the one-question English alphabet quiz display a returned cloud status, but their inspected handlers do not catch rejected promises.
- Group Learning explicitly identifies itself as a local browser demonstration; its team scores are not a cross-device classroom record. Keep that distinction visible.
- Reading & Writing and English Story Studio already provide clearer, explicit save-status messaging and keep the learner's writing local.

Safe next implementation:
1. Standardise completion feedback across quiz pages: cloud saved, saved locally/pending, or not saved; do not claim a local save unless verified.
2. Add rejection handling wherever a promise currently has none or an empty catch.
3. Keep local-only demonstrations labelled as local; do not silently promote them to cloud classroom features.
4. Re-fetch and syntax-check every changed script, then test online/offline and signed-in/signed-out cases on Android with separate test accounts.

Scope and limitations: this is a source-level audit of handlers and user feedback, not proof of live cloud persistence. No production source, database schema, RLS policy, account, learner record, or Edge Function was changed in this audit pass.


## 15 November 2026 — quiz save-feedback reliability repairs

Applied targeted frontend changes to four quiz flows after the remaining-handler audit:

- `creative-arts.html`: added a dedicated live save-status message, a bounded device-local quiz history record (last 100 entries), and explicit success / cloud-not-confirmed / unavailable / rejected-request feedback. The quiz score is not described as locally saved unless the browser storage write succeeds.
- `guided-research.html`: applied the same save-status and local-history safeguards to its 12-question challenge.
- `english.html`: repaired the English Explorer completion handler. It now awaits the cloud helper, records a bounded device-local result when storage is available, and reports cloud success, cloud failure, or helper unavailability rather than silently swallowing a rejection.
- `english-9.html`: added rejection handling to the alphabet reading quiz's cloud-save request so a rejected promise is no longer silent.

Validation performed: fetched all four changed pages again from GitHub and ran JavaScript syntax compilation on every inline script in each updated page. All checked inline scripts passed. The save-status strings and revised handlers were confirmed in the re-fetched files.

Limitations: these are source-level repairs only. No browser/Android interaction, offline run, signed-in cloud insert, guardian-consent/RLS denial, or second-device read was performed. The local history uses browser storage and is not a substitute for the protected cloud learning record. No Supabase schema, RLS policy, Edge Function, secret, account, or learner data was changed.


## 2026-11-15 — Quiz cloud-save error visibility
- Updated Social Studies, Computer Studies, Vocabulary, Reading & Writing, and Little Learners Encyclopedia expanded-challenge save handlers so rejected cloud-save requests are shown in the relevant on-page feedback instead of being silently swallowed.
- Social Studies main Community Helper quiz now also reports a rejected cloud-save request; a missing `reason` value no longer produces an unclear `undefined` message.
- Re-fetched all five pages after editing. All 22 inline scripts across the five pages passed JavaScript syntax compilation; the feedback elements referenced by the new handlers were confirmed present.
- This is source-level validation only. No Android/browser interaction, authenticated Supabase save, cross-device sync, offline behavior, or RLS authorization test was performed. No Supabase schema, policy, secret, function, account, or learner record was changed.


## 15 November 2026 — Continued coding audit: visible cloud-save failure feedback

Reviewed and updated three additional learning pages:
- `general-knowledge.html`: the expanded General Knowledge challenge no longer silently swallows a rejected cloud-progress save; it now tells the learner that cloud saving could not be confirmed and the result remains visible on the device.
- `geography.html`: the main World Explorer quiz now handles a rejected cloud-save promise and gives a fallback message when the save result has no reason text; the expanded Geography challenge also reports rejected cloud saves visibly.
- `home-science.html`: the expanded Home Science challenge now reports rejected cloud saves instead of silently ignoring them.

Source validation: re-fetched all three updated pages from GitHub and compiled all inline JavaScript blocks with syntax-only checks. General Knowledge: 3/3 scripts passed; Geography: 5/5; Home Science: 4/4. Total: 12/12 inline scripts passed.

Limitations: this is source-level review and syntax validation only. It does not prove browser interaction, authenticated Supabase persistence, cross-device sync, offline recovery, account isolation, or RLS behavior. No database schema, RLS policy, secret, Edge Function, account, or learner record was changed.


## 15 November 2026 — Continued coding audit: English, connected practice, Social Studies, and games

Further reviewed and updated:
- `english.html`: the English extra-practice quiz, reading-comprehension quiz, and main English quiz now display a visible cloud-save failure message when the save promise rejects.
- `connected-practice.html`: the connected practice question now handles a rejected cloud-save request and explains that the result remains visible on the page.
- `social.html`: the Social Studies foundations quiz now handles cloud-save rejection and safely handles a missing save-reason message.
- `games.html`: the asynchronous game-score save now catches rejected requests and updates the cloud-status message instead of leaving an unhandled promise rejection.

Source validation: re-fetched the four pages from GitHub and syntax-checked every inline script. English: 5/5; Connected Practice: 2/2; Social Studies: 2/2; Games: 1/1. Total: 10/10 inline scripts passed.

Limitations remain: no live browser interaction, Android, authenticated Supabase, offline, cross-device, or RLS test has been performed as part of these edits. No database schema, RLS policy, secret, Edge Function, account, or learner record was changed.


## 15 November 2026 — Quiz-save call-site sweep and syntax pass

Completed a targeted sweep of the repository's discovered `gmSaveStudentProgress` call sites and the shared `student-cloud-progress.js` helper. The previously identified silent/rejected-save paths in the reviewed lesson pages have been given learner-visible status messages. The shared helper was reviewed without changing its database behavior: it validates score fields, checks the signed-in Supabase user, inserts only for that user, and relies on database RLS for authorization. Device-local pending history is not itself a cloud-sync guarantee.

A fresh GitHub re-fetch and syntax-only compilation pass covered 20 progress-related source files (19 HTML pages plus `student-cloud-progress.js`): 58/58 inline or standalone JavaScript blocks compiled successfully. This checks JavaScript syntax only; it is not a browser runtime or application integration test.

Important remaining boundary: the source sweep does not establish that all pages in the full repository were audited, nor does it prove runtime save behavior, duplicate handling, account-switch isolation, Android behavior, authenticated Supabase persistence, parent/teacher/student RLS separation, or deletion behavior. Those require separate source review and live acceptance tests.


## 15 November 2026 — Role dashboards, classroom, and AI Teacher source review

Reviewed the current source for the Student, Parent, and Teacher dashboards; student profile; Independent Student Space; unified dashboard hub; sign-in page; International Classrooms; supervised classroom-call page; AI Teacher page; homework page; and account-deletion/production-readiness notes.

Source-level findings:
- The connected Student, Parent, and Teacher dashboards still include a shared `localStorage` demonstration record. The pages identify this as demo data; it must not be treated as a secure cross-device student record.
- The separate cloud views check the signed-in account and apply frontend eligibility gates (active guardian relationship for Student/Parent; approved teacher profile for Teacher). Their data queries rely on Supabase RLS to scope visible rows. The browser code alone cannot prove that unrelated accounts are blocked; separate-account runtime tests remain required.
- Independent Student Space explicitly stores its nickname and history on the current device and is not a secure login or cross-device sync system.
- Classroom and AI Teacher pages passed source syntax checks, but microphone, camera, live AI response, realtime classroom behavior, and role authorization still need real authenticated Android/browser tests.
- The account-deletion audit records that a complete user-facing deletion workflow is not implemented. A request-only backend endpoint is not equivalent to verified deletion of the Auth account, child records, classroom ownership, and device data. Do not mark deletion complete until the full process is tested and approved.

Additional syntax validation: the 11 role/profile/hub/homework pages with inline JavaScript contributed 19/19 passing blocks (the two static navigation-only pages contain no inline scripts). International Classrooms, Classroom Call, and AI Teacher contributed 3/3 passing blocks; the static Auth Recovery page contains no inline script; the Home page contributed 3/3. Combined with the earlier 58/58 progress-related checks, the reviewed set totals 83/83 JavaScript blocks compiled successfully across the audited source set. This remains syntax-only validation, not browser execution.

No database schema, RLS policy, secret, Edge Function, account, classroom, or learner data was changed during this source review.


## Evidence refresh — 19 November 2026

- Re-fetched the current Supabase Edge Function source and confirmed AI Teacher v8 requires `OPENAI_API_KEY` plus either `SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_ANON_KEY`. Secret values and presence are not exposed by the connected project tools; the owner must verify these privately in Supabase Function Secrets. Never paste a secret into chat or commit it.
- The active AI Teacher function checks the signed-in user, approved-teacher status or active guardian relationship, and calls `public.consume_ai_teacher_quota()` before any OpenAI request. The repository SQL defines that public wrapper and delegates to the private eligibility-checked quota function. This source consistency check is not a live AI answer test.
- Historical live failures recorded in the project evidence: HTTP 503 (12 November) and HTTP 502 (13 November). No successful live AI Teacher response has since been confirmed.
- **Owner-reported password recovery — 11 November 2026:** recovery email arrived, password was changed, and sign-in with the new password succeeded. Keep Test 7 PARTIAL until old-password rejection, redirect behaviour, password-field clearing and session behaviour are separately verified.
- Account deletion function v7 remains a manual-review request workflow. It does not automatically delete the Auth account, all associated learning records, or all sessions. Do not describe a submitted request as completed deletion.
- Current security review still identifies Leaked Password Protection as disabled. The three RLS-enabled/no-policy notices are informational for intentionally private/request tables and must not be “fixed” by adding broad client policies.
- No new owner/device acceptance PASS is recorded by this evidence refresh. Static checks, source inspection and active function status are not runtime/device tests.


## Four-mission navigation correction — 19 November 2026

- Corrected the classroom destination label in `gm-continuation-navigation.html` so the displayed filename matches the real `safe-international-classroom-v3.html` page. The underlying destination was already the v3 page; this removes a misleading filename from the navigation review.
- This is a source-level navigation correction only. It does not count as an end-to-end navigation test, a secure classroom test, or an Android device pass.
- The continuation demo dashboards, records and rewards pages remain explicitly browser-local demonstrations; they are not the live Supabase student/parent/teacher dashboards and must not be counted as integrated production records.


## Four-mission rewards consistency correction — 19 November 2026

- Connected Progress now combines the existing shared-demo totals with the Student Profile V2 summary when showing stars, points, activity count, certificate milestones and homework activity.
- Connected Certificates now uses the same combined star total when calculating certificate eligibility and the next milestone.
- This aligns the two local demonstration views with the Student and Parent dashboards, which already include the Student Profile V2 summary.
- Scope remains browser-local demonstration data. This change does not make local rewards authoritative cloud records and does not establish cross-device sync. Secure cloud progress remains a separate signed-in Supabase view.
- Verification pending: latest static workflow and Pages deployment for this commit, followed by Android owner acceptance testing.


## Four-mission shared rewards alignment — 19 November 2026

- Student Profile now includes supported local practice rewards in its displayed star/point totals and calculates practice certificate milestones consistently at five stars per certificate.
- Connected Practice displays the combined local Student Profile and connected-practice demo totals.
- The local Parent and Teacher dashboard summaries now include the same combined demo totals, including certificate count.
- This improves consistency across local demo pages only. It does not change Supabase records, establish cross-device synchronization, or make local demo totals authoritative cloud records. Authenticated cloud progress remains separately displayed under the secure progress sections.
- Static checks and Pages deployment are pending for this source batch. Android acceptance testing is still required.


## Secure homework interaction hardening — 19 November 2026

- The secure homework page now prevents repeated rapid taps from issuing concurrent submissions for the same assignment or concurrent marks for the same submission. Controls show a temporary in-progress state and are restored after the request completes.
- The homework page now clears any in-flight display and refreshes the visible assignments when the Supabase session changes to a newly signed-in account in another page. Sign-out still clears the secure homework display and removes the Realtime channel.
- These are client-side reliability and display-isolation improvements. Supabase RLS remains the authorization boundary; no production database policy, schema, Auth setting, secret, account or learner record was changed.
- Verification required: static workflow, Pages deployment, and owner tests with two distinct test accounts/tabs/devices. UI hardening is not a substitute for database uniqueness and RLS enforcement.


## Connected dashboard account-switch privacy hardening — 19 November 2026

- Secure Student, Parent and Teacher cloud dashboard pages now respond to both sign-out and sign-in session changes originating in another page.
- On sign-out, each page invalidates pending loads, clears its cloud-only record panels, resets the role/consent approval state and removes its Realtime channel.
- On a new sign-in, each page clears the prior account's displayed records first, re-fetches the authenticated user, and re-checks the relevant active guardian link or approved teacher status before loading any new cloud records.
- This reduces stale cross-account display risk in a shared browser. Supabase RLS remains the actual data authorization boundary. It is not proof against all cross-account access; separate-account and multi-device acceptance tests remain required.
- No production schema, policy, Auth setting, secret, account or learner record was changed.


## International Classrooms account-switch display hardening — 19 November 2026

- The International Classrooms page now handles explicit Supabase SIGNED_IN and SIGNED_OUT events. It clears the classroom/member/guardian display and removes the prior Realtime channel before processing the new session.
- On sign-out it also clears the password and guardian-consent code/checkbox from the page. On sign-in it refreshes classroom records under the newly authenticated account rather than retaining the previous account's cards.
- This is client-side stale-display protection. Database RLS and server-side RPC authorization remain the actual access controls; separate-account tests are still required. No Supabase policies, schema, secrets, accounts or learner records were changed.


## 19 November 2026 — Secure homework write confirmation

- Secure assignment creation, student answer submission, and teacher marking now request the affected row back from Supabase and only report success when a saved/updated row is returned.
- Teacher marking now treats a zero-row update (including a row hidden by database permissions) as unconfirmed instead of claiming the mark was saved.
- This is client-side success-reporting hardening only. Supabase RLS remains the authorization boundary; separate-account permission tests are still required.


## 19 November 2026 — Classroom call media fail-closed handling

- Microphone/camera control errors now disconnect the local LiveKit room, clear participant tiles, disable further call controls, and reset local media UI state rather than leaving a possibly active session behind an error message.
- This is a browser-side privacy safeguard. It does not replace device testing, LiveKit configuration review, adult supervision, or separate-account authorization tests.


## 19 November 2026 — Classroom account-switch form cleanup

- International Classrooms now clears classroom name, country, generated classroom code, join code, password, consent code and consent checkbox on sign-out and when the authenticated account changes. This reduces accidental disclosure or reuse of one account's classroom details by the next account using the same browser.
- The teacher must generate a fresh classroom code after signing in again. This is a browser-side hygiene improvement, not a substitute for database authorization or separate-account testing.


## 19 November 2026 — Classroom call leave fallback

- Leave and end-call controls now attempt the server-side end action separately from local cleanup. Regardless of server response, the local room is disconnected, participant tiles are cleared, and media controls are disabled/reset.
- If the server cannot confirm ending the room, the page explicitly warns that other participants may remain connected. This avoids falsely reporting a global end while still allowing the current device to stop its local call.
- Live multi-device testing is still required to verify LiveKit disconnect behaviour and server-side room termination.


## 19 November 2026 — Classroom disconnect UI reset

- When the teacher leaves or the LiveKit room disconnects unexpectedly, the call page now resets local microphone/camera state, disables all call controls, restores the OFF labels, and clears participant tiles.
- This prevents stale participant media tiles or misleading enabled controls from remaining visible after the supervised session has ended.
- Real-device and multi-account call testing is still required; UI reset does not independently prove remote media teardown or server room termination.


## 19 November 2026 — Android acceptance checklist reconciliation

- Updated the final Android acceptance checklist to record previously owner-reported Picture Library, classroom coordination, basic password recovery and Student Space results separately from tests still awaiting evidence.
- Removed the Picture Library from the routine remaining retest list; repeat only if a later change causes a regression. Historical owner reports are clearly distinguished from independently reproduced device tests.
- This is test-record accuracy work only; it does not upgrade unverified device tests to engineering-confirmed passes.


## Current security and service handoff — 19 November 2026

### Verified source/deployment state
- Latest documented GitHub Pages commit `43eba42bb91c48b82b00e7ecba9c2c41977119e4`: static repository checks succeeded (workflow `44532785677`) and Pages deployment succeeded (workflow `44532787316`).
- AI Teacher source currently uses the Supabase Edge Function, checks the authenticated user, allows approved teachers or accounts with an active guardian relationship, validates request size/subject/language, applies a database-enforced quota before calling the OpenAI Responses API, and requests `store:false`. This is a source review, not proof the OpenAI secret is present or that a live answer works. Failed upstream attempts may still consume quota because quota is charged before the upstream request.
- Account deletion endpoint is deliberately request-only. It verifies the signed-in, email-confirmed account, requires an approved teacher or active guardian relationship, prevents student-purpose accounts from submitting the adult request, checks classroom ownership, and records a manual-review request. It does **not** delete the Auth account, revoke all sessions, erase learning data, or remove backups. The response explicitly says no data was deleted.
- Classroom call source now disconnects local media and clears participant tiles on permission/control failures and disconnect events. This does not replace Android microphone/camera permission and multi-account call tests.
- Latest Android acceptance checklist records historical owner-reported passes separately from tests independently reproduced in this audit. No new owner-device pass is claimed.

### Owner / Supabase actions still required
1. In Supabase Auth security settings, enable **Leaked Password Protection** if the current plan supports it. If unavailable on the plan, record that as a limitation; do not claim the setting is enabled.
2. In Supabase Edge Function Secrets, privately verify that `OPENAI_API_KEY` is present for `ai-teacher`. Never paste the value into ChatGPT, GitHub, browser code, or a screenshot. Confirm the configured model is available to the key owner. Then run one authenticated Mathematics question and one unauthorized-account denial test.
3. Run the separate-account Android tests in `FINAL_ANDROID_ACCEPTANCE_TESTS.md`: student, approved teacher, and linked guardian; cross-account read denial; consent revocation; progress and homework publish/submit/mark; sign-out clearing; classroom call permissions and disconnect.
4. Do not tell a user that an account has been deleted after submitting the current request form. A human administrator must review ownership/transfer, determine the applicable retention and legal requirements, perform approved deletion of Auth and related records, revoke sessions, handle backups under the retention policy, and confirm completion to the requester. No automated destructive deletion was introduced because the required retention/transfer policy and guardian/legal authority process are not established in code.
5. Decide and document retention periods, guardian consent evidence, consent revocation handling, support contact and backup-erasure schedule before public use. Email confirmation or a self-declared relationship alone is not proof of legal guardianship.

**Completion boundary:** these actions cannot be truthfully marked complete by repository edits. The app is not 100% complete until the owner-side settings and device/account tests pass, the AI Teacher receives a live answer, and an approved account-deletion lifecycle is implemented and verified. Advertising, pricing, and marketing remain out of scope until that point.


## SQL reference repair — 19 November 2026

- Corrected a malformed consent-code validation condition in `supabase/international-classrooms.sql`. A comment had been accidentally inserted inside the regular-expression literal, leaving the PL/pgSQL conditional malformed. The condition now checks for exactly 64 hexadecimal characters using `^[0-9a-fA-F]{64}$`.
- This was a repository SQL reference-file repair. It was **not** applied to the live database; the connected project had a separate guardian-consent hardening function/migration recorded as applied on 9 November. Do not re-run the entire reference SQL file against production as a shortcut.
- The source static workflow and Pages deployment for this correction must finish before it is considered published. Live database behaviour still requires the consent journey test with separate test accounts.


### Follow-up validation of classroom SQL reference — 19 November 2026
- Re-reviewed the complete consent-redemption function after the first edit and found a duplicated, damaged tail left in the same reference SQL file. Removed that duplicate fragment and restored the full conditional: exactly 64 hexadecimal characters are required before hashing and redemption.
- Re-fetched the committed file and verified it contains one `private.redeem_guardian_consent_code` definition, a complete `^[0-9a-fA-F]{64}$` validation condition, the explicit error branch, and the rest of the function through its grants.
- This remains a repository reference-file repair only. The live Supabase migration was not changed by this edit; do not run the entire SQL file on production. Confirm live consent redemption only with dedicated test accounts and the already-applied migration history.


## Classroom and AI access-control review — 19 November 2026

A source-level review of the current AI Teacher and classroom-call endpoints found:

- AI Teacher verifies the Supabase access token, checks approved-teacher or active guardian/student relationships, validates the request body by actual UTF-8 byte size, and calls the database-enforced daily quota before contacting the AI provider. The quota SQL stores only per-account and shared daily counters, denies direct client access to the private counter table/function, and applies the eligibility gate in a database wrapper. This is source review only; the live OpenAI secret and a successful live child-safe answer remain unverified.
- Classroom-call tokens are issued only after a current session check and classroom-role check. Student access requires approved classroom membership plus an active guardian relationship; guardian observer access requires an active linked child with approved classroom membership; only the approved classroom owner can start or end a call. Students/guardians can join only while the teacher is connected. Tokens expire after ten minutes and guardian observers cannot publish media.
- Corrected the classroom-call endpoint's upstream exception response: LiveKit/service failures now return HTTP 502 rather than incorrectly reporting a client HTTP 400. This improves diagnosis without exposing internal exception details.
- Account deletion remains request-only. It verifies a signed-in, email-confirmed eligible adult account, checks classroom ownership, and records a manual-review request. No Auth account, learning record, consent record, storage object, or session is automatically deleted. A documented retention and supervised child-account deletion process is still required.

No production Supabase secrets, RLS policies, or live database functions were changed by this review. Cross-account Android acceptance tests and live service tests remain outstanding.


## Account-deletion request endpoint hardening — 19 November 2026

- Bounded bearer-token length before account lookup and added `Vary: Origin` to the fixed-origin CORS response.
- Made duplicate submissions resilient to a concurrent request from another device: if the database's one-open-request unique index wins a race, the endpoint retrieves and returns the existing open request rather than reporting a generic server failure. It still never deletes account or learning data.
- Source change only. The Supabase Edge Function deployment and a two-device concurrent-request test are not confirmed by this repository commit. The existing database unique index is relied upon as the concurrency boundary.


## Consent SQL reference final-tail validation — 19 November 2026

- A fresh re-fetch found a damaged duplicate fragment appended after the final comment in `supabase/international-classrooms.sql`. Removed the trailing fragment, leaving one complete `private.redeem_guardian_consent_code` definition, the 64-character hexadecimal validation, its grants, and the final explanatory comment.
- This is a repository reference-file correction only. It was not applied to the live Supabase database. Do not rerun the full reference SQL on production.
- The guardian page exposes a per-child revoke action and refreshes classroom state after the RPC. Source review confirms the RPC is scoped to the signed-in guardian and selected student; live cross-account/revocation behaviour still requires dedicated test accounts.


## Teacher consent-policy reference alignment — 19 November 2026

- Corrected the final teacher membership UPDATE policy in `supabase/international-classrooms.sql` to match migration `20261110_require_active_guardian_for_classroom_approval.sql`.
- Teachers can approve a membership only when the protected consent field is approved, and they cannot set that consent field to approved unless an active `guardian_relationships` row exists for that student.
- This is a repository SQL reference correction only. It has NOT been applied to the live Supabase project. Do not rerun the entire reference SQL on production; review/apply the dedicated migration only through the normal migration workflow if live status is not already confirmed.


## Live Supabase security-advisor and deployment audit — 19 November 2026

Read-only checks against project `ryuchmmnyjyldwouidyy` confirmed the project is ACTIVE_HEALTHY and the relevant classroom migrations are recorded as applied, including `20261110_require_active_guardian_for_classroom_approval` and `20261110_fix_teacher_rls_guardian_visibility`.

Security advisor findings:
- Leaked Password Protection is DISABLED. Owner action: enable it in Supabase Auth password/security settings when available, then test password creation/change. No setting was changed.
- Three RLS-without-policy INFO findings: `private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`. The first two are private-schema tables with no client policies. The account-deletion request table explicitly revokes all anon/authenticated table privileges and grants access only to service_role; its no-policy RLS posture is intentional. Do not add broad client policies just to silence the advisor.
- The live `account-deletion-request` Edge Function is still version 7 and its deployed source does not yet include the latest GitHub hardening (token length bound, Vary: Origin, and concurrent duplicate-request recovery). The repository source is updated, but deployment was NOT performed. Owner approval is required before replacing the live function.
- The live `ai-teacher` function is version 8 with JWT verification enabled. Its live source matches the reviewed guarded request flow. Its runtime success still depends on configured secrets; no secrets were inspected or changed.
- The Pages deployment for commit `22715713246f69e41dcb5c58e0d15c7ab8d8589e` completed successfully. Static checks passed for the same commit.


## Reconciled teacher approval policy against live Supabase — 19 November 2026

- Follow-up read-only database inspection resolved the apparent mismatch: migration `20261110_require_active_guardian_for_classroom_approval` was later intentionally superseded by `20261110_restore_teacher_approval_policy_for_rls_visibility`. Teachers cannot directly read `guardian_relationships`, so querying that table inside teacher RLS would incorrectly block valid approvals.
- Live privilege checks confirm authenticated users can update `classroom_members.membership_status`, cannot update `parent_consent_status`, and do not have table-wide UPDATE. The protected consent field is set/revoked through SECURITY DEFINER guardian-consent RPCs only. The live per-child revoke RPC is executable by authenticated users; its private implementation is also granted to authenticated.
- Therefore the final teacher policy correctly relies on the protected `parent_consent_status='approved'` field and does not directly query guardian_relationships. Removed the extra direct relationship EXISTS clause that had been added to the repository reference file in the preceding review, and documented the security rationale in the SQL file.
- No live database changes were made. This was a source-reference alignment and read-only privilege verification.


## Read-only classroom data privilege verification — 19 November 2026

Live grants checked for the authenticated role:
- `guardian_relationships`: SELECT only; no direct INSERT, UPDATE or DELETE.
- `classroom_members`: SELECT only at table level; membership-status updates are limited to the granted column and governed by RLS. No direct INSERT or DELETE.
- `student_learning_progress`: SELECT and INSERT only; no UPDATE or DELETE (append-only student history).
- `account_deletion_requests`: no direct SELECT, INSERT, UPDATE or DELETE; request intake is service-role-only through the Edge Function.

Together with the earlier column check (`parent_consent_status` cannot be updated by authenticated clients), this confirms guardian links and consent cannot be directly forged by ordinary authenticated clients. This is a read-only live verification; no permissions were changed.


## Account-deletion request body-limit hardening — 19 November 2026

- Updated `supabase/functions/account-deletion-request/index.ts` to reject an oversized declared Content-Length before reading and to enforce the 3,000-byte cap while streaming the request body. This avoids buffering an arbitrarily large body before applying the previous size check.
- Existing request-only behaviour remains unchanged: the endpoint verifies an authenticated adult-controlled account, creates a manual-review request, and does not delete an Auth account or learning data.
- Source commit: `9eb4c5d45abf89edd1317a6a42528bbe5e351018`.
- **Not deployed:** live Supabase account-deletion-request remains on the previously audited version until the owner explicitly approves a production function update. Static checks and deployment status for this source commit are pending.


## Guardian consent RPC security-definer review — 19 November 2026

Read-only review of every live SECURITY DEFINER routine in the `public` and `private` schemas:
- All reviewed routines use an empty search_path, avoiding implicit object resolution through an attacker-controlled schema.
- Privileged guardian consent, code generation/redemption, per-child revocation, classroom joining and AI quota operations live in the non-exposed `private` schema.
- Public RPC entry points are SECURITY INVOKER wrappers, not public SECURITY DEFINER routines. The reviewed wrappers are executable by authenticated users and not by anon.
- Consent redemption requires the authenticated caller, explicit affirmative consent, a confirmed email, a full 64-character code, a live unexpired unused code, and prevents self-consent. It does not replace an existing active guardian link; classroom membership still requires teacher approval.
- Per-child revocation checks that the caller is the active guardian for the exact student ID, then revokes only that child and blocks that child's classroom membership. Other linked children are not changed.
- Classroom join RPC limits attempts to 20 per account/day and validates the code format. AI quota routine is not directly executable by anon or authenticated clients; the eligible-user wrapper checks approved-teacher or active guardian/student status.
- Limitation: email confirmation plus an explicit guardian affirmation is not independent proof of legal adulthood or legal guardianship. Adult/guardian verification remains a product/legal acceptance blocker before public launch.
- No database functions, grants, or policies were changed during this review.


## Supabase browser configuration and current security advisor recheck — 19 November 2026

- Read-only Supabase project metadata confirms the project's API URL matches `supabase-config.js`.
- The publishable key configured in `supabase-config.js` exactly matches the active, non-disabled `sb_publishable_` key returned by Supabase. The older 401/invalid-key concern is therefore not explained by a current URL/key mismatch in this source file. No key was rotated or changed; no secret key was read.
- Latest Security Advisor still reports the same three intentional RLS-enabled/no-policy informational findings for service-only/private tables and the warning that leaked-password protection is disabled. No broad client policies were added.
- Owner action remains: enable leaked-password protection in Supabase Auth settings when available, then test a new password and password change using a disposable adult-controlled account.


## AI Teacher request-body resource hardening — 19 November 2026

- The AI Teacher Edge Function now rejects a declared Content-Length above 12,000 bytes before reading and enforces the same limit while streaming the body. This prevents the function from buffering an unbounded body before applying the previous byte-size check.
- Authentication, approved-teacher/active-guardian authorization, daily quota consumption, child-safety instructions, `store:false`, and generic upstream errors are unchanged.
- Source-only change. The live AI Teacher function remains version 8 until an explicitly approved deployment; no secrets were read or modified.


## AI Teacher configuration-probe reduction — 19 November 2026

- Moved the OpenAI API-key presence check until after bearer-token verification and eligible teacher/guardian/student authorization. Anonymous callers now receive the normal sign-in/authorization response rather than learning whether the paid AI provider secret is configured.
- The Supabase publishable key check remains early because it is required to validate the access token. No secret values are exposed, logged, or changed.
- Source-only change; live AI Teacher remains version 8 pending explicit owner approval for deployment.



## Focused learning-data and student-space source audit — 20 November 2026

The following points were checked directly against the current default-branch source. They are source findings, not live account/device acceptance tests.

- `student-cloud-progress.js` writes structured quiz metadata (subject, activity key, score, maximum score, correct/question counts, source and completion time) to `student_learning_progress`. It does not include free-form learner answers in those score rows. The helper also keeps a device-local pending copy; cloud confirmation is reported separately, and retry IDs are checked for idempotency.
- `student-cloud-homework.js` deliberately submits the learner's written homework answer (up to 3,000 characters) to `homework_submissions.answer`. This is different from quiz-score metadata. The privacy/data inventory, parent notice, retention schedule, export/deletion process and support workflow must explicitly cover written homework content and who can read it.
- The independent student profile page (`independent-student.html`) uses browser localStorage for its nickname, level and saved history. Its “Save my completed work” action copies locally available records into device-local history; it does not call the authenticated cloud progress helper. Treat this as a local prototype/learning space, not a cloud-synced student account or a substitute for the connected student dashboard.
- The connected parent, student and teacher pages listen for authentication sign-in/sign-out changes and clear their in-memory account-specific view state before reloading data. This is a useful source safeguard, but separate-account testing on two devices is still required to prove RLS and relationship isolation.
- Do not add free-form child answers, story text, voice recordings or chat transcripts to quiz-score tables. Keep homework content in its dedicated table with narrow RLS, an approved retention period and a tested deletion/export path.

### Follow-up actions from this audit

1. Update the child/parent privacy notice and data inventory to distinguish quiz metadata from written homework submissions.
2. Decide whether the independent local student space remains a clearly labelled offline/demo mode or is replaced by the connected, guardian-approved student flow before launch.
3. Test a written homework submission with synthetic text, then verify that only the linked approved teacher and authorized guardian can access it, and that unrelated students/guardians cannot.
4. Verify account closure, guardian revocation and retention handling for homework text as well as score metadata.
5. Keep all these items marked “source reviewed; runtime not yet verified” until the real-device and separate-account tests are recorded.


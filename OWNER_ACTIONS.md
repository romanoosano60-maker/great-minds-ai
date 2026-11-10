# Great Minds AI — Owner Actions and Final Test Checklist

Last checked: 10 November 2026

## Latest engineering handoff — 10 November 2026

The following are the current deployed backend versions recorded in the latest source/deployment audit. Older version numbers in dated historical notes below describe earlier checkpoints and are not current:
- AI Teacher: ACTIVE version 6; JWT verification enabled.
- Classroom call token: ACTIVE version 7; JWT verification enabled; WSS-only LiveKit endpoint and server-side consent/membership checks.
- Account deletion request: ACTIVE version 5; JWT verification enabled; request-only, not automatic deletion.
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

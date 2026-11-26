# Great Minds AI — Final Android Acceptance Test

**Device target:** Samsung Galaxy S21, Android 15, Chrome  
**Purpose:** Owner-side final verification after engineering and deployment checks.  
**Rule:** Use test accounts and fictional learner details only. Never enter a real child's sensitive information during testing. Record each result as PASS, FAIL, or NOT TESTED. A feature is complete only after its expected result is observed.

## Before testing

- Open the published app: https://romanoosano60-maker.github.io/great-minds-ai/
- Use a stable Wi-Fi connection and Chrome. Do not test while the phone is switching networks.
- Have separate test accounts ready for Teacher, Student, and Parent/Guardian.
- Keep one note of the date, page, action, expected result, actual result, and screenshot/error text.
- Do not share passwords, recovery links, access tokens, or real child information.

## Test 1 — Published website and navigation

1. Open the website link above.
2. Confirm the main Great Minds AI home screen loads without a blank page or browser error.
3. Open the main subject links and return to Home.
4. Open the Unified Learning Hub and its Student, Parent, Teacher, Classroom, and Homework links.
5. Confirm each page opens and the Back/Home navigation works.
6. If any page shows 404, a blank screen, or a broken link, record the exact page URL.

**Pass:** Main screen and every tested navigation link open successfully.

## Test 2 — English, vocabulary, reading and audio

1. Open English and start a lesson.
2. Play the ABC/song audio and listen for clear, uninterrupted playback.
3. Open Vocabulary; play an individual word and use Stop.
4. Navigate away while audio is playing; confirm it stops.
5. Return and play another word; confirm the new audio starts normally.
6. Open Reading & Writing, read a passage, and test the available questions.
7. Type a short fictional practice paragraph, save it, refresh the page, and confirm it remains on that device.
8. Use Clear and confirm the saved draft is removed from that device.

**Pass:** Lessons respond, audio plays and stops correctly, and local writing save/clear works.

## Test 3 — Other learning subjects and picture library

1. Open Mathematics and complete one quiz.
2. Open Science and complete one lesson or question set.
3. Open Social Studies/Geography and inspect the atlas or maps.
4. Open the 3D/space experience and confirm the solar-system/rocket scene displays correctly.
5. Rotate the phone only if needed; do not treat portrait-only behavior as a failure unless a page becomes unusable.

**Previously owner-confirmed:** Picture Library sections for animals, birds, machines, cars, trains, and ships were reported working. Do not repeat this test unless a later change causes a regression.

**Pass:** Each newly tested subject loads, controls work, and graphics remain visible without freezing.

## Test 4 — Student account and cloud progress

1. Open the Student cloud account page.
2. Sign in with the Student test account.
3. Complete one small quiz or lesson.
4. Save the cloud progress summary if that control is available.
5. Refresh the cloud history.
6. Confirm the expected test record appears for the signed-in Student.
7. Sign out and confirm the private cloud panel clears.
8. Open the same page in another browser tab; confirm signing out in one tab clears private records in the other tab.

**Pass:** Only the signed-in Student's permitted records appear, and sign-out clears the displayed private data.

## Test 5 — Teacher account, classroom and homework

1. Sign in with the approved Teacher test account.
2. Confirm only permitted classroom/student progress appears.
3. Create a test homework assignment in the approved classroom.
4. Sign out and confirm private progress and homework panels clear.
5. Sign in again and confirm the authorized Teacher can see the assignment.
6. Confirm an unapproved account cannot see the Teacher's private records.

**Pass:** Teacher permissions work as intended; unauthorized access is denied.

## Test 6 — Parent/Guardian account and cross-device coordination

1. Sign in with the Parent/Guardian test account on the phone.
2. Confirm only the linked and permitted Student's progress/homework appears.
3. Submit a test homework answer from the Student account on a second device or separate browser session.
4. Refresh the Parent dashboard and confirm the permitted submission/feedback appears.
5. Sign out and confirm the private panels clear.
6. If testing consent, use only a test account and verify the Student/Guardian consent and Teacher approval steps remain separate.

**Pass:** Parent sees only linked, permitted records; Student/Teacher/Parent coordination works across separate sessions.

## Test 7 — Password recovery and account security

**Owner-reported partial result — 11 November 2026:** the recovery email arrived, the password was changed, and sign-in with the new password succeeded. This is an owner-reported test, not an independently reproduced test. It supersedes the earlier blanket “BLOCKED” status for the basic recovery path. The old-password rejection, exact redirect behavior, password-field clearing, and session behavior have not all been separately recorded; keep this test PARTIAL until those checks are completed.

**For any repeat test, first confirm the exact recovery URL is allowlisted in Supabase Auth URL Configuration.** The 11 November owner-reported reset is recorded above; the remaining checks below are still required.

1. Open International Classrooms or a role cloud sign-in page.
2. Enter the email address for a test account and tap **Forgot password?**
3. Check the test account's inbox and spam folder for the recovery email.
4. Open the newest recovery email on the same phone.
5. Confirm it opens the Great Minds AI Reset Password page.
6. Set a new password of at least 8 characters and confirm it.
7. Return to sign-in and verify the new password works.
8. Verify the old password no longer works.
9. Confirm password fields clear after sign-in attempts and sign-out.
10. Do not test account deletion on a real account; the current endpoint is a manual-review request, not automatic deletion.

**Pass:** Recovery email arrives, redirects to the app, updates the password, and the new password signs in successfully.

## Test 8 — Final privacy and stability

1. Confirm the app does not display private cloud records after sign-out.
2. Confirm local Reading & Writing drafts are clearly identified as device-only.
3. Confirm demonstration dashboards use fictional data and do not masquerade as secure cloud records.
4. Leave a lesson playing, switch to another app, then return; confirm audio stopped where expected.
5. Reload the main page and repeat any failed step once on a stable connection.
6. Record any error exactly; do not repeatedly submit account-deletion or password-recovery requests.

## Previously owner-reported checks (do not repeat without a regression)

| Area | Owner-reported result | Evidence status |
|---|---|---|
| Picture Library: animals, birds, machines, cars, trains and ships | PASS reported by owner | Historical report; exact test date and screenshot not recorded here |
| Teacher, Student and Parent classroom coordination | PASS reported by owner on 9 Nov 2026 | Owner report; not independently reproduced |
| Basic password recovery and new-password sign-in | PASS reported by owner on 11 Nov 2026 | Partial overall; old-password rejection and session edge cases remain unverified |
| Student Space saving, history and sign-out | PASS reported by owner on 12 Nov 2026 | Owner report; not independently reproduced |

## Final result sheet

| Area | Result | Evidence / notes |
|---|---|---|
| Published site and navigation | NOT TESTED | |
| English and audio | NOT TESTED | |
| Other subjects / 3D space | NOT TESTED | |
| Student cloud progress | NOT TESTED | |
| Teacher classroom/homework | NOT TESTED | |
| Parent cross-device view | NOT TESTED | |
| Password recovery | PARTIAL — owner-reported basic reset passed 11 Nov; remaining security checks unverified | |
| Sign-out and privacy | NOT TESTED | |
| Stability / no freezing | NOT TESTED | |

**Completion rule:** Do not mark Great Minds AI 100% complete until all required rows pass, deployment is current, password recovery is verified, and any failed test is repaired and repeated successfully.


## Additional security-owner checks — 19 November 2026

1. **Leaked-password protection:** in Supabase Auth security/password settings, enable leaked-password protection if the project plan supports it. Record PASS only after the setting is visibly enabled; otherwise record PLAN LIMITATION.
2. **AI Teacher service secret:** in Supabase Edge Function Secrets, privately confirm `OPENAI_API_KEY` exists for the active `ai-teacher` function. Never copy the secret into chat, GitHub, a browser page, or a screenshot. Ask one simple Mathematics question from an approved adult-controlled test account and confirm a live answer. Confirm an unrelated unauthorized account is denied.
3. **Account deletion wording:** submit only with a disposable adult test account if you need to inspect the request workflow. The current endpoint records a manual-review request only. It does not delete the login, learning records, sessions, or backups. Do not use the words “deleted” or “erased” until an administrator has completed and documented the full approved process.
4. **Deletion lifecycle:** before implementation, the owner must approve the legal guardian/teacher authority check, classroom ownership transfer/closure, data retention exceptions, deletion of Auth and related records, session revocation, backup expiry, and confirmation procedure. Do not test destructive deletion using a real family account.
5. **Guardian privacy:** use separate adult-controlled test accounts to verify that an unrelated parent cannot read a student's records, an unrelated teacher cannot read another classroom's records, and revoked guardian consent removes the previously granted access as intended.

**Important:** source review and successful GitHub deployment do not prove Supabase secrets, RLS isolation, Auth settings, or Android behaviour. Mark these checks NOT TESTED until observed in the live project/device.


## Test 9 — Offline progress and account-switch isolation

Use fictional test accounts only. Keep the same Chrome profile on the same phone so the device retry queue is exercised.

1. Sign in as Student A while online and complete a small quiz that reports a cloud-save status.
2. Confirm the result is either cloud-confirmed or visibly queued; do not interpret a device-only message as a cloud save.
3. Turn on Airplane mode. Complete another short quiz and confirm the score remains visible with a clear offline/device or queued status.
4. While still offline, sign out Student A and sign in as Student B if the app permits the cached sign-in flow. Student B must not see Student A's private progress.
5. Restore the connection. Keep Student B signed in and allow the sync attempt to run. Confirm Student A's queued record is not uploaded under Student B.
6. Sign out Student B, sign in again as Student A, and trigger the page's retry/check-sync action if shown.
7. Confirm Student A's queued record appears only in Student A's cloud progress after a successful sync. Then sign in as linked Parent A and confirm only the permitted linked learner records are visible.
8. Repeat one save with guardian consent absent (using a test-only consent state) and confirm it is not shown as cloud-saved. Restore consent and retry the same record; confirm there is no duplicate score.
9. Confirm legacy anonymous local history is not silently uploaded to either account.

**Pass:** queued progress remains bound to its originating account; Student B never receives Student A's record; Student A can sync after re-authentication; retries do not duplicate results; parent visibility follows the approved relationship and RLS.

**Safety:** Do not change production consent or RLS settings to perform this test. Use approved test accounts and a controlled test environment.

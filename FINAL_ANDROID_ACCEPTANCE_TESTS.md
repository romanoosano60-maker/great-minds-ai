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
4. Open the Picture Library and test animals, birds, machines, cars, trains, and ships.
5. Open the 3D/space experience and confirm the solar-system/rocket scene displays correctly.
6. Rotate the phone only if needed; do not treat portrait-only behavior as a failure unless a page becomes unusable.

**Pass:** Each tested subject loads, controls work, and graphics remain visible without freezing.

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

**Do this only after the owner has added the exact recovery URL to Supabase Auth URL Configuration.**

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

## Final result sheet

| Area | Result | Evidence / notes |
|---|---|---|
| Published site and navigation | NOT TESTED | |
| English and audio | NOT TESTED | |
| Other subjects and picture library | NOT TESTED | |
| Student cloud progress | NOT TESTED | |
| Teacher classroom/homework | NOT TESTED | |
| Parent cross-device view | NOT TESTED | |
| Password recovery | BLOCKED until redirect allowlist is confirmed | |
| Sign-out and privacy | NOT TESTED | |
| Stability / no freezing | NOT TESTED | |

**Completion rule:** Do not mark Great Minds AI 100% complete until all required rows pass, deployment is current, password recovery is verified, and any failed test is repaired and repeated successfully.

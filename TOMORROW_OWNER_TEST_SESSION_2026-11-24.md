# Great Minds AI — Owner Test Session

Prepared: 24 November 2026  
Purpose: complete the real-device and separate-account checks that cannot be certified from source review.

## Before starting

- Use adult-controlled test accounts and fictional learner details only.
- Do not paste passwords, API keys, consent codes or child personal information into chat.
- Use the published app URL from the project owner's known bookmark or GitHub Pages settings. A successful Pages workflow is not a substitute for opening the site on the phone.
- If any page displays another learner's information, stop the test and report it before continuing.

## Test order

### 1. Home and subject navigation
- Open the app on Android.
- Tap Start Learning and open Mathematics, English, Science and other core subjects.
- Open **Discovery & Creativity Centre** and try all eight stations.
- Open **Life Skills & Wellbeing** and try the eight learning areas and eight-question quiz.
- Check for blank pages, 404 errors, cut-off text or controls that do nothing.

### 2. English, pictures and audio
- Check A–Z, phonics, vowels, vocabulary, story reading and the ABC song.
- Confirm each letter's picture matches the word.
- Test Listen and Stop, then navigate away while audio is playing. Confirm it stops.
- If a language voice is unavailable, note the language and phone text-to-speech setting; do not treat a substituted language as a pass.

### 3. AI Teacher
- Sign in with an approved adult-controlled test account.
- Ask a simple Mathematics question such as “What is 8 + 7? Show the steps.”
- Confirm an actual generated answer appears.
- Test Listen, Stop and microphone permission separately.
- If an unrelated account is available, verify it is denied.
- If the service reports that it is not configured, record the exact message; do not share any secret key.

### 4. Parent, student and teacher access
- Use separate adult-controlled test accounts.
- Confirm each account sees only the dashboard and records it is permitted to access.
- Confirm a parent cannot view an unlinked learner and a teacher cannot view an unrelated classroom.
- Verify sign-out and password recovery without sharing credentials.

### 5. Classroom consent and homework
- Create or use a test classroom.
- Request student membership; confirm it remains pending until teacher approval.
- Complete guardian consent with the separate guardian test account.
- Approve the student as the teacher.
- Publish a fictional assignment, submit it as the student, mark it as the teacher and confirm the linked guardian can see the permitted result.
- Revoke consent and verify that new classroom participation is blocked.

### 6. Classroom audio/video call (only if configured)
- Use separate devices/accounts for teacher, student and guardian observer.
- Confirm the guardian is observer-only.
- Confirm microphone and camera start OFF and require deliberate opt-in.
- Test leave, teacher end-call and unexpected teacher disconnect.
- If LiveKit is not configured, stop here and record the message.

### 7. Record outcome
For each test, record: **Pass / Fail / Not available**, the page name, exact error text, and whether it happened once or repeatedly. Do not include passwords, private codes or personal data.

## What a pass does not mean

Passing the phone checks does not itself grant legal approval, confirm compliance in every launch country, complete account/data deletion, or publish a native Android app. Privacy/legal review, data-retention decisions, Supabase Auth settings, country/network separation and Android packaging remain separate release gates.


## 8. Identity-bound offline progress sync — added 26 November

Run this only with test accounts and made-up learner details. Do not use a real child's personal data.

1. Confirm the phone is online and sign in as **Student Test Account A**.
2. Complete one short lesson or quiz. Confirm the page reports whether the score was saved to the cloud or kept locally.
3. Turn on Airplane mode. Complete another short quiz while Account A is still signed in. The expected result is a device save and a queued cloud-sync message; the app must not claim that the cloud save has already completed.
4. While still offline, do not clear browser data or site storage. Restore internet access.
5. Sign out of Account A and sign in as **Student Test Account B**. Refresh the parent/teacher views for Account B. Confirm Account A's queued record does not appear under Account B.
6. Sign out of B and sign back in as Account A. Allow the page to finish loading, or complete one more small lesson. The pending queue should retry only for Account A.
7. Sign in to the linked Parent Test Account A. Refresh cloud progress and confirm the queued score appears under the correct child.
8. If testing guardian-consent denial, first use a separate student test account with no active guardian relationship. Its progress should remain queued. After the guardian completes the approved consent flow, sign back in as that same student and confirm retry succeeds.
9. Check that older anonymous local history is not silently uploaded to either test account.

**Pass conditions:** no Account A record appears under Account B; no anonymous legacy record is uploaded; the cloud record appears only after the same student account is verified and the existing RLS/guardian relationship allows it; a pending item is not described as cloud-saved before confirmation.

The automated CI suite covers 17 helper-level cases. This phone session is still required because simulated database clients do not replace real Android, browser-storage, Supabase-session and RLS testing.

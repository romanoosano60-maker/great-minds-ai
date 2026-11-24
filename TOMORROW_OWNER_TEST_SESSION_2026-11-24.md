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

# Translation progress — 5 November 2026

## Completed in the shared language script
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for visible Advanced Learning Studio controls and section labels: learning dashboard, practice check-in, daily plan, multilingual phrase practice, voice controls, real-world challenges and safe-learning labels.
- Added the same five languages for visible Reading & Writing controls and labels: story controls, comprehension questions and choices, writing challenge, save/clear controls and navigation.
- Added the same five languages for visible Vocabulary controls and labels: topic names, word-practice instructions, sentence input and check control.
- English story passages and English vocabulary examples remain in English where the learning objective is English practice.

## Verification and limitations
- The new translation dictionaries and representative source strings were confirmed present in `gm-language.js`.
- This is a source-level update, not proof of correct rendering on every phone.
- Dynamic quiz feedback, every lesson passage, microphone permissions, spoken output, right-to-left layout and translation quality still need browser/Android checks and fluent-speaker review.
- No Supabase settings or Cloudflare deployment were changed.

## Additional update — English learning and dictionary pages
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for visible navigation, lesson headings, instructions, music controls, spelling practice, reading-comprehension controls, writing-save privacy notes and dictionary controls on the English Language, English Story Studio and Little Learners Dictionary pages.
- English alphabet examples, story passages, vocabulary meanings and target-language practice content remain in English where they are the material being learned.
- The updated shared language script passed a JavaScript syntax check after the additions.
- The user confirmed the previous Advanced Learning Studio, Reading & Writing and Vocabulary pages display correctly on their Android device. The newly updated English and dictionary pages still need a separate on-device language-switch check.

## Additional update — Home Science and Social Studies
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for the Home Science topic cards, practical safety reminders, quiz questions and answer choices.
- Added the same five languages for Social Studies community topics, explanations, quiz prompt and discussion activity.
- The shared language script passed a JavaScript syntax check after this update.
- These new translations are committed to GitHub. Their on-device display and the translated quiz feedback still need user testing.

## Additional update — History Explorer and World Atlas
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for the History Explorer timeline, evidence-source explanations, quiz controls and reflection prompt.
- Added the same five languages for World Atlas headings, continent descriptions, country-capital labels, oceans and landmarks, quiz prompt and learning reminder.
- Proper names of continents, countries and major places remain unchanged where appropriate.
- The shared language script passed a JavaScript syntax check after the additions.
- Android rendering and translated quiz interaction still require a device check.

## Additional update — Learning Games and General Knowledge
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for game selection, reward labels, level descriptions, certificate and privacy notes, and progress controls.
- Added the same five languages for General Knowledge lesson headings, question prompts, answer choices and navigation.
- The shared language script passed a JavaScript syntax check after the additions.
- The app's saved rewards and quiz logic were not changed; only language dictionary entries were added.
- On-device checks are still required for translated labels and dynamic feedback.

## Additional update — Computer Studies
- Added Hindi, Bengali, Tamil, Telugu and Marathi translations for the seven Computer Studies lesson headings, computer basics, typing instructions, internet-safety reminder, coding activity, AI and robotics explanations, and quiz controls.
- The shared language script passed a JavaScript syntax check after the additions.
- English typing-practice content remains intentionally distinct where it is part of the activity. The page still needs an Android check for translated layout and dynamic robot/quiz messages.

## Additional update — selected-language spoken reading
- Added a shared **🔊 Listen** control beside the language selector on pages that load `gm-language.js`.
- The control reads the page's visible main content using the currently selected language, rather than always requesting English.
- Configured speech language tags for English (en-US), Hindi (hi-IN), Bengali (bn-BD), Tamil (ta-IN), Telugu (te-IN), Marathi (mr-IN), German (de-DE), French (fr-FR), Spanish (es-ES), Chinese (zh-CN) and Arabic (ar-SA).
- The browser selects an installed matching voice where available and otherwise requests the selected language tag from the device's speech engine.
- JavaScript syntax check passed after the change.
- Important limitation: this uses the Android/browser text-to-speech voices; it does not install new voices or guarantee that every device has every language voice. Test voice playback on the user's Android phone.


## Spoken language follow-up — 5 November 2026

- Found the reason lesson audio could remain English: several lesson-level Listen buttons call page-specific `speak(...)` functions with hard-coded English sentences, bypassing the shared language reader.
- Updated `gm-language.js` so those existing `speak(...)` calls use the selected language and read the translated text visible in the tapped lesson card, rather than the hard-coded English argument.
- The shared reader selects a matching installed voice for Hindi, Bengali, Tamil, Telugu, Marathi, German, French, Spanish, Chinese, Arabic or English. If the selected voice is unavailable, it reports that rather than deliberately substituting English.
- Added a cache-busting version to the Home Science page's shared script reference so the latest fix is requested.
- GitHub source changes committed; Android playback remains unverified and must be tested on the device.


## Home page speech support — 5 November 2026

- Added a 🔊 Listen control beside the home page language selector. It reads the visible home page content using the selected language's matching installed browser voice.
- Home page voice selection supports the same locale set as the shared language reader: English, Hindi, Bengali, Tamil, Telugu, Marathi, Chinese, German, Spanish, French and Arabic.
- The home page reader does not intentionally fall back to English when a matching voice is unavailable; it asks the user to install the selected language voice.
- Previous shared-reader improvement also routes lesson-level `speak(...)` calls through the selected-language reader and reads the tapped lesson card's visible translated text.
- GitHub source changes committed. Real-device audio tests are still pending.

## Follow-up: English-first learning with optional language support
- Confirmed product rule: English is the default language and the main learning curriculum. Learners may opt into a supported language for translated lesson text and explanations; changing language does not change the subject.
- Updated English Story Studio narration to use the shared selected-language reader. Individual vocabulary and spelling-word buttons continue to pronounce the English target words in English.
- Added opt-in Hindi, German, French and Arabic translations for the Little Seed story, vocabulary definitions, reading-comprehension questions and key page instructions. English remains the default.
- Fixed escaped regular-expression syntax in the shared language reader and verified JavaScript parsing for the shared language file, home page, Home Science page and English Story Studio.
- Refreshed the Home Science shared-script cache version.
- GitHub source changes are committed. Actual Android/browser rendering, translated speech voice availability and every lesson translation still require device testing and broader page-by-page translation coverage.


## Additional rectification pass — 5 November 2026

- Updated the read-aloud buttons on `english-extra.html`, `math-extra.html`, `science-extra.html`, `social-extra.html`, and `computer-extra.html` to use the shared language reader when it is available. This prevents those extra lesson buttons from forcing English after a learner selects another supported language.
- Updated `reading-writing.html` story narration to use the shared language reader, while retaining its English fallback only for cases where the shared reader is unavailable.
- Corrected the AI Teacher greeting shown on first load: it now displays “Hello! How are you?” to match the English-first default instead of showing a German greeting while English is selected.
- Re-fetched the seven changed pages and parsed every embedded JavaScript block successfully.
- Audited the connected student, teacher, parent, dashboard, profile, homework, and games pages: each includes the shared language script. The International Classrooms page also includes it. AI Teacher retains its explicit teaching-language selector, with English first/default.

Device-level voice playback, installed Android voice availability, and visual/functional testing in the live browser remain pending.


## Site navigation and graphics audit — 5 November 2026

- Checked local page links across all 52 HTML pages in the repository. No missing internal page targets were found. The two links to `GREAT_MINDS_MASTER_GUIDE.md` are valid repository files.
- Checked the 3D graphics gallery: its main entry page redirects to the consolidated gallery, and the consolidated gallery contains 15 embedded WebP data images with 15 non-empty alt descriptions. The artwork does not rely on separate relative image files.
- These are source-level checks. They do not replace opening every page on an Android browser or testing each interactive control.


## Further rectification and clarity checks — 5 November 2026

- Ran additional source-level checks across the connected dashboards, student/parent/teacher pages, classroom pages, learning modules and subject pages. The inspected inline JavaScript blocks parsed successfully; no duplicate HTML IDs or missing literal `getElementById(...)` targets were found in the inspected pages.
- Confirmed the inspected pages include mobile viewport metadata.
- Rechecked the Supabase browser configuration: it contains the project URL and a publishable key only. No service-role key or AI provider secret was found in that configuration. The publishable key is public by design and is safe only when database RLS and policies are correctly enforced; this source check does not prove live database security.
- Confirmed `ai-teacher-config.js` intentionally keeps the live AI endpoint empty until a secure Worker is deployed. The AI Teacher page therefore runs in offline demonstration mode with prepared examples. Updated the subject status message so this limitation is explained immediately when a learner selects a subject.
- Confirmed the Advanced Learning page labels its current progress record as device-local and demo-only. Dictionary and Writing Studio pages also explain when practice is saved only on the current device.
- No cloud credentials, live child records, or account data were created or changed during this GitHub-only audit.
- Remaining: live Android/browser testing, actual voice playback, real authentication and RLS tests, classroom cross-device tests, and deployment of the secure AI endpoint. Do not treat source-level checks as proof of production readiness.


## Further international classroom and dashboard review — 5 November 2026

- Rechecked the international classroom page's sign-in, account-purpose selection, classroom creation/join request, guardian-consent code, consent redemption/revocation, membership display, and realtime refresh paths.
- Confirmed the standalone Safe International Classroom V3 page clearly labels itself as a local-only demonstration and explicitly says its parent approval, teacher controls, and messages are not real identity checks or live student connections.
- Rechecked connected student, parent, and teacher dashboard pages: local browser records are visibly separated from cloud records; cloud views require sign-in and rely on database policies for access filtering.
- Rechecked the shared homework client: it requires authenticated users, validates assignment fields and score bounds, and treats database row-level security as the authorization boundary.
- Small cleanup: simplified the guardian consent RPC response handling to remove a duplicated fallback property reference.
- These are source-level checks only. Real guardian consent, teacher approval, cross-device classroom membership, realtime updates, and child-safety workflows remain unverified until tested with separate accounts on devices.

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

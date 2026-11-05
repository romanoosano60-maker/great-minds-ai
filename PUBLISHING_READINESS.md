# Great Minds AI — Business & Publishing Readiness Plan

Last reviewed: 5 November 2026
Status: PREPARATION IN PROGRESS — NOT APPROVED FOR STORE SUBMISSION

## Product and release strategy

Keep the existing Great Minds AI rocket home screen as the single entry point. Release only after the app has a tested, secure account model and a clearly scoped first version.

Recommended release sequence:
1. Finish and test the core learning experience and student progress.
2. Complete parent/guardian account linking, classroom safeguards and child-data security.
3. Decide the first-release feature set; keep unverified AI voice and child-to-child messaging disabled.
4. Package and test the app for the chosen distribution channel.
5. Complete store declarations, privacy disclosures, age rating, support and publisher information.
6. Submit for review only after owner approval.

## What is prepared in this repository

- `STORE_LISTING_DRAFT.md`: proposed store name, short description, full description and asset/owner decision list.
- `PRIVACY_POLICY_WORKING_DRAFT.md`: internal privacy-policy starting draft with explicit unresolved data-flow and legal review blockers.
- Existing `GREAT_MINDS_MASTER_GUIDE.md` and `PROJECT_STATUS.md`: technical integration and testing records.

These are drafts and planning documents, not proof of legal compliance or store approval.

## Google Play requirements to complete

Use the official [Prepare your app for review](https://support.google.com/googleplay/android-developer/answer/9859455) guidance and [Families policy](https://support.google.com/googleplay/android-developer/answer/9893335).

- Create/confirm the Play Console publisher account and app record.
- Produce a signed Android App Bundle (AAB) using a supported Android packaging/build process. The current GitHub Pages website is not itself an AAB.
- Provide a publicly accessible, app-specific privacy-policy webpage, linked both in the store listing and inside the app. The policy must accurately describe data collection, use, sharing and retention.
- Complete App content declarations: target audience, content rating questionnaire, ads declaration, app access instructions, data safety and any applicable sensitive-permission declarations.
- If children are in the target audience, comply with Google Play Families requirements, including age-appropriate content, accurate declarations and applicable restrictions on SDKs, ads and data handling.
- Test the release build, provide reviewer access instructions where login is required, and check policy declarations whenever the app changes.

## Apple App Store requirements to complete

Use the official [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Kids guidance](https://developer.apple.com/kids/) and [submission guidance](https://developer.apple.com/app-store/submitting/).

- Confirm Apple Developer Program membership and the legal seller/publisher identity.
- Create a signed iOS build/archive using an Apple-supported build environment and upload it through the supported submission workflow.
- Complete app metadata, screenshots, age-rating questionnaire, privacy details and accessibility disclosures.
- Provide an accessible privacy-policy URL in App Store Connect and within the app.
- Decide whether to apply for the Kids Category. If so, select the appropriate age band and meet the parental-gate and Kids Category restrictions. Apple's Kids Category age bands are 5 and under, 6–8, and 9–11; the intended audience and product features must fit honestly.
- Review rules for external links, purchases, advertising, analytics, user-generated content, chat and AI-generated content. If user-generated content or communication is introduced, required filtering, reporting, blocking and response processes must exist.

## Child-safety and privacy release gates

- Confirm the exact intended age range and every launch territory.
- Map every data field and service: authentication, database, hosting, AI, speech, analytics, crash reporting, support and any other SDK/vendor.
- Minimise child data; use nicknames where possible and do not expose children's email addresses, phone numbers or precise location to peers.
- Verify guardian linking and consent; do not treat a consent code alone as independent proof of legal guardianship.
- Test RLS and role restrictions using separate approved and unapproved teacher, guardian, enrolled student and unrelated student accounts.
- Complete account access, correction, consent revocation and deletion workflows, including retention and backups.
- Keep child-to-child messaging disabled until supervised communication, moderation, reporting, blocking, escalation, retention and audit controls are implemented and tested.
- Keep live AI voice disabled until its server-side endpoint, safety controls, provider disclosures, retention and parent-facing controls are tested.
- Do not place Supabase service-role keys or AI provider secrets in browser code or public repositories.
- Do not add third-party advertising or analytics to a child-focused release until the applicable platform and legal requirements have been assessed.

## Business and monetization decisions — owner approval required

- Publisher/legal business name and country of registration.
- Public support and privacy contact details.
- Launch countries and supported languages.
- Free, paid, subscription or adult-managed in-app purchase model.
- Subscription amount, billing period, trial and cancellation terms (not yet decided).
- Whether the first release will be ad-free (recommended as the simpler child-safety starting point; owner decision required).
- Refund, support, account closure and data deletion processes.

Do not assume a business entity exists, invent contact details, set prices, or activate payments without the owner's instructions.

## Current technical blockers before submission

- The current product is a GitHub Pages web app; signed native Android/iOS packages have not been produced or tested.
- Supabase account linking, guardian/student real-account journey and cross-device learning-progress sync remain unverified.
- The lesson pages currently have local/demo progress writes; cloud progress integration and real JWT tests remain pending.
- AI Teacher live backend route and voice round-trip remain pending.
- International classroom end-to-end consent, membership, approval and cross-device tests remain pending.
- Final child-safety, accessibility, privacy, store assets and legal review remain pending.

## Owner approval checklist

The owner must confirm:
- [ ] Intended age range
- [ ] First launch countries/languages
- [ ] Publisher/legal identity and contact
- [ ] Monetization approach and prices
- [ ] Ad-free first release or other approved approach
- [ ] Final privacy policy after data-flow and legal review
- [ ] Store screenshots/icon and final listing text
- [ ] Permission to submit the app for review

## Official policy references checked 5 November 2026

- Google Play: [Prepare your app for review](https://support.google.com/googleplay/android-developer/answer/9859455)
- Google Play: [Families policy requirements](https://support.google.com/googleplay/android-developer/answer/9893335)
- Google Play: [Target audience and app content](https://support.google.com/googleplay/android-developer/answer/9867159)
- Apple: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Apple: [Design safe and age-appropriate experiences for kids](https://developer.apple.com/kids/)
- Apple: [Submitting your app](https://developer.apple.com/app-store/submitting/)

Platform policies can change. Re-check the official requirements immediately before submission.

## Status rule

This plan and its drafts are prepared. They do not mean that either store account is configured, a native build exists, legal compliance has been established, or the app is approved. Mark each item complete only after evidence and testing.

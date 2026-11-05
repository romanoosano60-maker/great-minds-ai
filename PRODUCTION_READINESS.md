# Great Minds AI — Production Readiness Checklist

Last reviewed: 4 November 2026

This document separates source-code work from live-service and device verification. A page that works with browser storage is a prototype, not a connected account or international classroom.

## Confirmed from repository review

- The root app and learning subject pages are present.
- The Supabase browser configuration uses the project's URL and a publishable key. A publishable/anon key is designed to be visible in browser code; it is not an authorization mechanism.
- Student, Teacher and Parent "Connected" dashboards currently use the same `localStorage` demo record. They explicitly warn that this is not a secure account system.
- The international classroom V3 page explicitly identifies itself as a local demonstration. Its messages and approvals remain in this browser.
- Group Learning is a local quiz demonstration, not a live multi-country classroom.
- The Supabase connection test page is separate from the demo dashboards. Its existence does not establish that the dashboards are integrated.
- No service-role key was present in the reviewed `supabase-config.js`. Never put a service-role or secret key in GitHub Pages or any browser JavaScript.

## Required before real student accounts

- [ ] Configure Supabase Auth providers and allowed redirect URLs for the production GitHub Pages origin.
- [ ] Create and verify separate teacher, parent and student authentication flows.
- [ ] Define trusted role assignment. A user must not be able to make themselves an approved teacher by editing browser data or choosing a role in a form.
- [ ] Enforce role and record ownership with Row Level Security (RLS) on every table exposed through the Data API.
- [ ] Verify classroom membership server-side and ensure a teacher can only manage classrooms they own or are explicitly assigned to.
- [ ] Link a child account to a verified parent/guardian consent record before enabling classroom participation.
- [ ] Minimise child data; use nicknames where possible. Do not expose email, phone, precise location or private profile data to other students.
- [ ] Test access using separate approved teacher, unapproved teacher, parent and student accounts. Confirm forbidden reads and writes fail.
- [ ] Review Realtime subscriptions so each user receives only events for classrooms they are authorized to access.
- [ ] Add reporting, blocking, moderation, audit logging, retention/deletion procedures and an adult escalation path before enabling child-to-child messaging.
- [ ] Test cross-device and cross-country access with real accounts and a controlled test classroom.

## Required before AI Teacher is live

- [ ] Deploy a server-side endpoint that holds the AI provider secret; never call the AI provider with a secret embedded in browser code.
- [ ] Authenticate requests and apply per-user and per-child rate limits.
- [ ] Minimise prompt data and avoid sending child identifiers or sensitive profile information.
- [ ] Add age-appropriate response rules, abuse/safety handling, logging limits and a parent/teacher escalation route.
- [ ] Test microphone permissions, speech recognition, text-to-speech and stop controls on supported Android browsers.
- [ ] Verify the actual backend response path end-to-end. A microphone or speech button alone is not an AI conversation.

## Required before publishing

- [ ] Test every home-screen link and every primary action on an Android phone.
- [ ] Check responsive layout, keyboard access, focus states, readable contrast and screen-reader labels.
- [ ] Test offline/slow-network behaviour and meaningful error messages.
- [ ] Confirm privacy policy, child-safety policy, parent consent, terms, support contact and data deletion process.
- [ ] Confirm legal requirements for each intended launch country and app-store child-directed app policies.
- [ ] Complete security review, backup/restore test and production monitoring.
- [ ] Complete Play Store and Apple App Store assets, declarations, age rating and review submissions.

## Current truthful status

The learning pages and several local dashboard/classroom demonstrations are built. The repository's Supabase configuration and connection-test page exist. However, live authentication, trusted role approval, parent consent, RLS behaviour under real accounts, cross-device classrooms, realtime messaging and the AI backend have not been independently verified in production. Do not describe these features as live until the tests above pass.

A successful GitHub Pages deployment confirms that the site was deployed; it does not prove that Supabase, AI services, or every page works at runtime.


## 2026-11-05 implementation update

The AI Teacher now has a configurable frontend connection and a Cloudflare Worker source template in cloudflare/worker.js. This does not mean the AI service is deployed. Before live use, configure the Worker secret and variables, the per-user rate-limit binding, set the deployed /ask URL in ai-teacher-config.js, and test with an adult-controlled student account that has a valid active guardian link. The Worker is not a replacement for a full child-safety programme.

The Mathematics, English, Science, Social Studies, History, Geography, Home Science, Computer Studies and General Knowledge lesson quizzes use the cloud progress helper. connected-progress.html now displays RLS-filtered cloud progress records separately from local demo points and stars. connected-practice.html also offers its results to secure cloud progress. Real-account and cross-device tests are still required.

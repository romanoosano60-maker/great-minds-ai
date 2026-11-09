# Great Minds AI — Interim data-retention safety rule

## Effective interim rule
**No automatic purge or scheduled deletion of child, guardian, classroom, homework, learning-progress, consent, or security records is authorized at this stage.** Keep current records under existing access controls until a documented retention schedule is approved. This is a temporary safety hold, not a claim that indefinite retention is legally acceptable.

## Why no durations are set
Great Minds AI is intended for international use. Retention periods and deletion rights can differ by the countries where children, guardians, teachers, and the operator are located. A universal number of days cannot responsibly be selected without identifying launch territories and obtaining appropriate privacy/legal review.

## Decisions required before launch
For each territory and data category, record:
- applicable jurisdiction and legal basis;
- exact data category and purpose;
- approved retention period and event that starts the clock;
- who may request deletion and how authority is verified;
- exceptions for disputes, safeguarding, fraud prevention, or legal holds;
- deletion method for production databases, logs, backups, and processors;
- accountable owner and next review date.

## Data categories awaiting an approved schedule
- Auth identity and account metadata;
- parent/guardian relationship and consent evidence;
- student learning progress and quiz results;
- classroom membership and classroom records;
- homework assignments and submissions;
- security, invitation-attempt, and support records;
- backups and third-party processor copies.

## Current operational restriction
The deployed account-deletion Edge Function only accepts eligible adult deletion **requests** and never deletes user accounts or learning data. A human review and a separately approved server-side deletion procedure are required. Do not add cron jobs or automatic cleanup until the schedule is approved.

## Required product-owner decision
Before automatic retention enforcement is implemented, confirm the first launch countries/territories (including whether UAE is in scope) and obtain a qualified review of the schedule for those jurisdictions.

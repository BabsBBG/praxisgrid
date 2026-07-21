# MILESTONES.md

## Current Approved Milestone

M5 continuation is approved through M5 only. M6 is not approved.

## M5.0 PraxisGrid Foundation

Status: complete.

- Rename product to PraxisGrid.
- Use tagline: Learn it. Practise it. Prove it.
- Use provider-neutral certification disclaimers.
- Preserve legacy Azure Quest local storage through migration fallback.
- Rename GitHub repo to `BabsBBG/praxisgrid`.
- Remove founder-specific project fixtures from the Career Lab.
- Mark AZ-500 as RETIRING on 2026-08-31, preserve history, and recommend SC-500 for new activation.
- Add role foundations for MAIN_ADMIN, CONTENT_REVIEWER, SUPPORT_ADMIN, and USER with audit logging.
- Keep demo/seed question-bank warnings visible until approved source-grounded replacement content is broad enough.

## M5.1 Source-Grounded Pipeline Contract

Status: complete.

- Add structured validator for source-grounded question records.
- Require approved questions to have source chunk, Microsoft Learn URL, answer option, explanation, why-wrong coverage, approval timestamp, and clean generation-run controls.
- Track admin-only batch limits, source chunk limits, budget caps, failure logs, and kill-switch-blocked runs.
- Add Supabase reviewer/admin policies and review-event audit table for source docs, chunks, generation runs, candidates, and approved questions.
- Keep draft/rejected candidates out of learner-serving helpers.

## M5.2 Duplicate Detection Gate

Status: complete.

- Add a dedicated duplicate validation script using the same typed data modules and duplicate helpers as the app.
- Check normalized seed/demo question fingerprints.
- Strictly fail approved source-grounded duplicate fingerprints at validation and approved-serving time.
- Strictly fail globally duplicated approved source-grounded duplicate keys.
- Wire duplicate and source-grounding validation into CI.
- Keep seed/demo content labelled as non-production even if duplicate checks pass.

## Not Approved

- M6.
- GitHub write permissions.
- Private repository import.
- Client-side LLM calls or frontend LLM API keys.
- Live LLM question generation during attempts.
- Payments.
- Native mobile apps.
- Voice/audio grading.
- Community-submitted questions.

# M5.1 Source Pipeline Contract Report

Date: 2026-07-21

## Scope

M5.1 hardens the source-grounded question pipeline scaffold without building the M6 admin UI or running live LLM generation.

## Implemented

- Added structured source-grounded question validation.
- Required approved questions to include source chunk linkage, Microsoft Learn URL, answer mapping, explanation, why-wrong coverage, and approval timestamp.
- Added generation-run controls for admin-only execution, batch question limits, source chunk limits, budget caps, failure logs, and kill-switch-blocked runs.
- Added a pipeline summary shown in the existing Domain Quizzes source preview.
- Added Supabase review policies and `question_review_events` audit table for role-gated content review.
- Added approved-question insert auditing and candidate update guards.
- Aligned Supabase generation-run schema with batch limits, source chunk limits, admin-only execution, budget caps, and kill-switch controls.
- Strengthened source-grounding tests and validation script.

## Preserved

- Demo/seed question bank remains clearly labelled.
- Draft candidates remain blocked from learner-serving helpers.
- No client-side LLM calls were added.
- No live question generation was added to quiz/certification-run paths.
- No M6 admin UI was added.

## Validation

Focused checks passed:

- `npm run validate:source-grounding`
- `npm test -- src/data/sourceGrounding.test.ts`, 7 tests
- `npm run lint`

Full checks passed:

- `npm test`, 10 test files and 21 tests
- `npm run validate:harness`
- `npm run validate:questions`
- `npm run validate:source-grounding`
- `npm run check:routes`
- `npm run build` with the known Vite large chunk warning

## Review Fixes

- Replaced learner-facing pipeline ops terms with trust-language: reviewed preview items, drafts withheld, source-linked, and generation disabled during quizzes.
- Replaced brittle source-grounding validation regex with per-candidate block parsing.
- Added validator checks for duplicate key, critic notes, and source URL/source chunk mismatch.
- Added database checks for approved candidate/source/run linkage before approved-question insert.

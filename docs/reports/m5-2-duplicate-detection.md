# M5.2 Duplicate Detection Report

Date: 2026-07-22

## Scope

M5.2 adds a duplicate detection gate for the M5 source-grounded question pipeline without replacing the seed/demo bank.

## Implemented

- Added `scripts/validate-duplicates.mjs` using `esbuild` to import structured TypeScript/JSON app data instead of scraping source text.
- Added `npm run validate:duplicates`.
- Added typed duplicate fingerprint helpers in `src/utils/questionQuality.ts`.
- Normalized seed/demo question fingerprints by cert, stem, and option set.
- Strictly fails approved source-grounded duplicate fingerprints in validation and approved-serving code.
- Strictly fails approved source-grounded duplicate keys globally.
- Added duplicate and source-grounding validation to GitHub Actions CI.
- Added tests for option-order-stable fingerprints, duplicate value detection, and approved source-grounded duplicate refusal.

## Preserved

- Seed/demo question bank remains labelled as demo/seed.
- Passing duplicate checks does not mark static questions as production-quality.
- No live generation, admin UI, or M6 work was added.

## Validation

Validation passed:

- `npm install --legacy-peer-deps`
- `npm run lint`
- `npm test`
- `npm run validate:harness`
- `npm run validate:questions`
- `npm run validate:source-grounding`
- `npm run validate:duplicates`
- `node scripts/validate-duplicates.mjs --strict`
- `npm run check:routes`
- `npm run build`

## Subagent Review

- UI/UX Revamp Lead: passed with no UI blockers because M5.2 is a pipeline quality gate and preserves trust copy.
- Senior Software Engineer: initially blocked on global duplicate keys, serve-time duplicate enforcement, regex parsing, and helper duplication. All findings were fixed.
- QA and Product Lead: initially blocked on global duplicate keys and missing CI coverage. Both findings were fixed.

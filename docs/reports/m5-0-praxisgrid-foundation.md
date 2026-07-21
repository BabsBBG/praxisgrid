# M5.0 PraxisGrid Foundation Report

Date: 2026-07-21

## Scope

M5.0 covers the PraxisGrid rename, provider-neutral assessment trust copy, storage migration, repo rename status, founder-data removal, AZ-500 retirement transition, and role foundation.

## Result

Implementation passed final install, lint, test, validation, and build checks.

## Completed Changes

- Renamed live product surfaces and metadata to PraxisGrid.
- Added approved tagline and product description constants.
- Replaced Microsoft-only non-affiliation copy with provider-neutral disclaimer copy.
- Preserved demo/seed question-bank warning.
- Added `praxisgrid:*` local persistence keys with fallback/copy migration from legacy `azure-quest:*` keys.
- Renamed GitHub repo to `BabsBBG/praxisgrid` and updated local origin.
- Marked AZ-500 as RETIRING with a 2026-08-31 retirement date and SC-500 replacement guidance.
- Removed founder-specific project fixtures from Career Lab data.
- Added role foundation migration for MAIN_ADMIN, CONTENT_REVIEWER, SUPPORT_ADMIN, and USER.

## Review Notes

- UI/UX Revamp Lead: focus remains professional, Azure-blue, and provider-neutral; final visual browser review is intentionally deferred because the user asked not to provide screenshots unless requested.
- Senior Software Engineer: legacy storage compatibility is preserved instead of destructive migration; role bootstrap remains server-controlled.
- QA and Product Lead: AZ-500 history remains visible, new activation is blocked, and demo/seed copy remains required on assessment surfaces.

## Validation

- `npm install --legacy-peer-deps`: passed.
- `npm run lint`: passed.
- `npm test`: passed, 10 test files and 18 tests.
- `npm run validate:harness`: passed.
- `npm run validate:questions`: passed, 600 seed/demo questions loaded.
- `npm run validate:source-grounding`: passed, 3 approved questions and 3 source chunks.
- `npm run check:routes`: passed.
- `npm run build`: passed with the known Vite large chunk warning.

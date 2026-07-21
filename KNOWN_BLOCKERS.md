# KNOWN_BLOCKERS.md

## Production question-bank blocker

The current static question bank is not production-trusted.

Known blocker:

- The bank may contain repeated questions, repeated patterns, and weak explanations.
- The bank is not yet source-grounded.
- The bank must not be presented as official-quality practice content.

Blocked until:

- source-grounded Microsoft Learn ingestion exists
- generated questions trace to source chunks
- duplicate checks pass
- human/admin review approves questions

## M1.5 UI question-bank warning blocker

M0/M1/M1.5 completion is blocked unless the UI visibly labels the current question bank as demo/seed content.

Required copy or equivalent:

"Demo practice bank: These questions are seed content for testing the platform. They are not official certification-provider exam questions and are not yet fully source-grounded or reviewed."

## M5.0 production URL rebrand blocker

The GitHub repository has been renamed to `BabsBBG/praxisgrid`, and product surfaces now use PraxisGrid.

Still blocked/deferred:

- Production Vercel project/domain still uses the historical `azure-quest-pwa.vercel.app` name until a separate Vercel project/domain rename or alias migration is approved and completed.

## Cost-control blocker

Before M4/M5 can launch at production scale, complete backend cost controls must exist.

The current M4 implementation includes public-read-only import, no write scopes, local/server import caps, and content-hash caching. The current M5 implementation includes static approved-only serving, structured validation, role-gated review policy scaffolding, and review-event audit tables.

Still blocked for production-scale live generation:

- GitHub repo import at scale
- project story generation
- Microsoft Learn ingestion
- embeddings
- question generation
- automated critic pass

Required before launch:

- per-user import limits
- per-user generation limits
- admin batch caps
- content-hash caching
- server-side-only LLM calls
- kill switch
- failure logging

Any feature that calls an LLM, imports GitHub repositories, generates questions, creates project stories, embeds content, or processes Microsoft Learn source material must include rate limits, content-hash caching, server-side secret handling, a budget cap or kill switch, and failure logging before it is considered complete.

## Supabase application blocker

M3 migrations exist for profiles, quiz attempts, interview sessions, question flags, imported projects, and source-pipeline tables.

Still blocked until applied in the target Supabase project:

- production cloud sync verification
- cross-device attempt history verification
- cross-device interview history verification
- production imported project sync verification

## GitHub blocker

Public GitHub import is approved and implemented for M4.

Still blocked:

- GitHub write scopes
- private repository import
- broad repository permissions
- GitHub OAuth beyond minimal future read-only needs

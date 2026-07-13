# SECURITY.md

## Security principles

- No secrets in frontend code.
- No LLM API keys in client-side code.
- No GitHub write permissions in v1.
- No unnecessary OAuth scopes.
- User data must be protected by RLS once Supabase is added.
- LLM-generated content must be labelled as draft until reviewed or approved.
- Exam questions must not be represented as official Microsoft questions.

## Microsoft disclaimer

The app must show:

"Not affiliated with or endorsed by Microsoft."

This must appear on:

- Footer.
- Practice start page.
- Mock exam start page.
- Question review page where appropriate.

## GitHub permissions

For v1:

- Prefer public repo import.
- Do not request write scopes.
- Do not request private repo access unless explicitly approved in a future milestone.

## LLM safety

LLM calls must be:

- Server-side only.
- Rate-limited.
- Cached where possible.
- Logged for failure.
- Blocked by budget caps for batch jobs.

## Cost, abuse, and rate-limit controls

LLM-backed and GitHub-backed features introduce financial and abuse risk.

Any feature that calls an LLM, imports GitHub repositories, generates questions, creates project stories, embeds content, or processes Microsoft Learn source material must include rate limits, content-hash caching, server-side secret handling, a budget cap or kill switch, and failure logging before it is considered complete.

Controls required before public launch:

- GitHub repo import capped per user per day.
- Project story generation capped per user per day.
- Batch question generation capped per admin run.
- No client-side LLM API keys.
- No frontend calls directly to LLM providers.
- Cache LLM outputs by stable content hash.
- Cache embeddings by source chunk hash.
- Do not regenerate unchanged source content.
- Add admin kill switch for generation jobs.
- Log generation attempts, failures, and token/cost estimates where possible.

## Current known security limitation

Current static content is local/demo content only.

The current app does not yet have:

- Supabase auth
- RLS
- server-side LLM calls
- source-grounded question approval
- per-user cloud storage

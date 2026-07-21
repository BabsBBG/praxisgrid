# AGENTS.md - PraxisGrid Operating Manual

## Mission

Build a public, free-to-use PWA for source-grounded technical capability, certification practice, and career readiness.

The product has two halves:

1. Practice and certification-run engine for SC-300 and SC-500, with AZ-500 preserved as a retiring historical path.
2. Career Lab engine that turns public GitHub projects into interview-ready stories, pitches, STAR answers, architecture walkthroughs, and mock interview simulations.

PraxisGrid tagline: Learn it. Practise it. Prove it.

PraxisGrid description: PraxisGrid is a source-grounded technical capability platform connecting official learning, certifications, approved assessments, hands-on practice, real project evidence, personalized interviews, and technical career paths.

This product is an independent learning platform and is not affiliated with, endorsed by, or sponsored by Microsoft, Amazon Web Services, Google Cloud, or other certification providers.

## Current approved milestone

M5 continuation - M5.0 PraxisGrid rename, provider-neutral trust copy, AZ-500 retirement transition, roles foundation, M2 Career Lab, M3 Supabase foundation, M4 public GitHub import, and M5 source-grounded question pipeline scaffold.

The user explicitly approved continuing from M1.6 through M5.

Approved work now:

- Rename Azure Quest to PraxisGrid across product surfaces, PWA metadata, storage namespace, and documentation while preserving legacy storage migration.
- Expand Career Lab with the complete track set, 30-minute mock interviews, typed answers, coaching notes, self-score rubric, and local/cloud interview history.
- Mark AZ-500 as retiring on 2026-08-31, block new activation, preserve historical attempts/progress, and recommend SC-500 without transferring progress.
- Add role foundations for MAIN_ADMIN, CONTENT_REVIEWER, SUPPORT_ADMIN, and USER with server-controlled bootstrap and audit logging.
- Add Supabase data foundation for profiles, quiz attempts, interview sessions, question flags, imported projects, and source-pipeline tables with RLS.
- Preserve logged-out local/demo mode through Zustand/localForage.
- Add question flag persistence while keeping practice/exam answers hidden until completion.
- Add public GitHub project import with no write scopes, no private repo access, README/language import, content-hash caching, rate limits, server-side draft story creation, and review status.
- Add source-grounded question pipeline scaffolding with Microsoft Learn source docs, source chunks, approved-only serving, duplicate detection, and validation.
- Keep the existing static question bank visibly labelled as demo/seed content until the approved source-grounded pool is complete enough to replace it.
- Preserve provider-neutral non-affiliation disclaimer.
- Update source-of-truth docs, known failures, blockers, tests, and validation scripts.

Still not approved:

- GitHub write permissions.
- Private repository import.
- Client-side LLM calls or frontend LLM API keys.
- Live LLM question generation during quiz/exam attempts.
- Production replacement of the static question bank before the approved source-grounded pool is complete.
- Payments, native mobile apps, voice/audio grading, or community-submitted questions.

The roadmap is context only. Complete only the current approved milestone.

## Source of truth order

When files conflict, trust them in this order:

1. AGENTS.md
2. PRODUCT_SPEC.md
3. ACCEPTANCE_CRITERIA.md
4. ARCHITECTURE.md
5. SECURITY.md
6. CURRENT_STATE.md
7. Existing implementation

If code conflicts with source-of-truth docs, update the code or report the mismatch.

## Subagent operating model

PraxisGrid uses three named subagent roles for meaningful product work. They are advisory by default unless the user explicitly asks for implementation delegation.

Use subagents when the work affects multiple surfaces, changes user experience, changes core exam behavior, or prepares a milestone handoff.

Required subagents:

1. UI/UX Revamp Lead
2. Senior Software Engineer
3. QA and Product Lead

Authoritative role briefs live in:

- `docs/agents/ui-ux-revamp-lead.md`
- `docs/agents/senior-software-engineer.md`
- `docs/agents/qa-product-lead.md`

Coordination rules:

- The main agent owns final decisions, integration, and source-of-truth updates.
- Subagents must not override AGENTS.md, PRODUCT_SPEC.md, SECURITY.md, or ACCEPTANCE_CRITERIA.md.
- Subagents must not start future milestones without explicit approval.
- Subagents must keep the demo/seed question-bank warning visible.
- Subagents must preserve the provider-neutral non-affiliation disclaimer.
- Subagents must not add Supabase, GitHub import, LLM calls, source ingestion, payments, or admin surfaces unless the matching milestone is approved.
- If subagents disagree, prefer the option that is safest for learners, easiest to verify, and closest to the current approved milestone.

Default review sequence:

1. UI/UX Revamp Lead reviews visual hierarchy, clarity, trust, navigation, interaction ergonomics, and accessibility.
2. Senior Software Engineer reviews architecture, state flow, data contracts, tests, build stability, performance, and maintainability.
3. QA and Product Lead reviews user journeys, acceptance criteria, release risk, prioritization, and product coherence.

Every subagent-backed run should update `CURRENT_STATE.md`, `KNOWN_FAILURES.md`, and the relevant `docs/reports/*` file with the result.

## Non-negotiable rules

- Do not build outside the currently approved milestone.
- Do not rewrite the whole app unless explicitly instructed.
- Do not remove working functionality without replacing it and updating tests/checks.
- Do not expose LLM API keys in frontend code.
- Do not request GitHub write permissions.
- Do not add payments in v1.
- Do not add native mobile apps in v1.
- Do not add voice/audio interview grading in v1.
- Do not add community-submitted questions in v1.
- Do not claim certification-provider affiliation.
- Do not present generated or static questions as official certification-provider questions.
- Every assessment/practice page must show the provider-neutral non-affiliation disclaimer.
- If a build/test fails, stop and report the failure.
- Do not claim success unless required commands pass.

## Question bank trust rule

The current static question bank is seed/demo content only.

Until the source-grounded Microsoft Learn pipeline is built and questions are reviewed, the UI must clearly label practice content as demo/seed practice content.

Do not present the current bank as official, complete, source-grounded, or production-quality.

Completion is blocked if users can take quizzes/exams without seeing that the current question bank is demo/seed content.

Required UI copy or equivalent:

"Demo practice bank: These questions are seed content for testing the platform. They are not official certification-provider exam questions and are not yet fully source-grounded or reviewed."

This must appear:

- Before starting a quiz.
- Before starting a certification run.
- On practice/exam landing screens.
- Near the provider-neutral non-affiliation disclaimer.

## Future source-grounding rule

Long-term, every production question must trace back to a specific source chunk from official Microsoft Learn / MicrosoftDocs content.

A production question is not trusted unless it has:

- source_chunk_id
- source URL
- cert ID
- domain ID
- explanation
- why-wrong explanation per option
- review status
- approval status

## Cost and abuse control rule

Any feature that calls an LLM, imports GitHub repositories, generates questions, creates project stories, embeds content, or processes Microsoft Learn source material must include cost and abuse controls before it is considered complete.

Required controls:

- No live LLM question generation on the user quiz/exam path.
- Question generation must be batch/admin-triggered only.
- Batch generation must have a budget cap per run.
- LLM calls must run server-side only.
- Repo imports must be rate-limited per user.
- Project story generation must be cached by README/content hash.
- Source ingestion must be cached by content hash.
- Embedding generation must avoid re-processing unchanged content.
- Admin kill switch or config flag must exist for generation jobs.
- Failures must be logged and reported, not silently retried forever.

Completion is blocked for future M4/M5 work if these controls are missing.

## GitHub permission rule

For v1, do not request GitHub write permissions.

Prefer public repo import using minimal permissions.

Do not use broad repository scopes unless explicitly approved.

Private repo support is not part of the current milestone.

## Product constraints

Frontend:

- React
- TypeScript
- Vite
- Tailwind
- Zustand
- localForage
- PWA

Hosting:

- Vercel for frontend
- Supabase later for backend/auth/database

## Visual direction

Professional, quiet, premium.

Primary palette for M1.6:

- White
- Azure blue
- Deep navy
- Light blue-tinted backgrounds
- Neutral greys

Avoid:

- Loud purple
- Unnecessary decorative glow/blur
- Cartoon-heavy UI
- Oversized buttons
- Overly bold fonts
- Busy gradients
- Childish gamification

The app should feel credible for cybersecurity learners and early-career security professionals.

Typography:

- Use a developer/security monospace direction with this stack: "JetBrains Mono", "Cascadia Code", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace.
- Keep sizes readable and weights controlled.

Icons:

- Use `lucide-react` as the verified open-source Iconbuddy-style React icon system.
- `lucide-react` is ISC licensed in the installed package metadata.
- Do not mix multiple icon systems without a documented reason.

## Required build checks

Before marking work complete, run:

```bash
npm install --legacy-peer-deps
npm run build
```

If lint/test scripts exist, also run:

```bash
npm run lint
npm test
```

If these commands fail, completion is blocked.

## Completion report required

Every agent run must end with:

- Files changed
- What was preserved
- What was removed
- Commands run
- Build result
- Tests/checks run
- Known failures
- Known remaining issues
- Next recommended step

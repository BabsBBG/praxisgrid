# IMPLEMENTATION_PLAN.md

## Milestone order

## Subagent collaboration harness

For milestone work that affects product quality, use the three-role harness:

- UI/UX Revamp Lead: visual polish, information architecture, accessibility, interaction quality.
- Senior Software Engineer: implementation quality, architecture, state flow, performance, maintainability.
- QA and Product Lead: acceptance criteria, user journeys, prioritization, release risk.

Role briefs live in `docs/agents/`.

Subagents are advisory by default. The main agent integrates recommendations and keeps work inside the currently approved milestone.

## M0 - Vercel migration + harness reset

Goal:
The repo builds reliably, deploys on Vercel, and has operating docs that control future work.

Scope:

- Add harness docs.
- Add Vercel config.
- Clean npm config.
- Confirm build.
- Add demo/seed bank warning.
- Add provider-neutral certification disclaimer.
- Update current state and known failures.

Do not build future features.

## M1 - Exam engine hardening

Goal:
Make the current local/static exam engine reliable and honest.

Scope:

- Remove stale Learn/Docs/Videos navigation.
- Finalize Home / Learn / Domain Quizzes / Career Lab / Progress / Account.
- Fix answer reveal behavior.
- Fix countdown timer.
- Fix Finish Now.
- Improve domain heatmap.
- Improve history.
- Add question flag placeholder.
- Add static duplicate-check script.
- Keep demo/seed warning.

## M1.5 - Professional Azure-blue design polish

Goal:
Make the M1 product surfaces feel credible, calm, and professional without changing milestone scope.

Scope:

- Keep Azure blue as the primary brand color.
- Improve typography, borders, cards, buttons, and progress states.
- Reduce decorative glow, blur, oversized rounding, and busy gradients.
- Replace playful labels with professional exam-prep language.
- Preserve demo/seed warnings and provider-neutral non-affiliation disclaimers.
- Preserve M1 exam behavior, attempt persistence, history, retake seeds, and Finish Now behavior.

## M1.6 - User accounts + Azure-blue visual/icon/font system + tests/CI hardening

Goal:
Add individual account identity, complete the Azure-blue visual/font/icon system, and add real quality gates without starting full backend sync.

Scope:

- Supabase Auth email/password sign up, sign in, sign out.
- Account/Profile route.
- `.env.example` and `AUTH_SETUP.md`.
- Logged-out local/demo mode remains available.
- Attempts and interview sessions remain local in this milestone.
- Active navigation uses Home, Learn, Domain Quizzes, Career Lab, Progress, Account.
- Azure blue visual direction remains primary.
- Monospace developer/security font stack is documented and applied.
- `lucide-react` is the documented open-source icon system.
- GitHub Actions CI runs install, lint, tests, harness validation, question-bank validation, route checks, and build.
- Route validation checks real route files and active nav labels.

## M2 - Career Lab engine

Goal:
Make the Career Lab experience genuinely useful before backend work.

Scope:

- 30-minute interview simulator.
- Track selector.
- Project selector.
- STAR builder.
- Pitch builder.
- Follow-up traps.
- Mistakes to avoid.
- Self-score rubric.
- Interview session history.

## M3 - Supabase foundation

Goal:
Add backend foundation without breaking local fallback.

Scope:

- Supabase Auth.
- profiles.
- quiz_attempts.
- interview_sessions.
- question_flags.
- RLS.
- Local fallback remains.

## M4 - GitHub project import

Goal:
Allow users to import public GitHub projects and generate draft stories.

Scope:

- Minimal-permission repo import.
- README/language fetch.
- imported_projects.
- project_stories.
- Draft/review/approve flow.
- Rate limits.
- Content-hash caching.

## M5 - Source-grounded question pipeline

Goal:
Replace static demo questions with approved source-grounded questions.

Scope:

- Microsoft Learn ingestion.
- Source docs.
- Source chunks.
- Embeddings.
- Batch question generation.
- Automated critic.
- Admin review queue.
- Approved live question pool.

## M5.0 - PraxisGrid foundation

Goal:
Rename the product and repository foundation to PraxisGrid without losing legacy local data or expanding beyond approved M5 scope.

Scope:

- Product and PWA metadata rename.
- Provider-neutral disclaimer copy.
- Legacy `azure-quest:*` storage migration/fallback.
- AZ-500 retirement transition with SC-500 recommendation and preserved history.
- Role foundation for MAIN_ADMIN, CONTENT_REVIEWER, SUPPORT_ADMIN, and USER with audit logging.
- Founder-specific fixture cleanup.
- Source-of-truth docs and validation updates.

## M6 - Admin review, analytics, launch hardening

Goal:
Prepare for a credible public launch after backend and source-grounded content exist.

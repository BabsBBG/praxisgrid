# AUTH_SETUP.md

PraxisGrid uses Supabase Auth for individual email/password accounts and M3+ learner data sync.

## Environment variables

Create `.env.local` with:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Only use the public Supabase anon key in the frontend. Do not commit service-role keys or database passwords.

## Current scope

- Email/password sign up.
- Email/password sign in.
- Sign out.
- Auth state persists through Supabase client session storage.
- Account/Profile page.
- Logged-out local practice remains available.
- Profile upsert to `profiles`.
- Best-effort cloud sync for quiz attempts, interview sessions, question flags, and imported projects.
- LocalForage remains the first write path so learners do not lose progress if Supabase is unavailable.

## Database migrations

Apply migrations from `supabase/migrations` in order:

- `0001_profiles.sql`
- `0002_learning_data.sql`
- `0003_project_source_pipeline.sql`
- `0004_praxisgrid_roles_rebrand.sql`

## Not included

- GitHub OAuth.
- GitHub write scopes.
- Private repository import.
- Client-side LLM calls.
- Live LLM question generation during quiz/exam attempts.

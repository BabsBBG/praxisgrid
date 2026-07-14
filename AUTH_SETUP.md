# AUTH_SETUP.md

Azure Quest M1.6 uses Supabase Auth for individual email/password accounts.

## Environment variables

Create `.env.local` with:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Only use the public Supabase anon key in the frontend. Do not commit service-role keys or database passwords.

## Current M1.6 scope

- Email/password sign up.
- Email/password sign in.
- Sign out.
- Auth state persists through Supabase client session storage.
- Account/Profile page.
- Logged-out local practice remains available.

## Not included yet

- Cloud-synced quiz attempts.
- Cloud-synced interview sessions.
- GitHub OAuth.
- GitHub repo import.
- LLM project story generation.

Those remain future milestones.


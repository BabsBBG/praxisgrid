# KNOWN_FAILURES.md

Every failed command, build error, deployment error, and attempted fix must be logged here.

## Format

### Failure title

Date:
Command:
Error:
Likely cause:
Fix attempted:
Result:
Remaining issue:

## Known previous failures

### Netlify build instability

Problem:
Previous Netlify/GitHub deployment had dependency and build issues.

Decision:
Move frontend hosting to Vercel after harness reset.

### npm registry issue

Problem:
npm previously attempted to fetch from an internal non-public registry.

Required fix:
Ensure .npmrc contains:

```ini
legacy-peer-deps=true
audit=false
fund=false
registry=https://registry.npmjs.org/
```

### tsc not found

Problem:
Build previously failed when TypeScript compiler was unavailable.

Required fix:
Ensure TypeScript is installed as a devDependency and npm install runs before npm run build.

## M0 run failures

### ESLint 9 flat config missing

Date:
2026-07-13

Command:
`npm run lint`

Error:
ESLint 9 could not find an `eslint.config.(js|mjs|cjs)` file.

Likely cause:
The repo had an ESLint script and ESLint 9 dependency, but no flat config file.

Fix attempted:
Added `eslint.config.js` using the existing TypeScript parser and React Hooks/React Refresh plugins.

Result:
Initial config exposed one stale hook dependency suppression and attempted to lint generated declaration/config artifacts. Updated the hook dependencies in `src/pages/PracticeArena.tsx` and ignored generated declaration files.

Remaining issue:
Resolved. `npm run lint` passes.

### Vite large chunk warning

Date:
2026-07-13

Command:
`npm run build`

Error:
Not a failure. Vite warned that the main JavaScript chunk is larger than 500 kB after minification.

Likely cause:
The app is currently bundled as one large frontend surface with many routes and dependencies.

Fix attempted:
No fix attempted in M0 because the build passes and route-level code splitting is broader than harness reset scope.

Result:
Build passed and `dist` was generated.

Remaining issue:
Consider route-level dynamic imports or manual chunks in a future hardening milestone.

### npm install script approval warnings

Date:
2026-07-13

Command:
`npm install --legacy-peer-deps`

Error:
Not a failure. npm reported pending install-script approvals for `esbuild` and `sharp`.

Likely cause:
Current npm security behavior requires review for packages with install scripts.

Fix attempted:
No fix required for M0 because install completed successfully and build passed.

Result:
Install passed.

Remaining issue:
Review with `npm approve-scripts` if the project adopts strict install-script approvals.

### First dev server verification attempt did not respond

Date:
2026-07-13

Command:
`npm run dev -- --host 127.0.0.1 --port 5173`

Error:
Vite printed ready, but browser navigation timed out and `Invoke-WebRequest http://127.0.0.1:5173/` returned "Unable to connect to the remote server."

Likely cause:
The first Vite dev-server process did not bind/respond correctly in the local desktop environment.

Fix attempted:
Stopped that process and restarted Vite with `npm run dev -- --host 0.0.0.0 --port 5174`.

Result:
`Invoke-WebRequest http://localhost:5174/` returned `200`, and in-app browser verification passed for home, exam landing, and arena routes.

Remaining issue:
Resolved for local verification. Current dev server is running at `http://localhost:5174/`.

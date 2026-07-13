# VERCEL_DEPLOYMENT.md

## Hosting target

Frontend hosting target:

- Vercel

## Framework

- Vite

## Build command

```bash
npm run build
```

## Install command

```bash
npm install --legacy-peer-deps --no-audit --no-fund
```

## Output directory

dist

## Required files

- vercel.json
- .npmrc
- .nvmrc

## Required Vercel behavior

- Build from source.
- Output dist.
- Rewrite all routes to index.html for SPA support.

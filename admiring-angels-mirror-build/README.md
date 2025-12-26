# Admiring Angels — Mirror Build (Baseline)

This repo follows the **Mirror Build standard**:
Next.js (App Router) + TypeScript + Tailwind + Supabase + Brevo + Stripe + Notion CMS, with a protected dashboard and a reliable forms pipeline.

## Local development

1. Install deps
```bash
npm i
```

2. Create `.env.local` from `.env.example`
```bash
cp .env.example .env.local
```

3. Run dev server
```bash
npm run dev
```

Open http://localhost:3000

## Deployment

### Recommended: Vercel
- Import the repo into Vercel
- Set environment variables from `.env.example`
- Deploy

### GitHub Pages (static export)
If you need GitHub Pages, this project includes an `export` script:
```bash
npm run export
```
It outputs a static site to `out/`. You can publish `out/` via a GitHub Action to the `gh-pages` branch.

**Note:** API routes, Auth, Stripe webhooks, and server actions will not work on GitHub Pages. Use Vercel (or another Node runtime) for full functionality.

## Webhooks

### Stripe
Set Stripe webhook endpoint to:
- `/api/stripe/webhook`

### Forms
Standard owned endpoint:
- `POST /api/forms/submit`

## CMS switching
Notion CMS is implemented via `lib/cms-notion.ts`. Swap providers later by adding a new lib file (e.g. `lib/cms-wp.ts`) and keeping the rendering interface consistent.

## Folder map (baseline)
```
/app
  /(marketing)
  /(auth)
  /(dashboard)
  /api
    /forms/submit
    /stripe/webhook
/components
  /motion
/lib
  supabase.ts
  brevo.ts
  stripe.ts
  cms-notion.ts
  motion.ts
  reducedMotion.ts
/db
  schema.sql
/styles
  effects.css
```

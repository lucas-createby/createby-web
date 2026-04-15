# createby-web — Claude Code Instructions

Website for create by™ / Cueni AS. Next.js static site, replaces Framer.
Run locally: `npm run dev` (port 3000). Live at: https://createby-web.vercel.app

---

## Stack

- Next.js 16 App Router · TypeScript · Tailwind CSS v4
- `output: 'export'` — pure static HTML/CSS/JS, no server
- Deploy: Vercel (auto-deploys on `git push main`)

## File structure

```
app/
  layout.tsx              Root layout — metadata, Geist font
  globals.css             Tailwind import + CSS tokens
  page.tsx                Homepage (hero, services, FAQ, CTA, footer)
  about/page.tsx          About page
  terms-privacy/page.tsx  Terms & Privacy Policy
```

## Design tokens

```
Background:   #fafaf9  (warm off-white)
Text primary: #1c1917  (stone-900)
Text muted:   text-stone-500
Borders:      border-stone-200
Dividers:     divide-stone-200
Accent CTA:   bg-stone-900 text-white
Font:         Geist Sans (next/font/google)
```

## Key design patterns

- Minimalist, generous whitespace
- Section labels: `text-xs uppercase tracking-widest text-stone-400`
- Numbered services: 01–04 in a `grid-cols-2` with `gap-px bg-stone-200`
- FAQ: native `<details>` / `<summary>` with `group-open:rotate-45` on `+`
- No dark mode — intentionally light only
- No animations beyond CSS transitions

## Content

All copy lives directly in the component files (no CMS):
- Services (4 pillars): `app/page.tsx` — `services` array
- FAQ answers: `app/page.tsx` — `faqs` array
- About bio: `app/about/page.tsx`
- Legal text: `app/terms-privacy/page.tsx`

## Hard constraints

1. Keep `output: 'export'` in next.config.ts — no server-side features
2. No new UI frameworks — Tailwind only
3. No database, no auth, no API routes
4. Nav and footer are intentionally copy-pasted per page (3 pages only)
5. Don't break existing routes: `/`, `/about`, `/terms-privacy`

## Deploy

```bash
git add -A && git commit -m "your message" && git push
# Vercel auto-deploys from main branch
```

## Custom domain (when ready)

Add `createby.no` in Vercel dashboard → update DNS at registrar → cancel Framer.

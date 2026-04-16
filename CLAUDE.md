# createby-web — Claude Code Instructions

Website for create by™ / Cueni AS. Next.js static site.
Run locally: `npm run dev` (port 3000). Live at: https://www.createby.no

---

## Stack

- Next.js 15 App Router · TypeScript · Tailwind CSS v4
- `output: 'export'` — pure static HTML/CSS/JS, no server
- Deploy: Vercel (auto-deploys on `git push main`)
- Analytics: GA4 (`G-C00GCWS23J`) via `next/script` in `layout.tsx`

## File structure

```
app/
  layout.tsx              Root layout — metadata, Geist font, GA4, BackgroundGradient, ThemeToggle
  globals.css             Tailwind import + CSS tokens
  page.tsx                Homepage (hero, services, selected work, FAQ, CTA, footer)
  about/page.tsx          About page
  terms-privacy/page.tsx  Terms & Privacy Policy
  sitemap.ts              Sitemap for Search Console (force-static required)
components/
  HeroCanvas.tsx          Simplex-noise wave lines with mouse spring physics (SVG)
  BackgroundGradient.tsx  Animated colour blob background (canvas, light mode only)
  AnimatedHeroText.tsx    Typewriter-style hero heading
  LogoTicker.tsx          Scrolling client logo strip
  ThemeToggle.tsx         Dark/light mode toggle (persists to localStorage)
  SearchBox.tsx           (unused on this site)
```

## Design tokens

```
Background:   #fafaf9  (warm off-white, light) / #0f0f0e (dark)
Text primary: #1c1917  stone-900 (light) / stone-100 (dark)
Text muted:   text-stone-500 / stone-400 dark
Borders:      border-stone-200 / stone-800 dark
Accent CTA:   bg-stone-900 text-white (light) / bg-stone-100 text-stone-900 (dark)
Font:         Geist Sans (next/font/google)
```

## Key design patterns

- Minimalist, generous whitespace
- Section labels: `text-xs uppercase tracking-widest text-stone-400`
- Numbered services: 01–05 in a `grid-cols-2` with `gap-px bg-stone-200/60`
- FAQ: native `<details>` / `<summary>` with `group-open:rotate-45` on `+`
- Dark mode: system preference default, toggleable, stored in localStorage
- Wave lines: SVG paths via `HeroCanvas` — spring physics on mouse move
- Background: animated colour blobs via `BackgroundGradient` (light mode only, canvas)

## HeroCanvas spring physics tuning

Key constants in `components/HeroCanvas.tsx`:
- `l = 175` — base influence radius
- `radius = Math.max(l, mouse.vs)` — grows dynamically with mouse speed
- Force factor: `0.00056`
- Spring stiffness: `0.015`
- Friction: `0.92`

## Content

All copy lives directly in component files (no CMS):
- Services array, FAQ array, work array: `app/page.tsx`
- About bio: `app/about/page.tsx`
- Legal text: `app/terms-privacy/page.tsx`

## Hard constraints

1. Keep `output: 'export'` in next.config.ts — no server-side features
2. Dynamic routes need `export const dynamic = 'force-static'`
3. No new UI frameworks — Tailwind only
4. No database, no auth, no API routes
5. Don't break existing routes: `/`, `/about`, `/terms-privacy`

## DNS / infrastructure

- Domain: `createby.no` registered at domene.no
- DNS managed via cPanel at `eik.domene.no:2083`
- Root A record: `76.76.21.21` (Vercel anycast)
- www CNAME: `e847d6328b4574c0.vercel-dns-017.com` (Vercel)
- Google Search Console verified via CNAME `iv4fzuctnskd.createby.no`
- Sitemap submitted: `https://www.createby.no/sitemap.xml`

## Deploy

```bash
git add -A && git commit -m "your message" && git push
# Vercel auto-deploys from main branch
```

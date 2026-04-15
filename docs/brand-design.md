# create by™ — Brand & Design Reference

## Identity

- **Brand name:** create by™ (always lowercase, trademark symbol attached)
- **Legal entity:** Cueni AS, org. 932292793
- **Tagline:** create innovation by design
- **Contact:** hello@createby.no
- **Address:** Øvre Slottsgate 3, 0157 Oslo, Norway
- **Social:** linkedin.com/in/lucascueni · twitter.com/lucascueni

## Voice & Tone

- First person singular ("I", not "we") — this is a solo consultancy
- Confident but approachable — not corporate, not casual
- Direct and purposeful — no filler, no buzzword stacking
- Inviting at the end — coffee meeting CTA, open collaboration
- Professional but human — Lucas writes like he talks

**Do:** "Let's grab a cup of coffee to explore a potential collaboration."
**Don't:** "We leverage synergies to drive stakeholder value."

## Services (the four pillars)

1. **Innovation & Product Strategy** — turning insights into actionable plans for growth
2. **Service & Business Design** — co-creating services and business models
3. **User Experience & Interaction Design** — research-driven, usability-focused interfaces
4. **Product & Design Leadership** — guiding teams, design systems, consistent quality

## Visual Design System

### Palette
```
Background:    #fafaf9   Warm off-white (stone-50)
Text primary:  #1c1917   Near-black (stone-900)
Text muted:    #78716c   Stone-500
Text label:    #a8a29e   Stone-400 — used for section labels
Borders:       #e7e5e4   Stone-200
CTA button:    #1c1917 bg, #fafaf9 text
```

### Typography
- Font: **Geist Sans** (Google Fonts)
- Headings: `font-semibold tracking-tight`
- Section labels: `text-xs uppercase tracking-widest text-stone-400`
- Body: `text-stone-500 leading-relaxed`

### Layout principles
- Generous whitespace — breathe, don't crowd
- Full-width sections separated by `border-stone-200` dividers
- Service cards: `grid-cols-2 gap-px bg-stone-200` (gap-px trick for grid borders)
- No dark mode — intentionally warm and light
- No decorative illustrations or icons — typography-first
- Mobile: single column, desktop: two columns where applicable

### Interactive
- Hover: `transition-colors` only — no transforms or scale effects
- FAQ: native `<details>`/`<summary>` — `+` rotates 45° on open
- CTA button: sharp corners (no border-radius) — deliberate choice

## What to avoid

- No gradients, shadows, or glassmorphism
- No animations beyond simple CSS transitions
- No stock photos or placeholder imagery
- No dark backgrounds
- Never "we" — always "I"
- Never overcomplicate copy — short sentences, clear intent

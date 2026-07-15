# CLAUDE.md — MoreBookedConsults.com

## What this project is
Production site for More Booked Consults: a solo CRO + local SEO consultancy exclusively for aesthetic practices (medspas, plastic surgeons, injectors, laser clinics). Founder: Gabe Meierotto, former Director of CRO at LaserAway (2017–2022). Two services only: CRO (one controlled test/month) and Local SEO. Sales motion: free audit → prioritized plan → monthly test + results report.

The approved design source of truth is `morebookedconsults-v18.html` (self-contained mockup). The build ports it to Next.js (App Router). Visual output must match the mockup.

## Hard copy rules (never violate)
- LaserAway results (3% → 11% sitewide conversion, 210x ROI, 2,600+ variations tested, 200% avg lift on core pages, 11x testing velocity) are attributed to Gabe PERSONALLY in his former role — never to this company. The mockup copy does this correctly; preserve it.
- Never promise or guarantee results.
- Aesthetic industry only. Never broaden copy to dentists, chiro, or general healthcare.
- Tone: direct, numbers-driven, zero agency fluff, written for practice owners (never patients).
- Canonical brand string everywhere (schema, footer, bylines): "More Booked Consults" — never MBC or MoreBookedConsults in prose.

## Design system (match mockup exactly)
- Colors: paper #F8F8FD, lilac #EFEDFB, mist #E7EEFC, line #DDDBF0, ink #232140, soft #6C6990, violet #6C57E8, violet-deep #5843CF, blue #4C8DFF, deep #1B1936.
- Fonts: DM Serif Display (headings), Instrument Sans (body), Spline Sans Mono (eyebrows/labels/chart axes), Great Vibes (script "Consults" in wordmark ONLY).
- Wordmark: "More Booked" (DM Serif Display) + "Consults" (Great Vibes, 1.42em, margin-left -.16em, position: relative, top .06em, violet). Offsets are tuned to Great Vibes — do not change.
- Logomark: three ascending petals (lilac #CBC4F5 → blue #4C8DFF → violet-blue gradient). Petal SVG path: `M0,-46 C22,-32 24,-4 0,12 C-24,-4 -22,-32 0,-46 Z`. Same shape reused for all background decoration.
- Background motion (all disabled under prefers-reduced-motion), two independent layers:
  1. Small petals: CSS drift animation (vertical + slight rotation).
  2. Oversized petal trios (7 sections): sway animation on the SVG element + scroll parallax on a wrapper div. Keep as two separate elements so transforms don't conflict.
- Charts: hand-built inline SVGs (mono uppercase title, metric range, timeframe caption, ▲ delta badge, gridlines, endpoint labels). Main chart: 3% → 11% conversion line, LaserAway 2017–2022.
- Interactive revenue calculator in "The math" section (two sliders → live Today vs 2× bars).
- Sticky mobile CTA that hides when either audit form is in view.

## Audit form (one component, rendered twice: hero + bottom)
Four steps (step 1 is an addition to the v18 mockup, mandated by the topical map):
1. "What kind of practice?" — option cards, auto-advance: Med spa / Plastic surgery / Injector / Laser clinic. (Routing + segmentation + B3 case-study evidence.)
2. "What are you looking for?" — option cards, auto-advance: convert traffic / more Google traffic / bit of everything / not sure. (30px heading.)
3. Consult-value slider with "I don't know — skip this."
4. Name / email / website + success state.
Forms are front-end only for now, but ALL submissions route through one stub function so a backend drops in later.

## Site architecture (must not conflict with the SEO topical map)
- Root-level money pages; `/blog/` is flat (no nested folders) for all informational content; cluster hierarchy is expressed via internal links, not URL folders.
- Two hubs: `/medspa-marketing/` and `/plastic-surgeon-marketing/`. No umbrella hub at launch — homepage + About own the umbrella entity "aesthetic practice marketing."
- Nav: For Med Spas → medspa hub · For Plastic Surgeons → PS hub · Results (`/results/`) · Pricing · Free Audit (`/free-audit/`, persistent CTA).
- Slugs use `medspa` (one URL per concept). ~115 pages planned; the Next.js routing must make root-level slugs and flat `/blog/{slug}/` trivial to add.
- Title pattern sitewide: `{Query-matched title} | More Booked Consults`.
- Schema: Organization (description, founder → Gabe Person entity, knowsAbout, sameAs → LinkedIn + AestheticHires); breadcrumbs on every blog node.
- Homepage first 100 words must contain "aesthetic practice marketing," both audience nouns, and both service nouns.

## Build conventions
- Port the mockup's vanilla CSS as-is (CSS Modules or global stylesheet). Do NOT rewrite in Tailwind.
- Components: Header/Logo, Hero, AuditForm (reused 2×), ChartCard, PhotoBand items, Levers, Founder, ProcessSteps, MathCalculator, Footer, PetalBackground (small petals + parallax trios).
- Deploy target: Vercel.
- Email on site: hello@morebookedconsults.com (inbox not live yet — confirm before launch).

## Workflow rules for every Claude Code session
- Work on feature branches, never directly on main.
- Use plan mode for big changes; the user approves the approach first.
- After scaffolding or dependency changes: run the dev server and fix all errors before finishing.
- When guiding the user through terminal steps: ONE instruction at a time. Never dump multi-step command walls.
- Before merging visual work: compare against `morebookedconsults-v18.html` and match it.

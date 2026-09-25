# CLAUDE.md — MoreBookedConsults.com

## What this project is
Production site for More Booked Consults: a solo CRO + local SEO consultancy exclusively for aesthetic practices (medspas, plastic surgeons, injectors, laser clinics). Founder: Gabe Meierotto, former Director of CRO at LaserAway (2018–2023). Three services: CRO ($2,500/mo, one controlled test/month), Local SEO ($2,500/mo), CRO + Local SEO together $5,000/mo, and managed Meta ads ($3,000/mo flat + $2,500 one-time setup, 3-month minimum; static image ads only, 8–12/month, landing pages Gabe builds, one landing-page A/B test/month; ad spend paid by the client directly to Meta, $3,000/mo minimum, never marked up, never a percentage of spend). No bundle discount on ads. Sales motion: free audit → prioritized plan → monthly test + results report.
- Pay-Per-Lead was RETIRED 2026-09-25 (Gabe can't fund carrying ad spend). Never reintroduce per-lead pricing, "we carry the ad spend", market exclusivity, or video ads.

The approved design source of truth is `morebookedconsults-v18.html` (self-contained mockup). The build ports it to Next.js (App Router). Visual output must match the mockup.

## Hard copy rules (never violate)
- LaserAway results (3% → 11% sitewide conversion, 210x ROI, 2,600+ variations tested, 200% avg lift on core pages, 11x testing velocity) are attributed to Gabe PERSONALLY in his former role — never to this company. The mockup copy does this correctly; preserve it.
- Never promise or guarantee results.
- Aesthetic industry only. Never broaden copy to dentists, chiro, or general healthcare.
- Tone: direct, numbers-driven, zero agency fluff, written for practice owners (never patients).
- Canonical brand string everywhere (schema, footer, bylines): "More Booked Consults" (never MBC or MoreBookedConsults in prose).
- No em dashes (—) anywhere in copy. Use commas, colons, parentheses, or separate sentences instead. En dashes in number ranges (2018–2023, 40–60%) are fine; the arrow → in "3% → 11%" is fine.
- One sentence per paragraph in body prose. Put a blank line (paragraph break) after each sentence so text never becomes a wall — this reads far better on mobile. Bullet lists, headings, short callouts, at-a-glance bullets, and FAQ answers are exempt (already broken up). Article depth: hubs/money pages/cluster heads ~1,300–1,500 substantive words is the practical bar (not thin); the topical map's higher targets are aspirational.

## Design system (match mockup exactly)
- Colors: paper #F8F8FD, lilac #EFEDFB, mist #E7EEFC, line #DDDBF0, ink #232140, soft #6C6990, violet #6C57E8, violet-deep #5843CF, blue #4C8DFF, deep #1B1936.
- Fonts: DM Serif Display (headings), Instrument Sans (body, incl. 700 for the wordmark "Consults"), Spline Sans Mono (eyebrows/labels/chart axes).
- Wordmark: one word, no spaces — "MoreBooked" (DM Serif Display) + "Consults" (Instrument Sans bold, .92em, violet). This supersedes the v18 mockup's Great Vibes script wordmark.
- Logomark: three ascending petals (lilac #CBC4F5 → blue #4C8DFF → violet-blue gradient). Petal SVG path: `M0,-46 C22,-32 24,-4 0,12 C-24,-4 -22,-32 0,-46 Z`. Same shape reused for all background decoration.
- Background motion (all disabled under prefers-reduced-motion), two independent layers:
  1. Small petals: CSS drift animation (vertical + slight rotation).
  2. Oversized petal trios (7 sections): sway animation on the SVG element + scroll parallax on a wrapper div. Keep as two separate elements so transforms don't conflict.
- Charts: hand-built inline SVGs (mono uppercase title, metric range, timeframe caption, ▲ delta badge, gridlines, endpoint labels). Main chart: 3% → 11% conversion line, LaserAway 2018–2023.
- Interactive revenue calculator in "The math" section (two sliders → live Today vs 2× bars).
- Sticky mobile CTA that hides when either audit form is in view.

## Audit form (one component, rendered twice: hero + bottom)
Four steps (the practice-type step is an addition to the v18 mockup, mandated by the topical map):
1. "What are you looking for?" — option cards, auto-advance: convert traffic / more Google traffic / new leads from paid ads (Managed Ads) / bit of everything / not sure. (30px heading.)
2. "What kind of practice?" — option cards, auto-advance: Med spa / Plastic surgery / Injector / Laser clinic. (Routing + segmentation + B3 case-study evidence. 30px heading.)
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
- Email on site: hello@morebookedconsults.com — live, forwards to Gabe's personal inbox for now. Audit submissions email here via `/api/audit` (Resend: set `RESEND_API_KEY` + `AUDIT_FROM_EMAIL`; optional `CRM_WEBHOOK_URL`). Without those env vars the API logs instead of sending. See `.env.example`.

## Visual kit (use on every new article and money page)
Text-heavy pages underperform; every NEW page ships with 2–3 visuals where they fit (Gabe, 2026-09-25). Components live in `components/mdx/Visuals.tsx` (CSS: the "visual kit" block at the end of `app/globals.css`, all classes `vk-`), registered in `components/mdx/MdxComponents.tsx`. Reference pages: `content/money/laser-clinic-seo.mdx`, `content/money/plastic-surgery-marketing-consultant.mdx`, `content/blog/how-to-grow-a-plastic-surgery-practice.mdx`.
- String props + MDX children only (next-mdx-remote blocks JS expressions, so no `{[...]}`); blank lines around markdown inside a component.
- Pick by content shape: 3–6 parallel items → `<Cards>`/`<Card icon title>` (4 = 2×2, avoid 5); a sequence → `<Steps>`/`<Step title>`; X vs Y → `<Compare>`/`<Side title tone="yes|no|neutral">`; a to-do list → `<Checklist>` around a markdown list; a funnel → `<Funnel>`/`<Stage label value width>`; a formula → `<Equation result>`/`<Term label note>`; worked-example numbers → `<Bars>`/`<Bar label value display highlight>`; options by two qualities → `<Matrix xLow xHigh yLow yHigh best>`/`<Dot x y label>`; seasonality → `<Season work build peak>`; local-SEO pages → `<LocalPack>`.
- Icons: pin star page link chart calendar search shield clock zap target funnel check x sun.
- Visuals never add claims: chart numbers must be in the page or simple arithmetic on them, and examples are captioned "Illustrative". No invented benchmarks or client results.
- Animations are scroll-triggered by `Reveal.tsx`; the server renders the final state, and reduced motion is respected. New components: append with the `vk-` prefix; don't restyle existing ones.
- Verify visually at 1100px and 390px. Screenshots ONLY via Playwright's `chrome-headless-shell` with `--use-mock-keychain` (other Chrome binaries pop keychain dialogs and hang); to see lower on a page, frame it in an offset iframe.

## Workflow rules for every Claude Code session
- Work on feature branches, never directly on main.
- Use plan mode for big changes; the user approves the approach first.
- After scaffolding or dependency changes: run the dev server and fix all errors before finishing.
- When guiding the user through terminal steps: ONE instruction at a time. Never dump multi-step command walls.
- Before merging visual work: compare against `morebookedconsults-v18.html` and match it.

# Homepage v2 handoff (More Booked Consults), updated 2026-11-03 ~6:30 PM Chicago

## RESUME HERE
- **Where:** git worktree `~/mbc-home-v2`, branch `home-v2` (made from origin/main 2bf3d51). Every change is committed locally. **NOT pushed, no PR.** Gabe reviews it on localhost first (rule: preview-locally-before-pr).
- **Preview:** `cd ~/mbc-home-v2 && npx next build && npx next start -p 4741` → http://localhost:4741/ (also /demo/ and /about/).
  - Use `next start`, not `next dev`. Dev mode blocks 127.0.0.1, so React never hydrates (no Cal.com, no form).
  - `node_modules` is an APFS clone (`cp -cR`) of ~/morebookedconsults/node_modules. A symlink breaks Turbopack.
- **Board:** claim `~/mbc-home-v2` is held by Pike. Keep it while working, and release it after the merge.
- **Status:** Gabe likes the direction ("I like what you've done"). He gives small rounds of feedback, one section at a time. Make each change, rebuild, screenshot it with chrome-headless-shell (`--use-mock-keychain`), commit, then report briefly.
- **To ship (only when Gabe says go):**
  1. Push the branch and open a PR to gabeleee/morebookedconsults.
  2. Merge. It goes live on pipeline1 in about 6 minutes.
  3. Then do the follow-ups in the list below.

## What Gabe asked for (the brief)
- Make the homepage feel like a SaaS product site, like foreverbooked.com, without copying it.
- Sell the proposal offer as five branded systems.
- Talk about the client's benefits, not about Gabe being a one-person shop. Name Gabe only once or twice.
- Keep social proof, add an FAQ, show no prices.
- The CTA is a call or demo, not the free audit.

## What's built (files)
- `app/page.tsx`: the whole homepage.
- `app/home-v2.css`: all homepage styles (classes start `hv-`, `hh-`, `gp-`, `si-`, `sg-`, `lf-`, `cv-`, `pa-`, `mg-`, `sa-`, `at-` and so on). Loads Satoshi from `/fonts/`.
- `components/home/SystemArt.tsx`: every illustration, drawn in HTML/CSS with no image files except the photos:
  - hero phone
  - 5 system cards
  - problem cards
  - loop steps
  - benefit cards
  - Consult Magnet
  - Spotlight ads + money-flow bars
  - Atlas map result
  - `GuaranteeSeal` (ported from ~/mbc-proposals/lp.py `seal()`)
- `components/home/DemoForm.tsx` + `app/demo/page.tsx` + `app/demo/demo.css`: the **/demo/** page.
  - 5 steps: practice type, what they want, monthly visitors, website, then name/email/mobile with the TCPA/SMS consent copy from the audit form.
  - Submits through `submitAudit()` → `/api/audit` with source "demo".
  - Then shows `AuditBooking` (Cal.com `gabe-lee-42/30min`, prefilled). After submit, the card goes full width so dates and times sit side by side.
- `components/AuditBooking.tsx`: now takes optional `calLink/title/sub/skip/event` props. The defaults are unchanged for the audit pages.
- `app/about/page.tsx` + `about.css`: the new **/about/** page.
- `components/Header.tsx` + `app/globals.css` (menu block): **sitewide** changes.
  - Menu is Services ▾ (mega menu: Booking Systems → /medspa-cro/, Spotlight™ Ads → /medspa-advertising/, Authority Atlas™ Local SEO → /medspa-seo/), then Results, About, Free Tools.
  - Menu link color #514A57, matching Forever Booked.
  - CTA "Get a free demo" → /demo/.
  - Hover bridge plus a 0.22 s close delay, so the menu doesn't close on a slow mouse.
- `components/MobileNav.tsx`: Services list with one-line pitches.
- `components/StickyCta.tsx`: "Get a free demo" → /demo/.
- Assets:
  - `public/logos/booking/*`: Boulevard, Vagaro, Aesthetic Record, Mangomint, Zenoti, PatientNow, Square, each taken from the company's own site. Square comes from Wikimedia.
  - `public/fonts/satoshi-{500,700,900}.woff2` (Fontshare, free for commercial use).
  - `public/home/exit-photo.jpg`: a crop of the Wikimedia Commons **CC0** "SPA SKIN CARE.jpg".
  - Ad photos reuse the site's own `/injector.jpg` and `/audit.jpg`.

## Page order (homepage)
1. Hero (light prism, header sits over it).
   - H1 "Turn More Of Your Website Visitors Into Booked Consults."
   - Subhead with an underlined "five booking systems" link.
   - Big CTA with shine, play icon and arrow.
   - Gabe headshot + "Led by the CRO director behind LaserAway's 3% → 11%".
   - Phone product shot.
2. Booking-software logo band. The fake ad-partner logos were REMOVED (Gabe isn't partnered).
3. Problem: 3 cards with illustrations.
4. Five systems:
   - Glide Path™
   - Sienna AI™
   - Second Glance™ (luxe split popup)
   - Leak Finder™
   - Clear View™
5. Consult Magnet™ bonus card (offer + ad, like the Cultivate proposal).
6. Monthly loop (find leak → ship 2 fixes → keep winner).
7. 4 benefit cards with illustrations.
8. 14-day timeline.
9. Guarantee (spinning seal, no box, on the section background).
10. Dark proof: LaserAway logos, chart, 210x, 2,600+, 31,689 census, Intellimize, AestheticHires.
11. Add-ons: Spotlight™ Ads (3 med spa Meta ads, money-flow bars, NO price) and Authority Atlas™ (map pack + ranking pages).
12. FAQ (11 questions, no prices).
13. Final CTA band → /demo/.

## Gabe's design rules learned this session
- **"Icons are not enough."** Every card needs a real visual: an illustration, a mock UI or a photo. He asked for this on every section.
- Headlines use **Satoshi** (700, -0.025em), with **every word capitalized** (CSS `text-transform:capitalize` on .hv h1/h2/h3 + card titles). He rejected DM Serif for headlines. The logo wordmark keeps DM Serif.
- The CTA text matches everywhere ("Get a free demo"). The hero CTA is big, with shine, glow ring, icon and arrow.
- No eyebrow above the hero. "System 0N · Category" labels on the system rows are fine.
- No fake claims: no partner logos he doesn't have, no testimonials (none exist yet), and every made-up number is labeled Sample or Illustrative.
- No prices on the homepage. He may drop /pricing/ later; it's already gone from the menu.
- He sends changes in quick bursts while you work. Queue them, do them in order, and report each one.

## Open items / follow-ups
- [ ] **When shipping:** update `~/morebookedconsults/CLAUDE.md`. It still says "never guarantee results", lists the old menu and the free-audit CTA, says the homepage hero is dark, names DM Serif headings and gives the old section order. Memory `agency-homepage-services-before-proof` is superseded for MBC.
- [ ] Other pages keep the old header-shrink "jump" (only the homepage header was made fixed). Offer to fix them the same way.
- [ ] Proposal template (~/mbc-proposals/lp.py `PARTNERS`) still shows the ad-partner logos under the calendar. Asked Gabe whether to remove them; he hasn't answered.
- [ ] Sienna AI text-back isn't live (10DLC paused), but the page promises texts. Calls work.
- [ ] No client testimonials yet. Add a real review strip when the first quotes exist.
- [ ] /medspa-cro/ (the Booking Systems link) still uses the old CRO messaging. It may need a refresh to match.
- [ ] Old unused components (`Hero`, `TrustBar`, `Levers`, `Founder`, `Process`, `MathCalculator`, `Audit`) are no longer used by the homepage. Leave them until after the merge, then clean up.
- [ ] `components/BookingAuditLanding.tsx:320` has an old lint error (`<a href="/...">`). It was there before this work.

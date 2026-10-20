Client audit pages, built in ~/aestheticamd-review (build/build.py → proposal-brand.html, aesthetica-md-ads-brand.html in Aesthetica MD's own colors since 09-26; then build/wrap_mbc_brand.py ~/<mbc checkout>) and served by app/audits/*/route.ts. Not in the sitemap; noindex via meta + X-Robots-Tag.

Toxwell (Mykola, toxwell.com): built in ~/toxwell-review (build/build.py → proposal.html, toxwell-ads.html), served at /audits/toxwell/ and /audits/toxwell/ads/.

Chandler Wellness & Recovery (inbound lead, Julie Collier, Chandler AZ): built in ~/chandlerwellness-review (build/build.py → proposal.html, then build/wrap_mbc.py ~/<mbc checkout> writes audits-html/chandler-wellness.html), served at /audits/chandler-wellness/.
Short version: build.py short → proposal-short.html, then build/wrap_mbc.py ~/<mbc checkout> short writes audits-html/chandler-wellness-short.html, served at /audits/chandler-wellness/short/.

Cold-outreach audits (Tier A med spas from ~/mbc-leads, hand-sent by Gabriel): built in batches by ~/mbc-proposals (pick.py → collect.mjs → agent.sh → render.py/check.py → publish.py), one file per lead in audits-html/leads/<slug>.html, all served by the single dynamic route app/audits/[slug]/route.ts at /audits/<slug>/. Each page is skinned in the lead's own brand and every claim comes from that lead's crawl. Don't edit these files here; re-render in ~/mbc-proposals and re-publish.

Since 2026-10-13, Aesthetica MD, AYA Skin, Carp, Hiatus and Hydrate Me are pipeline audits (~/mbc-proposals, audits-html/leads/<slug>.html via app/audits/[slug]); their hand-built pages and routes were removed.

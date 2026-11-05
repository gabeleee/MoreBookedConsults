// Illustrations for the /local-seo/ (Authority Atlas) service page, drawn in
// HTML/CSS like SystemArt.tsx and SpotlightArt.tsx. Every number is a labeled
// sample for a made-up spa, never a client result. Styles: app/local-seo/ls.css.
import { LineIcon } from "@/components/LineIcon";

function Chip({ icon, children, className = "" }: { icon: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={`hv-chip ${className}`}>
      <span className="hv-chip-ic">
        <LineIcon name={icon} />
      </span>
      {children}
    </span>
  );
}

function Frame({ title, children, sample }: { title: string; children: React.ReactNode; sample?: boolean }) {
  return (
    <div className="hv-art" aria-hidden="true">
      <span className="hv-art-glow" />
      <p className="hv-art-title">{title}</p>
      {sample && <span className="hv-sample">Sample data</span>}
      <div className="hv-art-body">{children}</div>
    </div>
  );
}

/* ---------- 01 The Atlas: the topical map of pages ---------- */
const BRANCHES = [
  { t: "Botox", leaves: ["Botox in Scottsdale", "Botox cost", "Lip flip"] },
  { t: "Lip filler", leaves: ["Lip filler Scottsdale", "Filler vs. Botox"] },
  { t: "Laser hair removal", leaves: ["Laser hair removal cost", "How many sessions?"] },
];

export function TopicalMapArt() {
  return (
    <Frame title="Your Atlas Of Pages">
      <div className="ls-tree">
        <span className="ls-root">
          <LineIcon name="building" /> Your med spa
        </span>
        <div className="ls-branches">
          {BRANCHES.map((b, i) => (
            <div key={b.t} className={`ls-branch b${i + 1}`}>
              <span className="ls-node">{b.t}</span>
              {b.leaves.map((l) => (
                <span key={l} className="ls-leaf">
                  {l}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Chip icon="map" className="hv-float f1 ls-c-plan">
        Every treatment, city and question
      </Chip>
    </Frame>
  );
}

/* ---------- 02 Google Business Profile ---------- */
export function ProfileArt() {
  return (
    <Frame title="Your Google Business Profile">
      <div className="ls-gbp">
        <div className="ls-gbp-photos">
          <span style={{ backgroundImage: "url(/home/exit-photo.webp)", backgroundPosition: "50% 30%" }} />
          <span style={{ backgroundImage: "url(/injector.webp)", backgroundPosition: "50% 15%" }} />
          <span style={{ backgroundImage: "url(/audit.webp)", backgroundPosition: "50% 30%" }} />
        </div>
        <div className="ls-gbp-body">
          <b>Glow Aesthetics</b>
          <span className="ls-gbp-rate">
            4.9 <em>★★★★★</em> (312)
          </span>
          <span className="ls-gbp-cat">Medical spa · Scottsdale</span>
          <div className="ls-gbp-btns">
            <span><LineIcon name="call" />Call</span>
            <span><LineIcon name="compass" />Directions</span>
            <span className="on"><LineIcon name="calendar" />Book</span>
          </div>
          <p className="ls-gbp-row"><LineIcon name="clock" /> Open · Closes 7 PM</p>
          <p className="ls-gbp-row"><LineIcon name="sparkles" /> Botox, lip filler, laser hair removal</p>
        </div>
      </div>
      <Chip icon="check" className="hv-float f1 ls-c-cat">
        Categories and services complete
      </Chip>
      <Chip icon="camera" className="hv-float f2 ls-c-photo">
        Photos and hours kept current
      </Chip>
    </Frame>
  );
}

/* ---------- 03 Treatment pages that rank ---------- */
export function TreatmentPagesArt() {
  return (
    <Frame title="Treatment Pages That Rank" sample>
      <div className="ls-serp">
        <div className="ls-q">
          <LineIcon name="search" />
          lip filler scottsdale
        </div>
        <div className="ls-res you">
          <span className="ls-url">glowaesthetics.com › lip-filler-scottsdale</span>
          <b>Lip Filler in Scottsdale | Glow Aesthetics</b>
          <span className="ls-desc">Natural-looking lip filler with a licensed injector. See prices, before-and-after photos and book a consult.</span>
          <span className="ls-rank">#1</span>
        </div>
        <div className="ls-res">
          <i />
          <i className="w2" />
          <i className="w3" />
        </div>
        <div className="ls-res">
          <i />
          <i className="w2" />
        </div>
      </div>
      <Chip icon="users" className="hv-float f1 ls-c-cred">
        Provider credentials on every page
      </Chip>
    </Frame>
  );
}

/* ---------- 04 Citations + technical basics ---------- */
const CITES = [
  ["Google", "ok"],
  ["Apple Maps", "ok"],
  ["Bing Places", "ok"],
  ["Yelp", "fixed"],
  ["Facebook", "ok"],
] as const;

export function CitationsArt() {
  return (
    <Frame title="Same Details Everywhere">
      <div className="ls-cite">
        <div className="ls-nap">
          <b>Glow Aesthetics</b>
          <span>100 Main St, Scottsdale, AZ</span>
          <span>(480) 555-0142</span>
        </div>
        {CITES.map(([n, s]) => (
          <div key={n} className={`ls-cite-r ${s}`}>
            <span>{n}</span>
            <em>{s === "fixed" ? "Old phone number fixed" : "Matches"}</em>
            <LineIcon name="check" />
          </div>
        ))}
      </div>
      <Chip icon="zap" className="hv-float f2 ls-c-tech">
        Fast, mobile-friendly, schema added
      </Chip>
    </Frame>
  );
}

/* ---------- 05 Ranking report: map-pack grid around the spa ---------- */
const GRID = [
  [7, 4, 3, 4, 9],
  [4, 2, 1, 2, 5],
  [3, 1, 0, 1, 3],
  [5, 2, 1, 1, 4],
  [11, 6, 3, 4, 8],
];

export function RankGridArt() {
  return (
    <Frame title="Where You Rank, Street By Street" sample>
      <div className="ls-grid-wrap">
        <p className="ls-grid-q">
          <LineIcon name="search" /> &quot;botox near me&quot;
        </p>
        <div className="ls-grid">
          {GRID.flat().map((n, i) =>
            n === 0 ? (
              <span key={i} className="ls-cell you">
                <LineIcon name="pin" />
              </span>
            ) : (
              <span key={i} className={`ls-cell ${n <= 3 ? "top" : n <= 6 ? "mid" : "low"}`}>
                {n > 10 ? "10+" : n}
              </span>
            ),
          )}
        </div>
      </div>
      <Chip icon="call" className="hv-float f1 ls-c-calls">
        Calls, directions and consults tracked
      </Chip>
    </Frame>
  );
}

/* ---------- Bonus: HIPAA-safe review replies ---------- */
export function ReviewReplyArt() {
  return (
    <div className="ls-rev" aria-hidden="true">
      <div className="ls-rev-card">
        <div className="ls-rev-top">
          <span className="ls-rev-av">J</span>
          <div>
            <b>Jessica M.</b>
            <em>★★★★★</em>
          </div>
          <span className="ls-rev-when">2 days ago</span>
        </div>
        <p>So happy with my lips! The whole team made me feel so comfortable.</p>
      </div>
      <div className="ls-rev-card reply">
        <p className="ls-rev-owner">Response from the owner</p>
        <p>Thank you so much for the kind words, Jessica! Our team loves hearing this. If you ever have questions, just give us a call.</p>
      </div>
      <div className="ls-rev-tags">
        <span className="ok"><LineIcon name="check" /> Thanks them</span>
        <span className="ok"><LineIcon name="check" /> Never confirms a visit or treatment</span>
        <span className="ok"><LineIcon name="check" /> Moves details to a private call</span>
      </div>
    </div>
  );
}

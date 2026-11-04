// Illustrations for the /spotlight-ads/ service page, drawn in HTML/CSS like
// SystemArt.tsx (same glass frame + chips). Every number is a labeled sample
// for a made-up spa, never a client result. Styles: app/spotlight-ads/sp.css.
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

/* ---------- 01 Ad studio: fresh ads, each testing a new angle ---------- */
const STUDIO = [
  { img: "/injector.jpg", pos: "50% 18%", angle: "Angle A · Expert", over: "Meet your injector" },
  { img: "/home/exit-photo.jpg", pos: "50% 35%", angle: "Angle B · Offer", over: "Smooth Start" },
  { img: "/audit.jpg", pos: "50% 30%", angle: "Angle C · First timer", over: "New to Botox?" },
];

export function AdStudioArt() {
  return (
    <Frame title="Fresh Ads Every Month">
      <div className="sp-studio">
        {STUDIO.map((a, i) => (
          <div key={a.angle} className={`sp-mini s${i + 1}`}>
            <div className="sp-mini-top">
              <i>G</i>
              <span>
                <b>Glow Aesthetics</b>
                Sponsored
              </span>
            </div>
            <div className="sp-mini-img" style={{ backgroundImage: `url(${a.img})`, backgroundPosition: a.pos }}>
              <span>{a.over}</span>
            </div>
            <p className="sp-mini-angle">{a.angle}</p>
          </div>
        ))}
      </div>
      <Chip icon="sparkles" className="hv-float f1 sp-c-new">
        New this month: 10 ads
      </Chip>
      <Chip icon="shield" className="hv-float f2 sp-c-rule">
        Checked against Meta&apos;s health ad rules
      </Chip>
    </Frame>
  );
}

/* ---------- 02 Offer page: one offer, one path, no exits ---------- */
export function OfferPageArt() {
  return (
    <Frame title="A Page Built For The Offer">
      <div className="sp-phone">
        <div className="sp-phone-notch" />
        <div className="sp-lp-hero">
          <span className="sp-lp-brand">GLOW AESTHETICS</span>
        </div>
        <div className="sp-lp-body">
          <p className="sp-lp-k">New client offer</p>
          <p className="sp-lp-h">Smooth Start Package</p>
          <ul>
            <li><LineIcon name="check" />Consult with a licensed injector</li>
            <li><LineIcon name="check" />Your first treatment area</li>
            <li><LineIcon name="check" />Aftercare kit to take home</li>
          </ul>
          <span className="sp-lp-in">Your name</span>
          <span className="sp-lp-in">Mobile number</span>
          <span className="sp-lp-btn">Claim my spot</span>
        </div>
      </div>
      <Chip icon="ban" className="hv-float f2 sp-c-nav">
        No menu, no exits
      </Chip>
      <Chip icon="target" className="hv-float f1 sp-c-match">
        Same offer the ad promised
      </Chip>
    </Frame>
  );
}

/* ---------- 03 Audiences + tracking: who sees it, and what gets counted ---------- */
export function AudienceArt() {
  return (
    <Frame title="The Right People, Tracked">
      <div className="sp-radar">
        <span className="sp-ring r3" />
        <span className="sp-ring r2" />
        <span className="sp-ring r1" />
        <span className="sp-sweep" />
        <span className="sp-you">
          <LineIcon name="pin" />
        </span>
        <span className="sp-dot d1" />
        <span className="sp-dot d2" />
        <span className="sp-dot d3" />
        <span className="sp-dot d4 rt" />
        <span className="sp-dot d5 rt" />
        <span className="sp-dot d6" />
      </div>
      <div className="sp-legend">
        <span><i /> Adults near your spa</span>
        <span><i className="rt" /> Visited, didn&apos;t book yet</span>
      </div>
      <Chip icon="link" className="hv-float f1 sp-c-pixel">
        Pixel + Conversions API connected
      </Chip>
    </Frame>
  );
}

/* ---------- 05 Ad report: every ad traced to booked consults ---------- */
const ROWS = [
  { ad: "Smooth Start Package", req: 41, booked: 19, cost: "$63", win: true },
  { ad: "Planned with your injector", req: 28, booked: 11, cost: "$98" },
  { ad: "New to Botox?", req: 22, booked: 7, cost: "$132", off: true },
];

export function AdReportArt() {
  return (
    <Frame title="Ads Traced To Booked Consults" sample>
      <div className="sp-rep">
        <div className="sp-rep-kpis">
          <div>
            <span>Ad spend</span>
            <b>$3,200</b>
          </div>
          <div>
            <span>Booked consults</span>
            <b>37</b>
          </div>
          <div className="hl">
            <span>Per booked consult</span>
            <b>$86</b>
          </div>
        </div>
        <div className="sp-rep-tbl">
          <div className="sp-rep-h">
            <span>Ad</span>
            <span>Requests</span>
            <span>Booked</span>
            <span>Cost each</span>
          </div>
          {ROWS.map((r) => (
            <div key={r.ad} className={`sp-rep-r${r.win ? " win" : ""}${r.off ? " off" : ""}`}>
              <span>{r.ad}</span>
              <span>{r.req}</span>
              <span>{r.booked}</span>
              <span>{r.cost}</span>
            </div>
          ))}
        </div>
      </div>
      <Chip icon="trending" className="hv-float f1 sp-c-win">
        Winner gets more budget
      </Chip>
      <Chip icon="ban" className="hv-float f2 sp-c-off">
        Weakest ad switched off
      </Chip>
    </Frame>
  );
}

/* ---------- Monthly report preview (the "every month after" section) ---------- */
export function MonthlyReportArt() {
  const blocks = [
    { k: "What ran", icon: "megaphone", t: "10 new ads across 3 angles, all sent to the Smooth Start page." },
    { k: "What won", icon: "trending", t: "The package ad booked the most consults for the money. It gets more budget." },
    { k: "What lost", icon: "ban", t: "The first-timer ad got clicks but few bookings. Switched off." },
    { k: "What's next", icon: "arrow", t: "Test a shorter form on the offer page, and 10 fresh ads on the winning angle." },
  ];
  return (
    <div className="sp-report" aria-hidden="true">
      <div className="sp-report-top">
        <div>
          <p className="sp-report-k">Monthly report · Glow Aesthetics</p>
          <p className="sp-report-h">October, in plain English</p>
        </div>
        <span className="bs-stairs-tag">Sample</span>
      </div>
      <div className="sp-report-grid">
        {blocks.map((b) => (
          <div key={b.k}>
            <p>
              <LineIcon name={b.icon} />
              {b.k}
            </p>
            <span>{b.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

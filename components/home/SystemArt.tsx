// Branded "product shot" illustrations for the homepage systems, drawn in
// HTML/CSS (no image files) so they stay crisp and on-brand. Every number in
// here is a labeled sample, never a client result. Server component.
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

function ArtFrame({ title, children, sample }: { title: string; children: React.ReactNode; sample?: boolean }) {
  return (
    <div className="hv-art" aria-hidden="true">
      <span className="hv-art-glow" />
      <p className="hv-art-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sample && <span className="hv-sample">Sample data</span>}
      <div className="hv-art-body">{children}</div>
    </div>
  );
}

/* ---------- 01 Glide Path: the multi-step booking form ---------- */
export function GlidePathArt() {
  return (
    <ArtFrame title="Glide Path<sup>™</sup> Booking Flow">
      <div className="gp-stack">
        <div className="gp-card gp-back" />
        <div className="gp-card">
          <div className="gp-progress">
            <span className="on" />
            <span className="on" />
            <span />
            <span />
          </div>
          <p className="gp-step">Step 2 of 4</p>
          <p className="gp-q">What brings you in?</p>
          <div className="gp-opts">
            <span>
              <i className="gp-oi"><LineIcon name="syringe" /></i>Botox &amp; filler
            </span>
            <span className="sel">
              <i className="gp-oi"><LineIcon name="sparkles" /></i>Laser hair removal
              <LineIcon name="check" />
            </span>
            <span>
              <i className="gp-oi"><LineIcon name="droplet" /></i>Skin &amp; facials
            </span>
            <span>
              <i className="gp-oi"><LineIcon name="help" /></i>Not sure yet
            </span>
          </div>
        </div>
      </div>
      <Chip icon="calendar" className="hv-float f1 gp-c1">
        Consult booked: Thu 4:00 PM
      </Chip>
      <Chip icon="layers" className="hv-float f2 gp-c2">
        Sent to your booking software
      </Chip>
    </ArtFrame>
  );
}

/* ---------- 02 Sienna AI: 60-second call + text-back ---------- */
export function SiennaArt() {
  return (
    <ArtFrame title="Sienna AI<sup>™</sup> Follow-Up Agent">
      <div className="si-ring si-r1" />
      <div className="si-ring si-r2" />
      <div className="si-orb" />
      <div className="si-call">
        <span className="si-dot" />
        <div>
          <b>Calling Jessica</b>
          <span>New booking request, 38 sec ago</span>
        </div>
        <span className="si-time">0:42</span>
      </div>
      <div className="si-bubble">Hi Jessica, it&apos;s Sienna from Glow Aesthetics. Want me to hold Thursday at 4 for your consult?</div>
      <Chip icon="message" className="hv-float f2 si-c1">
        Text sent: finish booking
      </Chip>
      <Chip icon="check" className="hv-float f1 si-c2">
        Consult booked
      </Chip>
      <span className="si-ic si-i1"><LineIcon name="call" /></span>
      <span className="si-ic si-i2"><LineIcon name="message" /></span>
      <span className="si-ic si-i3"><LineIcon name="calendar" /></span>
    </ArtFrame>
  );
}

/* ---------- 03 Second Glance: the exit offer ---------- */
export function SecondGlanceArt() {
  return (
    <ArtFrame title="Second Glance<sup>™</sup> Exit Offer">
      <div className="sg-browser">
        <div className="sg-bar">
          <i />
          <i />
          <i />
          <span>yourmedspa.com</span>
        </div>
        <div className="sg-page">
          <span className="sg-line w60" />
          <span className="sg-line w40" />
          <span className="sg-block" />
          <span className="sg-line w70" />
        </div>
        <div className="sg-modal">
          <span className="sg-x">
            <LineIcon name="ban" />
          </span>
          <p className="sg-k">Before you go</p>
          <p className="sg-h">$50 off your first visit</p>
          <span className="sg-in">Your email</span>
          <span className="sg-btn">Claim my offer</span>
        </div>
      </div>
      <Chip icon="gift" className="hv-float f1 sg-c1">
        Offer claimed
      </Chip>
    </ArtFrame>
  );
}

/* ---------- 04 Leak Finder: step-by-step drop-off ---------- */
const LEAK = [
  ["Treatment", 100],
  ["First visit?", 82],
  ["Contact details", 44],
  ["Pick a time", 39],
] as const;

export function LeakFinderArt() {
  return (
    <ArtFrame title="Leak Finder<sup>™</sup> Drop-Off Analytics" sample>
      <div className="lf-panel">
        <div className="lf-tabs">
          <span className="on">
            <LineIcon name="phone" /> Phone
          </span>
          <span>
            <LineIcon name="monitor" /> Computer
          </span>
        </div>
        {LEAK.map(([label, v], i) => (
          <div key={label} className={`lf-row${i === 2 ? " leak" : ""}`}>
            <span className="lf-l">
              Step {i + 1}: {label}
            </span>
            <span className="lf-track">
              <span className="lf-fill" style={{ width: `${v}%` }} />
            </span>
            <span className="lf-v">{v}%</span>
          </div>
        ))}
      </div>
      <Chip icon="target" className="hv-float f1 lf-c1">
        Biggest leak: step 3. Fixing it first.
      </Chip>
    </ArtFrame>
  );
}

/* ---------- 05 Clear View: live results dashboard ---------- */
export function ClearViewArt() {
  return (
    <ArtFrame title="Clear View<sup>™</sup> Results Dashboard" sample>
      <div className="cv-panel">
        <div className="cv-kpis">
          <div>
            <span>Visitors</span>
            <b>4,210</b>
          </div>
          <div>
            <span>Booking requests</span>
            <b>143</b>
          </div>
          <div className="hl">
            <span>Booking rate</span>
            <b>3.4%</b>
          </div>
        </div>
        <svg className="cv-chart" viewBox="0 0 300 110" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cvFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6C57E8" stopOpacity=".28" />
              <stop offset="1" stopColor="#6C57E8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="27" x2="300" y2="27" className="cv-grid" />
          <line x1="0" y1="55" x2="300" y2="55" className="cv-grid" />
          <line x1="0" y1="83" x2="300" y2="83" className="cv-grid" />
          <line x1="120" y1="6" x2="120" y2="110" className="cv-mark" />
          <path d="M0,86 L30,84 L60,88 L90,83 L120,85 L150,66 L180,58 L210,52 L240,40 L270,34 L300,28 L300,110 L0,110 Z" fill="url(#cvFill)" />
          <path d="M0,86 L30,84 L60,88 L90,83 L120,85 L150,66 L180,58 L210,52 L240,40 L270,34 L300,28" className="cv-line" />
        </svg>
        <div className="cv-legend">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>
      <Chip icon="trending" className="hv-float f2 cv-c1">
        Updates live, 24/7
      </Chip>
    </ArtFrame>
  );
}

/* ---------- Hero product shot: the systems working together ---------- */
export function HeroArt() {
  return (
    <div className="hh-art" aria-hidden="true">
      <div className="hh-phone">
        <span className="hh-notch" />
        <div className="hh-screen">
          <div className="hh-brand">
            <span className="hh-logo" />
            Glow Aesthetics
          </div>
          <div className="gp-progress">
            <span className="on" />
            <span className="on" />
            <span className="on" />
            <span />
          </div>
          <p className="gp-step">Step 3 of 4</p>
          <p className="gp-q">Where should we send your times?</p>
          <span className="hh-in">Jessica Moore</span>
          <span className="hh-in">jessica@email.com</span>
          <span className="hh-in">(555) 014-2290</span>
          <span className="hh-btn">See open times</span>
        </div>
      </div>

      <div className="hh-card hh-left hv-float f1">
        <div className="hh-orb" />
        <div>
          <b>Sienna AI is calling Jessica</b>
          <span>New request, 38 seconds ago</span>
        </div>
      </div>

      <div className="hh-card hh-right hv-float f2">
        <span className="hv-chip-ic">
          <LineIcon name="calendar" />
        </span>
        <div>
          <b>New consult booked</b>
          <span>Lip filler, Thu 4:00 PM</span>
        </div>
      </div>

      <div className="hh-card hh-bottom hv-float f3">
        <span className="hv-chip-ic">
          <LineIcon name="gift" />
        </span>
        <div>
          <b>Exit offer claimed</b>
          <span>$50 off a first visit</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Problem cards: what goes wrong today (illustrative) ---------- */
export function MazeArt() {
  const rows = [
    ["Botox, per unit", "$14"],
    ["Dysport, per unit", "$5"],
    ["Filler, 1 syringe", "$750"],
    ["Lip flip", "$150"],
    ["HydraFacial Signature", "$199"],
    ["Laser hair removal, small area", "$99"],
    ["Laser hair removal, medium", "$199"],
  ];
  return (
    <div className="pa pa-maze" aria-hidden="true">
      <div className="pm-win">
        <div className="pm-bar">
          <span>Select a service</span>
          <i>1 of 48</i>
        </div>
        <div className="pm-list">
          {rows.map(([t, p]) => (
            <div key={t}>
              <span>{t}</span>
              <b>{p}</b>
            </div>
          ))}
        </div>
        <span className="pm-scroll" />
      </div>
      <span className="pa-tag bad">
        <LineIcon name="ban" /> Visitor left
      </span>
    </div>
  );
}

export function WaitArt() {
  return (
    <div className="pa pa-wait" aria-hidden="true">
      <div className="pw-note">
        <span className="pw-ic">
          <LineIcon name="mail" />
        </span>
        <div>
          <b>New booking request</b>
          <span>Jessica M. · Lip filler</span>
        </div>
        <time>9:04 PM</time>
      </div>
      <div className="pw-gap">
        <LineIcon name="clock" />
        <span>13 hours later</span>
      </div>
      <div className="pw-note dim">
        <span className="pw-ic">
          <LineIcon name="call" />
        </span>
        <div>
          <b>Front desk calls back</b>
          <span>No answer. Voicemail left.</span>
        </div>
        <time>10:12 AM</time>
      </div>
      <span className="pa-tag bad">
        <LineIcon name="ban" /> Booked somewhere else
      </span>
    </div>
  );
}

export function BlindArt() {
  return (
    <div className="pa pa-blind" aria-hidden="true">
      <div className="pb-card">
        <div className="pb-kpi">
          <span>Website visitors</span>
          <b>4,210</b>
        </div>
        <div className="pb-steps">
          {["Clicked Book", "Picked a treatment", "Entered details", "Booked"].map((t) => (
            <div key={t}>
              <span>{t}</span>
              <i>?</i>
            </div>
          ))}
        </div>
      </div>
      <span className="pa-tag">
        <LineIcon name="help" /> Where did they go?
      </span>
    </div>
  );
}

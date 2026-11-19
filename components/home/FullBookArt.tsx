// Illustrations for the Full Book™ System page (/full-book/), drawn in
// HTML/CSS like SystemArt. Every number is a labeled sample, never a client
// result. Glow Aesthetics is the made-up demo spa Sienna answers for.
/* eslint-disable @next/next/no-img-element -- decorative local photo */
import { LineIcon } from "@/components/LineIcon";
import SiennaAvatar from "@/components/home/SiennaAvatar";

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
      <p className="hv-art-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sample && <span className="hv-sample">Sample data</span>}
      <div className="hv-art-body">{children}</div>
    </div>
  );
}

/* ---------- Hero: Sienna answering a live call ---------- */
export function HeroCallArt() {
  return (
    <div className="fb-hero-art" aria-hidden="true">
      <div className="fb-phone">
        <div className="fb-screen">
          <div className="fb-photo">
            <img src="/injector.webp" alt="" />
            <div className="fb-photo-in">
              <span className="fb-live">
                <i /> Live call · 0:48
              </span>
              <b>Sienna AI</b>
              <span>Answering for Glow Aesthetics</span>
            </div>
          </div>
          <div className="fb-chat">
            <p className="them">Hi, do you have anything for laser hair removal this week?</p>
            <p className="me">I do! I have Thursday at 4:00 or Friday at 11:00. Want me to hold one for you?</p>
            <p className="them">Thursday works.</p>
            <p className="me">You&apos;re all set. I just texted you the link to confirm.</p>
          </div>
          <div className="fb-booked">
            <LineIcon name="check" />
            <div>
              <b>Booked: Laser hair removal</b>
              <span>Thursday, 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hh-card fb-hc1 hv-float">
        <span className="fb-hc-ic">
          <LineIcon name="clock" />
        </span>
        <div>
          <b>9:42 PM call answered</b>
          While you were off for the night
        </div>
      </div>
      <div className="hh-card fb-hc2 hv-float f2">
        <span className="fb-hc-ic">
          <LineIcon name="message" />
        </span>
        <div>
          <b>Booking link texted</b>
          Opens your calendar, treatment picked
        </div>
      </div>
      <div className="hh-card fb-hc3 hv-float f3">
        <span className="hh-orb hh-face">
          <SiennaAvatar badge={false} />
        </span>
        <div>
          <b>New client booked</b>
          You were with a client the whole time
        </div>
      </div>
    </div>
  );
}

/* ---------- Problem cards ---------- */
export function MissedCallArt() {
  return (
    <div className="pa fb-missed" aria-hidden="true">
      <div className="fb-notes">
        <div className="fb-note">
          <span className="fb-note-ic bad">
            <LineIcon name="call" />
          </span>
          <div>
            <b>Missed call (2)</b>
            <span>(303) 555-0148</span>
          </div>
          <time>2:14 PM</time>
        </div>
        <div className="fb-note">
          <span className="fb-note-ic">
            <LineIcon name="message" />
          </span>
          <div>
            <b>Voicemail, 0:09</b>
            <span>&ldquo;Hi, I wanted to ask about Botox&hellip;&rdquo;</span>
          </div>
          <time>2:15 PM</time>
        </div>
      </div>
      <div className="fb-inroom">
        <LineIcon name="syringe" /> You were mid-treatment
      </div>
      <span className="pa-tag bad">
        <LineIcon name="ban" /> Called the next spa instead
      </span>
    </div>
  );
}

export function HiddenArt() {
  return (
    <div className="pa fb-hidden" aria-hidden="true">
      <div className="fb-serp">
        <div className="fb-q">
          <LineIcon name="search" /> laser hair removal near me
        </div>
        {["Another med spa", "A laser chain", "A dermatology clinic"].map((t, i) => (
          <div key={t} className="fb-row">
            <span className="fb-n">{i + 1}</span>
            <div>
              <b>{t}</b>
              <em>★★★★★</em>
            </div>
          </div>
        ))}
      </div>
      <span className="pa-tag bad">
        <LineIcon name="eye" /> Your spa: page 2
      </span>
    </div>
  );
}

/* ---------- 04 Rave Loop: review requests after every visit ---------- */
export function RaveLoopArt() {
  return (
    <Frame title="Rave Loop<sup>™</sup> Review Requests">
      <div className="rl-text">
        <span className="rl-from">Glow Aesthetics · 2 hours after visit</span>
        <p>Thanks for coming in today, Jessica! Would you share a quick review?</p>
        <span className="rl-link">
          <LineIcon name="star" /> Leave a Google review
        </span>
      </div>
      <div className="rl-review">
        <div className="rl-stars">★★★★★</div>
        <p>&ldquo;So easy to book and my skin has never looked better.&rdquo;</p>
        <span>Jessica M. · Google</span>
      </div>
      <Chip icon="star" className="hv-float f2 rl-c1">
        New 5-star review
      </Chip>
      <Chip icon="message" className="hv-float rl-c2">
        Sent after every visit
      </Chip>
    </Frame>
  );
}

/* ---------- 05 Clear View: the monthly report in plain numbers ---------- */
export function MonthlyReportArt() {
  const rows: [string, string, string][] = [
    ["Calls answered", "142", "call"],
    ["Answered after hours", "31", "clock"],
    ["New clients booked", "18", "calendar"],
    ["New 5-star reviews", "9", "star"],
  ];
  return (
    <Frame title="Clear View<sup>™</sup> Monthly Report" sample>
      <div className="mr-card">
        <div className="mr-head">
          <b>Your October</b>
          <span>Glow Aesthetics</span>
        </div>
        {rows.map(([t, v, ic]) => (
          <div key={t} className="mr-row">
            <span className="mr-ic">
              <LineIcon name={ic} />
            </span>
            <span>{t}</span>
            <b>{v}</b>
          </div>
        ))}
        <div className="mr-total">
          <span>Est. first-visit revenue</span>
          <b>$6,840</b>
        </div>
      </div>
      <Chip icon="trending" className="hv-float f2 mr-c1">
        Sent to your inbox monthly
      </Chip>
    </Frame>
  );
}

/* ---------- Front desk vs Sienna ---------- */
export function FrontDeskCompare() {
  const rows: [string, string, string][] = [
    ["Picks up while you're mid-treatment", "Only if they're free", "Every time"],
    ["Answers at 9 PM and on Sundays", "No", "Yes"],
    ["Calls back new website leads", "When they get to it", "Within 60 seconds"],
    ["Sick days, training, turnover", "Yes", "Never"],
    ["Cost", "About $3,000+ a month in wages", "Part of your monthly plan"],
  ];
  return (
    <div className="fd" role="table" aria-label="A front desk hire compared with Sienna AI">
      <div className="fd-row fd-h" role="row">
        <span role="columnheader" />
        <span role="columnheader">A front desk hire</span>
        <span role="columnheader" className="you">
          Sienna AI<sup>™</sup>
        </span>
      </div>
      {rows.map(([t, a, b]) => (
        <div key={t} className="fd-row" role="row">
          <span role="rowheader">{t}</span>
          <span role="cell" className="no">
            {a}
          </span>
          <span role="cell" className="yes">
            <LineIcon name="check" />
            {b}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Plan sizing cards ---------- */
export function SoloArt() {
  return (
    <div className="sz sz-solo" aria-hidden="true">
      <span className="sz-room">
        <LineIcon name="users" />
      </span>
      <div className="sz-tags">
        <span>1 location</span>
        <span>1–3 providers</span>
        <span>Booking app page</span>
      </div>
    </div>
  );
}

export function GrowingArt() {
  return (
    <div className="sz sz-grow" aria-hidden="true">
      <span className="sz-room">
        <LineIcon name="building" />
      </span>
      <div className="sz-tags">
        <span>Several providers</span>
        <span>2+ locations</span>
        <span>Your own website</span>
      </div>
    </div>
  );
}

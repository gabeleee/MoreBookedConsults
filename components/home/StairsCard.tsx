// "Each win stacks on the last" chart + sample 6-month plan (illustrative).
// Moved out of /booking-systems/ on 2026-11-18 so /lift-lab/ can show it too.
// Styles: .bs-stairs-* and .bs-plan* in app/booking-systems/bs.css.
const STAIRS = [
  { m: "Before", h: 34 },
  { m: "Month 1", h: 52, tag: "Launch" },
  { m: "Month 2", h: 59, tag: "Win" },
  { m: "Month 3", h: 59 },
  { m: "Month 4", h: 67, tag: "Win" },
  { m: "Month 5", h: 73, tag: "Win" },
  { m: "Month 6", h: 73 },
];

const PLAN = [
  { m: "Month 1", t: "Glide Path, Sienna AI and Second Glance go live" },
  { m: "Month 2", t: "Booking forms built for your top 3 treatments" },
  { m: "Month 3", t: "Second Glance offer A vs. offer B" },
  { m: "Month 4", t: "Sienna's call script and callback timing" },
  { m: "Month 5", t: "A before-and-after gallery that links to booking" },
  { m: "Month 6", t: "A seasonal offer on your homepage" },
];

export default function StairsCard() {
  return (
    <div className="bs-stairs-card">
      <div className="bs-stairs-top">
        <h3>Each win stacks on the last.</h3>
        <span className="bs-stairs-tag">Illustrative</span>
      </div>
      <p className="bs-stairs-sub">Booking rate, month by month. Some months a change doesn&apos;t beat what&apos;s live, so we switch it off and nothing drops.</p>
      <div className="bs-stairs" role="img" aria-label="Illustrative chart: booking rate rises after launch, then steps up most months as winning changes stack, and holds flat in months where a test didn't win.">
        {STAIRS.map((b, i) => {
          const prev = i > 0 ? STAIRS[i - 1].h : b.h;
          const gain = i > 0 ? b.h - prev : 0;
          return (
            <div key={b.m} className={`bs-stair${i === 0 ? " is-before" : ""}`}>
              {b.tag && (
                <span className="bs-stair-tag" style={{ bottom: `calc(${b.h}% + 8px)` }}>
                  {b.tag}
                </span>
              )}
              <div className="bs-stair-col" style={{ height: `${b.h}%` }}>
                {gain > 0 && <span className="bs-stair-gain" style={{ height: `${(gain / b.h) * 100}%` }} />}
              </div>
              <span className="bs-stair-m">{b.m}</span>
            </div>
          );
        })}
      </div>
      <div className="bs-plan">
        <p className="bs-plan-h">A sample 6-month plan</p>
        <ul>
          {PLAN.map((p) => (
            <li key={p.m}>
              <span>{p.m}</span>
              {p.t}
            </li>
          ))}
        </ul>
        <p className="bs-plan-note">Sample plan for illustration. Yours is chosen from what your Leak Finder numbers show, so no two spas get the same plan.</p>
        <p className="bs-plan-note">With enough traffic, we split-test: half your visitors see the new version and half see the old one. With less, we make bigger changes that already won elsewhere and compare your bookings before and after.</p>
      </div>
    </div>
  );
}

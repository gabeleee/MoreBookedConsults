import { Children, isValidElement, type ReactNode } from "react";
import Reveal from "./Reveal";

// Visual kit for money pages and articles. Every component takes string
// props and MDX children only (next-mdx-remote blocks JS expressions), is
// server-rendered in its final state, and animates in through <Reveal>.
// Styles live in the "visual kit" block of globals.css, all prefixed vk-.

// ---- icons: 24px line icons drawn in the site palette ----
const ICONS: Record<string, ReactNode> = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />,
  page: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  chart: <path d="M4 20V11M10 20V5M16 20v-6M3 20h18" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  zap: <path d="M13 3L5 13h6l-1 8 8-10h-6z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r=".6" />
    </>
  ),
  funnel: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </>
  ),
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      className={`vk-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] ?? ICONS.target}
    </svg>
  );
}

// ---- Cards: icon feature grid ----
export function Cards({ children }: { children: ReactNode }) {
  return <Reveal className="vk-cards">{children}</Reveal>;
}
export function Card({
  icon = "target",
  title,
  children,
}: {
  icon?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="vk-card">
      <span className="vk-card-icon">
        <Icon name={icon} />
      </span>
      <p className="vk-card-title">{title}</p>
      <div className="vk-card-body">{children}</div>
    </div>
  );
}

// ---- Steps: numbered process with a line that draws in ----
export function Steps({ children }: { children: ReactNode }) {
  return <Reveal className="vk-steps">{children}</Reveal>;
}
export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="vk-step">
      <p className="vk-step-title">{title}</p>
      <div className="vk-step-body">{children}</div>
    </div>
  );
}

// ---- Compare: two side-by-side lists (yes / no, or option A / option B) ----
export function Compare({ children }: { children: ReactNode }) {
  return <Reveal className="vk-compare">{children}</Reveal>;
}
export function Side({
  title,
  tone = "yes",
  children,
}: {
  title: string;
  tone?: "yes" | "no" | "neutral";
  children: ReactNode;
}) {
  const icon = tone === "no" ? "x" : tone === "yes" ? "check" : "target";
  return (
    <div className={`vk-side vk-side-${tone}`}>
      <p className="vk-side-title">
        <span className="vk-side-badge">
          <Icon name={icon} />
        </span>
        {title}
      </p>
      <div className="vk-side-body">{children}</div>
    </div>
  );
}

// ---- Checklist: wraps a markdown list, swaps bullets for check marks ----
export function Checklist({ children }: { children: ReactNode }) {
  return <Reveal className="vk-checklist">{children}</Reveal>;
}

// ---- Funnel: tapering conversion stages ----
export function Funnel({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="vk-figure">
      {title && <p className="vk-fig-title">{title}</p>}
      <Reveal className="vk-funnel">{children}</Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}
export function Stage({
  label,
  value,
  width = "100",
}: {
  label: string;
  value: string;
  width?: string;
}) {
  return (
    <div className="vk-stage">
      <span className="vk-stage-label">{label}</span>
      <span className="vk-stage-track">
        <span className="vk-stage-bar" style={{ width: `${width}%` }} />
      </span>
      <span className="vk-stage-value">{value}</span>
    </div>
  );
}

// ---- LocalPack: illustrated Google map pack, your listing climbs to #1 ----
const PINS = [
  { x: 64, y: 70, you: false },
  { x: 176, y: 118, you: false },
  { x: 112, y: 150, you: true },
];
export function LocalPack({
  query = "laser hair removal near me",
  you = "Your laser clinic",
  caption,
}: {
  query?: string;
  you?: string;
  caption?: string;
}) {
  const listings = [
    { name: you, rating: "4.9", reviews: "212", meta: "Laser clinic · 0.8 mi · Book online", you: true },
    { name: "Competitor A", rating: "4.6", reviews: "140", meta: "Med spa · 1.4 mi", you: false },
    { name: "Competitor B", rating: "4.3", reviews: "58", meta: "Laser center · 2.1 mi", you: false },
  ];
  return (
    <figure className="vk-figure">
      <p className="vk-fig-title">Illustration · the local map pack</p>
      <Reveal className="vk-pack">
        <div className="vk-pack-search">
          <Icon name="search" />
          <span>{query}</span>
          <span className="vk-caret" aria-hidden="true" />
        </div>
        <div className="vk-pack-grid">
          <svg className="vk-pack-map" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="240" height="200" rx="12" fill="var(--mist)" />
            <path d="M-10 60 C60 50 120 90 250 70" className="vk-road" />
            <path d="M40 -10 C60 60 40 140 70 210" className="vk-road" />
            <path d="M150 -10 C140 70 190 130 170 210" className="vk-road" />
            <path d="M-10 170 C80 150 160 175 250 150" className="vk-road vk-road-thin" />
            <ellipse cx="200" cy="30" rx="30" ry="18" fill="var(--lilac)" />
            {PINS.map((p, i) => (
              <g
                key={i}
                className={`vk-pin${p.you ? " vk-pin-you" : ""}`}
                style={{ transformOrigin: `${p.x}px ${p.y}px`, transitionDelay: `${0.15 + i * 0.12}s` }}
              >
                {p.you && <circle cx={p.x} cy={p.y} r="16" className="vk-pin-pulse" />}
                <path
                  d={`M${p.x} ${p.y}c-6-7-10-11-10-16a10 10 0 0 1 20 0c0 5-4 9-10 16z`}
                  className="vk-pin-body"
                />
                <circle cx={p.x} cy={p.y - 16} r="3.5" fill="#fff" />
              </g>
            ))}
          </svg>
          <ol className="vk-pack-list">
            {listings.map((l, i) => (
              <li key={i} className={`vk-listing${l.you ? " vk-listing-you" : ""}`}>
                <span className="vk-listing-name">{l.name}</span>
                <span className="vk-listing-rating">
                  {l.rating} <span className="vk-stars">★★★★★</span> ({l.reviews})
                </span>
                <span className="vk-listing-meta">{l.meta}</span>
              </li>
            ))}
          </ol>
          <div className="vk-pack-ranks" aria-hidden="true">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      </Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}

// ---- Season: 12-month strip showing when to do the work vs. peak demand ----
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function monthsIn(range: string): Set<number> {
  const [a, b] = range.split("-").map((n) => parseInt(n, 10) - 1);
  const out = new Set<number>();
  for (let m = a; ; m = (m + 1) % 12) {
    out.add(m);
    if (m === b) break;
  }
  return out;
}
export function Season({
  title,
  caption,
  work,
  workLabel = "Do the SEO work",
  build,
  buildLabel = "Rankings mature",
  peak,
  peakLabel = "Peak demand",
}: {
  title?: string;
  caption?: string;
  work: string;
  workLabel?: string;
  build: string;
  buildLabel?: string;
  peak: string;
  peakLabel?: string;
}) {
  const rows = [
    { label: workLabel, months: monthsIn(work), tone: "work" },
    { label: buildLabel, months: monthsIn(build), tone: "build" },
    { label: peakLabel, months: monthsIn(peak), tone: "peak" },
  ];
  return (
    <figure className="vk-figure">
      {title && <p className="vk-fig-title">{title}</p>}
      <Reveal className="vk-season">
        <div className="vk-season-row vk-season-head">
          <span />
          {MONTHS.map((m, i) => (
            <span key={i} className="vk-season-month">
              {m}
            </span>
          ))}
        </div>
        {rows.map((r, ri) => (
          <div key={r.tone} className="vk-season-row">
            <span className="vk-season-label">{r.label}</span>
            {MONTHS.map((_, i) => (
              <span
                key={i}
                className={`vk-season-cell${r.months.has(i) ? ` vk-on vk-${r.tone}` : ""}`}
                style={{ transitionDelay: `${ri * 0.35 + i * 0.03}s` }}
              />
            ))}
          </div>
        ))}
      </Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}

// ---- Equation: terms joined by an operator, ending in a result ----
export function Equation({
  title,
  result,
  caption,
  op = "×",
  children,
}: {
  title?: string;
  result: string;
  caption?: string;
  op?: string;
  children: ReactNode;
}) {
  const terms = Array.isArray(children) ? children.filter(Boolean) : [children];
  return (
    <figure className="vk-figure">
      {title && <p className="vk-fig-title">{title}</p>}
      <Reveal className="vk-eq">
        {terms.map((t, i) => (
          <span key={i} className="vk-eq-part">
            {i > 0 && (
              <span className="vk-eq-op" aria-hidden="true">
                {op}
              </span>
            )}
            {t}
          </span>
        ))}
        <span className="vk-eq-part">
          <span className="vk-eq-op" aria-hidden="true">
            =
          </span>
          <span className="vk-term vk-term-result">
            <span className="vk-term-label">{result}</span>
          </span>
        </span>
      </Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}
export function Term({ label, note }: { label: string; note?: string }) {
  return (
    <span className="vk-term">
      <span className="vk-term-label">{label}</span>
      {note && <span className="vk-term-note">{note}</span>}
    </span>
  );
}

// ---- Bars: single-series horizontal bar chart with direct labels ----
// value = bar length relative to the largest bar; display = the printed label.
export function Bars({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="vk-figure">
      {title && <p className="vk-fig-title">{title}</p>}
      <Reveal className="vk-bars">{children}</Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}
export function Bar({
  label,
  value,
  display,
  highlight,
}: {
  label: string;
  value: string;
  display: string;
  highlight?: string;
}) {
  return (
    <div className={`vk-bar${highlight ? " vk-bar-hi" : ""}`} title={`${label}: ${display}`}>
      <span className="vk-bar-label">{label}</span>
      <span className="vk-bar-track">
        <span className="vk-bar-fill" style={{ width: `${value}%` }} />
        <span className="vk-bar-value">{display}</span>
      </span>
    </div>
  );
}

// ---- Matrix: 2x2 map of options by two qualitative axes ----
// x and y are 0-100 (x: left to right, y: bottom to top).
export function Matrix({
  title,
  caption,
  xLow,
  xHigh,
  yLow,
  yHigh,
  best = "",
  children,
}: {
  title?: string;
  caption?: string;
  xLow: string;
  xHigh: string;
  yLow: string;
  yHigh: string;
  best?: "tl" | "tr" | "bl" | "br" | "";
  children: ReactNode;
}) {
  return (
    <figure className="vk-figure">
      {title && <p className="vk-fig-title">{title}</p>}
      <Reveal className={`vk-matrix${best ? ` vk-best-${best}` : ""}`}>
        <div className="vk-matrix-plot">
          <span className="vk-matrix-best" aria-hidden="true" />
          {children}
        </div>
        <ol className="vk-matrix-legend">
          {Children.toArray(children).map((c, i) =>
            isValidElement<{ label: string }>(c) ? <li key={i}>{c.props.label}</li> : null,
          )}
        </ol>
        <span className="vk-matrix-y vk-matrix-yhigh">{yHigh}</span>
        <span className="vk-matrix-y vk-matrix-ylow">{yLow}</span>
        <span className="vk-matrix-x vk-matrix-xlow">{xLow}</span>
        <span className="vk-matrix-x vk-matrix-xhigh">{xHigh}</span>
      </Reveal>
      {caption && <figcaption className="vk-fig-cap">{caption}</figcaption>}
    </figure>
  );
}
export function Dot({ x, y, label }: { x: string; y: string; label: string }) {
  const left = Number(x);
  return (
    <span
      className={`vk-dot${left > 60 ? " vk-dot-flip" : ""}`}
      style={{ left: `${x}%`, bottom: `${y}%` }}
    >
      <span className="vk-dot-mark" />
      <span className="vk-dot-label">{label}</span>
    </span>
  );
}

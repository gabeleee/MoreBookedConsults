// Reusable chart card shell, ported from the mockup's `.chart-card`
// (mono uppercase title, display range, timeframe meta, ▲ delta badge, then
// the hand-built inline <svg> as children, then an optional caption).
// Reused by the Proof section and the Levers section.
import type { ReactNode } from "react";

type Props = {
  title: string;
  range?: string; // omitted by the Levers charts
  meta: string;
  delta?: string;
  caption?: string;
  children: ReactNode; // the inline chart <svg>
};

export default function ChartCard({
  title,
  range,
  meta,
  delta,
  caption,
  children,
}: Props) {
  return (
    <div className="chart-card">
      <div className="chart-head">
        <div>
          <div className="chart-title">{title}</div>
          {range && <div className="chart-range">{range}</div>}
          <div className="chart-meta">{meta}</div>
        </div>
        {delta && <span className="delta">{delta}</span>}
      </div>
      {children}
      {caption && <p className="chart-cap">{caption}</p>}
    </div>
  );
}

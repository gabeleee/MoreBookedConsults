import type { ReactNode } from "react";

// Shared intro block for the money/stub pages (eyebrow + h1 + lede + content).
export default function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <main>
      <section className="page-intro">
        <div className="wrap">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
      </section>
    </main>
  );
}

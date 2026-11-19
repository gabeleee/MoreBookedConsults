import type { ReactNode } from "react";
import Link from "next/link";
import "@/app/home-v2.css";
import "@/app/booking-systems/bs.css";
import "@/app/full-book/fb.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import { LineIcon } from "@/components/LineIcon";
import { ProductTitle, type MarkId } from "@/components/home/ProductMark";

// Short single-system pages (2026-11-18): /sienna-ai/, /rave-loop/,
// /consult-magnet/, /lift-lab/. Deliberately brief: hero, what we build,
// how it fits the one plan, a short FAQ. Styles reuse home-v2 + bs- classes.
export type SystemPageData = {
  mark: MarkId;
  name: string;
  cat: string;
  h1: string;
  lede: string;
  chips: [string, string][]; // [icon, text]
  tag: string;
  why: string;
  build: string[];
  get: string[];
  Art: () => ReactNode;
  faq: { q: string; a: string }[];
  extra?: ReactNode; // optional line under the hero CTA (e.g. Sienna demo line)
  after?: { h: string; p: string; body: ReactNode }; // optional section after the system (e.g. Lift Lab chart)
};

const CALL = "/pricing/";

const OTHERS: { name: string; href: string }[] = [
  { name: "Authority Atlas", href: "/local-seo/" },
  { name: "Glide Path", href: "/booking-systems/#glide-path" },
  { name: "Sienna AI", href: "/sienna-ai/" },
  { name: "Lift Lab", href: "/lift-lab/" },
  { name: "Second Glance", href: "/booking-systems/#second-glance" },
  { name: "Consult Magnet", href: "/consult-magnet/" },
  { name: "Leak Finder", href: "/booking-systems/#leak-finder" },
  { name: "Rave Loop", href: "/rave-loop/" },
  { name: "Clear View", href: "/booking-systems/#clear-view" },
];

function Cta() {
  return (
    <a className="btn hv-cta-hero" href={CALL}>
      Get started
      <span className="hv-cta-arrow" aria-hidden="true">→</span>
    </a>
  );
}

export default function SystemPage({ d }: { d: SystemPageData }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main className="hv bs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="bs-hero sp-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.38} phase={120} />
        <div className="wrap bs-hero-in">
          <ProofLine />
          <h1 data-prism-calm="0.8">{d.h1}</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            {d.lede}
          </p>
          <div className="hv-ctas">
            <Cta />
          </div>
          {d.extra}
          <ul className="bs-chips">
            {d.chips.map(([icon, t]) => (
              <li key={t}>
                <LineIcon name={icon} /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hv-sec bs-systems">
        <div className="wrap">
          <div className="bs-list">
            <article className="bs-sys">
              <div className="bs-sys-art">
                <d.Art />
              </div>
              <div className="bs-sys-copy">
                <p className="hv-sys-k">{d.cat}</p>
                <ProductTitle id={d.mark} name={d.name} />
                <p className="hv-sys-tag">{d.tag}</p>
                <p className="bs-why">{d.why}</p>
                <div className="bs-cols">
                  <div>
                    <p className="bs-col-h">What we build</p>
                    <ul>
                      {d.build.map((x) => (
                        <li key={x}>
                          <LineIcon name="check" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bs-get">
                    <p className="bs-col-h">What changes for you</p>
                    <ul>
                      {d.get.map((x) => (
                        <li key={x}>
                          <LineIcon name="arrow" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {d.after && (
        <section className="hv-sec bs-after">
          <div className="wrap">
            <div className="hv-head">
              <h2>{d.after.h}</h2>
              <p>{d.after.p}</p>
            </div>
            {d.after.body}
          </div>
        </section>
      )}

      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>{d.name}™, Answered</h2>
            <p>
              Anything else? Email hello@morebookedconsults.com or book a <Link href="/demo/">free demo</Link>.
            </p>
          </div>
          <div className="hv-faq">
            {d.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="hv-plus" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-book">
        <div className="wrap hv-final">
          <h2>Part Of One Plan, Everything Included</h2>
          <p>
            {d.name}™ comes with the Optimized Booking System™: $499 a month, month to month, with all nine systems included.
          </p>
          <Cta />
          <p className="hv-book-alt sp-others">
            The other systems:{" "}
            {OTHERS.filter((o) => o.name !== d.name).map((o, i, a) => (
              <span key={o.name}>
                <Link href={o.href}>{o.name}™</Link>
                {i < a.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
    </main>
  );
}

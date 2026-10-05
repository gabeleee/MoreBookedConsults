import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import ConsultMagnetArt from "@/components/ConsultMagnetArt";

export const metadata: Metadata = {
  title: "Free Marketing Tools for Med Spas",
  description:
    "Free tools for med spa owners from More Booked Consults: build a new patient offer with Consult Magnet, and check any ad for Meta and FTC problems before it runs.",
  alternates: { canonical: "/tools/" },
};

// Free tools index: equal cards in one row (three across on desktop) so every
// tool is visible without scrolling. Tools only: studies and guides live elsewhere. Each card has a small illustration on top and the pitch below.
// A card without href renders as "coming soon" (not a link).

function AdCheckerArt() {
  return (
    <div className="tg-ac" aria-hidden="true">
      <div className="tg-ac-score">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" className="tg-ac-bg" />
          <circle cx="30" cy="30" r="25" className="tg-ac-fg" strokeDasharray="157" strokeDashoffset="104" />
        </svg>
        <span>34</span>
      </div>
      <div className="tg-ac-lines">
        <p className="tg-ac-k">High risk · 3 flagged</p>
        <p><mark className="tg-hi">Over 40?</mark> Smooth those lines away.</p>
        <p><mark className="tg-md">Guaranteed results</mark> with painless Botox.</p>
        <p className="tg-ac-fix">Safer: Soften fine lines in a 20-minute visit.</p>
      </div>
    </div>
  );
}

function ReviewsArt() {
  return (
    <div className="tg-rv" aria-hidden="true">
      {["Results", "Wait time", "Upsell pressure", "Staff", "Pain", "Price"].map((t, i) => (
        <span key={t} className={`tg-rv-chip tg-rv-${i}`}>{t}</span>
      ))}
    </div>
  );
}

type Tool = { href?: string; tag: string; title: ReactNode; lede: string; cta: string; art: ReactNode; isNew?: boolean };

const TOOLS: Tool[] = [
  {
    href: "/medspa-offer-builder/",
    tag: "Offer builder",
    title: (
      <>
        Build a <em>Consult Magnet</em>.
      </>
    ),
    lede: "A new patient offer people actually book, plus a ready-to-run ad and captions, in about two minutes.",
    cta: "Build your offer →",
    art: <ConsultMagnetArt />,
  },
  {
    href: "/medspa-ad-checker/",
    tag: "Ad checker",
    title: "Will your med spa ad get rejected?",
    lede: "Paste your ad. See which lines Meta and regulators flag, and how to fix them.",
    cta: "Check an ad →",
    art: <AdCheckerArt />,
    isNew: true,
  },
  {
    tag: "Review analyzer",
    title: "What are your reviews really saying?",
    lede: "Turn your Google reviews into the themes patients mention most, good and bad, so you know what to fix first.",
    cta: "Coming soon",
    art: <ReviewsArt />,
  },
];

export default function ToolsPage() {
  return (
    <main>
      <section className="page-intro tools-intro">
        <div className="wrap">
          <p className="eyebrow">Free tools</p>
          <h1>Free tools for med spa owners.</h1>
          <p className="lede">Built from what actually gets new patients to book. No signup, no sales call.</p>
        </div>
      </section>

      <section className="tools-feature-wrap">
        <div className="wrap">
          <div className="tg">
            {TOOLS.map((t) => {
              const body = (
                <>
                  <div className="tg-art">{t.art}</div>
                  <div className="tg-copy">
                    <p className="tools-tag">
                      {t.isNew && <span>New</span>}
                      {!t.href && <span>Soon</span>}
                      {t.tag}
                    </p>
                    <h2>{t.title}</h2>
                    <p className="tg-lede">{t.lede}</p>
                    <span className="tg-go">{t.cta}</span>
                  </div>
                </>
              );
              return t.href ? (
                <Link key={t.tag} href={t.href} className="tg-card">
                  {body}
                </Link>
              ) : (
                <div key={t.tag} className="tg-card tg-soon">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plastic Surgeon Marketing",
  description:
    "CRO and local SEO for plastic surgeons — turn consult requests into booked consultations and rank for the procedures patients search in your market.",
};

// Plastic surgeon hub — owns the "plastic surgeon marketing" cluster.
export default function PlasticSurgeonMarketing() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">For Plastic Surgeons</p>
          <h1>Plastic surgeon marketing that fills the surgical schedule.</h1>
          <p className="lede">
            Two levers, built for plastic surgery practices: conversion
            optimization that turns consult requests into booked consultations,
            and local SEO that ranks you for the procedures patients search in
            your market. One operator, one controlled test a month, results you
            can read.
          </p>
          <Link className="btn" href="/free-audit/">
            Get a free audit
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="prose">
            <h2>Two levers, tuned for surgical practices.</h2>
          </div>
          <div className="two-col">
            <div>
              <h3>Conversion rate optimization</h3>
              <p>
                Consult-request forms, procedure pages, financing clarity, and
                before/after galleries are where high-value consults leak. We run
                one controlled test a month on the spot that matters most — run
                to significance, so you know what actually worked.
              </p>
            </div>
            <div>
              <h3>Local SEO</h3>
              <p>
                Procedure-by-city pages, a dialed-in Google Business Profile,
                clean citations, and steady reviews — so a patient searching
                &quot;rhinoplasty&quot; or &quot;breast augmentation&quot; plus
                your city finds your practice first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>Where plastic surgery sites lose consults.</h2>
          <ul className="feature-list">
            <li>
              <b>Consult forms that ask too much</b> — long forms lose
              high-intent patients before they finish.
            </li>
            <li>
              <b>Procedure pages with no pricing signal</b> — patients need a
              sense of investment and financing before they&apos;ll request a
              consult.
            </li>
            <li>
              <b>Before/after galleries buried or gated</b> — your strongest
              proof, hidden from the people deciding.
            </li>
            <li>
              <b>Missing trust cues</b> — board certification, credentials, and
              real outcomes absent where the decision happens.
            </li>
            <li>
              <b>Slow path to scheduled</b> — no clear, fast way to go from
              interested to booked.
            </li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap prose">
          <h2>How it works.</h2>
          <p>
            Every engagement starts with a free audit of your site and local
            rankings, ranked by revenue impact. From there — a prioritized plan,
            one controlled test a month, and a plain-English report on what it
            did to your consultations. No call required to get the audit.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/free-audit/">
              Get a free audit
            </Link>
          </p>
          <p className="cross-links">
            See <Link href="/results/">the results this is built on</Link>, how{" "}
            <Link href="/pricing/">pricing works</Link>, or — if you run a med spa
            — <Link href="/medspa-marketing/">medspa marketing</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

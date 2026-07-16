import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medspa Marketing",
  description:
    "CRO and local SEO for medspas — convert the traffic you already have into booked consults, and rank for the treatments patients search in your city.",
};

// Med spa hub — owns the "medspa marketing" cluster. Detailed guides link in
// here via internal links (the topical map is expressed by links, not folders).
export default function MedspaMarketing() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">For Med Spas</p>
          <h1>Medspa marketing that turns the traffic you have into booked consults.</h1>
          <p className="lede">
            Two levers, built for medspas: conversion optimization on the site
            you already run, and local SEO that puts you in front of patients
            searching for treatments in your city. One operator, one controlled
            test a month, and a results report you&apos;ll actually read.
          </p>
          <Link className="btn" href="/free-audit/">
            Get a free audit
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="prose">
            <h2>Two levers, tuned for medspas.</h2>
          </div>
          <div className="two-col">
            <div>
              <h3>Conversion rate optimization</h3>
              <p>
                Your booking flow, intro offers, treatment pages, and hero forms
                are where consults leak. We run one controlled test a month on
                the highest-impact spot — long enough to trust the result, so
                wins stack instead of canceling out.
              </p>
            </div>
            <div>
              <h3>Local SEO</h3>
              <p>
                Treatment-by-city pages, a clean Google Business Profile,
                accurate citations, and steady review velocity — so when someone
                nearby searches &quot;lip filler&quot; or &quot;laser hair
                removal&quot; plus your city, your practice is the answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>Where medspa sites quietly lose consults.</h2>
          <ul className="feature-list">
            <li>
              <b>Slow, clunky mobile booking</b> — most medspa traffic is on a
              phone, and every extra tap costs consults.
            </li>
            <li>
              <b>Buried intro offers</b> — the offer that converts first-time
              patients is three scrolls down, if it&apos;s there at all.
            </li>
            <li>
              <b>Generic treatment pages</b> — pages that read like a brochure
              instead of answering &quot;is this right for me, and what does it
              cost?&quot;
            </li>
            <li>
              <b>Thin social proof</b> — no reviews, before/afters, or provider
              credentials where the decision actually happens.
            </li>
            <li>
              <b>No clear next step</b> — visitors who are ready to book
              can&apos;t tell how.
            </li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap prose">
          <h2>How it works.</h2>
          <p>
            Every engagement starts the same way: a free audit of your site and
            local rankings, ranked by revenue impact. From there — a prioritized
            plan, one controlled test a month, and a plain-English report on what
            it did to your bookings. No call required to get the audit.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/free-audit/">
              Get a free audit
            </Link>
          </p>
          <p className="cross-links">
            See <Link href="/results/">the results this is built on</Link>, how{" "}
            <Link href="/pricing/">pricing works</Link>, or — if you run a
            surgical practice —{" "}
            <Link href="/plastic-surgeon-marketing/">
              plastic surgeon marketing
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

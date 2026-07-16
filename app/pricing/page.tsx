import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Senior-level CRO and local SEO for aesthetic practices — one operator, two levers, one controlled test a month. Scoped from your free audit.",
};

export default function Pricing() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h1>Senior-level work. One clear monthly engagement.</h1>
          <p className="lede">
            No agency layers, no junior account managers. One operator who ran
            the testing program at the largest medspa chain in the U.S., focused
            on two levers: conversion and local SEO.
          </p>
          <Link className="btn" href="/free-audit/">
            Get a free audit
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap prose">
          <h2>What&apos;s included every month.</h2>
          <ul className="feature-list">
            <li>
              <b>A free audit to start</b> — where your site and rankings are
              leaking consults, ranked by revenue impact.
            </li>
            <li>
              <b>A prioritized plan</b> — what we test first, why, and what a win
              is worth.
            </li>
            <li>
              <b>One controlled CRO test</b> — a single clean change, run to
              significance, so you know what actually worked.
            </li>
            <li>
              <b>Local SEO work</b> — treatment- and procedure-by-city content,
              citations, Google Business Profile, and review velocity.
            </li>
            <li>
              <b>A plain-English results report</b> — what we tested, what it did
              to bookings, and what&apos;s next. Numbers, not narratives.
            </li>
          </ul>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>How pricing works.</h2>
          <p>
            Every engagement is scoped from your free audit — your site, your
            market, and where the biggest gains are. It&apos;s one flat monthly
            engagement covering both levers, so there&apos;s no guessing about
            what&apos;s in scope.
          </p>
          <p>
            Start with the audit. If your site and rankings are already tight,
            I&apos;ll tell you that too — no engagement needed.
          </p>
          {/* TODO: add the published monthly price / tiers here once confirmed. */}
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/free-audit/">
              Get a free audit
            </Link>
          </p>
          <p className="cross-links">
            See <Link href="/results/">the track record</Link>, or explore{" "}
            <Link href="/medspa-marketing/">medspa marketing</Link> and{" "}
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

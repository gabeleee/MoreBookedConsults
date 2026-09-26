import type { Metadata } from "next";
import Link from "next/link";
import AuditCtaLink from "@/components/AuditCtaLink";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for aesthetic practices: CRO $2,500/mo, local SEO $2,500/mo, CRO + local SEO $5,000/mo, or managed Meta ads $3,000/mo. Senior-level, one operator.",
  alternates: { canonical: "/pricing/" },
};

export default function Pricing() {
  return (
    <main>
      <section className="page-hero pricing-hero">
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h1>Senior-level work. Flat monthly pricing.</h1>
          <p className="lede">
            No agency layers, no junior account managers, no percentage of ad
            spend.
          </p>
        </div>
      </section>

      <section className="page-section pricing-cards">
        <div className="wrap">
          <div className="pricing-grid">
            {/* CRO only */}
            <div className="pricing-card">
              <span className="pillar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </span>
              <span className="tier">CRO</span>
              <h3>Conversion optimization</h3>
              <div className="price">
                $2,500<span>/mo</span>
              </div>
              <p className="tier-desc">
                One controlled test a month on the spot that leaks the most
                consults.
              </p>
              <ul className="feature-list">
                <li>Free marketing audit + prioritized plan</li>
                <li>One controlled CRO test / month, run to significance</li>
                <li>Booking flow, forms, offers &amp; treatment pages</li>
                <li>Plain-English results report</li>
              </ul>
              <Link className="btn" href="/convert-more/">
                Convert more traffic
              </Link>
            </div>

            {/* Local SEO only */}
            <div className="pricing-card">
              <span className="pillar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="tier">Local SEO</span>
              <h3>Local SEO</h3>
              <div className="price">
                $2,500<span>/mo</span>
              </div>
              <p className="tier-desc">
                Rank for the treatments and procedures patients search in your
                city.
              </p>
              <ul className="feature-list">
                <li>Free marketing audit + prioritized plan</li>
                <li>Treatment/procedure × city pages</li>
                <li>Google Business Profile optimization</li>
                <li>Citation cleanup (consistent name, address, phone)</li>
              </ul>
              <Link className="btn" href="/rank-higher/">
                Rank higher on Google
              </Link>
            </div>

            {/* Managed Meta ads: client pays Meta directly, flat fee */}
            <div className="pricing-card featured">
              <span className="pricing-badge">New</span>
              <span className="pillar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </span>
              <span className="tier">Paid ads</span>
              <h3>Managed Meta ads</h3>
              <div className="price">
                $3,000<span>/mo</span>
              </div>
              <p className="tier-desc">
                Facebook and Instagram ads sent to landing pages built to
                convert, not to your homepage.
              </p>
              <ul className="feature-list">
                <li>$2,500 one-time setup: tracking, first landing page, first ad batch</li>
                <li>8–12 fresh static ads / month</li>
                <li>One landing-page A/B test / month</li>
                <li>Ad spend paid by you directly to Meta, never marked up ($3,000/mo minimum)</li>
                <li>3-month minimum, plain-English monthly report</li>
              </ul>
              <Link className="btn" href="/get-leads/">
                Get more leads from ads
              </Link>
            </div>
          </div>
          <p className="pricing-bundle">
            <strong>CRO + Local SEO: $5,000/mo.</strong> Both retainers together,
            one plan, one monthly report.
          </p>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>How pricing works.</h2>
          <p>
            Every engagement starts with a free marketing audit, no call
            required.
          </p>
          <p>
            Every service is a flat monthly rate for the work itself.
          </p>
          <p>
            With managed ads, the ad spend is billed to you directly by Meta,
            never marked up and never a percentage of what you spend.
          </p>
          <p>Start with the audit.</p>
          <p>
            If your site and rankings are already tight, I&apos;ll tell you that
            too, no engagement needed.
          </p>
          <p style={{ marginTop: 20 }}>
            <AuditCtaLink className="btn" href="/free-audit/" location="pricing">
              Get a free marketing audit
            </AuditCtaLink>
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

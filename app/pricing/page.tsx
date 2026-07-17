import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for aesthetic practices: CRO from $2,500/mo, local SEO from $2,000/mo, or exclusive Pay-Per-Lead advertising from $30/lead. Senior-level, one operator.",
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
                $2,000<span>/mo</span>
              </div>
              <p className="tier-desc">
                Rank for the treatments and procedures patients search in your
                city.
              </p>
              <ul className="feature-list">
                <li>Free marketing audit + prioritized plan</li>
                <li>Treatment/procedure × city pages</li>
                <li>Google Business Profile optimization</li>
                <li>Citations &amp; review velocity</li>
              </ul>
              <Link className="btn" href="/rank-higher/">
                Rank higher on Google
              </Link>
            </div>

            {/* Pay-Per-Lead, the non-retainer offering */}
            <div className="pricing-card featured">
              <span className="pricing-badge">New</span>
              <span className="pillar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </span>
              <span className="tier">Pay-Per-Lead</span>
              <h3>Pay-Per-Lead advertising</h3>
              <div className="price">
                from $30<span>/lead</span>
              </div>
              <p className="tier-desc">
                Facebook ads to funnels I build and control. You buy the leads, I
                carry the ad spend.
              </p>
              <ul className="feature-list">
                <li>$35/lead Botox · $30/lead laser hair removal</li>
                <li>$1,000 one-time funnel setup, 100-lead monthly minimum</li>
                <li>Exclusive: one practice per treatment, per market</li>
                <li>Real-time delivery to your inbox &amp; CRM, instant SMS follow-up</li>
                <li>Duplicates and out-of-area leads credited, never billed</li>
              </ul>
              <Link className="btn" href="/get-leads/">
                Get more leads from ads
              </Link>
            </div>
          </div>
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
            CRO and local SEO are flat monthly rates for the work itself; if you
            run your own ads alongside them, that spend is billed to you directly
            by the platforms, never marked up.
          </p>
          <p>
            Pay-Per-Lead is the opposite arrangement on purpose: the ad spend is
            mine, the funnel is mine, and the only thing on your invoice is the
            leads.
          </p>
          <p>Start with the audit.</p>
          <p>
            If your site and rankings are already tight, I&apos;ll tell you that
            too, no engagement needed.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/free-audit/">
              Get a free marketing audit
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

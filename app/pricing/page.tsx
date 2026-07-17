import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CRO and local SEO pricing for aesthetic practices, CRO from $2,500/mo, local SEO from $2,000/mo, or both levers for $3,750/mo. Senior-level, one operator.",
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
            spend. One operator who ran the testing program at the largest medspa
            chain in the U.S., pick one lever or run both.
          </p>
        </div>
      </section>

      <section className="page-section pricing-cards">
        <div className="wrap">
          <div className="pricing-grid">
            {/* CRO only */}
            <div className="pricing-card">
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
                <li>Free audit + prioritized plan</li>
                <li>One controlled CRO test / month, run to significance</li>
                <li>Booking flow, forms, offers &amp; treatment pages</li>
                <li>Plain-English results report</li>
              </ul>
              <Link className="btn" href="/free-audit/">
                Get a free audit
              </Link>
            </div>

            {/* Both, featured */}
            <div className="pricing-card featured">
              <span className="pricing-badge">Best value</span>
              <span className="tier">CRO + Local SEO</span>
              <h3>Both levers</h3>
              <div className="price">
                $3,750<span>/mo</span>
              </div>
              <p className="tier-desc">
                The full playbook: convert the traffic you have, and rank for the
                traffic you don&apos;t.
              </p>
              <ul className="feature-list">
                <li>Everything in the CRO plan</li>
                <li>Treatment/procedure × city SEO content</li>
                <li>Google Business Profile, citations &amp; reviews</li>
                <li>One combined monthly report</li>
              </ul>
              <Link className="btn" href="/free-audit/">
                Get a free audit
              </Link>
              <p className="save">Save $750/mo vs. buying separately</p>
            </div>

            {/* Local SEO only */}
            <div className="pricing-card">
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
                <li>Free audit + prioritized plan</li>
                <li>Treatment/procedure × city pages</li>
                <li>Google Business Profile optimization</li>
                <li>Citations &amp; review velocity</li>
              </ul>
              <Link className="btn" href="/free-audit/">
                Get a free audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>How pricing works.</h2>
          <p>
            Every engagement starts with a free audit, no call required. The
            rates above are flat monthly for the work itself; any ad spend is
            billed to you directly by the platforms, never marked up.
          </p>
          <p>
            Start with the audit. If your site and rankings are already tight,
            I&apos;ll tell you that too, no engagement needed.
          </p>
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

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
            spend. One operator who ran the testing program at the largest medspa
            chain in the U.S. Pick a lever, run two, or skip the retainer entirely
            and just buy the leads.
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

          {/* Pay-Per-Lead, a different billing model, given its own row */}
          <div className="ppl-card">
            <div className="ppl-main">
              <span className="tier">New · Pay-Per-Lead</span>
              <h3>Pay-Per-Lead advertising</h3>
              <div className="ppl-price">
                <strong>$35</strong>/lead Botox
                <span className="sep"> · </span>
                <strong>$30</strong>/lead laser hair removal
              </div>
              <p className="tier-desc">
                Facebook ads to funnels I build and control. You buy the leads, I
                carry the ad spend.
              </p>
              <Link className="btn" href="/claim-your-market/">
                Get more leads from ads
              </Link>
            </div>
            <ul className="feature-list">
              <li>$1,000 one-time funnel setup</li>
              <li>100-lead monthly minimum</li>
              <li>Exclusive: one practice per treatment, per market</li>
              <li>
                Real-time delivery to your inbox &amp; CRM, instant SMS follow-up
                included
              </li>
              <li>Duplicates and out-of-area leads credited, never billed</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>How pricing works.</h2>
          <p>
            Every engagement starts with a free audit, no call required. CRO and
            local SEO are flat monthly rates for the work itself; if you run your
            own ads alongside them, that spend is billed to you directly by the
            platforms, never marked up. Pay-Per-Lead is the opposite arrangement
            on purpose: the ad spend is mine, the funnel is mine, and the only
            thing on your invoice is the leads.
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

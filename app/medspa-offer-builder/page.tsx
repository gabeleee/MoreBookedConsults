import type { Metadata } from "next";
import Link from "next/link";
import ConsultMagnet from "@/components/ConsultMagnet";
import { Steps, Step, Compare, Side, Checklist } from "@/components/mdx/Visuals";
import { SITE } from "@/lib/site";
import PrismBackground from "@/components/PrismBackground";

export const metadata: Metadata = {
  title: "Med Spa Offer Builder: Build a Consult Magnet (Free Tool)",
  description:
    "Free med spa offer builder. Pick a concern, add your own prices (or skip them), and get a new patient offer, ad captions and a ready-to-run ad image.",
  alternates: { canonical: "/medspa-offer-builder/" },
};

const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Consult Magnet: Med Spa Offer Builder",
  url: `${SITE.url}/medspa-offer-builder/`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

// Free tool page: the Consult Magnet builder (client component) plus a short
// explainer with visual-kit blocks. Brand name "Consult Magnet" sits on the
// tool; the URL keeps the searched phrase.
export default function OfferBuilderPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <section className="page-intro cm-intro">
        <PrismBackground tone="light" gain={1.3} tilt={0.4} phase={10} />
        <div className="wrap" data-prism-calm="0.5">
          <p className="eyebrow">Free med spa offer builder</p>
          <h1>
            Build a <em>Consult Magnet</em>.
          </h1>
          <p className="lede">
            A new patient offer people actually book: a catchy name, three parts that feel like a steal, and a ready-to-run ad.
          </p>
          <p className="hero-note">Free. No signup. Your prices never leave your browser.</p>
        </div>
      </section>

      <section className="cm-wrap">
        <div className="wrap">
          <ConsultMagnet />
        </div>
      </section>

      <section className="cm-explain">
        <div className="wrap article-body">
          <h2>What makes a Consult Magnet work</h2>

          <p>A discount on one treatment asks people to compare your price with the spa down the street.</p>

          <p>A named bundle gives them something they can&apos;t compare, so the decision becomes yes or no instead of cheaper or not.</p>

          <p>Every Consult Magnet has the same three parts.</p>

          <Steps>
            <Step title="An assessment">
              <p>Mapping, analysis or a design consult. It makes the visit feel personal and gives your provider a natural moment to recommend more.</p>
            </Step>
            <Step title="The main treatment">
              <p>The thing they came for, named in plain words. This is where the savings sit.</p>
            </Step>
            <Step title="A take-home bonus">
              <p>A kit, an add-on or a follow-up check. Low cost to you, and it makes the offer feel complete.</p>
            </Step>
          </Steps>

          <h2>Discount vs. Consult Magnet</h2>

          <Compare>
            <Side title="Plain discount" tone="no">
              <ul>
                <li>&quot;20% off Botox this week&quot;</li>
                <li>Easy to compare with every other spa</li>
                <li>Trains patients to wait for the next sale</li>
              </ul>
            </Side>
            <Side title="Consult Magnet" tone="yes">
              <ul>
                <li>&quot;Smooth Start: movement assessment, tox and a two-week check&quot;</li>
                <li>Hard to compare, easy to say yes to</li>
                <li>Built for new patients, so regulars keep paying full price</li>
              </ul>
            </Side>
          </Compare>

          <h2>Before you run it</h2>

          <Checklist>
            <ul>
              <li>Use your real menu prices for any &quot;total value&quot;. Made-up reference prices can get a practice in trouble with regulators and with Meta.</li>
              <li>Keep ad copy about results and treatments, never about the reader&apos;s own age, weight or skin. Meta rejects ads that call out personal attributes.</li>
              <li>Check that the offer price still covers product and provider time.</li>
              <li>Send the ad to a page built for the offer, not your homepage.</li>
            </ul>
          </Checklist>

          <p>
            Want this running as Meta ads with a landing page built for it? That&apos;s what our{" "}
            <Link href="/medspa-advertising/">managed ads</Link> service does.
          </p>

          <p>
            Or start with a <Link href="/free-audit/">free marketing audit</Link> of where your site is losing consults.
          </p>
        </div>
      </section>
    </main>
  );
}

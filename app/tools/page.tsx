import type { Metadata } from "next";
import Link from "next/link";
import ConsultMagnetArt from "@/components/ConsultMagnetArt";
import { LineIcon } from "@/components/LineIcon";

export const metadata: Metadata = {
  title: "Free Marketing Tools for Med Spas",
  description:
    "Free tools for med spa owners from More Booked Consults: build a new patient offer and ready-to-run ad with Consult Magnet, then check any ad for Meta and FTC problems.",
  alternates: { canonical: "/tools/" },
};

const POINTS = [
  { icon: "target", text: "Pick a concern, get a named three-part offer" },
  { icon: "dollar", text: "Add your own prices, or skip them" },
  { icon: "image", text: "Download a ready-to-run 1080×1080 ad" },
  { icon: "message", text: "Copy three captions written for Meta" },
];

// Free tools index. Consult Magnet is the first (and for now only) tool, so it
// gets the full-width feature treatment.
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
          <Link href="/medspa-offer-builder/" className="tools-feature">
            <div className="tools-feature-copy">
              <p className="tools-tag"><span>New</span> Free offer builder</p>
              <h2>
                Build a <em>Consult Magnet</em>.
              </h2>
              <p className="tools-feature-lede">A new patient offer people actually book, plus the ad to run it, in about two minutes.</p>
              <ul className="tools-points">
                {POINTS.map((p) => (
                  <li key={p.text}>
                    <span className="tools-pi"><LineIcon name={p.icon} weight={2.2} /></span>
                    {p.text}
                  </li>
                ))}
              </ul>
              <span className="btn tools-btn">Build your Consult Magnet →</span>
            </div>
            <ConsultMagnetArt />
          </Link>
          <Link href="/medspa-ad-checker/" className="tools-card">
            <span className="tools-card-ic"><LineIcon name="shield" weight={2} /></span>
            <div>
              <p className="tools-card-k">Free tool · Ad checker</p>
              <h3>Will your med spa ad get rejected?</h3>
              <p>Paste an ad, caption or landing page and get a risk score in seconds, with a safer rewrite for every line Meta, the FTC or your state board would flag.</p>
            </div>
            <span className="tools-card-go">Check an ad →</span>
          </Link>
          <p className="tools-more">More free tools are on the way.</p>
        </div>
      </section>
    </main>
  );
}

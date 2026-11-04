/* eslint-disable @next/next/no-img-element -- small static image */
import type { Metadata } from "next";
import "../home-v2.css";
import "./demo.css";
import PrismBackground from "@/components/PrismBackground";
import DemoForm from "@/components/home/DemoForm";
import { LineIcon } from "@/components/LineIcon";
import { GuaranteeSeal } from "@/components/home/SystemArt";

export const metadata: Metadata = {
  title: "Get A Free Demo",
  description: "A free 20-minute demo of the five booking systems we install for med spas and plastic surgeons, shown on your own website.",
  alternates: { canonical: "/demo/" },
};

// Free-demo page every "Get a free demo" button points to: a short pitch on
// the left, the multi-step form on the right, the calendar after the form.
export default function DemoPage() {
  return (
    <main className="hv dm">
      <section className="dm-hero">
        <PrismBackground tone="light" gain={1.15} tilt={0.34} phase={150} />
        <div className="wrap dm-grid">
          <div className="dm-copy" data-prism-calm="0.7">
            <h1>See The Five Systems On Your Own Site</h1>
            <p className="hv-lede">Answer 5 quick questions, then pick a time for your free 20-minute demo.</p>
            <ul>
              <li><LineIcon name="check" /> Where your site loses bookings today</li>
              <li><LineIcon name="check" /> What each system would look like for your practice</li>
              <li><LineIcon name="check" /> Hear Sienna AI make a live call</li>
              <li><LineIcon name="check" /> A fixed monthly price, no pressure</li>
            </ul>
            <div className="dm-by">
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
              <span>
                Your demo is with <b>Gabe Meierotto</b>, LaserAway&apos;s former Director of CRO (3% → 11% sitewide conversion).
              </span>
            </div>
            <div className="dm-guar">
              <GuaranteeSeal />
              <span>Booking rate up in 90 days, or we keep working free until it is.</span>
            </div>
          </div>
          <DemoForm />
        </div>
      </section>
    </main>
  );
}

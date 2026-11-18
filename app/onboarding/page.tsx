import type { Metadata } from "next";
import IntakeForm from "@/components/IntakeForm";
import "./onboarding.css";

// General onboarding intake (no prefill), for a new client before they have a
// personal link. Never indexed.
export const metadata: Metadata = {
  title: "Getting started",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <main className="ob">
      <div className="wrap ob-wrap">
        <header className="ob-head">
          <p className="eyebrow">Getting started</p>
          <h1>Welcome aboard.</h1>
          <p>These questions give me everything I need to build your site and set up your systems.</p>
          <p>It takes about 15 minutes, and your answers save as you go.</p>
        </header>
        <IntakeForm client={null} />
      </div>
    </main>
  );
}

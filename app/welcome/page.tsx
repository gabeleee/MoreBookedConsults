import type { Metadata } from "next";
import "../home-v2.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";

// Where Stripe Checkout (the $499/mo Optimized Booking System payment link)
// sends buyers after paying (2026-11-18). Noindex; not in the sitemap or menu.
export const metadata: Metadata = {
  title: "Welcome Aboard",
  robots: { index: false, follow: false },
  alternates: { canonical: "/welcome/" },
};

const KICKOFF = "https://cal.com/gabe-lee-42/30min?metadata[source]=welcome";

const STEPS = [
  { ic: "mail", h: "Check your email", p: "Your receipt from Stripe is on its way. Keep it for your records." },
  { ic: "calendar", h: "Book your kickoff call", p: "30 minutes to go over your treatments, your booking app and your goals." },
  { ic: "clipboard", h: "Fill in your onboarding form", p: "We'll email it within one business day. It takes about 10 minutes." },
  { ic: "zap", h: "We get to work", p: "Your booking flow and Sienna AI go live first, then new Google pages every month." },
];

export default function Welcome() {
  return (
    <main className="hv">
      <section className="hv-hero" style={{ minHeight: "auto", paddingBottom: 80 }}>
        <PrismBackground tone="light" gain={1.1} tilt={0.4} phase={60} />
        <div className="wrap" style={{ maxWidth: 760, textAlign: "center", position: "relative" }}>
          <h1 data-prism-calm="0.8">You&apos;re In. Welcome Aboard.</h1>
          <p className="hv-lede" data-prism-calm="0.6" style={{ margin: "14px auto 30px" }}>
            Thanks for joining the Optimized Booking System. Here&apos;s what happens next.
          </p>
          <ol style={{ listStyle: "none", display: "grid", gap: 12, textAlign: "left", margin: "0 0 30px" }}>
            {STEPS.map((s, i) => (
              <li
                key={s.h}
                style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: "16px 18px" }}
              >
                <span
                  aria-hidden="true"
                  style={{ width: 40, height: 40, flex: "none", display: "grid", placeItems: "center", borderRadius: 12, background: "var(--deep)", color: "#F6C9DF" }}
                >
                  <LineIcon name={s.ic} />
                </span>
                <div>
                  <b style={{ display: "block", fontSize: 17, color: "var(--ink)" }}>
                    {i + 1}. {s.h}
                  </b>
                  <span style={{ fontSize: 15, color: "var(--soft)" }}>{s.p}</span>
                </div>
              </li>
            ))}
          </ol>
          <a className="btn" href={KICKOFF}>
            Book your kickoff call <span aria-hidden="true">→</span>
          </a>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--soft)" }}>
            Questions? Email <a href="mailto:hello@morebookedconsults.com">hello@morebookedconsults.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

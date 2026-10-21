import type { Metadata } from "next";
import Link from "next/link";
import PrismBackground from "@/components/PrismBackground";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for using morebookedconsults.com, including our phone call and text message program for audit requests.",
  alternates: { canonical: "/terms/" },
  openGraph: {
    type: "website",
    siteName: "More Booked Consults",
    title: "Terms | More Booked Consults",
    url: "/terms/",
  },
};

const UPDATED = "October 21, 2026";

// The "Text messages" section is what 10DLC carriers review for the SMS campaign:
// program name, what we send, frequency, rates, STOP/HELP, and the privacy link.
export default function Terms() {
  return (
    <main>
      <section className="page-hero">
        <PrismBackground tone="light" gain={1.1} tilt={0.3} phase={110} />
        <div className="wrap" data-prism-calm="0.5">
          <h1>Terms</h1>
          <p className="lede">Last updated {UPDATED}.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="article-body">
            <p>
              These terms cover your use of morebookedconsults.com, run by
              More Booked Consults.
            </p>

            <h2>Using this site</h2>
            <p>
              Audits, tools and articles on this site are general information
              to help you improve your bookings. They are not legal, medical or
              financial advice. Paid work is covered by a separate written
              agreement.
            </p>

            <h2>Text messages</h2>
            <ul>
              <li>
                <strong>Program.</strong> More Booked Consults audit updates.
                When you request a free Booking Audit and tick &ldquo;Text me
                about my audit,&rdquo; we text you about your request, such as
                a link to book your audit call and when your audit is ready.
              </li>
              <li>
                <strong>Frequency.</strong> Message frequency varies, usually 1
                to 4 messages per request.
              </li>
              <li>
                <strong>Cost.</strong> Message and data rates may apply.
              </li>
              <li>
                <strong>Opt out.</strong> Reply STOP to any message to stop.
                You&apos;ll get one confirmation and no more texts.
              </li>
              <li>
                <strong>Help.</strong> Reply HELP, or email{" "}
                <a href="mailto:hello@morebookedconsults.com">
                  hello@morebookedconsults.com
                </a>
                .
              </li>
              <li>
                <strong>Not required.</strong> Texting is optional and is not a
                condition of any purchase.
              </li>
              <li>
                Carriers are not liable for delayed or undelivered messages.
              </li>
            </ul>
            <p>
              See our <Link href="/privacy/">Privacy Policy</Link> for how we handle
              your mobile number. We never share it for marketing.
            </p>

            <h2>Phone calls</h2>
            <p>
              When you request an audit, we may call the number you gave us
              about your request, including with an AI voice assistant that
              says it is one. Tell it, or us, to stop calling and we will.
            </p>

            <h2>Changes</h2>
            <p>
              If we update these terms, we will change the date at the top of
              this page.
            </p>

            <h2>Contact</h2>
            <p>
              Questions:{" "}
              <a href="mailto:hello@morebookedconsults.com">
                hello@morebookedconsults.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

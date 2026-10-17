import type { Metadata } from "next";
import PrismBackground from "@/components/PrismBackground";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How More Booked Consults collects, uses and protects the information you share through this site, including audit requests and free tools.",
  alternates: { canonical: "/privacy/" },
  // Own og:url: Meta's app review rejects a privacy URL whose og:url points
  // at the homepage (the layout default).
  openGraph: {
    type: "website",
    siteName: "More Booked Consults",
    title: "Privacy Policy | More Booked Consults",
    url: "/privacy/",
  },
};

const UPDATED = "October 16, 2026";

// Plain privacy policy. Keep it accurate to what the site actually does:
// forms (audit, offer builder, ad checker), GA4 + PostHog analytics, the Meta
// pixel on paid-ad landing pages, and email sent through Amazon SES.
export default function Privacy() {
  return (
    <main>
      <section className="page-hero">
        <PrismBackground tone="light" gain={1.1} tilt={0.3} phase={110} />
        <div className="wrap" data-prism-calm="0.5">
          <h1>Privacy Policy</h1>
          <p className="lede">Last updated {UPDATED}.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="article-body">
            <p>
              This policy explains what information More Booked Consults
              collects through morebookedconsults.com and how it is used.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Information you give us.</strong> When you request an
                audit or use a free tool, we collect what you enter, such as
                your name, email, website, practice type and any details you
                add.
              </li>
              <li>
                <strong>Usage data.</strong> Like most websites, we collect
                pages viewed, referring site, device and browser type, and
                approximate location, through cookies and similar technologies.
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To prepare and send the audit or tool results you asked for.</li>
              <li>To reply to you and follow up about our services.</li>
              <li>To understand how the site is used and improve it.</li>
              <li>To measure and improve our advertising.</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h2>Services we use</h2>
            <p>
              We share information only with providers that help us run the
              site and our business:
            </p>
            <ul>
              <li>Google Analytics and PostHog, for site analytics.</li>
              <li>
                Meta (Facebook and Instagram), whose pixel runs on some
                landing pages to measure ad results.
              </li>
              <li>Amazon Web Services, to send email.</li>
              <li>
                AI service providers, to process the text you submit to our
                free tools.
              </li>
            </ul>
            <p>
              Each provider handles data under its own privacy policy.
            </p>

            <h2>Your choices</h2>
            <ul>
              <li>
                You can block or delete cookies in your browser settings.
              </li>
              <li>
                You can opt out of Google Analytics with Google&apos;s browser
                add-on, and manage Meta ad preferences in your Facebook
                settings.
              </li>
              <li>
                You can ask us to access, correct or delete your information
                by emailing us.
              </li>
            </ul>

            <h2>Data retention and security</h2>
            <p>
              We keep form submissions for as long as needed to serve you and
              run our business, then delete them.
            </p>
            <p>
              We use reasonable safeguards, but no website can guarantee
              complete security.
            </p>

            <h2>Children</h2>
            <p>
              This site is for business owners and is not directed to anyone
              under 18.
            </p>

            <h2>Changes</h2>
            <p>
              If we update this policy, we will change the date at the top of
              this page.
            </p>

            <h2>Contact</h2>
            <p>
              Questions or requests:{" "}
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

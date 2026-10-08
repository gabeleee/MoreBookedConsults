import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";
import RealAdVideo from "./RealAdVideo";

// "Real example" block: the tumbleweed video ad next to the /booking-audit/
// page it sends people to. `post` tags the link (utm_content) so blog clicks
// stay separate from paid-ad leads. Children: a one-line lead-in for the post.
// The specifics below come from the ad brief (~/mbc-ads/01-tumbleweed-brief.md)
// and the live page; add real results only once the ad has run.
const SCRIPT = [
  "Your competitor's Tuesday",
  "Your Tuesday.",
  "It's not your treatments.",
  "It's your booking flow.",
  "Your free Booking Audit. I fix med spa booking flows.",
  "Get your free audit, a $100 value.",
];

const VIDEO_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Your Tuesday: a med spa booking ad by More Booked Consults",
  description:
    "A 12-second vertical video ad for med spa owners. A busy lobby labeled \"Your competitor's Tuesday\" cuts to an empty lobby with a tumbleweed, then: \"It's not your treatments. It's your booking flow.\" It ends on a free Booking Audit offer.",
  thumbnailUrl: [`${SITE.url}/examples/tumbleweed-ad-poster.jpg`],
  contentUrl: `${SITE.url}/examples/tumbleweed-ad.mp4`,
  uploadDate: "2026-10-07",
  duration: "PT12S",
  transcript: SCRIPT.join(" "),
  publisher: { "@type": "Organization", name: "More Booked Consults", url: SITE.url },
};

export function RealAd({ post, children }: { post: string; children?: ReactNode }) {
  const href = `/booking-audit/?utm_source=blog&utm_medium=example&utm_content=${encodeURIComponent(post)}`;
  return (
    <Reveal>
      <aside className="vk-realad">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_LD) }} />
        <p className="vk-realad-eyebrow">Real example</p>
        <p className="vk-realad-title">Our own ad, and the page it sends people to</p>
        {children ? <div className="vk-realad-lead">{children}</div> : null}
        <div className="vk-realad-pair">
          <figure>
            <div className="vk-realad-phone">
              <RealAdVideo
                src="/examples/tumbleweed-ad.mp4"
                poster="/examples/tumbleweed-ad-poster.jpg"
                label="12-second video ad: a busy med spa lobby, then an empty one with a tumbleweed, then the free Booking Audit offer"
              />
            </div>
            <figcaption>The ad</figcaption>
          </figure>
          <span className="vk-realad-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <figure>
            <a className="vk-realad-phone" href={href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/examples/booking-audit-page.jpg"
                alt="The Booking Audit landing page on a phone: headline, photo and a four-step form"
                width="540"
                height="1080"
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>The page</figcaption>
          </figure>
        </div>
        <div className="vk-realad-notes">
          <div>
            <p className="vk-realad-h">What the ad says</p>
            <ol className="vk-realad-script">
              {SCRIPT.map((line) => (
                <li key={line}>&ldquo;{line}&rdquo;</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="vk-realad-h">Why we made it this way</p>
            <ul className="vk-realad-why">
              <li>The hook is a joke any owner gets in one second: a busy lobby, then a hard cut to the same lobby, empty, with a tumbleweed rolling through.</li>
              <li>It names the real problem out loud, the booking flow and not the treatments, so the offer makes sense before it appears.</li>
              <li>Every line is on screen, so the ad works with the sound off.</li>
              <li>There is one offer, a free Booking Audit, and one button.</li>
            </ul>
          </div>
          <div>
            <p className="vk-realad-h">What the page does</p>
            <ul className="vk-realad-why">
              <li>The headline picks up the ad&apos;s joke, &ldquo;Your Tuesday doesn&apos;t have to look like this,&rdquo; with the same tumbleweed lobby.</li>
              <li>The first question is one tap: &ldquo;When someone tries to book, what happens?&rdquo;</li>
              <li>The form has 4 short steps, one question per screen, and asks for contact details last.</li>
              <li>There is no menu or footer, so the form is the only next step.</li>
              <li>A privacy note and a sample audit PDF answer &ldquo;what am I signing up for?&rdquo; before anyone types an email.</li>
            </ul>
          </div>
          <div>
            <p className="vk-realad-h">How we&apos;ll judge it</p>
            <ul className="vk-realad-why">
              <li>Hook rate first: the share of people who watch 3 seconds. Above 30% is good, and under 20% means the opening isn&apos;t working.</li>
              <li>Then cost per audit request, which decides whether the ad keeps running.</li>
              <li>This ad is polished and a little over the top, with AI-generated lobby scenes.</li>
              <li>The next ad tests the opposite: a low-fi, phone-shot style.</li>
            </ul>
          </div>
        </div>
        <a className="btn vk-realad-btn" href={href}>
          See the live page
        </a>
      </aside>
    </Reveal>
  );
}

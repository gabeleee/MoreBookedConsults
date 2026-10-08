import type { ReactNode } from "react";
import Reveal from "./Reveal";
import RealAdVideo from "./RealAdVideo";

// "Real example" block: the tumbleweed video ad next to the /booking-audit/
// page it sends people to. `post` tags the link (utm_content) so blog clicks
// stay separate from paid-ad leads. Children: a one-line lead-in for the post.
export function RealAd({ post, children }: { post: string; children?: ReactNode }) {
  const href = `/booking-audit/?utm_source=blog&utm_medium=example&utm_content=${encodeURIComponent(post)}`;
  return (
    <Reveal>
      <aside className="vk-realad">
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
        <ul className="vk-realad-why">
          <li>The first second stops the scroll: a busy lobby, then an empty one.</li>
          <li>One offer and one button, a free Booking Audit.</li>
          <li>The page has no menu, so the form is the only next step.</li>
          <li>The form asks one easy question per screen, so it never feels long.</li>
        </ul>
        <a className="btn vk-realad-btn" href={href}>
          See the live page
        </a>
      </aside>
    </Reveal>
  );
}

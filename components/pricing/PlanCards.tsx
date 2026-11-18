import { LineIcon } from "@/components/LineIcon";
import { ProductMark } from "@/components/home/ProductMark";
import type { ReactNode } from "react";
import { HeroArt, LiftLabArt, GlidePathArt, SiennaArt, SecondGlanceArt, LeakFinderArt, MagnetArt } from "@/components/home/SystemArt";
import { TreatmentPagesArt } from "@/components/home/LocalSeoArt";
import { RaveLoopArt, MonthlyReportArt } from "@/components/home/FullBookArt";
import SeeExample from "@/components/pricing/SeeExample";

// One plan (Gabe 2026-11-18; named "Full Book" until renamed the same day): Optimized Booking System™ $499/mo, month to month. The website
// is OPTIONAL (built free if they need one) and is NOT counted in the value, so
// practices that keep their own site (e.g. multi-location spas) still see the
// value. Front Desk ($299) and Full Book Pro ($749) were dropped the same
// day; more pages / more design tests are add-ons, never a second plan.
// Shared by /pricing/ and the homepage. Styles: .pr-* (app/pricing/pr.css) +
// .pv-* (app/pricing/pv.css), inside a "pr pv" wrapper.
//
// VALUE = what each piece would cost bought separately for a year, kept
// conservative on purpose (Gabe 11-18: halved, AI makes everything cheaper).
// Basis (scanned 2026-11-18): entry-level SEO ~$500/mo, AI receptionists
// $79–$299/mo, review tools ~$50/mo; builds = half the proposal stack values.
const CALL = "/demo/";

// Self-serve checkout (Gabe 11-18: "give people the ability to just buy it").
// A Stripe Payment Link for the $499/mo plan, set at build time. When set, the
// card's main button is "Get started" (checkout) and the demo becomes the
// secondary button; when unset, the card keeps "Get a free demo" only.
export const BUY_URL = process.env.NEXT_PUBLIC_MBC_BUY_URL || "https://buy.stripe.com/7sYbJ1cPd7tacYD4kHcs800";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

export function B({ n }: { n: string }) {
  return (
    <b className="pv-b">
      {n}
      <sup>™</sup>
    </b>
  );
}

// Example picture (popup) + detail page for each system. Used by the plan card
// ("Name (See example)") and the "8 Systems" cards on /pricing/.
export const EXAMPLES: Record<string, { Art: () => ReactNode; note: string; href?: string }> = {
  atlas: { Art: TreatmentPagesArt, note: "Example: a page for each treatment people search for in your city.", href: "/local-seo/" },
  "glide-path": { Art: GlidePathArt, note: "Example: visitors pick their goal, answer quick questions, then book.", href: "/booking-systems/#glide-path" },
  sienna: { Art: SiennaArt, note: "Example: Sienna answering a call and texting the booking link.", href: "/booking-systems/#sienna-ai" },
  "lift-lab": { Art: LiftLabArt, note: "Example with sample data: version B beat the current page, so it stays and next month's tests start from there." },
  "second-glance": { Art: SecondGlanceArt, note: "Example: an exit offer shown to a visitor about to leave.", href: "/booking-systems/#second-glance" },
  "consult-magnet": { Art: MagnetArt, note: "Example: a first-visit offer built for one treatment." },
  "leak-finder": { Art: LeakFinderArt, note: "Example with sample data: the step where visitors give up.", href: "/booking-systems/#leak-finder" },
  "rave-loop": { Art: RaveLoopArt, note: "Example: the review text a client gets after a visit." },
  "clear-view": { Art: MonthlyReportArt, note: "Example with sample data: your plain-numbers monthly report.", href: "/booking-systems/#clear-view" },
};

export type Item = {
  mark?: MarkId; // branded system
  icon?: string; // LineIcon for unbranded items
  name: string;
  d: string; // one line for the plan card
  basis: string; // what it would cost elsewhere (value section)
  value: number; // year-one value in dollars
};

// Most valuable first.
export const ITEMS: Item[] = [
  { mark: "atlas", name: "Authority Atlas", d: "20 new Google pages a month", basis: "Entry-level SEO runs about $500 a month", value: 6000 },
  { mark: "glide-path", name: "Glide Path", d: "Highly optimized booking flow", basis: "A custom multi-step booking flow, designed and built", value: 1200 },
  { mark: "sienna", name: "Sienna AI", d: "AI receptionist, answers 24/7", basis: "AI receptionists run about $79 to $299 a month", value: 1800 },
  { mark: "lift-lab", name: "Lift Lab", d: "2 design tests a month that raise your conversion rate", basis: "24 design tests a year; we keep the winners", value: 2400 },
  { mark: "second-glance", name: "Second Glance", d: "Exit offer for leaving visitors", basis: "An exit offer, written, designed and built", value: 400 },
  { mark: "consult-magnet", name: "Consult Magnet", d: "Your first-visit offer, done for you", basis: "A first-visit offer, written and designed", value: 250 },
  { mark: "leak-finder", name: "Leak Finder", d: "Pinpoints where visitors drop off", basis: "Step-by-step drop-off tracking", value: 250 },
  { mark: "rave-loop", name: "Rave Loop", d: "Review texts after every visit", basis: "Review request tools run about $50 a month", value: 600 },
  { mark: "clear-view", name: "Clear View", d: "Monthly report + live dashboard", basis: "Monthly reporting and a live dashboard", value: 250 },
];

// Month to month since 11-18 (Gabe dropped the 6-month minimum); the tooltip sets expectations instead.
export const MIN_WHY =
  "No contract. Cancel anytime with 30 days' notice. New Google pages usually take 3 to 6 months to rank, so most practices see the biggest gains after month three.";

// Small "?" with a tooltip on hover or tap (CSS only: .pv-tip in pv.css).
export function Tip({ text, label = "Why?" }: { text: string; label?: string }) {
  return (
    <span className="pv-tip" tabIndex={0} role="button" aria-label={label}>
      <span aria-hidden="true">?</span>
      <span className="pv-tip-b" role="tooltip">
        {text}
      </span>
    </span>
  );
}

// The optional website row: free, never part of the value total.
export function WebsiteOptional({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pv-web${compact ? " compact" : ""}`}>
      <span className="pm-tile pm-md pv-ic" aria-hidden="true">
        <LineIcon name="monitor" />
      </span>
      <div>
        <b className="pv-b">
          Need a new website? We&apos;ll build it free.<a className="pv-ast" href="#fine-print" aria-label="See terms">*</a>
        </b>
        <span>Optional. Already have a site you like? We work on the one you have.</span>
        <SeeExample name="A website built to book" note="Example: a booking-first home page on a phone, with Sienna AI and the exit offer working together." thumb={false} label="See an example">
          <HeroArt />
        </SeeExample>
      </div>
      <em>Free</em>
    </div>
  );
}

// Fine print for the free website (Gabe 11-18: the free build needs a longer
// commitment; 12 months matches the offer sent to Land Aesthetics).
export const FREE_SITE_TERMS =
  "*Free website: available with a 12-month minimum. Without a new website, the Optimized Booking System is month to month. The website is built on your own domain and stays yours.";

export const TOTAL = ITEMS.reduce((a, i) => a + i.value, 0);
export const PRICE = 499;
export const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function ItemIcon({ i }: { i: Item }) {
  if (i.mark) return <ProductMark id={i.mark} />;
  return (
    <span className="pm-tile pm-md pv-ic" aria-hidden="true">
      <LineIcon name={i.icon ?? "check"} />
    </span>
  );
}

export function ItemName({ i }: { i: Item }) {
  return i.mark ? <B n={i.name} /> : <b className="pv-b">{i.name}</b>;
}

// Name linked to its detail page + "(See example)" popup, when we have them.
function ItemTitle({ i }: { i: Item }) {
  const ex = i.mark ? EXAMPLES[i.mark] : undefined;
  const name = <ItemName i={i} />;
  return (
    <span className="pv-ttl">
      {ex?.href ? (
        <a className="pv-ttl-a" href={ex.href}>
          {name}
        </a>
      ) : (
        name
      )}
      {ex && (
        <SeeExample name={i.name} note={ex.note} thumb={false} label="See example" inline>
          <ex.Art />
        </SeeExample>
      )}
    </span>
  );
}

export function PlanCards({ cta = "Get a free demo" }: { cta?: string }) {
  return (
    <div className="pv-one" id="full-book">
      <div className="pv-one-l">
        <span className="pr-tag">Everything included</span>
        <h2 className="pr-name pv-name">
          Optimized Booking System<sup>™</sup>
        </h2>
        <p className="pr-sub">More Google pages, more bookings, every call answered.</p>
        <p className="pv-was">
          <s>{usd(TOTAL)}</s> value in year one
        </p>
        <p className="pr-price">
          {usd(PRICE)}
          <span>/month</span>
        </p>
        <p className="pr-terms">
          No contract · cancel anytime <Tip text={MIN_WHY} label="When will I see results?" />
        </p>
        <div className="pv-hi">
          <span>Highlights</span>
          <ul>
            {["A booking flow built to convert", "Every call answered, 24/7", "2 design tests a month to lift bookings", "20 new Google pages a month", "And many more"].map((h) => (
              <li key={h}>
                <LineIcon name="check" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        {BUY_URL ? (
          <>
            <a className="btn" href={BUY_URL}>
              Get started, $499/month
            </a>
            <a className="btn-ghost pv-demo2" href={CALL}>
              Or get a free demo first
            </a>
          </>
        ) : (
          <a className="btn" href={CALL}>
            {cta}
          </a>
        )}
        <p className="pv-one-note">
          Want more pages or more design tests? <a href="#add-ons">Add them anytime</a>.
        </p>
      </div>
      <div className="pv-one-r">
        <p className="pv-one-k">
          <span>What&apos;s included</span>
          <span>Value in year one</span>
        </p>
        <ul className="pv-rows pv-vrows">
          {ITEMS.map((i) => (
            <li key={i.name}>
              <ItemIcon i={i} />
              <div>
                <ItemTitle i={i} />
                <span>{i.d}</span>
              </div>
              <s className="pv-val">{usd(i.value)}</s>
            </li>
          ))}
        </ul>
        <WebsiteOptional compact />
      </div>
    </div>
  );
}

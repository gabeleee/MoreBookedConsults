import { LineIcon } from "@/components/LineIcon";
import { ProductMark } from "@/components/home/ProductMark";
import { HeroArt } from "@/components/home/SystemArt";
import SeeExample from "@/components/pricing/SeeExample";

// One plan (Gabe 2026-11-18): Full Book $499/mo, 6-month minimum. The website
// is OPTIONAL (built free if they need one) and is NOT counted in the value, so
// practices that keep their own site (e.g. multi-location spas) still see the
// value. Front Desk ($299) and Full Book Pro ($749) were dropped the same
// day; more pages / more design updates are add-ons, never a second plan.
// Shared by /pricing/ and the homepage. Styles: .pr-* (app/pricing/pr.css) +
// .pv-* (app/pricing/pv.css), inside a "pr pv" wrapper.
//
// VALUE = what each piece would cost bought separately for a year, kept
// conservative on purpose (Gabe 11-18: halved, AI makes everything cheaper).
// Basis (scanned 2026-11-18): entry-level SEO ~$500/mo, AI receptionists
// $79–$299/mo, review tools ~$50/mo; builds = half the proposal stack values.
const CALL = "/demo/";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

export function B({ n }: { n: string }) {
  return (
    <b className="pv-b">
      {n}
      <sup>™</sup>
    </b>
  );
}

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
  { icon: "trending", name: "2 design updates a month", d: "Each one measured against last month", basis: "24 measured site improvements a year", value: 2400 },
  { mark: "second-glance", name: "Second Glance", d: "Exit offer for leaving visitors", basis: "An exit offer, written, designed and built", value: 400 },
  { mark: "consult-magnet", name: "Consult Magnet", d: "Your first-visit offer, done for you", basis: "A first-visit offer, written and designed", value: 250 },
  { mark: "leak-finder", name: "Leak Finder", d: "Pinpoints where visitors drop off", basis: "Step-by-step drop-off tracking", value: 250 },
  { mark: "rave-loop", name: "Rave Loop", d: "Review texts after every visit", basis: "Review request tools run about $50 a month", value: 600 },
  { mark: "clear-view", name: "Clear View", d: "Monthly report + live dashboard", basis: "Monthly reporting and a live dashboard", value: 250 },
];

// Why the minimum is 6 months (shown in a tooltip next to the terms).
export const MIN_WHY =
  "New Google pages usually take 3 to 6 months to rank, and design updates need a few months of real numbers to show what books more. Six months is enough time to see results you can count. After that, it's month to month.";

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
        <b className="pv-b">Need a new website? We&apos;ll build it free.</b>
        <span>Optional. Already have a site you like? We work on the one you have.</span>
        <SeeExample name="A website built to book" note="Example: a booking-first home page on a phone, with Sienna AI and the exit offer working together." thumb={false} label="See an example">
          <HeroArt />
        </SeeExample>
      </div>
      <em>Free</em>
    </div>
  );
}

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

export function PlanCards({ cta = "Get a free demo" }: { cta?: string }) {
  return (
    <div className="pv-one" id="full-book">
      <div className="pv-one-l">
        <span className="pr-tag">Everything included</span>
        <h2 className="pr-name">Full Book</h2>
        <p className="pr-sub">New Google pages every month, a booking flow built to convert, and every call answered.</p>
        <p className="pv-was">
          <s>{usd(TOTAL)}</s> value in year one
        </p>
        <p className="pr-price">
          {usd(PRICE)}
          <span>/month</span>
        </p>
        <p className="pr-terms">
          6-month minimum <Tip text={MIN_WHY} label="Why a 6-month minimum?" />
        </p>
        <div className="pv-hi">
          <span>Highlights</span>
          <b>20 new Google pages a month</b>
          <b>A booking flow built to convert</b>
          <b>Every call answered, 24/7</b>
        </div>
        <a className="btn" href={CALL}>
          {cta}
        </a>
        <p className="pv-one-note">
          Want more pages or more design updates? <a href="#add-ons">Add them anytime</a>.
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
                <ItemName i={i} />
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

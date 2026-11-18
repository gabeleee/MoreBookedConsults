import { ProductMark } from "@/components/home/ProductMark";

// The three plan cards, shared by /pricing/ and the homepage. Styles: .pr-* in
// app/pricing/pr.css + .pv-* in app/pricing/pv.css (import both where used,
// inside a "pr pv" wrapper). Prices set by Gabe 2026-11-18.
const CALL = "/demo/";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

// The brand name, bold, with ™
export function B({ n }: { n: string }) {
  return (
    <b className="pv-b">
      {n}
      <sup>™</sup>
    </b>
  );
}

// Most valuable first. Each card shows its included systems first, then the rest greyed.
export const SYS: { id: MarkId; name: string }[] = [
  { id: "atlas", name: "Authority Atlas" },
  { id: "glide-path", name: "Glide Path" },
  { id: "sienna", name: "Sienna AI" },
  { id: "second-glance", name: "Second Glance" },
  { id: "consult-magnet", name: "Consult Magnet" },
  { id: "leak-finder", name: "Leak Finder" },
  { id: "rave-loop", name: "Rave Loop" },
  { id: "clear-view", name: "Clear View" },
];

type Plan = {
  id: string;
  tag?: string;
  name: string;
  who: string;
  price: string;
  terms: string;
  hi: string[]; // the "every month" headline
  rows: Partial<Record<MarkId, string>>; // missing = not included
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "front-desk",
    name: "Front Desk",
    who: "Every call answered and every happy client asked for a review.",
    price: "$299",
    terms: "Month to month",
    hi: ["Every call answered, 24/7"],
    rows: {
      sienna: "AI receptionist, answers 24/7",
      "rave-loop": "Review texts after every visit",
      "clear-view": "Monthly report: calls and new clients",
    },
  },
  {
    id: "full-book",
    tag: "Most value",
    name: "Full Book",
    who: "A new website designed to book, plus 20 new Google pages every month.",
    price: "$499",
    terms: "Website included · 12-month minimum",
    hi: ["A new website, designed to book", "20 new Google pages a month", "2 design updates a month"],
    rows: {
      atlas: "20 new Google pages a month",
      "glide-path": "Highly optimized booking flow",
      sienna: "AI receptionist, answers 24/7",
      "second-glance": "Exit offer for leaving visitors",
      "consult-magnet": "Your first-visit offer, done for you",
      "leak-finder": "Pinpoints where visitors drop off",
      "rave-loop": "Review texts after every visit",
      "clear-view": "Monthly report + live dashboard",
    },
    featured: true,
  },
  {
    id: "full-book-pro",
    name: "Full Book Pro",
    who: "A new website that covers every treatment in your city on Google.",
    price: "$749",
    terms: "Website included · 12-month minimum",
    hi: ["A 150-page website in 90 days", "30 new Google pages a month", "4 design updates a month"],
    rows: {
      atlas: "150 pages in 90 days",
      "glide-path": "Highly optimized booking flow",
      sienna: "AI receptionist, answers 24/7",
      "second-glance": "Exit offer for leaving visitors",
      "consult-magnet": "An offer for each top treatment",
      "leak-finder": "Pinpoints where visitors drop off",
      "rave-loop": "Review texts + replies to every review",
      "clear-view": "Report, dashboard + monthly call",
    },
  },
];


export function PlanCards({ cta = "Get a free demo" }: { cta?: string }) {
  return (
    <div className="pr-plans pv-plans">
      {PLANS.map((p) => (
        <div key={p.id} id={p.id} className={`pr-plan pv-plan${p.featured ? " featured" : ""}`}>
          {p.tag && <span className="pr-tag">{p.tag}</span>}
          <h2 className="pr-name">{p.name}</h2>
          <p className="pr-sub">{p.who}</p>
          <p className="pr-price">
            {p.price}
            <span>/month</span>
          </p>
          <p className="pr-terms">{p.terms}</p>
          <div className="pv-hi">
            <span>Highlights</span>
            {p.hi.map((h) => (
              <b key={h}>{h}</b>
            ))}
          </div>
          <ul className="pv-rows">
            {[...SYS.filter((s) => p.rows[s.id]), ...SYS.filter((s) => !p.rows[s.id])].map((s) => {
              const d = p.rows[s.id];
              return (
                <li key={s.id} className={d ? "" : "off"}>
                  <ProductMark id={s.id} />
                  <div>
                    <B n={s.name} />
                    <span>{d ?? "Not included"}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <a className={p.featured ? "btn" : "btn-ghost"} href={CALL}>
            {cta}
          </a>
        </div>
      ))}
    </div>
  );
}

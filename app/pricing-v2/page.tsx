import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "../pricing/pr.css";
import "./pv.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";
import { ProductMark } from "@/components/home/ProductMark";

// DRAFT (2026-11-18): solo-studio pricing mockup for Gabe. Local only, noindex.
// Prices are Gabe's working numbers ($400/mo, $1,997 build, $2,500 Growth),
// not final.
export const metadata: Metadata = {
  title: "Pricing (draft)",
  robots: { index: false, follow: false },
};

const CALL = "/demo/";

type Plan = {
  id: string;
  mark: Parameters<typeof ProductMark>[0]["id"];
  tag?: string;
  name: string;
  who: string;
  price: string;
  per: string;
  once?: string;
  terms: string;
  lead?: string;
  pts: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "front-desk",
    mark: "sienna",
    name: "Front Desk",
    who: "For solo injectors and small studios who like their website and just miss too many calls.",
    price: "$400",
    per: "/month",
    terms: "No setup fee · 3-month minimum",
    pts: [
      "Sienna AI answers every call, day and night, with your menu and prices",
      "Texts your booking link to missed calls and people who stop halfway",
      "Rave Loop review texts after each visit (unhappy clients reach you first)",
      "Clear View monthly report: calls answered, after-hours calls, new clients booked",
      "Works with the booking app you already use",
    ],
  },
  {
    id: "full-book",
    mark: "glide-path",
    tag: "Best for solo studios",
    name: "Full Book",
    who: "For studios on a booking-app page, or an old site, who want to be found and booked.",
    price: "$400",
    per: "/month",
    once: "+ $1,997 one-time website build",
    terms: "3-month minimum",
    lead: "Everything in Front Desk, plus:",
    pts: [
      "Your own website, built to book (Glide Path™)",
      "Clients pick their goal, then land in your booking app with the treatment already chosen",
      "2 new treatment pages every month, so Google shows you for more treatments",
      "Your Consult Magnet first-visit offer",
      "Hosting, security and updates included",
    ],
    featured: true,
  },
  {
    id: "growth",
    mark: "clear-view",
    name: "Growth",
    who: "For busy practices that already get traffic and want more of it to book.",
    price: "$2,500",
    per: "/month",
    terms: "No contract · cancel anytime",
    lead: "Everything in Full Book, plus:",
    pts: [
      "2 booking improvements every month, each measured against your baseline",
      "Second Glance exit offer + Leak Finder drop-off tracking",
      "Booking flow live in 14 days, or month one is free",
      "90-day booking guarantee",
    ],
  },
];

// [label, Front Desk, Full Book, Growth]
const COMPARE: [string, string, string, string][] = [
  ["Monthly", "$400", "$400", "$2,500"],
  ["One-time setup", "None", "$1,997 website", "None"],
  ["Minimum term", "3 months", "3 months", "None"],
  ["Sienna AI answers every call", "yes", "yes", "yes"],
  ["Booking-link texts", "yes", "yes", "yes"],
  ["Review texts after visits", "yes", "yes", "yes"],
  ["Monthly report", "yes", "yes", "yes"],
  ["Your own website, built to book", "no", "yes", "yes"],
  ["New treatment pages", "no", "2 a month", "2 a month"],
  ["Measured booking improvements", "no", "no", "2 a month"],
  ["90-day booking guarantee", "no", "no", "yes"],
];

const ADDONS = [
  {
    mark: "atlas" as const,
    name: "Authority Atlas™ Local SEO",
    price: "$2,500/month",
    terms: "6-month minimum",
    p: "A page for every treatment in your city, your Google profile kept current, and rankings tracked.",
  },
  {
    mark: "spotlight" as const,
    name: "Spotlight™ Ads",
    price: "$3,000/month",
    terms: "+ $2,500 setup · 3-month minimum",
    p: "Meta ads built around your best offer. You pay Meta directly, never marked up.",
  },
];

const SOFTWARE = [
  ["calendar", "Your calendar, rooms and providers"],
  ["clipboard", "Charts, consents and intake forms"],
  ["card", "Payments, deposits and memberships"],
  ["message", "Reminders for clients you already have"],
];
const US = [
  ["phone", "Every call answered, even mid-treatment"],
  ["search", "A website that shows up on Google for your treatments"],
  ["funnel", "A booking path that sends new clients into your calendar"],
  ["star", "More reviews, and a monthly count of new clients"],
];
const APPS = ["Boulevard", "Vagaro", "GlossGenius", "Aesthetic Record", "Zenoti", "Mangomint"];

const FAQ = [
  {
    q: "I already pay for Boulevard. Do I need you too?",
    a: "They do different jobs. Boulevard (or Vagaro, GlossGenius, Aesthetic Record) runs your day: the calendar, charts, payments and memberships. We bring new clients to that calendar: answering the calls you miss, a website people find on Google, and a booking path that hands them to your booking app. Most clients keep their software and add us.",
  },
  {
    q: "Do I have to switch booking software?",
    a: "No. We work in front of the booking app you already use. On Full Book, your new site sends each client into your booking app with their treatment already picked.",
  },
  {
    q: "My booking software has its own AI receptionist. Why Sienna?",
    a: "Sienna works with any booking app, answers with your own treatment menu and prices, and texts a booking link when someone can't book on the call. It's also part of a system that brings new people in, not just one that answers. If you're happy with the one you have, start with Full Book for the website and pages instead, and we'll tell you so on the demo.",
  },
  {
    q: "What's in the $1,997 website build?",
    a: "Your own website on your domain: home page, treatment pages, about and contact, written and designed for you, plus the goal-first booking path. It's yours to keep. Bigger sites with more pages at launch are priced on the demo.",
  },
  {
    q: "Can I start with Front Desk and move up later?",
    a: "Yes. Move up anytime and pay the difference. Your Sienna setup, numbers and reviews carry over.",
  },
  {
    q: "What happens if I cancel?",
    a: "After the minimum, cancel with 30 days' notice by email. You keep your website, domain and pages. Sienna AI runs on our system, so it switches off when you leave.",
  },
];

function Mark({ v }: { v: string }) {
  if (v === "yes")
    return (
      <span className="bs-yes" aria-label="Yes">
        <LineIcon name="check" />
      </span>
    );
  if (v === "no")
    return (
      <span className="bs-no" aria-label="No">
        <LineIcon name="ban" />
      </span>
    );
  return <span className="bs-txt">{v}</span>;
}

export default function PricingDraft() {
  return (
    <main className="hv bs pr pv">
      <div className="pv-draft">DRAFT mockup · local only · prices are working numbers</div>

      {/* ---------------- Hero + plans ---------------- */}
      <section className="bs-hero pr-hero">
        <PrismBackground tone="light" gain={1.25} tilt={0.46} phase={30} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Simple Pricing, Sized To Your Practice</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            Plans start at $400 a month. Keep the booking software you already use. We make sure
            every call gets answered and more new clients land in your calendar.
          </p>
          <ul className="bs-chips">
            <li><LineIcon name="dollar" /> Prices listed, no surprises</li>
            <li><LineIcon name="calendar" /> Works with your booking app</li>
            <li><LineIcon name="lock" /> Your website stays yours</li>
          </ul>

          <div className="pr-plans pv-plans">
            {PLANS.map((p) => (
              <div key={p.id} id={p.id} className={`pr-plan pv-plan${p.featured ? " featured" : ""}`}>
                {p.tag && <span className="pr-tag">{p.tag}</span>}
                <div className="pv-top">
                  <ProductMark id={p.mark} size="lg" />
                  <h2 className="pr-name">{p.name}</h2>
                </div>
                <p className="pr-sub">{p.who}</p>
                <p className="pr-price">
                  {p.price}
                  <span>{p.per}</span>
                </p>
                <p className="pv-once">{p.once ?? " "}</p>
                <p className="pr-terms">{p.terms}</p>
                {p.lead && <p className="pv-lead">{p.lead}</p>}
                <ul>
                  {p.pts.map((x) => (
                    <li key={x}>
                      <LineIcon name="check" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a className={p.featured ? "btn" : "btn-ghost"} href={CALL}>
                  Get a free demo
                </a>
              </div>
            ))}
          </div>

          <div className="pr-bundle pv-anchor">
            <span className="pr-bundle-ic">
              <LineIcon name="users" />
            </span>
            <p>
              <b>A part-time front desk costs about $3,000 a month in wages.</b> Sienna answers every
              call, nights and weekends included, for $400.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Compare ---------------- */}
      <section className="hv-sec bs-cmp-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Compare The Plans</h2>
            <p>Same Sienna AI on every plan. The bigger plans add a website and monthly improvements.</p>
          </div>
          <div className="bs-cmp-scroll">
            <table className="bs-cmp pr-cmp">
              <thead>
                <tr>
                  <th />
                  <th>Front Desk</th>
                  <th className="us">
                    <span>Best for solo</span>Full Book
                  </th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, a, b, c]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td><Mark v={a} /></td>
                    <td className="us"><Mark v={b} /></td>
                    <td><Mark v={c} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- Booking software vs us ---------------- */}
      <section className="hv-sec pv-vs-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Already On Boulevard Or Vagaro? Keep It.</h2>
            <p>Your booking software runs your day. We fill it with new clients. You need both.</p>
          </div>
          <div className="pv-vs">
            <div className="pv-col">
              <span className="pv-col-tag">Your booking software</span>
              <h3>Runs The Spa</h3>
              <ul>
                {SOFTWARE.map(([ic, t]) => (
                  <li key={t}><LineIcon name={ic} />{t}</li>
                ))}
              </ul>
              <p className="pv-col-foot">Boulevard, Vagaro, GlossGenius and others, about $150–$400 a month</p>
            </div>
            <div className="pv-join" aria-hidden="true">
              <span>+</span>
            </div>
            <div className="pv-col us">
              <span className="pv-col-tag">More Booked Consults</span>
              <h3>Fills The Calendar</h3>
              <ul>
                {US.map(([ic, t]) => (
                  <li key={t}><LineIcon name={ic} />{t}</li>
                ))}
              </ul>
              <p className="pv-col-foot">From $400 a month, on top of the software you already have</p>
            </div>
          </div>

          <div className="pv-flow" aria-label="How a new client reaches your calendar">
            <div><LineIcon name="search" /><b>Finds you</b><span>Google, Instagram, a friend</span></div>
            <i>→</i>
            <div><LineIcon name="phone" /><b>Calls or visits</b><span>Sienna answers, your site guides</span></div>
            <i>→</i>
            <div className="end"><LineIcon name="calendar" /><b>Books</b><span>in your existing booking app</span></div>
          </div>
          <ul className="pv-apps">
            <li className="lbl">Works with</li>
            {APPS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      {/* ---------------- Add-ons ---------------- */}
      <section className="hv-sec pv-add-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Add When You&apos;re Ready</h2>
            <p>For practices that want more people coming in, not just more of them booking.</p>
          </div>
          <div className="pv-adds">
            {ADDONS.map((a) => (
              <div key={a.name} className="pv-add">
                <ProductMark id={a.mark} />
                <div>
                  <h3>{a.name}</h3>
                  <p className="pv-add-price">{a.price} <span>{a.terms}</span></p>
                  <p>{a.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Pricing, Answered</h2>
            <p>Not sure which plan fits? We&apos;ll tell you on the demo.</p>
            <a className="btn" href={CALL}>Get a free demo</a>
          </div>
          <div className="hv-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="hv-plus" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-book">
        <div className="wrap hv-final">
          <h2>Hear Sienna Answer Before You Decide</h2>
          <p>Call our demo line: <a href="tel:+17732490840">(773) 249-0840</a>. Then book a free 20-minute demo.</p>
          <a className="btn hv-cta-hero" href={CALL}>
            Get a free demo <span className="hv-cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="hv-book-alt">Or see <Link href="/results/">the track record</Link>.</p>
        </div>
      </section>
    </main>
  );
}

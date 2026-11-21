// lib/onboarding.ts
//
// Client onboarding intake. The idea: we do the homework, the client confirms.
// Before sending a client their link we run
//   node scripts/intake-prefill.mjs <slug> <booking-page-url>
// which fills content/onboarding/<slug>.json with everything public (hours,
// menu, prices, photos, links). The form then shows that back for a one-tap
// "looks right" and asks only what we can't find: what they want more of,
// their first-visit offer, a web address, and two practical questions.
//
// New client: run the script, add the hand-picked "client" block (offers built
// from their menu, free domain names), import the file in CLIENTS below.

import landAesthetics from "@/content/onboarding/land-aesthetics.json";
import aestheticaMd from "@/content/onboarding/aesthetica-md.json";

export type Service = {
  name: string;
  category: string | null;
  price: number | null;
  priceVaries: boolean;
  minutes: number;
  description: string;
  image: string | null;
  bookUrl: string;
};

export type Found = {
  source: string;
  sourceUrl: string;
  fetched: string;
  businessName: string;
  ownerName: string | null;
  email: string | null;
  phone: string | null;
  address: string;
  hours: string[];
  about: string;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  googleReviewUrl: string | null;
  cardRequired: boolean;
  cancellationPolicy: string | null;
  coverImage: string | null;
  photos: string[];
  treatmentGroups: { name: string; count: number }[];
  services: Service[];
};

export type ClientInfo = {
  slug: string;
  firstName: string;
  /** Overrides the booking app's account name when they go by another name. */
  ownerName?: string;
  plan: string;
  /** First-visit offers suggested from their own menu. */
  offers: string[];
  /** Web addresses checked as free. */
  domains: string[];
};

export type ClientFile = { client: ClientInfo; found: Found };

/** The slice of Found the browser needs (keeps the page light). */
export type FoundSummary = Omit<Found, "services" | "photos" | "about" | "cancellationPolicy"> & {
  serviceCount: number;
  photos: string[];
  hasCancellationPolicy: boolean;
};

export const CLIENTS: ClientFile[] = [landAesthetics as ClientFile, aestheticaMd as unknown as ClientFile];

export const clientBySlug = (slug: string) => CLIENTS.find((c) => c.client.slug === slug);

export function summarize(f: Found, c?: ClientInfo): FoundSummary {
  const { services, photos, about: _about, cancellationPolicy, ...rest } = f;
  void _about;
  return {
    ...rest,
    ownerName: c?.ownerName ?? rest.ownerName,
    serviceCount: services.length,
    photos: [f.coverImage, ...photos].filter((p): p is string => Boolean(p)).slice(0, 6),
    hasCancellationPolicy: Boolean(cancellationPolicy),
  };
}

// ---------------------------------------------------------------- questions

export type FieldType = "text" | "tel" | "textarea" | "choice" | "multi";

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  hint?: string;
  placeholder?: string;
  /** Fixed options, shown after any client-specific ones. */
  options?: string[];
  /** Client-specific options: their treatment groups, offers or domains. */
  optionsFrom?: "treatments" | "offers" | "domains";
  max?: number;
  required?: boolean;
  /** Short "why this matters" box shown above the options. */
  why?: string;
  showIf?: { field: string; in: string[] };
};

export type Step = {
  id: string;
  title: string;
  intro: string;
  /** Show the "here's what we found" panel at the top of this step. */
  foundPanel?: boolean;
  fields: Field[];
};

export const STEPS: Step[] = [
  {
    id: "check",
    title: "Here's what we found",
    intro: "We pulled this from your booking page, so you don't have to type any of it.",
    foundPanel: true,
    fields: [
      {
        id: "found_ok",
        label: "Does this look right?",
        type: "choice",
        options: ["Looks right", "A few things to fix"],
        required: true,
      },
      {
        id: "found_fixes",
        label: "What should we change?",
        type: "textarea",
        placeholder: "New hours, a treatment you stopped offering, a different name to show…",
        showIf: { field: "found_ok", in: ["A few things to fix"] },
        required: true,
      },
    ],
  },
  {
    id: "goals",
    title: "What you want more of",
    intro: "Three quick picks. They decide what we build first.",
    fields: [
      {
        id: "top_treatments",
        label: "Which treatments do you most want to book more of?",
        hint: "Pick up to 3.",
        type: "multi",
        optionsFrom: "treatments",
        max: 3,
        required: true,
      },
      {
        id: "offer",
        label: "Pick a first-visit offer",
        type: "choice",
        optionsFrom: "offers",
        options: ["Choose the best one for me", "No offer for now"],
        why: "Someone who has never met you needs a reason to book now instead of \"someday\". A simple first-visit offer is often the nudge that turns a visitor into a booked client. You can change or stop it any time.",
        required: true,
      },
      {
        id: "domain",
        label: "Pick a web address for your new site",
        hint: "These were all available when we checked. We set it up for you.",
        type: "choice",
        optionsFrom: "domains",
        options: ["I already own one"],
        required: true,
      },
      {
        id: "domain_own",
        label: "Which one?",
        type: "text",
        placeholder: "yourname.com",
        showIf: { field: "domain", in: ["I already own one"] },
        required: true,
      },
    ],
  },
  {
    id: "last",
    title: "Two last questions",
    intro: "Then you're done.",
    fields: [
      {
        id: "visit_list",
        label: "After each visit, Rave Loop™ texts the client asking for a Google review. How should we get your list of visits?",
        type: "choice",
        options: ["I'll give you a login to my booking app", "I'll send a list each week", "Not sure, help me pick"],
        required: true,
      },
      {
        id: "text_number",
        label: "Best number to text you",
        hint: "For quick questions and alerts. Never shown on your site.",
        type: "tel",
        required: true,
      },
    ],
  },
];

// What the client never has to do, shown under the welcome.
export const WE_HANDLE = [
  "Your website, written and designed for you",
  "Photos and your treatment menu, taken from your booking page",
  "Your Google pages and Google profile updates",
  "Sienna AI™ trained on your treatments and prices",
];

export type Values = Record<string, string | string[]>;
export type IntakeSubmission = { client: string; values: Values };

export function optionsFor(f: Field, c: ClientInfo, groups: { name: string }[]) {
  const dynamic =
    f.optionsFrom === "treatments"
      ? groups.map((g) => g.name)
      : f.optionsFrom === "offers"
        ? c.offers
        : f.optionsFrom === "domains"
          ? c.domains
          : [];
  return [...dynamic, ...(f.options ?? [])];
}

export function isShown(f: Field, values: Values) {
  if (!f.showIf) return true;
  const v = values[f.showIf.field];
  return typeof v === "string" && f.showIf.in.includes(v);
}

export function isFilled(v: string | string[] | undefined) {
  return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());
}

export function missingIn(step: Step, values: Values) {
  return step.fields.filter((f) => f.required && isShown(f, values) && !isFilled(values[f.id]));
}

export function intakeAsText(values: Values) {
  const lines: string[] = [];
  for (const s of STEPS) {
    lines.push("", `== ${s.title.toUpperCase()} ==`);
    for (const f of s.fields) {
      if (!isShown(f, values)) continue;
      const v = values[f.id];
      const out = Array.isArray(v) ? v.join(", ") : (v ?? "").trim();
      lines.push(`${f.label}`, `  ${out || "(blank)"}`);
    }
  }
  return lines.join("\n");
}

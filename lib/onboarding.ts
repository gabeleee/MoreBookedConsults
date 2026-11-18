// lib/onboarding.ts
//
// The client onboarding intake: one question set shared by every new client,
// plus a small per-client prefill so each client gets a personal link
// (/onboarding/<slug>/) with what we already know filled in.
//
// To onboard a new client: add an entry to CLIENTS, send them the link.
// To change a question for everyone: edit STEPS. The form, the review screen
// and the notification email are all generated from STEPS.

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "choice" // pick one
  | "multi" // pick any
  | "check"; // a single yes/done checkbox

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  hint?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  /** Show this field only when another field has one of these values. */
  showIf?: { field: string; in: string[] };
};

export type Step = {
  id: string;
  title: string;
  intro: string;
  /** Which system this step feeds, shown as a small tag on the step. */
  feeds?: string;
  fields: Field[];
};

export type ClientPrefill = {
  slug: string;
  practice: string;
  firstName: string;
  plan: string;
  /** Values keyed by field id. */
  values: Record<string, string | string[]>;
};

export const BOOKING_APPS = [
  "GlossGenius",
  "Boulevard",
  "Vagaro",
  "Mangomint",
  "Zenoti",
  "Jane App",
  "Aesthetic Record",
  "Square",
  "Other",
];

export const STEPS: Step[] = [
  {
    id: "practice",
    title: "Your practice",
    intro: "The basics we'll use on your website, your Google profile and Sienna AI™.",
    fields: [
      { id: "practice_name", label: "Business name", type: "text", required: true },
      { id: "owner_name", label: "Your name", type: "text", required: true },
      { id: "email", label: "Best email", type: "email", required: true },
      { id: "mobile", label: "Your mobile (for alerts, never shown publicly)", type: "tel", required: true },
      { id: "business_phone", label: "Business phone clients call", type: "tel", required: true },
      { id: "address", label: "Address clients come to", type: "text", required: true },
      {
        id: "hours",
        label: "Hours",
        type: "textarea",
        placeholder: "Tue–Fri 10–6, Sat 9–2, closed Sun–Mon",
        required: true,
      },
      {
        id: "providers",
        label: "Who does treatments?",
        type: "textarea",
        hint: "Names and credentials as you'd like them shown, for example \"Marjorie Land, licensed aesthetician\".",
        required: true,
      },
    ],
  },
  {
    id: "goals",
    title: "Treatments to fill",
    intro: "This decides which pages we build first and what Glide Path™ steers people toward.",
    feeds: "Authority Atlas™ · Glide Path™",
    fields: [
      {
        id: "top_treatments",
        label: "The 3 to 5 treatments you most want to book more of",
        type: "textarea",
        hint: "Most important first. Say why if it helps, for example \"best margin\" or \"easy to rebook\".",
        required: true,
      },
      {
        id: "first_visit_treatment",
        label: "What should a brand-new client book first?",
        type: "text",
        hint: "Often a consult or an entry treatment that leads to a package.",
      },
      {
        id: "dont_promote",
        label: "Anything you don't want to promote right now?",
        type: "textarea",
        hint: "Treatments you're phasing out, are booked solid on, or don't love doing.",
      },
      {
        id: "ideal_client",
        label: "Describe your ideal new client",
        type: "textarea",
        placeholder: "Age range, skin concerns, budget, where they live",
      },
      {
        id: "service_area",
        label: "Neighborhoods and towns your clients come from",
        type: "textarea",
        placeholder: "RiNo, LoHi, Highlands, Wash Park, Aurora…",
      },
      {
        id: "difference",
        label: "Why do clients pick you over other places?",
        type: "textarea",
        hint: "In your own words. We'll use it on the site and in Sienna AI™.",
      },
    ],
  },
  {
    id: "booking",
    title: "Your booking app",
    intro: "You keep your booking app. Every Book button on your new site opens it with the right treatment already picked.",
    feeds: "Glide Path™",
    fields: [
      { id: "booking_app", label: "Which booking app do you use?", type: "choice", options: BOOKING_APPS, required: true },
      { id: "booking_app_other", label: "Which one?", type: "text", showIf: { field: "booking_app", in: ["Other"] } },
      { id: "booking_url", label: "Link to your online booking page", type: "url", required: true },
      {
        id: "deposit",
        label: "Do new clients pay a deposit or add a card to book?",
        type: "choice",
        options: ["Deposit", "Card on file only", "Neither", "Depends on the treatment"],
      },
      {
        id: "consult_rules",
        label: "Treatments that need a consult or patch test first",
        type: "textarea",
      },
      {
        id: "menu_ok",
        label: "Can we use the treatments, prices and descriptions on your booking page as written?",
        type: "choice",
        options: ["Yes, use them as is", "Mostly, I'll send changes", "No, I'll send a new menu"],
        required: true,
      },
    ],
  },
  {
    id: "first_visit",
    title: "First-visit offer",
    intro: "A simple offer for first-time clients gives visitors a reason to book now. If you'd rather not run one, that's fine.",
    feeds: "Consult Magnet™ · Second Glance™",
    fields: [
      {
        id: "offer_ok",
        label: "Are you open to a first-visit offer?",
        type: "choice",
        options: ["Yes", "Maybe, suggest one", "No offers"],
        required: true,
      },
      {
        id: "offer_ideas",
        label: "Anything you already run or would be happy to offer?",
        type: "textarea",
        placeholder: "$99 Laser Fridays, free consult, 15% off a first facial…",
        showIf: { field: "offer_ok", in: ["Yes", "Maybe, suggest one"] },
      },
      {
        id: "offer_limits",
        label: "Anything you'd never discount?",
        type: "textarea",
        showIf: { field: "offer_ok", in: ["Yes", "Maybe, suggest one"] },
      },
    ],
  },
  {
    id: "website",
    title: "Website and brand",
    intro: "What we need to build and host your site.",
    fields: [
      {
        id: "domain_status",
        label: "Do you own a web address (domain)?",
        type: "choice",
        options: ["Yes", "No, please pick one with me", "Not sure"],
        required: true,
      },
      {
        id: "domain",
        label: "Which one, and where did you buy it?",
        type: "text",
        placeholder: "landaesthetics.com, bought on GoDaddy",
        showIf: { field: "domain_status", in: ["Yes", "Not sure"] },
      },
      {
        id: "domain_ideas",
        label: "Any names you like?",
        type: "text",
        showIf: { field: "domain_status", in: ["No, please pick one with me"] },
      },
      { id: "instagram", label: "Instagram or other social links", type: "textarea" },
      {
        id: "photos_link",
        label: "Link to photos we can use (Google Drive, Dropbox, iCloud)",
        type: "url",
        hint: "Your treatment room, you at work, the outside of the building, your logo. Phone photos are fine.",
      },
      {
        id: "photo_rights",
        label: "Photos on your booking page or Instagram: can we use them on your site?",
        type: "choice",
        options: [
          "Yes, they're mine to use",
          "Some are from brands or other people, I'll tell you which",
          "Please don't use them",
        ],
        required: true,
      },
      {
        id: "before_after",
        label: "Do your clients agree to their before-and-after photos being shown?",
        type: "choice",
        options: ["Yes, I have signed consent", "Some of them", "No before-and-afters"],
      },
      {
        id: "brand_notes",
        label: "Colors, fonts or sites you like the look of",
        type: "textarea",
      },
    ],
  },
  {
    id: "google",
    title: "Google",
    intro: "Your Google Business Profile is where most new clients find you. We keep it up to date for you.",
    feeds: "Authority Atlas™ · Rave Loop™",
    fields: [
      {
        id: "gbp_access",
        label: "Add hello@morebookedconsults.com as a Manager on your Google Business Profile",
        type: "choice",
        options: ["Done", "Please walk me through it", "I don't have a Google profile"],
        hint: "On Google, search your business name, tap Edit profile, then ⋮ → Business Profile settings → People and access → Add.",
        required: true,
      },
      {
        id: "other_listings",
        label: "Other places you're listed",
        type: "multi",
        options: ["Yelp", "Facebook page", "Instagram", "Apple Maps", "Groupon", "Treatment directories"],
      },
    ],
  },
  {
    id: "sienna",
    title: "Sienna AI™",
    intro: "Sienna answers your calls while you're with a client, using your menu and prices, and texts callers your booking link.",
    feeds: "Sienna AI™",
    fields: [
      {
        id: "phone_carrier",
        label: "Who provides your business phone?",
        type: "choice",
        options: ["It's my cell (AT&T, Verizon, T-Mobile…)", "Google Voice", "RingCentral / Grasshopper / OpenPhone", "Landline", "Not sure"],
        required: true,
      },
      {
        id: "sienna_when",
        label: "When should Sienna pick up?",
        type: "choice",
        options: ["Only when I don't answer", "After hours only", "Every call, then pass to me if needed"],
        required: true,
      },
      {
        id: "sienna_prices",
        label: "Can Sienna tell callers your prices?",
        type: "choice",
        options: ["Yes, the menu prices", "Starting prices only", "No, invite them to book a consult"],
        required: true,
      },
      {
        id: "sienna_transfer",
        label: "When should Sienna send a call to you?",
        type: "textarea",
        placeholder: "Reactions after a treatment, anything medical, someone who asks for me by name…",
      },
      {
        id: "sienna_never",
        label: "Anything Sienna should never say or promise?",
        type: "textarea",
      },
      {
        id: "faq",
        label: "Questions callers ask you all the time",
        type: "textarea",
        hint: "Parking, how long results last, pain, aftercare, payment plans… One per line.",
      },
    ],
  },
  {
    id: "reviews",
    title: "Rave Loop™ and reports",
    intro: "After each visit, a short text asks happy clients for a Google review. Anyone unhappy reaches you privately first.",
    feeds: "Rave Loop™ · Clear View™",
    fields: [
      {
        id: "review_texts_ok",
        label: "Can we text your clients after a visit to ask for a review?",
        type: "choice",
        options: ["Yes", "Email only", "Not yet"],
        required: true,
      },
      {
        id: "visit_list",
        label: "How should we get the list of who visited?",
        type: "choice",
        options: [
          "I'll give you a staff login to my booking app",
          "I'll export a list each week",
          "Connect it automatically if you can",
        ],
        showIf: { field: "review_texts_ok", in: ["Yes", "Email only"] },
      },
      {
        id: "unhappy_alert",
        label: "Where should unhappy-client alerts go?",
        type: "choice",
        options: ["Text me", "Email me", "Both"],
      },
      {
        id: "report_to",
        label: "Who should get your monthly Clear View™ report?",
        type: "text",
        placeholder: "Your email, plus anyone else",
      },
    ],
  },
  {
    id: "finish",
    title: "Last thing",
    intro: "Anything else we should know before we start?",
    fields: [
      { id: "notes", label: "Notes, worries, ideas", type: "textarea" },
      {
        id: "best_contact",
        label: "Best way to reach you with quick questions",
        type: "choice",
        options: ["Text", "Email", "Call"],
        required: true,
      },
    ],
  },
];

// Per-client prefill. Only facts we already know and checked; the client can
// change any of it.
export const CLIENTS: ClientPrefill[] = [
  {
    slug: "land-aesthetics",
    practice: "Land Aesthetics",
    firstName: "Marjorie",
    plan: "Full Book, $499/month, website included",
    values: {
      practice_name: "Land Aesthetics",
      owner_name: "Marjorie Land",
      email: "marjorieland@hotmail.com",
      business_phone: "(910) 262-5187",
      address: "2644 Walnut St, Denver, CO",
      booking_app: "GlossGenius",
      booking_url: "https://landaesthetics.glossgenius.com",
      domain_status: "No, please pick one with me",
    },
  },
];

export const clientBySlug = (slug: string) => CLIENTS.find((c) => c.slug === slug);

export type IntakeSubmission = {
  client: string | null;
  values: Record<string, string | string[]>;
};

export function isShown(f: Field, values: Record<string, string | string[]>) {
  if (!f.showIf) return true;
  const v = values[f.showIf.field];
  return typeof v === "string" && f.showIf.in.includes(v);
}

export function isFilled(v: string | string[] | undefined) {
  return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());
}

/** Required, shown fields in a step that are still empty. */
export function missingIn(step: Step, values: Record<string, string | string[]>) {
  return step.fields.filter((f) => f.required && isShown(f, values) && !isFilled(values[f.id]));
}

/** Plain-text summary used by the notification email. */
export function intakeAsText(values: Record<string, string | string[]>) {
  const lines: string[] = [];
  for (const s of STEPS) {
    lines.push("", `== ${s.title.toUpperCase()} ==`);
    for (const f of s.fields) {
      if (!isShown(f, values)) continue;
      const v = values[f.id];
      const out = Array.isArray(v) ? v.join(", ") : (v ?? "").trim();
      lines.push(`${f.label}:`, `  ${out || "(blank)"}`);
    }
  }
  return lines.join("\n");
}

// Consult Magnet library for /medspa-offer-builder/.
// One entry per concern: three name ideas, the three-part bundle (assessment,
// main treatment, take-home bonus), the no-price fallback ($ off the treatment)
// and the benefit line used in the ad captions. Copy rules: no em dashes, no
// guarantees, and nothing that calls out the reader's own body or age (Meta's
// personal-attributes policy), so captions talk about results, not "your wrinkles".

export type PartRole = "assess" | "treat" | "bonus";
export type Part = { role: PartRole; label: string };

export type Concern = {
  id: string;
  label: string;
  icon: string; // LineIcon name
  names: string[];
  parts: [Part, Part, Part];
  dollarsOff: number; // no-price mode: "$X off" the main treatment
  benefit: string; // one sentence, results-focused
  policyNote?: string;
};

export const CONCERNS: Concern[] = [
  {
    id: "under-eye",
    label: "Under-eyes",
    icon: "eye",
    names: ["Bright Eyes Reset", "Wide Awake Package", "Rested Eyes Starter"],
    parts: [
      { role: "assess", label: "Under-eye assessment and mapping" },
      { role: "treat", label: "Under-eye treatment (filler or PRF)" },
      { role: "bonus", label: "Eye recovery kit to take home" },
    ],
    dollarsOff: 100,
    benefit: "A brighter, more rested look around the eyes.",
  },
  {
    id: "lines",
    label: "Forehead and frown lines",
    icon: "sparkles",
    names: ["Smooth Start", "Soft Lines Starter", "Fresh Face Friday"],
    parts: [
      { role: "assess", label: "Facial movement assessment" },
      { role: "treat", label: "Neurotoxin treatment (forehead, frown or crow's feet)" },
      { role: "bonus", label: "Two-week touch-up check" },
    ],
    dollarsOff: 50,
    benefit: "Softer lines with natural movement.",
  },
  {
    id: "lips",
    label: "Lips",
    icon: "gem",
    names: ["Lip Debut", "Natural Lip Edit", "First Fill Package"],
    parts: [
      { role: "assess", label: "Lip design consultation" },
      { role: "treat", label: "Lip filler (one syringe)" },
      { role: "bonus", label: "Lip aftercare kit" },
    ],
    dollarsOff: 100,
    benefit: "Natural-looking lips, designed around the face.",
  },
  {
    id: "glow",
    label: "Glow and dull skin",
    icon: "star",
    names: ["Glow Reset", "Event-Ready Glow", "Glass Skin Starter"],
    parts: [
      { role: "assess", label: "Skin analysis" },
      { role: "treat", label: "HydraFacial or signature medical facial" },
      { role: "bonus", label: "LED or dermaplaning add-on" },
    ],
    dollarsOff: 50,
    benefit: "Fresh, glowing skin in one visit.",
  },
  {
    id: "texture",
    label: "Acne scars and texture",
    icon: "layers",
    names: ["Smooth Skin Series", "Texture Reset", "Fresh Canvas Package"],
    parts: [
      { role: "assess", label: "Skin texture consultation" },
      { role: "treat", label: "Microneedling session" },
      { role: "bonus", label: "Post-treatment recovery serum" },
    ],
    dollarsOff: 75,
    benefit: "Smoother-looking skin texture, one session at a time.",
  },
  {
    id: "jawline",
    label: "Jawline and chin",
    icon: "ruler",
    names: ["Defined Profile Package", "Jawline Edit", "Profile Balance Starter"],
    parts: [
      { role: "assess", label: "Profile and proportion analysis" },
      { role: "treat", label: "Chin or jawline filler" },
      { role: "bonus", label: "Two-week follow-up visit" },
    ],
    dollarsOff: 150,
    benefit: "A more defined, balanced profile.",
  },
  {
    id: "body",
    label: "Body contouring",
    icon: "target",
    names: ["Post-Summer Sculpt", "Sculpt Season Starter", "Core Confidence Package"],
    parts: [
      { role: "assess", label: "Body assessment and measurements" },
      { role: "treat", label: "Body contouring session series" },
      { role: "bonus", label: "Progress tracking check-ins" },
    ],
    dollarsOff: 150,
    benefit: "Non-surgical body contouring with progress you can track.",
  },
  {
    id: "hair",
    label: "Laser hair removal",
    icon: "zap",
    names: ["Smooth Season Starter", "Razor Retirement Plan", "Silky Skin Series"],
    parts: [
      { role: "assess", label: "Skin type consult and test patch" },
      { role: "treat", label: "Laser hair removal sessions (small area)" },
      { role: "bonus", label: "Bonus extra session" },
    ],
    dollarsOff: 100,
    benefit: "Fewer razor days, starting this season.",
  },
  {
    id: "tightening",
    label: "Skin tightening",
    icon: "trending",
    names: ["Lift and Firm Starter", "Firm Foundation Package", "Collagen Kickstart"],
    parts: [
      { role: "assess", label: "Skin laxity assessment" },
      { role: "treat", label: "Skin tightening or RF microneedling session" },
      { role: "bonus", label: "Collagen-support skincare" },
    ],
    dollarsOff: 100,
    benefit: "Firmer-looking skin without surgery.",
  },
  {
    id: "weight",
    label: "Medical weight loss",
    icon: "leaf",
    names: ["Fresh Start Wellness Plan", "Metabolic Reset Program", "Healthy Momentum Starter"],
    parts: [
      { role: "assess", label: "Medical evaluation and labs" },
      { role: "treat", label: "First month of a medically supervised program" },
      { role: "bonus", label: "Nutrition and habits guide" },
    ],
    dollarsOff: 100,
    benefit: "A medically supervised plan built around real habits.",
    policyNote:
      "Meta restricts weight-loss ads: no before-and-after photos, no body call-outs, and the audience must be 18+.",
  },
];

export const ROLE_LABEL: Record<PartRole, string> = {
  assess: "Assessment",
  treat: "Main treatment",
  bonus: "Take-home bonus",
};

// Rounds an offer price down to a "nice" number: 351 -> 349, 1210 -> 1199.
export function nicePrice(n: number): number {
  if (n <= 0) return 0;
  if (n < 100) return Math.max(19, Math.floor(n / 10) * 10 - 1);
  if (n < 1000) return Math.floor(n / 50) * 50 - 1 || 49;
  return Math.floor(n / 100) * 100 - 1;
}

export type MagnetState = {
  spa: string;
  city: string;
  name: string;
  parts: Part[];
  prices: (number | null)[];
  usePrices: boolean;
  pctOff: number;
  dollarsOff: number;
};

export function totals(s: MagnetState) {
  const value = s.prices.reduce<number>((a, p) => a + (p || 0), 0);
  const price = nicePrice(value * (1 - s.pctOff / 100));
  return { value, price };
}

// What each line says on the card / ad when there are no prices.
export function noPriceTag(role: PartRole, dollarsOff: number) {
  return role === "assess" ? "Free" : role === "treat" ? `$${dollarsOff} off` : "Included";
}

export function priceSentence(s: MagnetState) {
  const { value, price } = totals(s);
  if (s.usePrices && value > 0) return `A $${value.toLocaleString("en-US")} value for $${price.toLocaleString("en-US")}.`;
  const [a, t, b] = s.parts;
  return `Free ${lc(a.label)}, $${s.dollarsOff} off the ${lc(t.label)}, and the ${lc(b.label)} included.`;
}

const lc = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

// Three ready-to-paste captions. Results-focused, no body or age call-outs.
export function captions(s: MagnetState, benefit: string): string[] {
  const spa = s.spa.trim() || "our med spa";
  const city = s.city.trim();
  const { value, price } = totals(s);
  const tags = s.parts.map((p, i) =>
    s.usePrices ? (s.prices[i] ? `$${s.prices[i]!.toLocaleString("en-US")} value` : "included") : noPriceTag(p.role, s.dollarsOff).toLowerCase(),
  );
  const list = s.parts.map((p, i) => `• ${p.label}: ${tags[i]}`).join("\n");
  const short = s.usePrices && value > 0
    ? `$${price.toLocaleString("en-US")} for new patients (a $${value.toLocaleString("en-US")} value).`
    : `Free ${lc(s.parts[0].label)} and $${s.dollarsOff} off your first treatment.`;
  return [
    `New patient offer at ${spa}: the ${s.name}.\n\n${list}\n\n${s.usePrices && value > 0 ? `All three for $${price.toLocaleString("en-US")}.\n\n` : ""}Book your spot below.`,
    `${benefit}\n\nThat's the idea behind the ${s.name}, our new patient offer at ${spa}.\n\n${short}\n\nBook online.`,
    `${city ? `${city}, meet` : "Meet"} the ${s.name}.\n\n${short}\n\nTap Book Now to grab a consult time.`,
  ];
}


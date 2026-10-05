// Med spa ad checker: rules, Jev questions, and scoring.
//
// One Jev request per check. For every rule we ask two questions over the same
// state, in parallel: a Noul ("does the ad do this?") that drives the score,
// and a Choice ("which line does it?") that picks the line to highlight. The
// Choice is speculative: its answer is only used when the Noul flags the rule.
// Exact checks (a results disclaimer, lowercase "botox") stay in code.

export type Severity = "high" | "medium" | "low";

export type Rule = {
  id: string;
  label: string;
  severity: Severity;
  source: string; // who enforces it
  why: string; // shown under a flag
  fix: string; // how to rewrite
  before: string; // example of the risky phrasing
  after: string; // example of a safer rewrite
  question: string; // Noul instructions (refers to `ad.lines`)
  yes: string;
  no: string;
};

export const RULES: Rule[] = [
  {
    id: "personal_attributes",
    label: "Calls out the reader's age, body or appearance",
    severity: "high",
    source: "Meta ad policy",
    why: "Meta rejects ads that assert or imply something about the person reading them, like their age, weight or skin. This is the most common reason med spa ads get disapproved.",
    fix: "Talk about the treatment and the result, not about the reader.",
    before: "Over 40? Your wrinkles are aging you.",
    after: "Soften fine lines in a 20-minute visit.",
    question:
      "Does any line in `ad.lines` assert or imply a personal attribute of the person reading it, such as their age, weight, body, skin condition or appearance? Under Meta's personal-attributes policy, the problem is addressing the reader directly about themselves ('Over 40?', 'your wrinkles', 'Tired of your double chin?', 'Hate your love handles?'). Describing a treatment or a result in general terms ('Smooth fine lines', 'Botox for forehead lines') does not count.",
    yes: "At least one line addresses the reader about their own age, body, skin or appearance.",
    no: "No line says or implies anything about the reader's own age, body or appearance.",
  },
  {
    id: "negative_self_image",
    label: "Makes people feel bad about how they look",
    severity: "medium",
    source: "Meta ad policy",
    why: "Meta limits cosmetic and weight-loss ads that create negative self-perception, such as shaming a feature or implying someone looks old, tired or unattractive.",
    fix: "Frame the outcome as a positive, not the starting point as a flaw.",
    before: "Stop hiding your embarrassing turkey neck.",
    after: "Tighter, smoother skin along the jawline and neck.",
    question:
      "Does `ad.lines` try to make people feel bad, ashamed or insecure about how they look (calling a feature ugly, embarrassing or something to hide, saying someone looks old, tired or unattractive) in order to sell a treatment?",
    yes: "It shames a feature or plays on insecurity about appearance.",
    no: "It describes treatments and results without shaming anyone's appearance.",
  },
  {
    id: "guaranteed_results",
    label: "Guarantees results or promises permanence",
    severity: "high",
    source: "FTC (truth in advertising)",
    why: "Results from aesthetic treatments vary by person. A guarantee or a 'permanent' claim is an outcome promise the FTC treats as deceptive unless you can prove it holds for everyone.",
    fix: "Describe typical results and how long they usually last.",
    before: "Guaranteed results. Look 10 years younger, permanently.",
    after: "Results typically last 3–4 months. Book a consult to see if it's right for you.",
    question:
      "Does `ad.lines` guarantee a result or promise an outcome everyone will get, such as 'guaranteed results', 'permanent', '100% effective', 'you will look 10 years younger', or 'results that last forever'?",
    yes: "It guarantees or promises a specific outcome, or calls results permanent.",
    no: "It makes no guarantee; any results are described as typical, possible or individual.",
  },
  {
    id: "safety_minimized",
    label: "Downplays risks (painless, no side effects, 100% safe)",
    severity: "high",
    source: "FTC and FDA",
    why: "Injectables, lasers and prescription treatments all carry risks. Claims like 'painless', 'zero downtime', 'no side effects' or '100% safe' understate them, which regulators treat as misleading.",
    fix: "Describe comfort honestly and mention that risks are reviewed at the consult.",
    before: "Painless, risk-free, zero side effects.",
    after: "Most patients describe it as a quick pinch. We review risks at your consult.",
    question:
      "Does `ad.lines` claim or imply that a treatment has no pain, no risk, no side effects or no downtime, or that it is completely safe (for example 'painless', 'risk-free', '100% safe', 'no side effects', 'zero downtime')?",
    yes: "It says or implies the treatment is painless, risk-free, side-effect-free, downtime-free or totally safe.",
    no: "It makes no claim that a treatment is free of pain, risk, side effects or downtime.",
  },
  {
    id: "fda_claims",
    label: "Makes an FDA approval claim to double-check",
    severity: "medium",
    source: "FDA",
    why: "'FDA-approved' is only true for a specific product and a specific use. Saying a practice, a provider, a compounded drug or an off-label use (like a Botox lip flip) is FDA-approved is a false claim.",
    fix: "Name the exact product and its approved use, or drop the FDA mention.",
    before: "Our FDA-approved lip flip.",
    after: "Lip flip using a neuromodulator, performed by a licensed nurse injector.",
    question:
      "Does `ad.lines` claim that something is 'FDA approved', 'FDA cleared' or endorsed by the FDA (a product, a treatment, a use, a practice or a provider)?",
    yes: "It mentions FDA approval, clearance or endorsement.",
    no: "It does not mention the FDA.",
  },
  {
    id: "compounded_glp1",
    label: "Markets a compounded GLP-1 as a brand-name drug",
    severity: "high",
    source: "FDA",
    why: "Compounded semaglutide and tirzepatide are not Ozempic, Wegovy, Mounjaro or Zepbound, and are not FDA-approved. The FDA has sent warning letters to clinics that call them 'generic Ozempic' or 'the same as Wegovy'.",
    fix: "Use the ingredient name, say it is compounded, and never borrow the brand name.",
    before: "Generic Ozempic, same results for half the price.",
    after: "Medical weight loss with compounded semaglutide, prescribed after a consult.",
    question:
      "Does `ad.lines` market semaglutide, tirzepatide or a 'GLP-1' weight-loss shot using a brand name (Ozempic, Wegovy, Mounjaro, Zepbound), call it 'generic Ozempic' or similar, or say it is the same as the brand-name drug? Mentioning a brand by name for a compounded or unbranded product counts.",
    yes: "It borrows a GLP-1 brand name, calls it generic, or says it is the same as the brand.",
    no: "It does not tie a weight-loss shot to a brand-name GLP-1 drug, or does not mention one at all.",
  },
  {
    id: "weight_loss_claims",
    label: "Promises a specific amount of weight loss",
    severity: "high",
    source: "FTC and Meta ad policy",
    why: "Specific pounds-in-a-timeframe claims need proof that typical patients get them, and Meta limits weight-loss ads to adults and rejects ones that play on body image.",
    fix: "Talk about the program and medical supervision, not a number on the scale.",
    before: "Lose 30 lbs in 30 days!",
    after: "A doctor-supervised weight loss program built around your goals.",
    question:
      "Does `ad.lines` promise or imply a specific amount of weight or fat loss, or a fast weight-loss result (for example 'lose 30 lbs in 30 days', 'drop 2 dress sizes', 'melt fat fast')?",
    yes: "It promises a number of pounds, inches or sizes, or a fast weight-loss result.",
    no: "It makes no specific or fast weight-loss promise.",
  },
  {
    id: "superiority",
    label: "Claims to be the best or #1 without proof",
    severity: "medium",
    source: "FTC and state medical boards",
    why: "'Best', '#1' and 'top-rated' are factual claims when they compare you to others. Without a named source (an award, a review count), some state boards treat them as unprovable superiority claims.",
    fix: "Replace the superlative with a fact you can prove.",
    before: "The #1 med spa in Dallas, with the best injectors in Texas.",
    after: "4.9 stars from 600+ Google reviews.",
    question:
      "Does `ad.lines` claim the business, its providers or its results are the best, #1, top-rated, the leading or better than everyone else, without naming a verifiable source (a specific award, ranking or review count)?",
    yes: "It makes an unsourced superiority claim (best, #1, top, leading).",
    no: "It makes no superiority claim, or the claim names a specific, checkable source.",
  },
  {
    id: "results_testimonials",
    label: "Shows patient results or testimonials",
    severity: "medium",
    source: "FTC Endorsement Guides",
    why: "The FTC treats a testimonial or before-and-after as a claim that the result is typical. If it isn't, you need to say what patients generally get, and a bare 'results may vary' line usually isn't enough on its own.",
    fix: "Pick results that are typical, and say what most patients can expect next to them.",
    before: "Jessica lost her crow's feet in one visit!",
    after: "Jessica, 2 weeks after Botox. Most patients see softer lines in 1–2 weeks.",
    question:
      "Does `ad.lines` present a specific patient result, a before-and-after, a patient testimonial or review quote, or a claim about what results people got?",
    yes: "It shows or describes a patient's result, a before-and-after, or a testimonial.",
    no: "It shows no specific results, before-and-afters or testimonials.",
  },
  {
    id: "credentials",
    label: "Uses a title or credential that could mislead",
    severity: "medium",
    source: "State medical and nursing boards",
    why: "Some states require 'board-certified' to name the board, limit who can be called 'Dr.' in a medical ad, and treat self-given titles like 'master injector' or 'expert' as misleading if nobody certified them.",
    fix: "State the actual license and, for board certification, name the board.",
    before: "Treatments by our board-certified master injector, Dr. Kim.",
    after: "Treatments by Sarah Kim, RN, BSN, Certified Aesthetic Nurse Specialist (CANS).",
    question:
      "Does `ad.lines` use a provider title or credential in a way that could mislead: 'board-certified' without naming the board, 'Dr.' without saying what kind of doctor, or self-given titles like 'master injector', 'expert injector' or 'specialist'?",
    yes: "It uses a vague or self-given credential, an unnamed board certification, or an unexplained 'Dr.'.",
    no: "It uses no provider credentials, or states them plainly (license type, named board).",
  },
  {
    id: "brand_names",
    label: "Uses a brand name like Botox as a generic word",
    severity: "low",
    source: "Manufacturer trademark rules",
    why: "BOTOX®, Juvéderm®, CoolSculpting® and similar names are trademarks. Using one for a whole category ('botox' for any neurotoxin) or for a product you don't use invites a letter from the manufacturer.",
    fix: "Use the brand name only for that product, capitalized, or use the category name.",
    before: "$10/unit botox (we use Dysport).",
    after: "$10/unit Dysport®, or wrinkle relaxers from $10/unit.",
    question:
      "Does `ad.lines` use a trademarked product name (Botox, Juvederm, CoolSculpting, Kybella, Sculptra, HydraFacial, Morpheus8 and similar) as a generic word for a type of treatment, or for a different product than that brand (for example 'botox' meaning any neurotoxin, 'Botox with Dysport', 'baby botox' for any brand)?",
    yes: "It uses a brand name generically or for a different product.",
    no: "Brand names, if any, refer only to that specific product.",
  },
];

export const RULE_BY_ID = Object.fromEntries(RULES.map((r) => [r.id, r]));

const WEIGHT: Record<Severity, number> = { high: 25, medium: 12, low: 5 };
// Flag at or above this Noul probability; between WATCH and FLAG is "worth a look".
export const FLAG = 0.55;
export const WATCH = 0.35;

export const MAX_CHARS = 2000;
const MAX_LINES = 30;

// Split ad copy into short lines the checker can point at: newlines first,
// then sentence ends. A period only ends a sentence when whitespace follows
// and it isn't an abbreviation like "Dr." ($9.99 and "e.g." stay whole).
const ABBREV_RE = /\b(Dr|Mr|Mrs|Ms|St|Jr|Sr|vs|etc|approx|No|e\.g|i\.e)\.$/i;

export function splitLines(text: string): string[] {
  const out: string[] = [];
  for (const para of text.split(/\n+/)) {
    let buf = "";
    for (const piece of para.trim().split(/(?<=[.!?]["')\]]?)\s+/)) {
      buf = buf ? `${buf} ${piece}` : piece;
      if (!ABBREV_RE.test(buf)) {
        if (buf.trim()) out.push(buf.trim());
        buf = "";
      }
    }
    if (buf.trim()) out.push(buf.trim());
  }
  // Merge overflow into the last line so nothing is dropped.
  if (out.length > MAX_LINES) {
    const tail = out.splice(MAX_LINES - 1).join(" ");
    out.push(tail);
  }
  return out;
}

const DISCLAIMER_RE = /results?\s+(may\s+)?var(y|ies)|individual\s+results|results?\s+not\s+typical|not\s+typical/i;
const LOWER_BOTOX_RE = /(^|[^A-Za-z])botox([^A-Za-z]|$)/;

export function buildQuestions(lines: string[]) {
  const where: Record<string, string | null> = { none: "No line does this." };
  lines.forEach((l, i) => (where[`l${i}`] = l));
  const questions: Record<string, unknown> = {};
  for (const r of RULES) {
    questions[r.id] = { type: "noul", instructions: r.question, criteria: { true: r.yes, false: r.no } };
    questions[`${r.id}__where`] = {
      type: "choice",
      instructions: `Which line of \`ad.lines\` is the clearest example of this: ${r.label.toLowerCase()}? (${r.yes}) Pick "none" if no line does.`,
      criteria: where,
    };
  }
  return questions;
}

type JevAnswer = { noul?: number; choice?: string; probabilities?: Record<string, number> };

// A line shares the blame when it holds at least this much of the "which line?" distribution.
const LINE_SHARE = 0.15;

export type Flag = {
  id: string;
  label: string;
  severity: Severity;
  source: string;
  why: string;
  fix: string;
  before: string;
  after: string;
  probability: number; // 0-100
  status: "flag" | "watch";
  lines: number[]; // indexes into CheckResult.lines, in reading order
};

export type CheckResult = {
  score: number;
  verdict: "low" | "some" | "high";
  lines: string[];
  flags: Flag[];
  passed: { id: string; label: string }[];
};

export function scoreAnswers(text: string, lines: string[], answers: Record<string, JevAnswer>): CheckResult {
  const hasDisclaimer = DISCLAIMER_RE.test(text);
  const flags: Flag[] = [];
  const passed: { id: string; label: string }[] = [];
  let deduct = 0;

  for (const r of RULES) {
    let p = answers[r.id]?.noul ?? 0;
    // A "results vary" note helps but isn't a full fix under the FTC guides: downgrade to "worth a look".
    if (r.id === "results_testimonials" && hasDisclaimer) p = Math.min(p, 0.4);
    // Lowercase "botox" is a trademark misuse on its face.
    if (r.id === "brand_names" && LOWER_BOTOX_RE.test(text)) p = Math.max(p, 0.9);
    // An FDA mention is a "check this", never certain: cap it.
    if (r.id === "fda_claims") p = Math.min(p, 0.8);

    const status = p >= FLAG ? "flag" : p >= WATCH ? "watch" : null;
    if (!status) {
      passed.push({ id: r.id, label: r.label });
      continue;
    }
    const where = answers[`${r.id}__where`];
    const hit = new Set<number>();
    if (where?.choice?.startsWith("l")) hit.add(Number(where.choice.slice(1)));
    for (const [k, v] of Object.entries(where?.probabilities ?? {})) {
      if (k.startsWith("l") && v >= LINE_SHARE) hit.add(Number(k.slice(1)));
    }
    if (r.id === "brand_names") lines.forEach((l, i) => LOWER_BOTOX_RE.test(l) && hit.add(i));
    deduct += WEIGHT[r.severity] * (status === "flag" ? p : p * 0.5);
    flags.push({
      id: r.id,
      label: r.label,
      severity: r.severity,
      source: r.source,
      why: r.why,
      fix: r.fix,
      before: r.before,
      after: r.after,
      probability: Math.round(p * 100),
      status,
      lines: [...hit].filter((i) => i >= 0 && i < lines.length).sort((a, b) => a - b),
    });
  }

  const order = { high: 0, medium: 1, low: 2 };
  flags.sort((a, b) => (a.status === b.status ? 0 : a.status === "flag" ? -1 : 1) || order[a.severity] - order[b.severity] || b.probability - a.probability);
  const score = Math.max(0, Math.round(100 - deduct));
  const verdict = score >= 90 ? "low" : score >= 60 ? "some" : "high";
  return { score, verdict, lines, flags, passed };
}

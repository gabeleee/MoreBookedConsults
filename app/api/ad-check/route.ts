import { NextResponse } from "next/server";
import { buildQuestions, MAX_CHARS, scoreAnswers, splitLines } from "@/lib/ad-check";
import { captureServerEvent, posthogIdsFromRequest } from "@/lib/posthog-server";

// Public med spa ad checker (/medspa-ad-checker/). One Jev (TypeSafe) request
// per check; the rules and scoring live in lib/ad-check.ts. Ad text is never
// stored or logged, only the score and which rules fired.
//
// Env: TYPESAFE_API_KEY (server only).

const JEV = "https://api.typesafe.ai/v1/systemone";

// Per-instance limits: enough to stop a script hammering the key, not a
// hard guarantee across instances.
const PER_IP_HOUR = 30;
const PER_INSTANCE_DAY = 3000;
const hits = new Map<string, number[]>();
let day = { key: "", count: 0 };

function limited(ip: string): boolean {
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (day.key !== today) day = { key: today, count: 0 };
  if (day.count >= PER_INSTANCE_DAY) return true;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= PER_IP_HOUR) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  day.count++;
  return false;
}

async function askJev(state: unknown, questions: unknown) {
  const key = process.env.TYPESAFE_API_KEY;
  if (!key) throw new Error("TYPESAFE_API_KEY not set");
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(JEV, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "jev-latest", state, questions }),
      signal: AbortSignal.timeout(15_000),
    }).catch(() => null);
    if (r?.ok) return (await r.json()).answers;
    if (r && r.status < 500 && r.status !== 429) throw new Error(`Jev HTTP ${r.status}`);
    await new Promise((s) => setTimeout(s, 600 * 2 ** attempt));
  }
  throw new Error("Jev unavailable");
}

export async function POST(req: Request) {
  let text = "";
  try {
    const body = await req.json();
    text = typeof body?.text === "string" ? body.text.toWellFormed().trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Send the ad copy as text." }, { status: 400 });
  }
  if (text.length < 10) {
    return NextResponse.json({ ok: false, error: "Paste a little more of the ad, at least a sentence." }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json({ ok: false, error: `Keep it under ${MAX_CHARS.toLocaleString("en-US")} characters, about one ad or post.` }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "You've run a lot of checks this hour. Try again in a bit." }, { status: 429 });
  }

  const lines = splitLines(text);
  let result;
  try {
    const answers = await askJev({ ad: { lines } }, buildQuestions(lines));
    result = scoreAnswers(text, lines, answers);
  } catch (e) {
    console.error("ad-check failed:", (e as Error).message);
    return NextResponse.json({ ok: false, error: "The checker is busy right now. Try again in a minute." }, { status: 503 });
  }

  const ph = posthogIdsFromRequest(req);
  await captureServerEvent({
    distinctId: ph.distinctId ?? crypto.randomUUID(),
    sessionId: ph.sessionId,
    event: "ad_check_run",
    properties: {
      score: result.score,
      verdict: result.verdict,
      flags: result.flags.filter((f) => f.status === "flag").map((f) => f.id),
      chars: text.length,
    },
  });

  return NextResponse.json({ ok: true, ...result });
}

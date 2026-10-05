"use client";
import { useMemo, useRef, useState } from "react";
import posthog from "posthog-js";
import { LineIcon } from "./LineIcon";
import {
  CONCERNS,
  ROLE_LABEL,
  captions,
  noPriceTag,
  totals,
  type MagnetState,
  type Part,
} from "@/lib/consultMagnets";

// The Consult Magnet builder (/medspa-offer-builder/). Runs fully in the
// browser: pick a concern, edit the bundle, add real menu prices (optional),
// then copy captions and download a 1080x1080 ad. The only network call is the
// optional "run this for me" form, which posts to /api/offer/.

const SWATCHES = ["#6C57E8", "#4DA9BA", "#C2185B", "#B8860B", "#2E7D5B", "#1B1936"];
const money = (n: number) => "$" + n.toLocaleString("en-US");

export default function ConsultMagnet() {
  const [cid, setCid] = useState(CONCERNS[0].id);
  const concern = CONCERNS.find((c) => c.id === cid)!;
  const [nameIdx, setNameIdx] = useState(0);
  const [name, setName] = useState(concern.names[0]);
  const [parts, setParts] = useState<Part[]>(concern.parts.map((p) => ({ ...p })));
  const [prices, setPrices] = useState<(number | null)[]>([null, null, null]);
  const [usePrices, setUsePrices] = useState(false);
  const [realPrices, setRealPrices] = useState(false);
  const [pctOff, setPctOff] = useState(40);
  const [dollarsOff, setDollarsOff] = useState(concern.dollarsOff);
  const [spa, setSpa] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState(SWATCHES[0]);
  const [copied, setCopied] = useState<number | null>(null);


  const priced = usePrices && realPrices && prices.some((p) => (p || 0) > 0);
  const state: MagnetState = { spa, city, name, parts, prices, usePrices: priced, pctOff, dollarsOff };
  const { value, price } = totals(state);
  const caps = useMemo(() => captions(state, concern.benefit), [spa, city, name, parts, prices, priced, pctOff, dollarsOff, concern]); // eslint-disable-line react-hooks/exhaustive-deps

  // New concern = fresh bundle (keeps spa, city and color).
  const pick = (id: string) => {
    const c = CONCERNS.find((x) => x.id === id)!;
    setCid(id);
    setNameIdx(0);
    setName(c.names[0]);
    setParts(c.parts.map((p) => ({ ...p })));
    setPrices([null, null, null]);
    setDollarsOff(c.dollarsOff);
    posthog.capture("consult_magnet_concern_selected", { concern: id });
  };
  const nextName = () => {
    const i = (nameIdx + 1) % concern.names.length;
    setNameIdx(i);
    setName(concern.names[i]);
  };
  const setPart = (i: number, label: string) => setParts((ps) => ps.map((p, k) => (k === i ? { ...p, label } : p)));
  const setPrice = (i: number, v: string) => {
    const n = v === "" ? null : Math.max(0, Math.round(Number(v.replace(/[^0-9.]/g, "")) || 0));
    setPrices((ps) => ps.map((p, k) => (k === i ? n : p)));
  };
  const lineTag = (i: number) =>
    priced ? (prices[i] ? money(prices[i]!) : "Included") : noPriceTag(parts[i].role, dollarsOff);

  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(caps[i]);
      setCopied(i);
      setTimeout(() => setCopied(null), 1600);
      posthog.capture("consult_magnet_caption_copied", { concern: cid, variant: i + 1 });
    } catch {}
  };

  const download = async () => {
    const url = await renderAd({ spa, name, parts, tags: parts.map((_, i) => lineTag(i)), priced, value, price, color });
    const a = document.createElement("a");
    a.href = url;
    a.download = `consult-magnet-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
    a.click();
    posthog.capture("consult_magnet_ad_downloaded", { concern: cid, priced });
  };

  return (
    <div className="cm">
      <div className="cm-step">
        <StepHead n={1} title="Pick a concern" hint="What do you want new patients to come in for?" />
        <div className="cm-concerns">
          {CONCERNS.map((c) => (
            <button key={c.id} type="button" className={`cm-concern${c.id === cid ? " on" : ""}`} onClick={() => pick(c.id)} aria-pressed={c.id === cid}>
              <span className="cm-ci" aria-hidden="true"><LineIcon name={c.icon} weight={2.2} /></span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cm-grid">
        <div className="cm-edit">
          <StepHead n={2} title="Shape your offer" hint="Rename it, edit the three parts, add prices if you want." />
          <div className="field">
            <label htmlFor="cm-name">Offer name</label>
            <div className="cm-row">
              <input id="cm-name" value={name} onChange={(e) => setName(e.target.value)} />
              <button type="button" className="cm-ghost" onClick={nextName}>Another idea</button>
            </div>
          </div>
          {parts.map((p, i) => (
            <div className="field" key={p.role}>
              <label htmlFor={`cm-p${i}`}>{ROLE_LABEL[p.role]}</label>
              <div className="cm-row">
                <input id={`cm-p${i}`} value={p.label} onChange={(e) => setPart(i, e.target.value)} />
                {usePrices && (
                  <span className="cm-price">
                    <span>$</span>
                    <input inputMode="numeric" aria-label={`${ROLE_LABEL[p.role]} menu price`} placeholder="0" value={prices[i] ?? ""} onChange={(e) => setPrice(i, e.target.value)} />
                  </span>
                )}
              </div>
            </div>
          ))}

          <div className="cm-mode">
            <button type="button" className={!usePrices ? "on" : ""} onClick={() => setUsePrices(false)}>No prices</button>
            <button type="button" className={usePrices ? "on" : ""} onClick={() => setUsePrices(true)}>Add my prices</button>
          </div>

          {usePrices ? (
            <>
              <label className="cm-check">
                <input type="checkbox" checked={realPrices} onChange={(e) => setRealPrices(e.target.checked)} />
                <span>These are my real menu prices. A &quot;total value&quot; built on made-up prices is fake reference pricing, and regulators and Meta both look for it.</span>
              </label>
              <div className="field">
                <label htmlFor="cm-pct">New patient savings: {pctOff}% off</label>
                <input id="cm-pct" type="range" min={15} max={65} step={5} value={pctOff} onChange={(e) => setPctOff(+e.target.value)} />
              </div>
              {priced && <p className="cm-note">Make sure {money(price)} still covers your product and provider cost.</p>}
            </>
          ) : (
            <div className="field">
              <label htmlFor="cm-off">Dollars off the main treatment: {money(dollarsOff)}</label>
              <input id="cm-off" type="range" min={25} max={300} step={25} value={dollarsOff} onChange={(e) => setDollarsOff(+e.target.value)} />
            </div>
          )}

          <div className="cm-row cm-two">
            <div className="field">
              <label htmlFor="cm-spa">Practice name</label>
              <input id="cm-spa" placeholder="Your Med Spa" value={spa} onChange={(e) => setSpa(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="cm-city">City (for captions)</label>
              <input id="cm-city" placeholder="Scottsdale" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          {concern.policyNote && <p className="cm-note cm-warn">{concern.policyNote}</p>}
        </div>

        <div className="cm-out">
          <StepHead n={3} title="Get your ad" hint="Pick a color, then download the image." />
          <div className="cm-card" style={{ ["--cm" as string]: color }}>
            <div className="cm-card-head">
              <span className="cm-card-ic" aria-hidden="true"><LineIcon name={concern.icon} weight={1.8} /></span>
              <div>
                <p className="cm-card-name">{name || "Your offer name"}</p>
                <p className="cm-card-sub">New Patient Consult Magnet{spa ? ` · ${spa}` : ""}</p>
              </div>
            </div>
            <ul>
              {parts.map((p, i) => (
                <li key={p.role}><span>{p.label}</span><b>{lineTag(i)}</b></li>
              ))}
            </ul>
            {priced ? (
              <div className="cm-total">
                <p><span>Total value</span><span>{money(value)}</span></p>
                <p className="cm-offer"><span>Offer price</span><span>{money(price)}</span></p>
              </div>
            ) : (
              <p className="cm-total cm-noprice">One visit, one simple offer. No menu prices needed.</p>
            )}
          </div>

          <div className="cm-swatches" role="radiogroup" aria-label="Ad color">
            {SWATCHES.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={color === s} aria-label={`Color ${s}`} className={color === s ? "on" : ""} style={{ background: s }} onClick={() => setColor(s)} />
            ))}
            <button type="button" className="btn cm-dl" onClick={download}>Download the ad (1080×1080)</button>
          </div>

          <StepHead n={4} title="Copy a caption" hint="Paste it as the ad text in Meta." />
          {caps.map((c, i) => (
            <div className="cm-cap" key={i}>
              <pre>{c}</pre>
              <button type="button" className="cm-ghost" onClick={() => copy(i)}>{copied === i ? "Copied" : "Copy"}</button>
            </div>
          ))}
        </div>
      </div>

      <RunItForm offer={{ concern: concern.label, name, parts: parts.map((p, i) => `${p.label}: ${lineTag(i)}`), priced, value, price, spa, city }} />
    </div>
  );
}

// Big numbered step heading, so the next move is always obvious.
function StepHead({ n, title, hint }: { n: number; title: string; hint: string }) {
  return (
    <div className="cm-step-head">
      <span className="cm-num" aria-hidden="true">{n}</span>
      <div>
        <h2 className="cm-step-title"><span className="cm-sr">Step {n}: </span>{title}</h2>
        <p className="cm-step-hint">{hint}</p>
      </div>
    </div>
  );
}

// ---- "Run this for me" lead form ----
function RunItForm({ offer }: { offer: Record<string, unknown> }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(form.current!);
    setStatus("sending");
    try {
      const r = await fetch("/api/offer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), website: fd.get("website"), offer }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("done");
      posthog.capture("consult_magnet_run_it_submitted", { concern: offer.concern });
    } catch {
      setStatus("error");
    }
  };
  if (status === "done")
    return (
      <div className="cm-run cm-run-done">
        <p className="cm-k">Got it</p>
        <p>Your Consult Magnet is in Gabe&apos;s inbox. He&apos;ll reply by email with how he&apos;d run it as Meta ads.</p>
      </div>
    );
  return (
    <form className="cm-run" ref={form} onSubmit={submit}>
      <div>
        <p className="cm-k">Want it running as ads?</p>
        <p className="cm-run-copy">Send this Consult Magnet to More Booked Consults and get a plan to run it as Meta ads, with a landing page built for it.</p>
      </div>
      <div className="cm-run-fields">
        <div className="field"><label htmlFor="cm-rn">Name</label><input id="cm-rn" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="cm-re">Email</label><input id="cm-re" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="cm-rw">Website</label><input id="cm-rw" name="website" placeholder="yourmedspa.com" /></div>
        <button className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send me the plan"}</button>
        {status === "error" && <p className="cm-note cm-warn">That didn&apos;t send. Email hello@morebookedconsults.com instead.</p>}
      </div>
    </form>
  );
}

// ---- 1080x1080 ad, drawn on a canvas in the page's own fonts ----
async function renderAd(o: { spa: string; name: string; parts: Part[]; tags: string[]; priced: boolean; value: number; price: number; color: string }) {
  const css = getComputedStyle(document.documentElement);
  const serif = css.getPropertyValue("--font-dm-serif").trim() || "Georgia, serif";
  const sans = css.getPropertyValue("--font-instrument").trim() || "system-ui, sans-serif";
  await Promise.all([document.fonts.load(`80px ${serif}`), document.fonts.load(`700 40px ${sans}`), document.fonts.load(`40px ${sans}`)]).catch(() => {});

  const S = 1080, cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const g = cv.getContext("2d")!;
  // background: brand color with a soft diagonal sheen
  g.fillStyle = o.color; g.fillRect(0, 0, S, S);
  const sheen = g.createLinearGradient(0, 0, S, S);
  sheen.addColorStop(0, "rgba(255,255,255,.18)"); sheen.addColorStop(1, "rgba(0,0,0,.18)");
  g.fillStyle = sheen; g.fillRect(0, 0, S, S);

  // top: practice name + eyebrow
  g.fillStyle = "#fff"; g.textBaseline = "alphabetic";
  g.font = `700 30px ${sans}`;
  spaced(g, (o.spa || "Your Med Spa").toUpperCase(), 80, 112, 5);
  g.globalAlpha = .85; g.font = `600 26px ${sans}`;
  spaced(g, "NEW PATIENT OFFER", 80, 156, 4); g.globalAlpha = 1;

  // card
  const x = 80, y = 210, w = S - 160, h = 640;
  g.save(); g.shadowColor = "rgba(0,0,0,.25)"; g.shadowBlur = 50; g.shadowOffsetY = 18;
  round(g, x, y, w, h, 36); g.fillStyle = "#fff"; g.fill(); g.restore();

  g.fillStyle = "#232140";
  let fs = 76; g.font = `${fs}px ${serif}`;
  while (g.measureText(o.name).width > w - 100 && fs > 40) { fs -= 4; g.font = `${fs}px ${serif}`; }
  g.fillText(o.name, x + 50, y + 110);

  // lines
  let ly = y + 200;
  g.strokeStyle = "#DDDBF0"; g.lineWidth = 2; line(g, x + 50, ly - 50, x + w - 50, ly - 50);
  o.parts.forEach((p, i) => {
    g.font = `500 32px ${sans}`; g.fillStyle = "#232140";
    g.fillText(fit(g, p.label, w - 330), x + 50, ly);
    g.font = `700 34px ${sans}`; g.fillStyle = o.color; g.textAlign = "right";
    g.fillText(o.tags[i], x + w - 50, ly); g.textAlign = "left";
    ly += 74;
  });
  line(g, x + 50, ly - 30, x + w - 50, ly - 30);
  if (o.priced) {
    g.font = `500 32px ${sans}`; g.fillStyle = "#6C6990";
    g.fillText("Total value", x + 50, ly + 34);
    g.textAlign = "right"; g.fillText(money(o.value), x + w - 50, ly + 34);
    // strike-through
    const tw = g.measureText(money(o.value)).width; g.strokeStyle = "#6C6990"; line(g, x + w - 50 - tw, ly + 23, x + w - 50, ly + 23);
    g.textAlign = "left"; g.font = `700 44px ${sans}`; g.fillStyle = "#232140";
    g.fillText("Offer price", x + 50, ly + 110);
    g.textAlign = "right"; g.fillStyle = o.color; g.font = `700 64px ${sans}`;
    g.fillText(money(o.price), x + w - 50, ly + 114); g.textAlign = "left";
  } else {
    g.font = `500 32px ${sans}`; g.fillStyle = "#6C6990";
    g.fillText("For new patients. One simple visit.", x + 50, ly + 50);
  }

  // CTA pill
  const cw = 330, ch = 92, cx = (S - cw) / 2, cy = S - 160;
  round(g, cx, cy, cw, ch, 46); g.fillStyle = "#fff"; g.fill();
  g.fillStyle = o.color; g.font = `700 36px ${sans}`; g.textAlign = "center";
  g.fillText("Book now", S / 2, cy + 59); g.textAlign = "left";
  return cv.toDataURL("image/png");
}
function round(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
function line(g: CanvasRenderingContext2D, a: number, b: number, c: number, d: number) { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); }
function spaced(g: CanvasRenderingContext2D, t: string, x: number, y: number, sp: number) {
  for (const ch of t) { g.fillText(ch, x, y); x += g.measureText(ch).width + sp; }
}
function fit(g: CanvasRenderingContext2D, t: string, max: number) {
  if (g.measureText(t).width <= max) return t;
  while (t.length > 4 && g.measureText(t + "…").width > max) t = t.slice(0, -1);
  return t.trimEnd() + "…";
}

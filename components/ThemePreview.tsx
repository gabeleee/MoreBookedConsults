"use client";
// PREVIEW ONLY (2026-11-03): palette switcher so Gabe can compare color
// schemes on localhost. It recolors every purple/blue in the loaded CSS, inline
// styles and SVG attributes in the browser (OKLCH hue remap), so no stylesheet
// changes until he picks one. Shows on localhost only. REMOVE BEFORE MERGING.
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

type Theme = { id: string; name: string; a: number; b: number; c: number; sw: [string, string] };
// a = hue that replaces the violet (#6C57E8), b = hue that replaces the blue
// (#4C8DFF), c = chroma multiplier. Hues are OKLCH degrees.
const THEMES: Theme[] = [
  { id: "original", name: "Original", a: 285, b: 262, c: 1, sw: ["#6C57E8", "#4C8DFF"] },
  { id: "rose", name: "Rose → Coral", a: 358, b: 22, c: 0.95, sw: ["", ""] },
  { id: "berry", name: "Berry → Orchid", a: 352, b: 322, c: 0.95, sw: ["", ""] },
  { id: "jade", name: "Jade → Sky", a: 178, b: 222, c: 0.85, sw: ["", ""] },
];
const SRC_A = 285.2; // oklch hue of #6C57E8
const SRC_B = 262.4; // oklch hue of #4C8DFF

// ---- color math (sRGB <-> OKLCH) ----
const toLin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGam = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
function rgb2oklch(r: number, g: number, b: number) {
  const R = toLin(r / 255), G = toLin(g / 255), B = toLin(b / 255);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, Bb), H: ((Math.atan2(Bb, A) * 180) / Math.PI + 360) % 360 };
}
function oklch2rgb(L: number, C: number, H: number) {
  const h = (H * Math.PI) / 180, A = C * Math.cos(h), B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
function remap(r: number, g: number, b: number, t: Theme): [number, number, number] | null {
  const { L, C, H } = rgb2oklch(r, g, b);
  if (C < 0.012 || H < 225 || H > 330) return null; // greys, reds, greens, browns stay
  let k = (H - SRC_B) / (SRC_A - SRC_B);
  k = Math.max(-0.6, Math.min(1.6, k));
  let d = t.a - t.b;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  const nh = (t.b + k * d + 360) % 360;
  let nc = C * t.c;
  for (let i = 0; i < 30; i++) {
    const out = oklch2rgb(L, nc, nh);
    if (out.every((v) => v >= -0.001 && v <= 1.001)) {
      return out.map((v) => Math.round(Math.max(0, Math.min(1, toGam(Math.max(0, v)))) * 255)) as [number, number, number];
    }
    nc *= 0.94;
  }
  return null;
}
const COLOR_RE = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})\b|rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)\s*(?:[,/]\s*([\d.]+%?))?\s*\)/gi;
function recolor(text: string, t: Theme) {
  if (t.id === "original") return text;
  return text.replace(COLOR_RE, (m, hex, r, g, b, a) => {
    let R: number, G: number, B: number, alpha: string | null = null;
    if (hex) {
      let h = hex as string;
      if (h.length === 3) h = h.split("").map((x) => x + x).join("");
      R = parseInt(h.slice(0, 2), 16); G = parseInt(h.slice(2, 4), 16); B = parseInt(h.slice(4, 6), 16);
      if (h.length === 8) alpha = (parseInt(h.slice(6, 8), 16) / 255).toFixed(3);
    } else {
      R = +r; G = +g; B = +b; alpha = a ?? null;
    }
    const out = remap(R, G, B, t);
    if (!out) return m;
    return alpha != null ? `rgba(${out[0]},${out[1]},${out[2]},${alpha})` : `rgb(${out[0]},${out[1]},${out[2]})`;
  });
}

// ---- apply to CSSOM + DOM, always from the stored originals ----
const orig = new WeakMap<CSSStyleDeclaration, Map<string, [string, string]>>();
function walkRules(rules: CSSRuleList, t: Theme) {
  for (const rule of Array.from(rules)) {
    const st = (rule as CSSStyleRule).style;
    if (st) {
      let o = orig.get(st);
      if (!o) {
        o = new Map();
        for (let i = 0; i < st.length; i++) {
          const p = st[i];
          const v = st.getPropertyValue(p);
          if (COLOR_RE.test(v)) o.set(p, [v, st.getPropertyPriority(p)]);
          COLOR_RE.lastIndex = 0;
        }
        orig.set(st, o);
      }
      o.forEach(([v, pr], p) => st.setProperty(p, recolor(v, t), pr));
    }
    const inner = (rule as CSSGroupingRule).cssRules;
    if (inner) walkRules(inner, t);
  }
}
const ATTRS = ["fill", "stroke", "stop-color", "style"];
function applyAll(t: Theme) {
  for (const sh of Array.from(document.styleSheets)) {
    try {
      walkRules(sh.cssRules, t);
    } catch {
      /* cross-origin sheet */
    }
  }
  document.querySelectorAll<HTMLElement>("[fill],[stroke],[stop-color],[style]").forEach((el) => {
    if (el.closest(".tp-bar")) return;
    for (const a of ATTRS) {
      const key = `data-tp-${a}`;
      let v = el.getAttribute(key);
      if (v == null) {
        const cur = el.getAttribute(a);
        if (cur == null || !/#|rgb/i.test(cur)) continue;
        el.setAttribute(key, cur);
        v = cur;
      }
      el.setAttribute(a, recolor(v, t));
    }
  });
}

function swatch(t: Theme, which: 0 | 1) {
  if (t.sw[which]) return t.sw[which];
  const [r, g, b] = which ? [0x4c, 0x8d, 0xff] : [0x6c, 0x57, 0xe8];
  const o = remap(r, g, b, t);
  return o ? `rgb(${o.join(",")})` : "#999";
}

export default function ThemePreview() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("original");
  const path = usePathname();

  useEffect(() => {
    if (!/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return;
    setShow(true);
    try {
      const s = new URLSearchParams(window.location.search).get("tp") || localStorage.getItem("tp-theme");
      if (s && THEMES.some((t) => t.id === s)) setId(s);
    } catch {}
  }, []);

  const run = useCallback(() => {
    const t = THEMES.find((x) => x.id === id) ?? THEMES[0];
    applyAll(t);
  }, [id]);

  useEffect(() => {
    if (!show) return;
    run();
    const tm = window.setTimeout(run, 400);
    let deb = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(deb);
      deb = window.setTimeout(run, 120);
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      window.clearTimeout(tm);
      window.clearTimeout(deb);
    };
  }, [show, run, path]);

  if (!show) return null;
  return (
    <div className="tp-bar" role="group" aria-label="Color scheme preview">
      <span className="tp-l">Colors</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={id === t.id ? "on" : undefined}
          onClick={() => {
            setId(t.id);
            try {
              localStorage.setItem("tp-theme", t.id);
            } catch {}
          }}
        >
          <i style={{ background: `linear-gradient(135deg, ${swatch(t, 0)}, ${swatch(t, 1)})` }} />
          {t.name}
        </button>
      ))}
      <style>{`
        .tp-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:6px;
          background:rgba(20,18,30,.92);backdrop-filter:blur(10px);padding:7px;border-radius:999px;box-shadow:0 14px 40px -12px rgba(0,0,0,.5);
          font:600 13px/1 system-ui,sans-serif;max-width:calc(100vw - 20px);overflow-x:auto}
        .tp-l{color:#aaa;padding:0 8px 0 10px;font-weight:500}
        .tp-bar button{display:flex;align-items:center;gap:7px;border:0;background:transparent;color:#ddd;padding:8px 12px 8px 8px;border-radius:999px;cursor:pointer;white-space:nowrap;font:inherit}
        .tp-bar button.on{background:#fff;color:#111}
        .tp-bar i{width:18px;height:18px;border-radius:50%;display:block;flex:none}
      `}</style>
    </div>
  );
}

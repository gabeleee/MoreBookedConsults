"use client";
import { useEffect, useState } from "react";

// PREVIEW ONLY: headline-font switcher for Gabe to compare options on the real
// page. Remove (and its CSS block in home-v2.css) before this ships.
const FONTS = [
  { id: "dm", label: "DM Serif (now)" },
  { id: "inter", label: "Inter Tight" },
  { id: "jakarta", label: "Plus Jakarta Sans" },
  { id: "satoshi", label: "Satoshi" },
  { id: "manrope", label: "Manrope" },
  { id: "instrument", label: "Instrument Sans" },
];

export default function FontLab() {
  const [font, setFont] = useState("dm");

  useEffect(() => {
    for (const href of [
      "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500..800&family=Plus+Jakarta+Sans:wght@500..800&family=Manrope:wght@500..800&display=swap",
      "https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap",
    ]) {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }
    const q = new URLSearchParams(location.search).get("font");
    if (q && FONTS.some((f) => f.id === q)) setFont(q);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.hfont = font;
    const u = new URL(location.href);
    u.searchParams.set("font", font);
    history.replaceState(null, "", u);
  }, [font]);

  return (
    <div className="fl-bar">
      <b>Headline font</b>
      {FONTS.map((f) => (
        <button key={f.id} className={font === f.id ? "on" : ""} onClick={() => setFont(f.id)}>
          {f.label}
        </button>
      ))}
    </div>
  );
}

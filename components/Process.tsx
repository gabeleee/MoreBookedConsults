// Process / "how it works" section, ported from the v18 mockup
// (lines 634-671). The four step illustrations are photo placeholders
// (.ph) awaiting real images — the alt text doubles as the swap spec.
import PetalBackground from "./PetalBackground";

// `img` is the public path once a real photo exists; null shows the .ph
// placeholder (whose alt text doubles as the shoot spec).
const STEPS: {
  img: string | null;
  photo: string;
  alt: string;
  num: string;
  title: string;
  desc: string;
}[] = [
  {
    img: "/step1.jpg",
    photo: "Photo 1 — Free audit",
    alt: "Laptop showing a medspa website with notes beside it",
    num: "Step 1",
    title: "Free audit",
    desc: "Where your site and rankings are leaking consults — ranked by revenue impact.",
  },
  {
    img: null,
    photo: "Photo 2 — Prioritized plan",
    alt: "Numbered checklist on a notepad, pen resting on it",
    num: "Step 2",
    title: "Prioritized plan",
    desc: "What we test first, why, and what a win is worth. Biggest levers first.",
  },
  {
    img: null,
    photo: "Photo 3 — One test / month",
    alt: "Two phone screens side by side showing page variants",
    num: "Step 3",
    title: "One test / month",
    desc: "One clean change, run to significance — so you know what actually worked.",
  },
  {
    img: null,
    photo: "Photo 4 — Results report",
    alt: "Rising chart on a screen or printed report on a desk",
    num: "Step 4",
    title: "Results report",
    desc: "What we tested, what it did to bookings, what's next. Numbers, not narratives.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <PetalBackground
        petals={[{ top: "10%", left: "4%", r: "-30deg", size: 48, fill: "#D9D3F9" }]}
        trios={[
          {
            bottom: "-140px",
            right: "-170px",
            speed: 0.22,
            dur: "15s",
            del: "-9s",
            size: 620,
            opacity: 0.45,
          },
        ]}
      />
      <div className="wrap">
        <p className="eyebrow">How it works</p>
        <h2>
          One test a month. A report you&apos;ll <em>actually read.</em>
        </h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="illo">
                {s.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.img} alt={s.alt} width={800} height={533} />
                ) : (
                  <div className="ph">
                    📷 <b>{s.photo}</b>
                    <span>{s.alt}</span>
                  </div>
                )}
              </div>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

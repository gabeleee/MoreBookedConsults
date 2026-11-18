// Product marks: one app-icon-style logo per branded system, shown next to
// its name so each reads like a product. Dark tile + light line art (the
// berry→orchid gradient is reserved for CTA buttons). Styles: .pm-* in home-v2.css.

type MarkId =
  | "glide-path"
  | "sienna"
  | "second-glance"
  | "leak-finder"
  | "clear-view"
  | "consult-magnet"
  | "spotlight"
  | "atlas"
  | "rave-loop"
  | "lift-lab";

const MARKS: Record<MarkId, React.ReactNode> = {
  // a path that curves up to a booked check
  "glide-path": (
    <>
      <path className="pm-soft" d="M9 36c7 0 9-9 15-9s7-12 15-15" />
      <circle className="pm-dot" cx="9" cy="36" r="2.6" />
      <circle className="pm-dot" cx="24" cy="27" r="2.6" />
      <circle className="pm-acc-fill" cx="38.5" cy="12" r="6" />
      <path className="pm-ink" d="m35.8 12 1.9 1.9 3.4-3.6" />
    </>
  ),
  // a voice orb with sound waves
  sienna: (
    <>
      <circle className="pm-acc-fill" cx="24" cy="24" r="6.5" />
      <path className="pm-soft" d="M15 18.5a10 10 0 0 0 0 11M33 18.5a10 10 0 0 1 0 11" />
      <path className="pm-faint" d="M10 14a16 16 0 0 0 0 20M38 14a16 16 0 0 1 0 20" />
    </>
  ),
  // an eye with a turn-back arrow
  "second-glance": (
    <>
      <path className="pm-soft" d="M7 24s6-10 17-10 17 10 17 10-6 10-17 10S7 24 7 24Z" />
      <circle className="pm-acc-fill" cx="24" cy="24" r="4.6" />
      <path className="pm-acc" d="M33 37.5a8 8 0 0 0 8-8" />
      <path className="pm-acc" d="m38.4 39.6-5.4-2.1 2.1-5.3" />
    </>
  ),
  // a funnel with one drop found under a lens
  "leak-finder": (
    <>
      <path className="pm-soft" d="M8 11h28l-10 12v9l-8 4V23Z" />
      <circle className="pm-acc" cx="34" cy="33" r="5.5" />
      <path className="pm-acc" d="m38 37 3.5 3.5" />
      <circle className="pm-acc-fill" cx="34" cy="33" r="1.8" />
    </>
  ),
  // a window with rising bars and a trend line
  "clear-view": (
    <>
      <rect className="pm-soft" x="8" y="9" width="32" height="30" rx="6" />
      <path className="pm-faint" d="M15 32v-4M21 32v-7M27 32v-10M33 32v-14" />
      <path className="pm-acc" d="m14 24 6-4 6 2 8-8" />
      <circle className="pm-acc-fill" cx="34" cy="14" r="2.4" />
    </>
  ),
  // a magnet pulling in a sparkle
  "consult-magnet": (
    <>
      <path className="pm-soft" d="M12 10v13a12 12 0 0 0 24 0V10h-7v13a5 5 0 0 1-10 0V10Z" />
      <path className="pm-faint" d="M12 16h7M29 16h7" />
      <path className="pm-acc-fill" d="m24 33.5 1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4Z" />
    </>
  ),
  // a spotlight beam on a star
  spotlight: (
    <>
      <path className="pm-faint" d="m13 10 9 26M35 10l-9 26" />
      <rect className="pm-soft" x="9" y="6" width="30" height="7" rx="3.5" />
      <path className="pm-acc-fill" d="m24 25 2.3 4.6 5 .7-3.6 3.6.8 5-4.5-2.4-4.5 2.4.8-5-3.6-3.6 5-.7Z" />
    </>
  ),
  // a folded map with a pin
  atlas: (
    <>
      <path className="pm-soft" d="M7 13l11-4 12 4 11-4v26l-11 4-12-4-11 4Z" />
      <path className="pm-faint" d="M18 9v26M30 13v26" />
      <path className="pm-acc-fill" d="M30 13.5a5 5 0 0 0-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 0 0-5-5Z" />
      <circle className="pm-ink-fill" cx="30" cy="18.5" r="1.7" />
    </>
  ),
  // a loop arrow around a star
  // a lab flask with a rising arrow (design tests that lift conversion)
  "lift-lab": (
    <>
      <path className="pm-soft" d="M19 9h10M21 9v11L11 37a3 3 0 0 0 2.6 4.5h20.8A3 3 0 0 0 37 37L27 20V9" />
      <path className="pm-faint" d="M15 31h18" />
      <path className="pm-acc" d="m17 36 6-5 4 3 6-7" />
      <circle className="pm-acc-fill" cx="33" cy="27" r="2.2" />
    </>
  ),
  "rave-loop": (
    <>
      <path className="pm-soft" d="M38 22a14 14 0 1 0-3.5 11" />
      <path className="pm-soft" d="m39 15-1 7-6.5-2.5" />
      <path className="pm-acc-fill" d="m24 16.5 2.2 4.5 4.9.7-3.5 3.5.8 4.9-4.4-2.3-4.4 2.3.8-4.9-3.5-3.5 4.9-.7Z" />
    </>
  ),
};

export function ProductMark({ id, size = "md" }: { id: MarkId; size?: "md" | "lg" }) {
  return (
    <span className={`pm-tile pm-${size}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">{MARKS[id]}</svg>
    </span>
  );
}

// The system name with its mark, e.g. [mark] Glide Path™
export function ProductTitle({ id, name }: { id: MarkId; name: string }) {
  return (
    <h3 className="pm-title">
      <ProductMark id={id} />
      <span>
        {name}
        <sup>™</sup>
      </span>
    </h3>
  );
}

export const MARK_FOR: Record<string, MarkId> = {
  "Glide Path": "glide-path",
  "Sienna AI": "sienna",
  "Second Glance": "second-glance",
  "Leak Finder": "leak-finder",
  "Clear View": "clear-view",
  "Consult Magnet": "consult-magnet",
  Spotlight: "spotlight",
  "Authority Atlas": "atlas",
  "Rave Loop": "rave-loop",
  "Lift Lab": "lift-lab",
};

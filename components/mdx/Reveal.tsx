"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Scroll-triggered entrance for the visual kit. The server renders the final
// state, so no-JS visitors and crawlers see everything. On mount, anything
// still below the fold is set to data-reveal="pending" (its start pose in
// globals.css) and flips to "in" when it scrolls into view. Anything already
// on screen is left alone, so nothing visible ever flashes.
export default function Reveal({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Two frames so the pending pose paints before the transition starts.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.dataset.reveal = "in";
          }),
        );
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

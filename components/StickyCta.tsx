"use client";
import { useEffect, useRef } from "react";
import AuditCtaLink from "./AuditCtaLink";

// Sticky mobile CTA, ported from the v18 mockup (markup 792-794, JS 879-888).
// Shown only under 900px (CSS); hidden whenever either audit form is on
// screen, so it never overlaps the form the user is filling out.
export default function StickyCta() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const forms = document.querySelectorAll("[data-form]");
    if (!forms.length) return;

    const vis = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => vis.set(e.target, e.isIntersecting));
        el.classList.toggle("hidden", [...vis.values()].some(Boolean));
      },
      { threshold: 0.15 },
    );
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky-cta" id="stickyCta" ref={ref}>
      <AuditCtaLink className="btn" href="/free-audit/" location="sticky" native>
        Get a free marketing audit
      </AuditCtaLink>
    </div>
  );
}

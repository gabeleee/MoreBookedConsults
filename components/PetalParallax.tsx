"use client";
import { useEffect } from "react";

// Global scroll parallax for the oversized petal trios, ported verbatim from
// the mockup's IIFE. Mounted once in the root layout; it drives every
// .petal-parallax on the page relative to its containing <section>.
// Disabled under prefers-reduced-motion. Renders nothing.
export default function PetalParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = [
      ...document.querySelectorAll<HTMLElement>(".petal-parallax"),
    ].map((el) => ({
      el,
      speed: parseFloat(el.dataset.speed || "0.2"),
      section: el.closest("section"),
    }));
    if (!els.length) return;

    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      els.forEach(({ el, speed, section }) => {
        if (!section) return;
        const r = section.getBoundingClientRect();
        if (r.bottom < -400 || r.top > vh + 400) return;
        const delta = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translateY(${delta.toFixed(1)}px)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}

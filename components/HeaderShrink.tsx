"use client";
import { useEffect } from "react";

// Adds `scrolled` to <html> once the page is scrolled past a small threshold,
// so the sticky header can shrink (see html.scrolled rules in globals.css).
// Renders nothing.
export default function HeaderShrink() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const apply = () => {
      root.classList.toggle("scrolled", window.scrollY > 40);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

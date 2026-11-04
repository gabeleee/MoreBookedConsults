"use client";
// Hero explainer video (made in ~/mbc-explainer with HyperFrames, 2026-11-03).
// Autoplays muted and loops, since browsers block sound on autoplay; a small
// button turns sound on. People who ask for reduced motion get the poster and
// a play button instead of autoplay.
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPaused(true);
      return;
    }
    v.play().catch(() => setPaused(true));
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      v.currentTime = 0;
      v.play().catch(() => {});
      setPaused(false);
    }
  }

  function play() {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
    setPaused(false);
  }

  return (
    <div className="hv-video">
      <video
        ref={ref}
        src="/video/hero-explainer.mp4"
        poster="/video/hero-explainer-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        width={1280}
        height={720}
        aria-label="How More Booked Consults finds the leaks on a med spa website and fixes them with a booking flow"
      />
      {paused ? (
        <button type="button" className="hv-video-btn hv-video-play" onClick={play}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l10.5-6.5z" />
          </svg>
          Play video
        </button>
      ) : (
        <button type="button" className="hv-video-btn" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
            {muted ? <path d="m16 9.5 5 5m0-5-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
          </svg>
          <span className="hv-video-lbl">{muted ? "Sound on" : "Sound off"}</span>
        </button>
      )}
    </div>
  );
}

"use client";
// Hero explainer video (made in ~/mbc-explainer with HyperFrames, 2026-11-03).
// Plays once, muted (browsers block sound on autoplay), then freezes on the
// "Turn more visitors into booked consults" end card instead of looping, and
// offers a replay with sound. A sound toggle shows while it plays. People who
// ask for reduced motion get the poster and a play button instead of autoplay.
import { useEffect, useRef, useState } from "react";

// The end card is fully on screen from about 26 s and starts fading at 28.85 s;
// stop just before that so the logo slide after it never plays in the hero.
const END_AT = 28.2;
const HOLD_AT = 28.0;

type State = "playing" | "idle" | "ended";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [state, setState] = useState<State>("playing");

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setState("idle");
      return;
    }
    v.play().catch(() => setState("idle"));
  }, []);

  function onTime() {
    const v = ref.current;
    if (!v || v.currentTime < END_AT) return;
    v.pause();
    v.currentTime = HOLD_AT;
    setState("ended");
  }

  function start(withSound: boolean) {
    const v = ref.current;
    if (!v) return;
    v.muted = !withSound;
    setMuted(!withSound);
    v.currentTime = 0;
    v.play().catch(() => {});
    setState("playing");
  }

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      start(true);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }

  return (
    <div className="hv-video">
      <video
        ref={ref}
        src="/video/hero-explainer.mp4"
        poster="/video/hero-explainer-poster.jpg"
        muted
        playsInline
        preload="auto"
        width={1280}
        height={720}
        onTimeUpdate={onTime}
        onEnded={() => setState("ended")}
        aria-label="How More Booked Consults finds the leaks on a med spa website and fixes them with a booking flow"
      />
      {state === "playing" ? (
        <button
          type="button"
          className="hv-video-btn"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
            {muted ? <path d="m16 9.5 5 5m0-5-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
          </svg>
          <span className="hv-video-lbl">{muted ? "Sound on" : "Sound off"}</span>
        </button>
      ) : (
        <button type="button" className={`hv-video-btn hv-video-play${state === "ended" ? " hv-video-replay" : ""}`} onClick={() => start(state === "ended")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {state === "ended" ? (
              <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" fill="none" />
            ) : (
              <path d="M8 5.5v13l10.5-6.5z" />
            )}
          </svg>
          {state === "ended" ? "Replay with sound" : "Play video"}
        </button>
      )}
    </div>
  );
}

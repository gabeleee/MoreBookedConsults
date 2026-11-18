import { useId } from "react";

// Sienna AI's face: a flat illustrated avatar (2026-11-18). Replaces the pink
// glowing orb, which looked too close to Forever Booked's AI agent. Drawn as an
// obvious illustration, so nobody mistakes Sienna for a real staff member.
export default function SiennaAvatar({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`sienna-av ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE2EA" />
          <stop offset="1" stopColor="#E6C3F0" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="120" height="120" fill={`url(#${id}bg)`} />
        <g transform="translate(60 66) scale(1.16) translate(-60 -62)">
        {/* hair, back */}
        <path d="M31 64C27 33 45 19 61 19c18 0 33 13 29 46 2 20-4 32-10 37H41c-8-6-12-19-10-38Z" fill="#4A2730" />
        {/* top */}
        <path d="M16 122c2-22 21-31 44-31s42 9 44 31Z" fill="#C32E84" />
        <path d="M49 92l11 12 11-12" fill="#F7D5E4" />
        {/* neck */}
        <rect x="52" y="72" width="16" height="22" rx="7" fill="#E9B593" />
        {/* ears */}
        <ellipse cx="41.5" cy="59" rx="3.6" ry="5" fill="#EDBB9A" />
        <ellipse cx="78.5" cy="59" rx="3.6" ry="5" fill="#EDBB9A" />
        {/* face */}
        <ellipse cx="60" cy="56" rx="18.5" ry="22.5" fill="#F4CDAF" />
        {/* hair, front */}
        <path d="M41 54c-1-17 9-25 20-25 12 0 21 8 19 25-3-9-10-14-19-14-4 6-12 11-20 14Z" fill="#4A2730" />
        {/* brows + eyes */}
        <path d="M50 51.5q3.5-2 7 0M63 51.5q3.5-2 7 0" stroke="#4A2730" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <ellipse cx="53.5" cy="57" rx="2.3" ry="2.7" fill="#36202A" />
        <ellipse cx="66.5" cy="57" rx="2.3" ry="2.7" fill="#36202A" />
        <circle cx="54.3" cy="56.1" r=".8" fill="#fff" />
        <circle cx="67.3" cy="56.1" r=".8" fill="#fff" />
        {/* cheeks, nose, smile */}
        <circle cx="49.5" cy="64" r="3.6" fill="#F08FAE" opacity=".45" />
        <circle cx="70.5" cy="64" r="3.6" fill="#F08FAE" opacity=".45" />
        <path d="M60 59.5q1.4 3 -.6 3.8" stroke="#D9A07F" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M54.5 67.5q5.5 5 11 0" stroke="#B23F6E" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* headset */}
        <path d="M39 55c0-25 42-25 42 0" stroke="#2F1220" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <rect x="35.5" y="52" width="8" height="13" rx="4" fill="#2F1220" />
        <rect x="76.5" y="52" width="8" height="13" rx="4" fill="#2F1220" />
        <path d="M40 64c1 9 6 11 13 10.5" stroke="#2F1220" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="54.5" cy="74.3" r="2.6" fill="#C32E84" />
        </g>
        {/* AI sparkle */}
        <path d="M96 20l2.2 5.8L104 28l-5.8 2.2L96 36l-2.2-5.8L88 28l5.8-2.2Z" fill="#fff" />
        <path d="M86 40l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1Z" fill="#fff" opacity=".8" />
      </g>
    </svg>
  );
}

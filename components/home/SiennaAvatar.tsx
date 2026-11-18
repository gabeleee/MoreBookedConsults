/* eslint-disable @next/next/no-img-element -- small static avatar */
// Sienna AI's face (2026-11-18): a real-looking photo (the same AI-generated
// woman as the UGC Meta ad, ~/mbc-ads/02-ugc/characters/d.png) with an "AI"
// bubble so nobody mistakes her for a staff member. Replaces the pink glowing
// orb, which looked too close to Forever Booked's AI agent. Smiling version
// (xAI image edit of d.png) since 2026-11-18.
export default function SiennaAvatar({ badge = true }: { badge?: boolean }) {
  return (
    <span className="sienna-av">
      <img src="/home/sienna-smile.webp" alt="" loading="lazy" width={480} height={480} />
      {badge && (
        <span className="sienna-ai-badge">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1.5l1.6 4.3 4.4 1.7-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.7Z" />
          </svg>
          AI
        </span>
      )}
    </span>
  );
}

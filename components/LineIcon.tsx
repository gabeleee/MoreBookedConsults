// Sitewide line icons (Lucide paths on a 24px grid, stroke only) that replace
// emojis: audit-form options, article heading markers, callouts, At a glance.
// Content still writes `<span className="he">🎯</span>` in MDX; the page routes
// rewrite that to <HeadIcon e="🎯" /> (iconizeHeadings) and EMOJI_ICON maps the
// emoji to one of these icons, so new content keeps working unchanged.
// Circle as a path, so every icon is a plain list of `d` strings.
const c = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

export const ICONS: Record<string, string[]> = {
  target: [c(12, 12, 10), c(12, 12, 6), c(12, 12, 2)],
  scale: [
    "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
    "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
    "M7 21h10",
    "M12 3v18",
    "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
  ],
  chart: ["M3 3v18h18", "M18 17V9", "M13 17V5", "M8 17v-3"],
  trending: ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
  trendingDown: ["M22 17 13.5 8.5 8.5 13.5 2 7", "M16 17h6v-6"],
  compass: [c(12, 12, 10), "m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
  repeat: ["m17 2 4 4-4 4", "M3 11v-1a4 4 0 0 1 4-4h14", "m7 22-4-4 4-4", "M21 13v1a4 4 0 0 1-4 4H3"],
  dollar: [c(12, 12, 10), "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", "M12 18V6"],
  wrench: [
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  ],
  zap: [
    "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
  ],
  calculator: [
    "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
    "M8 6h8",
    "M16 14v4",
    "M16 10h.01",
    "M12 10h.01",
    "M8 10h.01",
    "M12 14h.01",
    "M8 14h.01",
    "M12 18h.01",
    "M8 18h.01",
  ],
  ban: [c(12, 12, 10), "m4.9 4.9 14.2 14.2"],
  check: [c(12, 12, 10), "m9 12 2 2 4-4"],
  users: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    c(9, 7, 4),
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
  pin: [
    "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
    c(12, 10, 3),
  ],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  ],
  megaphone: ["m3 11 18-5v12L3 14v-3z", "M11.6 16.8a3 3 0 1 1-5.8-1.6"],
  star: [
    "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
  ],
  shuffle: [
    "m18 14 4 4-4 4",
    "m18 2 4 4-4 4",
    "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-7.6a4 4 0 0 1 3.3-1.7H22",
    "M2 6h1.972a4 4 0 0 1 3.6 2.2",
    "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
  ],
  card: ["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M2 10h20"],
  image: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    c(9, 9, 2),
    "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
  ],
  alert: ["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"],
  funnel: [
    "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
  ],
  search: [c(11, 11, 8), "m21 21-4.3-4.3"],
  phone: ["M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", "M12 18h.01"],
  call: [
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  ],
  clipboard: [
    "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
    "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
    "M12 11h4",
    "M12 16h4",
    "M8 11h.01",
    "M8 16h.01",
  ],
  ruler: [
    "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
    "m14.5 12.5 2-2",
    "m11.5 9.5 2-2",
    "m8.5 6.5 2-2",
    "m17.5 15.5 2-2",
  ],
  map: [
    "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
    "M15 5.764v15",
    "M9 3.236v15",
  ],
  layers: [
    "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
    "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",
    "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",
  ],
  file: [
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
    "M14 2v4a2 2 0 0 0 2 2h4",
    "M10 9H8",
    "M16 13H8",
    "M16 17H8",
  ],
  pen: [
    "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    "m15 5 4 4",
  ],
  link: [
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  ],
  gift: [
    "M4 8h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z",
    "M12 8v13",
    "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
    "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
  ],
  tag: [
    "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
    "M7.5 7.5h.01",
  ],
  message: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  camera: [
    "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
    c(12, 13, 3),
  ],
  gem: ["M6 3h12l4 6-10 13L2 9Z", "M11 3 8 9l4 13 4-13-3-6", "M2 9h20"],
  calendar: [
    "M8 2v4",
    "M16 2v4",
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "M3 10h18",
  ],
  leaf: [
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
    "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
  ],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  key: ["m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", "m21 2-9.6 9.6", c(7.5, 15.5, 5.5)],
  magnet: [
    "m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15",
    "m5 8 4 4",
    "m12 15 4 4",
  ],
  clock: [c(12, 12, 10), "M12 6v6l4 2"],
  landmark: ["M3 22h18", "M6 18v-7", "M10 18v-7", "M14 18v-7", "M18 18v-7", "M12 2 20 7H4z"],
  book: [
    "M12 7v14",
    "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
  ],
  sparkles: [
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
    "M20 3v4",
    "M22 5h-4",
  ],
  syringe: ["m18 2 4 4", "m17 7 3-3", "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", "m9 11 4 4", "m5 19-3 3", "m14 4 6 6"],
  stethoscope: [
    "M11 2v2",
    "M5 2v2",
    "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
    "M8 15a6 6 0 0 0 12 0v-3",
    c(20, 10, 2),
  ],
  bot: [
    "M12 8V4H8",
    "M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z",
    "M2 14h2",
    "M20 14h2",
    "M15 13v2",
    "M9 13v2",
  ],
  monitor: ["M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M8 21h8", "M12 17v4"],
  building: [
    "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
    "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
    "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
    "M10 6h4",
    "M10 10h4",
    "M10 14h4",
    "M10 18h4",
  ],
  box: [
    "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
    "m3.3 7 8.7 5 8.7-5",
    "M12 22V12",
  ],
  hash: ["M4 9h16", "M4 15h16", "M10 3 8 21", "M16 3l-2 18"],
  briefcase: [
    "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    "M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  ],
  bulb: [
    "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
    "M9 18h6",
    "M10 22h4",
  ],
  help: [c(12, 12, 10), "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"],
  video: [
    "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
    "M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  ],
  mail: [
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  ],
  eye: [
    "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
    c(12, 12, 3),
  ],
  flag: ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"],
  sun: [
    c(12, 12, 4),
    "M12 2v2",
    "M12 20v2",
    "m4.93 4.93 1.41 1.41",
    "m17.66 17.66 1.41 1.41",
    "M2 12h2",
    "M20 12h2",
    "m6.34 17.66-1.41 1.41",
    "m19.07 4.93-1.41 1.41",
  ],
  heart: [
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  ],
  globe: [c(12, 12, 10), "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", "M2 12h20"],
  smile: [c(12, 12, 10), "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
  droplet: [
    "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
  ],
  arrow: ["M5 12h14", "m12 5 7 7-7 7"],
  dot: [c(12, 12, 3)],
};

// Every emoji used as a heading or /blog/ card marker (as of 2026-09-26), mapped
// to the closest line icon. Unknown emojis fall back to "dot".
const EMOJI_ICON: Record<string, string> = {
  "🎯": "target", "⚖️": "scale", "🆚": "scale", "⚔️": "scale",
  "📊": "chart", "📈": "trending", "🚀": "trending", "📉": "trendingDown", "🔻": "trendingDown",
  "🧭": "compass", "🔁": "repeat", "🔄": "repeat",
  "💰": "dollar", "💵": "dollar", "💸": "dollar",
  "🛠️": "wrench", "🔧": "wrench", "⚙️": "wrench", "🧰": "wrench",
  "⚡": "zap", "🧮": "calculator", "🔢": "hash",
  "🚫": "ban", "🛑": "ban", "🔕": "ban",
  "✅": "check", "🔘": "check",
  "🤝": "users", "👥": "users", "👤": "users",
  "📍": "pin", "🛡️": "shield", "📣": "megaphone", "📡": "megaphone",
  "⭐": "star", "🏆": "star", "🔀": "shuffle", "💳": "card", "🖼️": "image",
  "⚠️": "alert", "🪣": "funnel",
  "🔍": "search", "🔎": "search", "🕵️": "search", "🧐": "search", "🔬": "search",
  "📱": "phone", "📲": "call", "📞": "call",
  "📋": "clipboard", "📇": "clipboard", "🗂️": "clipboard",
  "📏": "ruler", "🗺️": "map",
  "🧱": "layers", "🧩": "layers",
  "📝": "pen", "✍️": "pen",
  "📄": "file", "🧾": "file",
  "🔗": "link", "🎁": "gift", "🏷️": "tag", "🛍️": "tag",
  "😌": "smile", "💬": "message", "📸": "camera", "💎": "gem",
  "📅": "calendar", "🗓️": "calendar",
  "🌱": "leaf", "🔒": "lock", "🧲": "magnet",
  "🎨": "sparkles", "✨": "sparkles", "🌸": "sparkles", "🎉": "sparkles", "🥂": "sparkles", "🧹": "sparkles",
  "⏳": "clock", "⏱️": "clock", "⏲️": "clock",
  "🏛️": "landmark", "🏦": "landmark",
  "📚": "book", "💉": "syringe", "🩺": "stethoscope", "🧴": "droplet",
  "🤖": "bot", "🖥️": "monitor", "💻": "monitor",
  "🏥": "building", "🏢": "building", "📦": "box",
  "💼": "briefcase", "🧑‍💼": "briefcase",
  "🧠": "bulb", "💡": "bulb",
  "❓": "help", "🤔": "help",
  "🎥": "video", "🎬": "video", "📹": "video",
  "📧": "mail", "📨": "mail", "📬": "mail", "✉️": "mail",
  "👁️": "eye", "🏁": "flag", "🌤️": "sun", "☀️": "sun",
  "💗": "heart", "🌍": "globe", "🚪": "arrow",
  // /blog/ index card markers (lib/blog-emoji.ts)
  "⏰": "clock", "♾️": "repeat", "✏️": "pen", "🍋": "droplet", "🍑": "sparkles",
  "🎟️": "tag", "🎵": "megaphone", "🎶": "megaphone", "🏎️": "zap", "🏗️": "building",
  "🐉": "sparkles", "👃": "sparkles", "👙": "sparkles", "💇": "sparkles", "💋": "heart",
  "💧": "droplet", "📆": "calendar", "📌": "pin", "📜": "file", "🔆": "sun",
  "🕳️": "funnel", "🙋": "users", "🛎️": "call", "🛒": "tag", "🛬": "arrow",
  "🤰": "heart", "🤳": "phone", "🧊": "droplet", "🧪": "shuffle", "🧬": "sparkles",
  "🩸": "droplet", "🪜": "trending", "🪞": "sparkles", "🪢": "link",
};

const norm = (e: string) => e.replace(/\uFE0F/g, "").trim();
const EMOJI_NORM: Record<string, string> = Object.fromEntries(
  Object.entries(EMOJI_ICON).map(([k, v]) => [norm(k), v]),
);

export function LineIcon({
  name,
  className,
  weight = 2,
}: {
  name: string;
  className?: string;
  weight?: number;
}) {
  const paths = ICONS[name] ?? ICONS.dot;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

// Heading marker: a small violet line icon on a lilac tile.
export function HeadIcon({ e, name }: { e?: string; name?: string }) {
  const key = name ?? EMOJI_ICON[(e ?? "").trim()] ?? EMOJI_ICON[(e ?? "").replace(/️/g, "").trim()] ?? "dot";
  return (
    <span className="he-ic" aria-hidden="true">
      <LineIcon name={key} />
    </span>
  );
}

// `<span className="he">🎯</span>` in MDX source → `<HeadIcon e="🎯" />`.
export const iconizeHeadings = (src: string) =>
  src.replace(/<span className="he">([^<]*)<\/span>\s*/g, (_m, e: string) => `<HeadIcon e="${e.trim()}" /> `);


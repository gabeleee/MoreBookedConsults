// Central site constants — used by metadata, JSON-LD schema, and the audit
// notification. Update the founder LinkedIn URL when the real one is known.
export const SITE = {
  name: "More Booked Consults",
  url: "https://morebookedconsults.com",
  email: "hello@morebookedconsults.com",
  description:
    "Conversion optimization and local SEO, exclusively for medspas, plastic surgeons, and other aesthetic practices.",
  founder: {
    name: "Gabe Meierotto",
    jobTitle: "Founder",
    linkedin: "https://www.linkedin.com/in/gabemeierotto/",
  },
  aestheticHires: "https://aesthetichires.com",
} as const;

import { SITE } from "@/lib/site";

// Organization + founder JSON-LD, rendered once site-wide in the root layout.
export default function OrgSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    knowsAbout: [
      "Conversion rate optimization",
      "Local SEO",
      "Aesthetic practice marketing",
      "Medspa marketing",
      "Plastic surgeon marketing",
    ],
    founder: {
      "@type": "Person",
      name: SITE.founder.name,
      jobTitle: SITE.founder.jobTitle,
      knowsAbout: [
        "Conversion rate optimization",
        "Local SEO",
        "Aesthetic practice marketing",
      ],
      sameAs: [SITE.founder.linkedin, SITE.aestheticHires],
    },
    sameAs: [SITE.founder.linkedin, SITE.aestheticHires],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

import site from "@/data/site.json";

/**
 * Site-wide Person + WebSite structured data, injected once from the root
 * layout so every page inherits it. Only facts present in site.json are
 * emitted — no invented social profiles or aggregates.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://hasanbinali.com/#person",
      name: site.name,
      url: `https://${site.domain}`,
      email: `mailto:${site.email}`,
      jobTitle: "Video Editor & Cinematographer",
      description:
        "Video editor and cinematographer based in Dhaka, Bangladesh — video editing, cinematography, drone videography and visual storytelling.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      alumniOf: site.education
        .filter((entry) => entry.name)
        .map((entry) => ({
          "@type": "EducationalOrganization",
          name: entry.name,
        })),
      knowsLanguage: ["bn", "en"],
    },
    {
      "@type": "WebSite",
      "@id": "https://hasanbinali.com/#website",
      url: `https://${site.domain}`,
      name: site.name,
      inLanguage: ["bn", "en"],
      publisher: { "@id": "https://hasanbinali.com/#person" },
    },
  ],
};

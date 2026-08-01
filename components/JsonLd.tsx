/**
 * JsonLd — Structured data (JSON-LD) for search engines.
 *
 * Embeds Organization, WebSite, LocalBusiness, and Service schemas into the
 * page so Google can understand the business, show rich results, and connect
 * the site to the Knowledge Graph.
 *
 * These are server-rendered once in the root layout, invisible to users.
 */

const SITE_URL = "https://koodby.com";

/** Organization — the company itself. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Koodby",
  url: SITE_URL,
  logo: `${SITE_URL}/narbar-logo.png`,
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Mogadishu, Somalia",
  },
  description:
    "Koodby is a Somali technology studio specializing in AI model training, web engineering, mobile app development, and digital product design. Built in Somalia, made for the world.",
  sameAs: [
    "https://github.com/koodby",
    "https://www.linkedin.com/company/koodby",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@koodby.com",
    contactType: "customer service",
    availableLanguage: ["English", "Somali"],
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Somali Language AI",
    "Natural Language Processing",
    "Web Development",
    "Mobile App Development",
    "Software Engineering",
    "Digital Products",
  ],
};

/** WebSite — adds sitelinks search box potential in Google. */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Koodby",
  alternateName: [
    "Koodby Tech",
    "Koodby Studio",
    "Koodby Somalia",
    "Somali AI Studio",
  ],
  url: SITE_URL,
  description:
    "Koodby — Somali technology studio building AI models, web apps, mobile apps, and digital solutions.",
  inLanguage: ["en", "so"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/researches?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** LocalBusiness — geo-targets Google to Somalia and East Africa. */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Koodby",
  image: `${SITE_URL}/narbar-logo.png`,
  url: SITE_URL,
  telephone: "",
  email: "hello@koodby.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mogadishu",
    addressRegion: "Banadir",
    addressCountry: "SO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 2.0469,
    longitude: 45.3182,
  },
  areaServed: [
    { "@type": "Country", name: "Somalia" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Ethiopia" },
    { "@type": "Country", name: "Djibouti" },
    { "@type": "Continent", name: "Africa" },
    { "@type": "Place", name: "Worldwide" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Koodby Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "AI & Machine Learning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Somali Language AI Model Training",
              description:
                "Custom AI language model training specializing in Somali language NLP, neural networks, and machine learning solutions.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Integration & RAG Systems",
              description:
                "Retrieval-Augmented Generation systems, AI chatbots, and intelligent automation for businesses.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Software Development",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Engineering",
              description:
                "Full-stack web application development using React, Next.js, and modern cloud infrastructure.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description:
                "Native and cross-platform mobile applications for iOS and Android using React Native.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Product Design",
              description:
                "End-to-end digital product design including brand identity, UX/UI design, and design systems.",
            },
          },
        ],
      },
    ],
  },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}

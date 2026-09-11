import {
  EMAIL_EDITORIAL,
  EMAIL_PARTNERSHIPS,
  LOGO_ID,
  ORG_ID,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_NAME_AR,
  SITE_URL,
  SOCIAL_URLS,
  WEBSITE_ID,
} from "@/lib/site";

/**
 * The site-wide structured-data graph, rendered once by app/(site)/layout.tsx
 * so every public page carries it. Page-level blocks (the Article on an
 * article page, the CollectionPage on a category page) point back at these
 * two nodes by @id instead of restating the publisher each time.
 *
 * Plain `Organization`, deliberately not `NewsMediaOrganization`: that type
 * expects masthead / ethicsPolicy / ownershipFundingInfo, and a half-populated
 * news-organization node reads to search engines as a worse signal than a
 * complete generic one. Organization + logo + sameAs is the full set Google
 * actually consumes for a publisher logo and knowledge panel.
 *
 * Nothing here is request-dependent, so it's a module constant — serialized
 * at build time into each prerendered page, with no cost to static generation.
 *
 * Deliberately absent, because none of it exists yet and inventing any of it
 * would be worse than omitting it: address, telephone, legalName, foundingDate,
 * taxID/vatID, and any commercial-registration identifier.
 */
export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: SITE_NAME_AR,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: SITE_LOGO_URL,
        contentUrl: SITE_LOGO_URL,
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
      image: { "@id": LOGO_ID },
      sameAs: [...SOCIAL_URLS],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "editorial",
          email: EMAIL_EDITORIAL,
          availableLanguage: ["en", "ar"],
        },
        {
          "@type": "ContactPoint",
          contactType: "partnerships",
          email: EMAIL_PARTNERSHIPS,
          availableLanguage: ["en", "ar"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_NAME_AR,
      description: SITE_DESCRIPTION,
      inLanguage: ["en", "ar"],
      publisher: { "@id": ORG_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
} as const;

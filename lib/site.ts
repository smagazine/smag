/**
 * Single source of truth for the site's own identity.
 *
 * The canonical URL used to be hardcoded in five separate files, all of them
 * pointing at a domain that no longer serves the site — which meant robots.txt,
 * every sitemap entry and the article JSON-LD were handing crawlers a dead
 * address. One constant, imported everywhere, is what stops that recurring.
 *
 * Deliberately a plain constant rather than NEXT_PUBLIC_SITE_URL: these are
 * *canonical* URLs, so they must name production even when the build isn't.
 * An env var would make every Vercel preview deploy emit preview-domain
 * canonicals and a preview sitemap — an SEO hazard dressed up as flexibility.
 * A wrong value here also fails loudly at build time, via `new URL(SITE_URL)`
 * in app/layout.tsx, instead of silently shipping.
 *
 * Every consumer is a server component or a build-time route (sitemap, robots),
 * so there is no client-bundle consideration either way.
 */

/** Canonical origin. No trailing slash — callers append their own path. */
export const SITE_URL = "https://www.saudimagazine.net";

export const SITE_NAME = "SAUDI MAG";
export const SITE_NAME_AR = "المجلة السعودية";

export const SITE_DESCRIPTION =
  "An independent editorial platform covering Saudi culture, cities, architecture, business, design, and contemporary life.";

/**
 * Stable JSON-LD node identifiers. Fragment @ids let the Article and
 * CollectionPage blocks reference the site-wide Organization/WebSite nodes
 * by @id instead of restating them on every page.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/** Built by Next from app/icon.png — a real 512x512 route, not a public/ asset. */
export const SITE_LOGO_URL = `${SITE_URL}/icon.png`;

export const EMAIL_EDITORIAL = "editorial@saudimagazine.net";
export const EMAIL_PARTNERSHIPS = "partnerships@saudimagazine.net";

/**
 * The three real accounts, as bare profile URLs. These feed both the visible
 * icon row (components/SocialLinks.tsx) and JSON-LD `sameAs`, so the two can't
 * drift apart. Kept clean of the share-sheet tracking params these URLs arrive
 * with when copied out of the mobile apps (?igsh=, &utm_source=qr, ?s=11,
 * ?_r=&_t=) — those encode a share session tied to whoever copied them and
 * can expire, which is not something to publish as a canonical profile link.
 */
export const SOCIAL_URLS = [
  "https://www.instagram.com/saudi.mag",
  "https://x.com/saudimag_",
  "https://www.tiktok.com/@saudi.mag",
] as const;

/**
 * Serializes structured data for a `<script type="application/ld+json">`.
 * Escapes "<" so a "</script>" inside a title/tag can't break out of the tag
 * into live HTML.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

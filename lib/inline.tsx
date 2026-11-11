import React from "react";

// Inline markdown used in CMS text (article titles, subtitles, body blocks,
// category descriptions): **bold**, *italic*, [label](url). The admin's Link
// button writes the [label](url) form.
//
// Render with <InlineText> where the text stands on its own; everywhere the
// text is a plain string (metadata, alt text, JSON-LD, card titles that are
// already a link) use stripInline() so the markup never shows.

const INLINE_RE = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
const SAFE_LINK_SCHEMES = /^(https?:|mailto:)/i;

function safeLinkHref(url: string): string | null {
  const trimmed = url.trim();
  if (SAFE_LINK_SCHEMES.test(trimmed)) return trimmed;
  // Treat scheme-relative/relative URLs (no "javascript:"-style scheme) as safe too.
  if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return null;
}

/** Text with the inline markdown removed. */
export function stripInline(text: string | undefined | null): string {
  if (!text) return "";
  return text.replace(INLINE_RE, (_m, b, i, l) => b ?? i ?? l ?? "");
}

export function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = new RegExp(INLINE_RE.source, "g");
  let last = 0;
  let i = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) parts.push(<strong key={i++}>{match[1]}</strong>);
    else if (match[2] !== undefined) parts.push(<em key={i++}>{match[2]}</em>);
    else {
      const href = safeLinkHref(match[4]);
      parts.push(
        !href ? (
          <span key={i++}>{match[3]}</span>
        ) : /^(\/(?!\/)|#)/.test(href) ? (
          // Same-site link: stay in this tab.
          <a key={i++} href={href}>{match[3]}</a>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer">{match[3]}</a>
        )
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts.length === 1 ? parts[0] : <>{parts}</>;
}

/**
 * Bilingual inline text: both languages render as sibling spans and CSS
 * toggles them on <html dir>. (The data-en/data-ar DOM swap only handles
 * leaf nodes, so it can't carry inline markup.) `plain` strips the markup —
 * use it when the text sits inside another link.
 */
export function InlineText({ text, textAr, plain }: { text: string; textAr?: string; plain?: boolean }) {
  const render = plain ? stripInline : parseInline;
  if (!textAr) return <>{render(text)}</>;
  return (
    <>
      <span className="lang-en">{render(text)}</span>
      <span className="lang-ar">{render(textAr)}</span>
    </>
  );
}

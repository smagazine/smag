// Allowlist of hosts we permit inside <iframe> embeds. Anything else is rejected
// so stored article data can't inject arbitrary/malicious iframe sources.
const ALLOWED_EMBED_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
]);

/**
 * Returns a safe embeddable URL for the given input, or null if it can't be
 * trusted. Accepts standard YouTube/Vimeo watch or share URLs and normalizes
 * them to their /embed form; passes through already-valid embed URLs.
 */
export function safeEmbedUrl(input: string | undefined | null): string | null {
  if (!input || typeof input !== "string") return null;

  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();

  // youtu.be short links → embed
  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  }

  if (host === "www.youtube.com" || host === "youtube.com") {
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (url.pathname.startsWith("/embed/")) return url.toString();
    return null;
  }

  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return /^\d+$/.test(id ?? "") ? `https://player.vimeo.com/video/${id}` : null;
  }

  if (ALLOWED_EMBED_HOSTS.has(host)) return url.toString();

  return null;
}

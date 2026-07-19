/**
 * Minimal in-process rate limiter (fixed window, per-IP).
 *
 * Best-effort only: on serverless hosts with multiple instances this state
 * isn't shared, so it won't catch a distributed attack, but it stops the
 * common case of a single client hammering an endpoint.
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Returns true if the request should be allowed, false if it's over the limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

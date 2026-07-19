/**
 * Minimal in-process rate limiter (fixed window, per-IP).
 *
 * Best-effort only: on serverless hosts with multiple instances this state
 * isn't shared, so it won't catch a distributed attack, but it stops the
 * common case of a single client hammering an endpoint.
 *
 * `x-forwarded-for` is only a trustworthy client IP when the app sits behind
 * a proxy that sets it itself and doesn't forward a client-supplied value
 * (true on Vercel). Behind any other/no proxy it's attacker-controlled, so
 * treat rate limiting as a courtesy speed bump, not a hard guarantee — and
 * cap total tracked keys below so a spoofed-IP flood can't grow this Map
 * without bound.
 */

const MAX_BUCKETS = 5000;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function makeRoom(now: number): void {
  if (buckets.size < MAX_BUCKETS) return;
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
  // Still full after clearing expired entries: drop the oldest tracked key.
  if (buckets.size >= MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest !== undefined) buckets.delete(oldest);
  }
}

/** Returns true if the request should be allowed, false if it's over the limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    makeRoom(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

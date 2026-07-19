import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Minimal stateless session auth for the admin CMS.
 *
 * There is no user database — a single shared password gates all writes.
 * On login we set an httpOnly cookie whose value is an HMAC derived from the
 * password + a server secret, so it can be verified on later requests without
 * any server-side session store (works on stateless/serverless hosts).
 */

export const SESSION_COOKIE = "admin_session";

// Falls back to dev defaults so the CMS works out-of-the-box locally.
// Set ADMIN_PASSWORD and ADMIN_SECRET in the environment for any real deploy.
// Checked lazily (not at module load) so it fires on the first real request
// rather than breaking `next build`, which imports route modules to collect
// page data with NODE_ENV=production regardless of the actual deploy target.
function getCredentials(): { password: string; secret: string } {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;
  if (process.env.NODE_ENV === "production" && (!password || !secret)) {
    throw new Error(
      "ADMIN_PASSWORD and ADMIN_SECRET must be set in production — refusing to run with insecure dev defaults."
    );
  }
  return { password: password ?? "admin", secret: secret ?? "dev-insecure-secret-change-me" };
}

/** The token value stored in the session cookie for a valid login. */
export function sessionToken(): string {
  const { password, secret } = getCredentials();
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** True if the supplied password matches the configured admin password. */
export function checkPassword(password: string): boolean {
  if (typeof password !== "string" || password.length === 0) return false;
  return safeEqual(password, getCredentials().password);
}

/** True if the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken());
}

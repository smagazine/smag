import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Stateless session auth for the admin CMS — no server-side session store,
 * the cookie itself is a signed (HMAC), self-contained token.
 *
 * Two ways to log in:
 * 1. A named account (lib/users.ts) — username + password, checked against
 *    a stored per-user scrypt hash.
 * 2. The legacy shared ADMIN_PASSWORD (no username) — a break-glass login
 *    that's always available and treated as an implicit admin, useful for
 *    bootstrapping the first named user or recovering a locked-out install.
 *
 * Either way, a successful login gets a signed token carrying who they are,
 * so later requests can be verified without looking anything up.
 */

export const SESSION_COOKIE = "admin_session";

export type Role = "admin" | "editor";

export interface Session {
  id: string;
  username: string;
  role: Role;
}

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

function sign(payload: string): string {
  return crypto.createHmac("sha256", getCredentials().secret).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Builds a signed session token for a user — no session store, so logging
    out everywhere at once (e.g. after a breach) means rotating ADMIN_SECRET. */
export function issueSessionToken(session: Session): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSessionToken(token: string): Session | null {
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (
      typeof data.id !== "string" ||
      typeof data.username !== "string" ||
      (data.role !== "admin" && data.role !== "editor")
    ) {
      return null;
    }
    return { id: data.id, username: data.username, role: data.role };
  } catch {
    return null;
  }
}

/** True if the supplied password matches the legacy shared admin password. */
export function checkLegacyPassword(password: string): boolean {
  if (typeof password !== "string" || password.length === 0) return false;
  return safeEqual(password, getCredentials().password);
}

/** The logged-in session, or null. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decodeSessionToken(token);
}

/** True if the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  return (await getSession()) !== null;
}

/** True if the current session is an admin (can manage other users). */
export async function isAdmin(): Promise<boolean> {
  return (await getSession())?.role === "admin";
}

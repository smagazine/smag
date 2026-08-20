import { SESSION_COOKIE, checkLegacyPassword, issueSessionToken, getSession, type Session } from "@/lib/auth";
import { verifyCredentials } from "@/lib/users";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { cookies } from "next/headers";

// GET → report whether the caller is already authenticated (used by the admin UI).
export async function GET() {
  const session = await getSession();
  return Response.json({ authed: Boolean(session), user: session });
}

// POST → exchange a username+password (or the legacy shared password, with
// no username) for a session cookie.
export async function POST(request: Request) {
  if (!rateLimit(`login:${clientIp(request)}`, 10, 60_000)) {
    return Response.json({ error: "too many attempts, try again later" }, { status: 429 });
  }

  let username = "";
  let password = "";
  try {
    ({ username = "", password = "" } = await request.json());
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  let session: Session | null = null;
  if (typeof username === "string" && username.trim()) {
    const user = await verifyCredentials(username.trim(), password);
    if (user) session = { id: user.id, username: user.username, role: user.role };
  } else if (checkLegacyPassword(password)) {
    session = { id: "admin", username: "admin", role: "admin" };
  }

  if (!session) {
    return Response.json({ error: "invalid username or password" }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, issueSessionToken(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return Response.json({ ok: true, user: session });
}

// DELETE → log out.
export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}

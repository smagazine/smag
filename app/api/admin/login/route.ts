import { SESSION_COOKIE, checkPassword, sessionToken, isAuthed } from "@/lib/auth";
import { cookies } from "next/headers";

// GET → report whether the caller is already authenticated (used by the admin UI).
export async function GET() {
  return Response.json({ authed: await isAuthed() });
}

// POST → exchange a password for a session cookie.
export async function POST(request: Request) {
  let password = "";
  try {
    ({ password = "" } = await request.json());
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return Response.json({ error: "invalid password" }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return Response.json({ ok: true });
}

// DELETE → log out.
export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}

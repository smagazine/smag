import { getSession } from "@/lib/auth";
import { getUsers, createUser, UsernameTakenError } from "@/lib/users";
import { StorageError } from "@/lib/storage-error";

const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,32}$/;

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (session.role !== "admin") return Response.json({ error: "forbidden" }, { status: 403 });
  return Response.json({ users: await getUsers() });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (session.role !== "admin") return Response.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = body.role === "admin" ? "admin" : "editor";

  if (!USERNAME_RE.test(username)) {
    return Response.json(
      { error: "username must be 3-32 characters (letters, numbers, _ . -)" },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return Response.json({ error: "password must be at least 8 characters" }, { status: 400 });
  }

  try {
    const user = await createUser({ username, password, role });
    return Response.json({ ok: true, user }, { status: 201 });
  } catch (err) {
    if (err instanceof UsernameTakenError) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    const message = err instanceof StorageError ? err.message : "could not create user";
    return Response.json({ error: message }, { status: 503 });
  }
}

import { EMAIL_RE, saveContact } from "@/lib/submissions";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) return Response.json({ error: "name is required" }, { status: 400 });
  if (!EMAIL_RE.test(email)) return Response.json({ error: "valid email is required" }, { status: 400 });

  saveContact({ name, email, type, message });
  return Response.json({ ok: true }, { status: 201 });
}

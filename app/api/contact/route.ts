import { EMAIL_RE, saveContact } from "@/lib/submissions";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { StorageError } from "@/lib/storage-error";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60_000)) {
    return Response.json({ error: "too many requests, try again later" }, { status: 429 });
  }

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

  try {
    await saveContact({ name, email, type, message });
  } catch (err) {
    const status = err instanceof StorageError ? 503 : 500;
    return Response.json({ error: "could not save inquiry" }, { status });
  }
  return Response.json({ ok: true }, { status: 201 });
}

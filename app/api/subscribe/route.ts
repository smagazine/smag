import { EMAIL_RE, saveSubscriber } from "@/lib/submissions";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "valid email is required" }, { status: 400 });
  }

  try {
    await saveSubscriber(email);
  } catch {
    return Response.json({ error: "could not save subscription" }, { status: 500 });
  }
  return Response.json({ ok: true }, { status: 201 });
}

import { isAuthed } from "@/lib/auth";
import { getContacts, getSubscribers } from "@/lib/submissions";

// Admin-only read access to form submissions (Upstash/Vercel KV in
// production, JSON files locally — lib/submissions.ts picks the backend).

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const [contacts, subscribers] = await Promise.all([getContacts(), getSubscribers()]);
    return Response.json({ contacts, subscribers });
  } catch {
    return Response.json({ contacts: [], subscribers: [] });
  }
}

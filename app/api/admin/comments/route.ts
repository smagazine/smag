import { isAuthed } from "@/lib/auth";
import { getComments } from "@/lib/comments";

// Admin-only: every comment regardless of status, for the dashboard's
// Comments tab to moderate.

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const comments = await getComments();
  return Response.json({ comments });
}

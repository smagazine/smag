import fs from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";

// Admin-only read access to the form-submission stores written by
// lib/submissions.ts. Both files are git-ignored and may not exist yet.

function readJsonList(file: string): unknown[] {
  try {
    const list = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", file), "utf-8")
    );
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json({
    contacts: readJsonList("contact-requests.json"),
    subscribers: readJsonList("subscribers.json"),
  });
}

import fs from "fs";
import path from "path";

// Persists form submissions to append-only JSON files under data/. This keeps
// the demo self-contained (no external email/CRM service) while giving the
// forms a real, validated backend instead of localStorage-only handling.

const DATA_DIR = path.join(process.cwd(), "data");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function appendJson(file: string, entry: Record<string, unknown>): void {
  const full = path.join(DATA_DIR, file);
  let list: unknown[] = [];
  try {
    list = JSON.parse(fs.readFileSync(full, "utf-8"));
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  list.push({ ...entry, receivedAt: new Date().toISOString() });
  const tmp = `${full}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
  fs.renameSync(tmp, full);
}

export function saveContact(entry: {
  name: string;
  email: string;
  type: string;
  message: string;
}): void {
  appendJson("contact-requests.json", entry);
}

export function saveSubscriber(email: string): void {
  appendJson("subscribers.json", { email });
}

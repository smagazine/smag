import fs from "fs";
import path from "path";
import crypto from "crypto";
import { withLock } from "@/lib/file-lock";
import { StorageError } from "@/lib/storage-error";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";
import { EMAIL_RE } from "@/lib/submissions";

export { StorageError };

// Same KV-or-file pattern as lib/articles.ts: the whole comment list is one
// JSON document, so approving/rejecting/deleting a single comment is a
// read-modify-write of the full list under lib/file-lock.ts.
const KV_KEY = "comments:data";
const DATA_PATH = path.join(process.cwd(), "data", "comments.json");

export type CommentStatus = "pending" | "approved" | "rejected";

export interface Comment {
  id: string;
  slug: string;
  name: string;
  email: string;
  body: string;
  status: CommentStatus;
  createdAt: string;
}

function getCommentsFromFile(): Comment[] {
  try {
    const list = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    return Array.isArray(list) ? (list as Comment[]) : [];
  } catch {
    return [];
  }
}

export async function getComments(): Promise<Comment[]> {
  if (!kvConfigured) return getCommentsFromFile();
  try {
    return await kvGetJson<Comment[]>(KV_KEY, []);
  } catch {
    return getCommentsFromFile();
  }
}

/** Approved comments for one article, oldest first. */
export async function getApprovedComments(slug: string): Promise<Comment[]> {
  const comments = await getComments();
  return comments
    .filter((c) => c.slug === slug && c.status === "approved")
    .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
}

async function saveComments(comments: Comment[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(KV_KEY, comments);
    return;
  }
  const tmp = `${DATA_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(comments, null, 2), "utf-8");
    fs.renameSync(tmp, DATA_PATH);
  } catch {
    throw new StorageError(
      "Could not save comment — the storage is read-only in this environment and no KV store is configured."
    );
  }
}

export class ValidationError extends Error {}

const MAX_NAME = 80;
const MAX_BODY = 2000;

/** Validates+sanitizes an untrusted comment payload from the public form. */
export function normalizeComment(input: unknown, slug: string): Pick<Comment, "slug" | "name" | "email" | "body"> {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("comment must be an object");
  }
  const raw = input as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const body = typeof raw.body === "string" ? raw.body.trim() : "";

  if (!name) throw new ValidationError("name is required");
  if (name.length > MAX_NAME) throw new ValidationError("name is too long");
  if (!EMAIL_RE.test(email)) throw new ValidationError("valid email is required");
  if (!body) throw new ValidationError("comment is required");
  if (body.length > MAX_BODY) throw new ValidationError("comment is too long");

  return { slug, name, email, body };
}

/** Adds a new comment in "pending" status; it only appears publicly once approved. */
export async function addComment(
  entry: Pick<Comment, "slug" | "name" | "email" | "body">
): Promise<Comment> {
  const comment: Comment = {
    id: crypto.randomUUID(),
    ...entry,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await withLock(DATA_PATH, async () => {
    const comments = await getComments();
    comments.push(comment);
    await saveComments(comments);
  });
  return comment;
}

export async function setCommentStatus(id: string, status: CommentStatus): Promise<Comment | null> {
  return withLock(DATA_PATH, async () => {
    const comments = await getComments();
    const idx = comments.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    comments[idx] = { ...comments[idx], status };
    await saveComments(comments);
    return comments[idx];
  });
}

export async function deleteComment(id: string): Promise<boolean> {
  return withLock(DATA_PATH, async () => {
    const comments = await getComments();
    const next = comments.filter((c) => c.id !== id);
    if (next.length === comments.length) return false;
    await saveComments(next);
    return true;
  });
}

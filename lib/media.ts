import fs from "fs";
import path from "path";
import { StorageError } from "@/lib/storage-error";
import { withLock } from "@/lib/file-lock";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Index of uploaded media (admin image uploads), so the admin UI can offer a
 * "choose from library" picker instead of only drag-and-drop. The actual
 * image bytes live in Vercel Blob (or public/uploads/ locally) — this just
 * tracks {url, filename, uploadedAt} entries, same KV-or-file pattern as
 * lib/articles.ts / lib/sponsors.ts.
 */
export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

const MEDIA_PATH = path.join(process.cwd(), "data", "media.json");
const MEDIA_KV_KEY = "media:data";

function readFile(): MediaItem[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(MEDIA_PATH, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFile(list: MediaItem[]): void {
  const tmp = `${MEDIA_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tmp, MEDIA_PATH);
  } catch {
    throw new StorageError(
      "Could not save the media library — the storage is read-only in this environment and no KV store is configured."
    );
  }
}

export async function getMedia(): Promise<MediaItem[]> {
  if (!kvConfigured) return readFile();
  try {
    return await kvGetJson<MediaItem[]>(MEDIA_KV_KEY, []);
  } catch {
    return readFile();
  }
}

async function saveMedia(list: MediaItem[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(MEDIA_KV_KEY, list);
    return;
  }
  writeFile(list);
}

export function addMedia(item: Omit<MediaItem, "id" | "uploadedAt">): Promise<MediaItem> {
  return withLock(MEDIA_PATH, async () => {
    const list = await getMedia();
    const entry: MediaItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      uploadedAt: new Date().toISOString(),
    };
    list.unshift(entry);
    await saveMedia(list);
    return entry;
  });
}

export function deleteMedia(id: string): Promise<void> {
  return withLock(MEDIA_PATH, async () => {
    const list = await getMedia();
    await saveMedia(list.filter((m) => m.id !== id));
  });
}

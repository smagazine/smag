import fs from "fs";
import path from "path";

// Persists form submissions. Two backends:
//
// 1. Upstash Redis / Vercel KV via its REST API, used automatically when the
//    env vars exist (Vercel injects them when a KV/Upstash store is linked to
//    the project). This is what makes the forms WORK in production — the
//    serverless filesystem is read-only, so file writes 500 there.
// 2. Append-only JSON files under data/ as the local/dev fallback.

const DATA_DIR = path.join(process.cwd(), "data");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Find the Upstash REST credentials regardless of the env-var prefix chosen
 * when connecting the store in Vercel (KV_, STORAGE_, UPSTASH_, custom…).
 */
function resolveKv(): { url?: string; token?: string } {
  const env = process.env;
  for (const [u, t] of [
    ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
    ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
  ]) {
    if (env[u] && env[t]) return { url: env[u], token: env[t] };
  }
  for (const key of Object.keys(env)) {
    if (key.endsWith("REST_API_URL") || key.endsWith("REST_URL")) {
      const tokenKey = key.replace(/URL$/, "TOKEN");
      if (env[key] && env[tokenKey]) return { url: env[key], token: env[tokenKey] };
    }
  }
  return {};
}

const { url: KV_URL, token: KV_TOKEN } = resolveKv();

export const kvConfigured = Boolean(KV_URL && KV_TOKEN);

/** Run a single Redis command against the Upstash REST endpoint. */
async function kvCommand<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(KV_URL as string, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`kv command failed: ${res.status}`);
  const data = (await res.json()) as { result: T };
  return data.result;
}

function appendJsonFile(file: string, entry: Record<string, unknown>): void {
  const full = path.join(DATA_DIR, file);
  let list: unknown[] = [];
  try {
    list = JSON.parse(fs.readFileSync(full, "utf-8"));
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  list.push(entry);
  const tmp = `${full}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
  fs.renameSync(tmp, full);
}

async function append(kvKey: string, file: string, entry: Record<string, unknown>): Promise<void> {
  const stamped = { ...entry, receivedAt: new Date().toISOString() };
  if (kvConfigured) {
    await kvCommand(["RPUSH", kvKey, JSON.stringify(stamped)]);
  } else {
    appendJsonFile(file, stamped);
  }
}

async function readAll<T>(kvKey: string, file: string): Promise<T[]> {
  if (kvConfigured) {
    const raw = await kvCommand<string[]>(["LRANGE", kvKey, 0, -1]);
    return (raw ?? []).flatMap((s) => {
      try {
        return [JSON.parse(s) as T];
      } catch {
        return [];
      }
    });
  }
  try {
    const list = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf-8"));
    return Array.isArray(list) ? (list as T[]) : [];
  } catch {
    return [];
  }
}

export async function saveContact(entry: {
  name: string;
  email: string;
  type: string;
  message: string;
}): Promise<void> {
  await append("contact-requests", "contact-requests.json", entry);
}

export async function saveSubscriber(email: string): Promise<void> {
  await append("subscribers", "subscribers.json", { email });
}

export async function getContacts<T = Record<string, unknown>>(): Promise<T[]> {
  return readAll<T>("contact-requests", "contact-requests.json");
}

export async function getSubscribers<T = Record<string, unknown>>(): Promise<T[]> {
  return readAll<T>("subscribers", "subscribers.json");
}

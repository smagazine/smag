// Upstash Redis / Vercel KV REST client, shared by lib/articles.ts,
// lib/sponsors.ts, and lib/submissions.ts. Used automatically when the env
// vars exist (Vercel injects them when a KV/Upstash store is linked to the
// project) — this is what lets writes work in production, since the
// serverless filesystem is read-only there.

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
export async function kvCommand<T>(command: (string | number)[]): Promise<T> {
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

/** Read a whole JSON document stored under `key`, or `fallback` if unset/invalid. */
export async function kvGetJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await kvCommand<string | null>(["GET", key]);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Overwrite the whole JSON document stored under `key`. */
export async function kvSetJson(key: string, value: unknown): Promise<void> {
  await kvCommand(["SET", key, JSON.stringify(value)]);
}

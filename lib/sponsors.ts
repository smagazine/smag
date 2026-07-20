import fs from "fs";
import path from "path";
import { ValidationError } from "@/lib/articles";
import { StorageError } from "@/lib/storage-error";
import { withLock } from "@/lib/file-lock";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Sponsor registry + category sponsorships for the native-advertising model.
 * Same KV-with-local-file-fallback pattern as lib/articles.ts. Server-only.
 */

export interface Sponsor {
  id: string;
  name: string;
  nameAr?: string;
  /** Unsplash photo id used as the logo/brand chip. */
  logo?: string;
  url?: string;
}

export interface CategorySponsorship {
  /** Category route, e.g. "f-and-b". */
  route: string;
  sponsorId: string;
  /** ISO dates (YYYY-MM-DD); open-ended when absent. */
  startDate?: string;
  endDate?: string;
}

const SPONSORS_PATH = path.join(process.cwd(), "data", "sponsors.json");
const SPONSORSHIPS_PATH = path.join(process.cwd(), "data", "sponsorships.json");
const SPONSORS_KV_KEY = "sponsors:data";
const SPONSORSHIPS_KV_KEY = "sponsorships:data";

function readJsonFile<T>(file: string): T[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function readJson<T>(kvKey: string, file: string): Promise<T[]> {
  if (kvConfigured) return kvGetJson<T[]>(kvKey, []);
  return readJsonFile<T>(file);
}

async function writeJson(kvKey: string, file: string, list: unknown[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(kvKey, list);
    return;
  }
  const tmp = `${file}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tmp, file);
  } catch {
    throw new StorageError(
      "Could not save — the storage is read-only in this environment and no KV store is configured."
    );
  }
}

export function getSponsors(): Promise<Sponsor[]> {
  return readJson<Sponsor>(SPONSORS_KV_KEY, SPONSORS_PATH);
}

export async function getSponsor(id: string): Promise<Sponsor | null> {
  const sponsors = await getSponsors();
  return sponsors.find((s) => s.id === id) ?? null;
}

export function getSponsorships(): Promise<CategorySponsorship[]> {
  return readJson<CategorySponsorship>(SPONSORSHIPS_KV_KEY, SPONSORSHIPS_PATH);
}

/** True when today falls inside the (possibly open-ended) run window. */
export function inRunWindow(startDate?: string, endDate?: string, now = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  if (startDate && today < startDate) return false;
  if (endDate && today > endDate) return false;
  return true;
}

/** The sponsorship currently presenting a category, with its sponsor. */
export async function getActiveSponsorship(route: string):
  Promise<{ sponsorship: CategorySponsorship; sponsor: Sponsor } | null> {
  const sponsorships = await getSponsorships();
  const sponsorship = sponsorships.find(
    (s) => s.route === route && inRunWindow(s.startDate, s.endDate)
  );
  if (!sponsorship) return null;
  const sponsor = await getSponsor(sponsorship.sponsorId);
  return sponsor ? { sponsorship, sponsor } : null;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeSponsor(input: unknown): Sponsor {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("sponsor must be an object");
  }
  const raw = input as Record<string, unknown>;
  const id = typeof raw.id === "string" ? raw.id : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new ValidationError("sponsor id must be lowercase kebab-case");
  }
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name) throw new ValidationError("sponsor name is required");
  const opt = (k: string) => (typeof raw[k] === "string" && raw[k] ? (raw[k] as string) : undefined);
  return { id, name, nameAr: opt("nameAr"), logo: opt("logo"), url: opt("url") };
}

export async function normalizeSponsorship(input: unknown): Promise<CategorySponsorship> {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("sponsorship must be an object");
  }
  const raw = input as Record<string, unknown>;
  const route = typeof raw.route === "string" ? raw.route : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(route)) {
    throw new ValidationError("sponsorship route must be lowercase kebab-case");
  }
  const sponsorId = typeof raw.sponsorId === "string" ? raw.sponsorId : "";
  if (!(await getSponsor(sponsorId))) throw new ValidationError("sponsorId must reference an existing sponsor");
  const date = (k: string): string | undefined => {
    const v = raw[k];
    if (v === undefined || v === null || v === "") return undefined;
    if (typeof v !== "string" || !DATE_RE.test(v)) {
      throw new ValidationError(`${k} must be YYYY-MM-DD`);
    }
    return v;
  };
  return { route, sponsorId, startDate: date("startDate"), endDate: date("endDate") };
}

export function upsertSponsor(sponsor: Sponsor): Promise<void> {
  return withLock(SPONSORS_PATH, async () => {
    const list = await getSponsors();
    const idx = list.findIndex((s) => s.id === sponsor.id);
    if (idx >= 0) list[idx] = sponsor;
    else list.push(sponsor);
    await writeJson(SPONSORS_KV_KEY, SPONSORS_PATH, list);
  });
}

export function deleteSponsor(id: string): Promise<void> {
  return withLock(SPONSORS_PATH, async () => {
    const sponsors = await getSponsors();
    await writeJson(SPONSORS_KV_KEY, SPONSORS_PATH, sponsors.filter((s) => s.id !== id));
    // A deleted client's category sponsorships go with it.
    await withLock(SPONSORSHIPS_PATH, async () => {
      const sponsorships = await getSponsorships();
      await writeJson(SPONSORSHIPS_KV_KEY, SPONSORSHIPS_PATH, sponsorships.filter((s) => s.sponsorId !== id));
    });
  });
}

/** One sponsorship per category: upsert keyed by route. */
export function upsertSponsorship(sponsorship: CategorySponsorship): Promise<void> {
  return withLock(SPONSORSHIPS_PATH, async () => {
    const list = await getSponsorships();
    const idx = list.findIndex((s) => s.route === sponsorship.route);
    if (idx >= 0) list[idx] = sponsorship;
    else list.push(sponsorship);
    await writeJson(SPONSORSHIPS_KV_KEY, SPONSORSHIPS_PATH, list);
  });
}

export function deleteSponsorship(route: string): Promise<void> {
  return withLock(SPONSORSHIPS_PATH, async () => {
    const sponsorships = await getSponsorships();
    await writeJson(SPONSORSHIPS_KV_KEY, SPONSORSHIPS_PATH, sponsorships.filter((s) => s.route !== route));
  });
}

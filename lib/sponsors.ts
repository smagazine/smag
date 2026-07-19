import fs from "fs";
import path from "path";
import { ValidationError } from "@/lib/articles";
import { StorageError } from "@/lib/storage-error";
import { withLock } from "@/lib/file-lock";

/**
 * Sponsor registry + category sponsorships for the native-advertising model.
 * Same flat-file pattern as lib/articles.ts: JSON under data/, mtime-cached
 * reads, atomic writes. Server-only.
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

function readJson<T>(file: string): T[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJson(file: string, list: unknown[]): void {
  const tmp = `${file}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tmp, file);
  } catch {
    throw new StorageError(
      "Could not save — the storage is read-only in this environment. " +
        "A durable multi-writer store (e.g. a database) is required for this deployment."
    );
  }
}

export function getSponsors(): Sponsor[] {
  return readJson<Sponsor>(SPONSORS_PATH);
}

export function getSponsor(id: string): Sponsor | null {
  return getSponsors().find((s) => s.id === id) ?? null;
}

export function getSponsorships(): CategorySponsorship[] {
  return readJson<CategorySponsorship>(SPONSORSHIPS_PATH);
}

/** True when today falls inside the (possibly open-ended) run window. */
export function inRunWindow(startDate?: string, endDate?: string, now = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  if (startDate && today < startDate) return false;
  if (endDate && today > endDate) return false;
  return true;
}

/** The sponsorship currently presenting a category, with its sponsor. */
export function getActiveSponsorship(route: string):
  | { sponsorship: CategorySponsorship; sponsor: Sponsor }
  | null {
  const sponsorship = getSponsorships().find(
    (s) => s.route === route && inRunWindow(s.startDate, s.endDate)
  );
  if (!sponsorship) return null;
  const sponsor = getSponsor(sponsorship.sponsorId);
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

export function normalizeSponsorship(input: unknown): CategorySponsorship {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("sponsorship must be an object");
  }
  const raw = input as Record<string, unknown>;
  const route = typeof raw.route === "string" ? raw.route : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(route)) {
    throw new ValidationError("sponsorship route must be lowercase kebab-case");
  }
  const sponsorId = typeof raw.sponsorId === "string" ? raw.sponsorId : "";
  if (!getSponsor(sponsorId)) throw new ValidationError("sponsorId must reference an existing sponsor");
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
  return withLock(SPONSORS_PATH, () => {
    const list = getSponsors();
    const idx = list.findIndex((s) => s.id === sponsor.id);
    if (idx >= 0) list[idx] = sponsor;
    else list.push(sponsor);
    writeJson(SPONSORS_PATH, list);
  });
}

export function deleteSponsor(id: string): Promise<void> {
  return withLock(SPONSORS_PATH, async () => {
    writeJson(SPONSORS_PATH, getSponsors().filter((s) => s.id !== id));
    // A deleted client's category sponsorships go with it.
    await withLock(SPONSORSHIPS_PATH, () => {
      writeJson(SPONSORSHIPS_PATH, getSponsorships().filter((s) => s.sponsorId !== id));
    });
  });
}

/** One sponsorship per category: upsert keyed by route. */
export function upsertSponsorship(sponsorship: CategorySponsorship): Promise<void> {
  return withLock(SPONSORSHIPS_PATH, () => {
    const list = getSponsorships();
    const idx = list.findIndex((s) => s.route === sponsorship.route);
    if (idx >= 0) list[idx] = sponsorship;
    else list.push(sponsorship);
    writeJson(SPONSORSHIPS_PATH, list);
  });
}

export function deleteSponsorship(route: string): Promise<void> {
  return withLock(SPONSORSHIPS_PATH, () => {
    writeJson(SPONSORSHIPS_PATH, getSponsorships().filter((s) => s.route !== route));
  });
}

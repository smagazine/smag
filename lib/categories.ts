import fs from "fs";
import path from "path";
import { StorageError } from "@/lib/storage-error";
import { withLock } from "@/lib/file-lock";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Category "desks" that power the public nav, homepage pill nav, and the
 * dynamic app/(site)/[category]/page.tsx route. Same KV-or-file pattern as
 * lib/media.ts / lib/sponsors.ts. This is the routing/section taxonomy
 * (Article.relatedCategory) — the free-text display badge (Article.category,
 * e.g. "Architecture & Design") is a separate, unrelated field and stays
 * hardcoded in app/admin/page.tsx.
 */
export interface Category {
  /** Slug/route, e.g. "f-and-b". Immutable after creation. */
  id: string;
  label: string;
  labelAr: string;
  deck: string;
  deckAr: string;
  /** One of the fixed page-header--* CSS modifiers. */
  headerClass?: string;
  /** Italic page title (used by the Interviews desk). */
  italicTitle?: boolean;
  /** Bare Unsplash photo ID or uploaded image URL for the homepage pill nav;
      falls back to a live article's heroPhoto when unset. */
  photo?: string;
  /** Sort key, ascending. Large gaps left between values so a reorder only
      needs to touch the moved row(s), not renumber the whole list. */
  order: number;
}

const CATEGORIES_PATH = path.join(process.cwd(), "data", "categories.json");
const CATEGORIES_KV_KEY = "categories:data";

let cache: { mtimeMs: number; categories: Category[] } | null = null;

function readFile(): Category[] {
  try {
    const mtimeMs = fs.statSync(CATEGORIES_PATH).mtimeMs;
    if (cache && cache.mtimeMs === mtimeMs) return cache.categories;
    const parsed = JSON.parse(fs.readFileSync(CATEGORIES_PATH, "utf-8"));
    const categories = Array.isArray(parsed) ? parsed : [];
    cache = { mtimeMs, categories };
    return categories;
  } catch {
    return [];
  }
}

function writeFile(list: Category[]): void {
  const tmp = `${CATEGORIES_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tmp, CATEGORIES_PATH);
  } catch {
    throw new StorageError(
      "Could not save categories — the storage is read-only in this environment and no KV store is configured."
    );
  }
  cache = null;
}

async function readAll(): Promise<Category[]> {
  if (!kvConfigured) return readFile();
  try {
    const categories = await kvGetJson<Category[]>(CATEGORIES_KV_KEY, []);
    if (categories.length > 0) return categories;
    // KV has never been written to (e.g. right after switching this
    // deployment onto KV) — seed it from the bundled JSON file so the site
    // doesn't come up with zero categories, then persist it.
    const seeded = readFile();
    if (seeded.length > 0) kvSetJson(CATEGORIES_KV_KEY, seeded).catch(() => {});
    return seeded;
  } catch {
    // KV unreachable: degrade to the bundled file rather than taking the
    // whole site down.
    return readFile();
  }
}

async function saveAll(list: Category[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(CATEGORIES_KV_KEY, list);
    return;
  }
  writeFile(list);
}

/** All categories, sorted by `order` ascending. */
export async function getCategories(): Promise<Category[]> {
  const list = await readAll();
  return [...list].sort((a, b) => a.order - b.order);
}

export async function getCategory(id: string): Promise<Category | null> {
  const list = await getCategories();
  return list.find((c) => c.id === id) ?? null;
}

export class ValidationError extends Error {}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeNew(input: unknown, existing: Category[]): Category {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("category must be an object");
  }
  const raw = input as Record<string, unknown>;
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  if (!id || !SLUG_RE.test(id)) {
    throw new ValidationError("id must be lowercase kebab-case");
  }
  if (existing.some((c) => c.id === id)) {
    throw new ValidationError(`a category with id "${id}" already exists`);
  }
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  if (!label) throw new ValidationError("label is required");
  const labelAr = typeof raw.labelAr === "string" ? raw.labelAr.trim() : "";
  const deck = typeof raw.deck === "string" ? raw.deck : "";
  const deckAr = typeof raw.deckAr === "string" ? raw.deckAr : "";
  const headerClass = typeof raw.headerClass === "string" && raw.headerClass ? raw.headerClass : undefined;
  const italicTitle = raw.italicTitle === true;
  const photo = typeof raw.photo === "string" && raw.photo ? raw.photo : undefined;
  const maxOrder = existing.reduce((max, c) => Math.max(max, c.order), 0);
  return { id, label, labelAr, deck, deckAr, headerClass, italicTitle, photo, order: maxOrder + 1000 };
}

export function createCategory(input: unknown): Promise<Category> {
  return withLock(CATEGORIES_PATH, async () => {
    const existing = await readAll();
    const category = normalizeNew(input, existing);
    await saveAll([...existing, category]);
    return category;
  });
}

/** Label/deck/style fields only — `id` and `order` are immutable via this call. */
export function updateCategory(id: string, input: unknown): Promise<Category> {
  return withLock(CATEGORIES_PATH, async () => {
    const existing = await readAll();
    const idx = existing.findIndex((c) => c.id === id);
    if (idx < 0) throw new ValidationError(`no category with id "${id}"`);
    if (typeof input !== "object" || input === null) {
      throw new ValidationError("category must be an object");
    }
    const raw = input as Record<string, unknown>;
    const label = typeof raw.label === "string" ? raw.label.trim() : "";
    if (!label) throw new ValidationError("label is required");
    const updated: Category = {
      ...existing[idx],
      label,
      labelAr: typeof raw.labelAr === "string" ? raw.labelAr.trim() : "",
      deck: typeof raw.deck === "string" ? raw.deck : "",
      deckAr: typeof raw.deckAr === "string" ? raw.deckAr : "",
      headerClass: typeof raw.headerClass === "string" && raw.headerClass ? raw.headerClass : undefined,
      italicTitle: raw.italicTitle === true,
      photo: typeof raw.photo === "string" && raw.photo ? raw.photo : undefined,
    };
    const list = [...existing];
    list[idx] = updated;
    await saveAll(list);
    return updated;
  });
}

/** Rewrites `order` for every category to match the given id sequence. */
export function reorderCategories(orderedIds: string[]): Promise<Category[]> {
  return withLock(CATEGORIES_PATH, async () => {
    const existing = await readAll();
    if (orderedIds.length !== existing.length || !orderedIds.every((id) => existing.some((c) => c.id === id))) {
      throw new ValidationError("orderedIds must contain exactly the existing category ids");
    }
    const list = existing.map((c) => ({
      ...c,
      order: (orderedIds.indexOf(c.id) + 1) * 1000,
    }));
    await saveAll(list);
    return [...list].sort((a, b) => a.order - b.order);
  });
}

export class CategoryInUseError extends Error {
  constructor(public count: number) {
    super(`${count} article${count === 1 ? "" : "s"} still use this category`);
  }
}

export function deleteCategory(id: string, articlesUsingIt: number): Promise<void> {
  return withLock(CATEGORIES_PATH, async () => {
    if (articlesUsingIt > 0) throw new CategoryInUseError(articlesUsingIt);
    const existing = await readAll();
    await saveAll(existing.filter((c) => c.id !== id));
  });
}

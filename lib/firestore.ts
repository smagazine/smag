import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { firebaseConfigured, getFirebaseApp } from "@/lib/firebase-admin";

/**
 * Firestore-backed replacement for lib/kv.ts (Vercel KV/Upstash), used
 * automatically whenever Firebase is configured (see lib/firebase-admin.ts)
 * — every lib/*.ts data module imports its {kvConfigured, kvGetJson,
 * kvSetJson, kvCommand} from here instead, unchanged otherwise.
 *
 * `kvCommand` is NOT a general Redis emulator — it only implements the
 * handful of command shapes this codebase actually issues (INCR, HINCRBY,
 * HGETALL, GET, RPUSH, LRANGE), each mapped onto a single Firestore
 * document per key: `{ value: <the whole document's data> }`.
 */

export const kvConfigured = firebaseConfigured;

const COLLECTION = "kv_data";

// Every entity in this codebase (Article, Category, Sponsor, …) has optional
// fields that end up `undefined` rather than omitted (e.g. `photo:
// typeof x === "string" && x ? x : undefined`) — plain Firestore rejects
// writing those outright. ignoreUndefinedProperties makes it behave like
// JSON.stringify instead (drops them), matching what every call site
// already assumes. Firestore only allows this to be set once, before the
// first real operation, hence the lazy one-time init.
let db: ReturnType<typeof getFirestore> | null = null;

function getDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
    db.settings({ ignoreUndefinedProperties: true });
  }
  return db;
}

// Firestore document IDs can't contain "/"; every key used in this codebase
// is already a plain slug ("articles:data", "contact-requests", …) so this
// is just a defensive guard, not something expected to ever fire.
function docId(key: string): string {
  return key.replace(/\//g, "_");
}

function ref(key: string) {
  return getDb().collection(COLLECTION).doc(docId(key));
}

export async function kvGetJson<T>(key: string, fallback: T): Promise<T> {
  const snap = await ref(key).get();
  if (!snap.exists) return fallback;
  const value = snap.data()?.value;
  return value === undefined ? fallback : (value as T);
}

export async function kvSetJson(key: string, value: unknown): Promise<void> {
  await ref(key).set({ value });
}

type Command = (string | number)[];

export async function kvCommand<T>(command: Command): Promise<T> {
  const [op, key, ...args] = command;
  const doc = ref(String(key));

  switch (op) {
    case "INCR": {
      await doc.set({ value: FieldValue.increment(1) }, { merge: true });
      return undefined as T;
    }
    case "HINCRBY": {
      const [field, amount] = args;
      await doc.set({ value: { [String(field)]: FieldValue.increment(Number(amount)) } }, { merge: true });
      return undefined as T;
    }
    case "GET": {
      const snap = await doc.get();
      const value = snap.data()?.value;
      return (value === undefined || value === null ? null : String(value)) as T;
    }
    case "HGETALL": {
      const snap = await doc.get();
      const map = (snap.data()?.value ?? {}) as Record<string, unknown>;
      const flat: string[] = [];
      for (const [k, v] of Object.entries(map)) flat.push(k, String(v));
      return flat as T;
    }
    case "RPUSH": {
      const [item] = args;
      await doc.set({ value: FieldValue.arrayUnion(String(item)) }, { merge: true });
      return undefined as T;
    }
    case "LRANGE": {
      const snap = await doc.get();
      return ((snap.data()?.value ?? []) as string[]) as T;
    }
    default:
      throw new Error(`kvCommand: unsupported command "${op}"`);
  }
}

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { StorageError } from "@/lib/storage-error";
import { withLock } from "@/lib/file-lock";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Named admin-panel accounts, on top of the legacy shared ADMIN_PASSWORD
 * login (lib/auth.ts) — that password still works as a break-glass login
 * (useful for bootstrapping the very first user, or recovery if every
 * account gets locked out) and is treated as an implicit admin. Same
 * KV-or-file pattern as lib/sponsors.ts etc.
 */

export type Role = "admin" | "editor";

export interface User {
  id: string;
  username: string;
  role: Role;
  /** `scryptSalt:scryptHash`, both hex. Never sent to the client. */
  passwordHash: string;
  createdAt: string;
}

export type PublicUser = Omit<User, "passwordHash">;

const USERS_PATH = path.join(process.cwd(), "data", "users.json");
const USERS_KV_KEY = "users:data";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPasswordHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

function readFile(): User[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_PATH, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFile(list: User[]): void {
  const tmp = `${USERS_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tmp, USERS_PATH);
  } catch {
    throw new StorageError(
      "Could not save — the storage is read-only in this environment and no KV store is configured."
    );
  }
}

async function readAll(): Promise<User[]> {
  if (!kvConfigured) return readFile();
  try {
    return await kvGetJson<User[]>(USERS_KV_KEY, []);
  } catch {
    return readFile();
  }
}

async function writeAll(list: User[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(USERS_KV_KEY, list);
    return;
  }
  writeFile(list);
}

function toPublic(u: User): PublicUser {
  const { passwordHash: _passwordHash, ...rest } = u;
  return rest;
}

export async function getUsers(): Promise<PublicUser[]> {
  return (await readAll()).map(toPublic);
}

export async function findUserByUsername(username: string): Promise<User | null> {
  const users = await readAll();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function verifyCredentials(username: string, password: string): Promise<PublicUser | null> {
  const user = await findUserByUsername(username);
  if (!user) return null;
  if (!verifyPasswordHash(password, user.passwordHash)) return null;
  return toPublic(user);
}

export class UsernameTakenError extends Error {}

export function createUser(input: { username: string; password: string; role: Role }): Promise<PublicUser> {
  return withLock(USERS_PATH, async () => {
    const users = await readAll();
    if (users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())) {
      throw new UsernameTakenError(`"${input.username}" is already taken`);
    }
    const user: User = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      username: input.username,
      role: input.role,
      passwordHash: hashPassword(input.password),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeAll(users);
    return toPublic(user);
  });
}

export function deleteUser(id: string): Promise<void> {
  return withLock(USERS_PATH, async () => {
    const users = await readAll();
    await writeAll(users.filter((u) => u.id !== id));
  });
}

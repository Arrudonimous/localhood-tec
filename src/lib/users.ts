import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  company?: string;
  phone?: string;
  locale: "pt-BR" | "en-US";
  plan: "startup" | "professional" | "enterprise";
  role: "client" | "admin";
  createdAt: string;
}

export interface ResetToken {
  tokenHash: string;
  userId: string;
  expiresAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const RESET_TOKENS_FILE = path.join(DATA_DIR, "reset-tokens.json");

async function readJson<T>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeJson<T>(file: string, data: T[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export async function getUsers(): Promise<User[]> {
  return readJson<User>(USERS_FILE);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "plan" | "role">,
): Promise<User> {
  const users = await getUsers();
  const user: User = {
    ...data,
    id: randomUUID(),
    plan: "startup",
    role: "client",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeJson(USERS_FILE, users);
  return user;
}

export async function updateUserPassword(
  userId: string,
  passwordHash: string,
): Promise<void> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return;
  users[index].passwordHash = passwordHash;
  await writeJson(USERS_FILE, users);
}

export async function saveResetToken(entry: ResetToken): Promise<void> {
  const tokens = await readJson<ResetToken>(RESET_TOKENS_FILE);
  const filtered = tokens.filter((t) => t.userId !== entry.userId);
  filtered.push(entry);
  await writeJson(RESET_TOKENS_FILE, filtered);
}

export async function consumeResetToken(
  tokenHash: string,
): Promise<ResetToken | undefined> {
  const tokens = await readJson<ResetToken>(RESET_TOKENS_FILE);
  const match = tokens.find((t) => t.tokenHash === tokenHash);
  if (!match) return undefined;

  const remaining = tokens.filter((t) => t.tokenHash !== tokenHash);
  await writeJson(RESET_TOKENS_FILE, remaining);

  if (new Date(match.expiresAt).getTime() < Date.now()) return undefined;
  return match;
}

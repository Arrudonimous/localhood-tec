import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { testimonials as seedTestimonials } from "@/lib/mock-testimonials";

export interface StoredTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  result: string;
  featured: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "testimonials.json");

async function seedIfMissing(): Promise<StoredTestimonial[]> {
  const seeded = seedTestimonials.map((t) => ({ ...t, featured: true }));
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(seeded, null, 2), "utf-8");
  return seeded;
}

export async function getTestimonials(): Promise<StoredTestimonial[]> {
  try {
    const raw = await readFile(FILE, "utf-8");
    return JSON.parse(raw) as StoredTestimonial[];
  } catch {
    return seedIfMissing();
  }
}

async function writeAll(items: StoredTestimonial[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function createTestimonial(
  data: Omit<StoredTestimonial, "id">,
): Promise<StoredTestimonial> {
  const items = await getTestimonials();
  const item: StoredTestimonial = { ...data, id: randomUUID() };
  items.push(item);
  await writeAll(items);
  return item;
}

export async function updateTestimonial(
  id: string,
  data: Partial<Omit<StoredTestimonial, "id">>,
): Promise<StoredTestimonial | null> {
  const items = await getTestimonials();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await writeAll(items);
  return items[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const items = await getTestimonials();
  const filtered = items.filter((t) => t.id !== id);
  if (filtered.length === items.length) return false;
  await writeAll(filtered);
  return true;
}

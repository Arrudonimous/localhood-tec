import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { blogPosts as seedPosts, type BlogPost } from "@/lib/mock-blog";

export type { BlogPost };

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "blog-posts.json");

async function seedIfMissing(): Promise<BlogPost[]> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(seedPosts, null, 2), "utf-8");
  return seedPosts;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await readFile(FILE, "utf-8");
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return seedIfMissing();
  }
}

async function writeAll(items: BlogPost[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function createBlogPost(data: BlogPost): Promise<BlogPost> {
  const posts = await getBlogPosts();
  if (posts.some((p) => p.slug === data.slug)) {
    throw new Error("Slug já existe");
  }
  posts.push(data);
  await writeAll(posts);
  return data;
}

export async function updateBlogPost(
  slug: string,
  data: Partial<BlogPost>,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...data };
  await writeAll(posts);
  return posts[index];
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  if (filtered.length === posts.length) return false;
  await writeAll(filtered);
  return true;
}

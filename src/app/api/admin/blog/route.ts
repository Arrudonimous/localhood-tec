import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { createBlogPost, getBlogPosts } from "@/lib/blog-store";

const schema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen"),
  title: z.string().trim().min(3),
  excerpt: z.string().trim().min(10),
  content: z.array(z.string().trim().min(1)).min(1),
  category: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)),
  author: z.string().trim().min(1),
  date: z.string().trim().min(1),
  readTimeMinutes: z.number().min(1),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const posts = await getBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = schema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }

  try {
    const post = await createBlogPost(result.data);
    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug já existe" }, { status: 409 });
  }
}

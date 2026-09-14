import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { deleteBlogPost, updateBlogPost } from "@/lib/blog-store";

const schema = z.object({
  title: z.string().trim().min(3).optional(),
  excerpt: z.string().trim().min(10).optional(),
  content: z.array(z.string().trim().min(1)).min(1).optional(),
  category: z.string().trim().min(1).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  author: z.string().trim().min(1).optional(),
  date: z.string().trim().min(1).optional(),
  readTimeMinutes: z.number().min(1).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = schema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const updated = await updateBlogPost(params.slug, result.data);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deleted = await deleteBlogPost(params.slug);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

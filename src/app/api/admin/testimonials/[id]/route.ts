import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { deleteTestimonial, updateTestimonial } from "@/lib/testimonials-store";

const schema = z.object({
  name: z.string().trim().min(2).optional(),
  company: z.string().trim().min(1).optional(),
  role: z.string().trim().min(1).optional(),
  message: z.string().trim().min(10).optional(),
  rating: z.number().min(1).max(5).optional(),
  result: z.string().trim().min(1).optional(),
  featured: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = schema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const updated = await updateTestimonial(params.id, result.data);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ testimonial: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deleted = await deleteTestimonial(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

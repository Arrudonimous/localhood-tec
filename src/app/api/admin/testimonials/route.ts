import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { createTestimonial, getTestimonials } from "@/lib/testimonials-store";

const schema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  message: z.string().trim().min(10),
  rating: z.number().min(1).max(5),
  result: z.string().trim().min(1),
  featured: z.boolean().default(true),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = schema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const testimonial = await createTestimonial(result.data);
  return NextResponse.json({ testimonial }, { status: 201 });
}

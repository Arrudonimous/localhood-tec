import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/testimonials-store";

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({
    testimonials: testimonials.filter((t) => t.featured),
  });
}

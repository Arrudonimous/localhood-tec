import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";

const leadSchema = z
  .object({
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    serviceType: z
      .enum(["website", "ecommerce", "system", "automation", "consulting", "other"])
      .optional(),
    budget: z.enum(["b1", "b2", "b3", "b4", "b5"]).optional(),
    description: z.string().trim().max(500).optional(),
    source: z.enum(["contact-form", "popup", "other"]).default("contact-form"),
    locale: z.enum(["pt-BR", "en-US"]).default("pt-BR"),
  })
  .superRefine((data, ctx) => {
    if (data.source === "popup") return;

    if (!data.name || data.name.trim().length < 3) {
      ctx.addIssue({ code: "custom", path: ["name"], message: "Required" });
    }
    if (!data.serviceType) {
      ctx.addIssue({ code: "custom", path: ["serviceType"], message: "Required" });
    }
    if (!data.budget) {
      ctx.addIssue({ code: "custom", path: ["budget"], message: "Required" });
    }
    if (!data.description || data.description.trim().length < 10) {
      ctx.addIssue({ code: "custom", path: ["description"], message: "Required" });
    }
  });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const data = result.data;

  try {
    const lead = await saveLead({
      name: data.name?.trim() || "(lead magnet)",
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      serviceType: data.serviceType ?? "other",
      budget: data.budget ?? "b1",
      description: data.description?.trim() || "Lead magnet signup",
      source: data.source,
      locale: data.locale,
    });
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

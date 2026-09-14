import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { deleteLead, updateLeadStatus } from "@/lib/leads";

const statusSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = statusSchema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const updated = await updateLeadStatus(params.id, result.data.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ lead: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deleted = await deleteLead(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

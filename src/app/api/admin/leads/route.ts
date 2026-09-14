import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getLeads } from "@/lib/leads";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const leads = await getLeads();
  return NextResponse.json({ leads });
}

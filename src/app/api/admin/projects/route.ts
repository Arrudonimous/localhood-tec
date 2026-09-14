import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { mockProjects } from "@/lib/mock-projects";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ projects: mockProjects });
}

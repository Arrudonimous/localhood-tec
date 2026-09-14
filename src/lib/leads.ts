import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  budget: string;
  description: string;
  source: "contact-form" | "popup" | "other";
  locale: "pt-BR" | "en-US";
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export async function saveLead(
  lead: Omit<Lead, "id" | "createdAt">,
): Promise<Lead> {
  const leads = await readLeads();
  const newLead: Lead = {
    ...lead,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

  return newLead;
}

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
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
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

async function writeLeads(leads: Lead[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function getLeads(): Promise<Lead[]> {
  return readLeads();
}

export async function saveLead(
  lead: Omit<Lead, "id" | "createdAt" | "status">,
): Promise<Lead> {
  const leads = await readLeads();
  const newLead: Lead = {
    ...lead,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);
  await writeLeads(leads);
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: Lead["status"],
): Promise<Lead | null> {
  const leads = await readLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index].status = status;
  await writeLeads(leads);
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await readLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  await writeLeads(filtered);
  return true;
}

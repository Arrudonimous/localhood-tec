"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  budget: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  createdAt: string;
}

const STATUS_OPTIONS: Lead["status"][] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => setLeads(data.leads ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">Leads</h1>

      {loading ? (
        <p className="mt-6 text-text-secondary">Carregando...</p>
      ) : leads.length === 0 ? (
        <p className="mt-6 text-text-secondary">Nenhum lead capturado ainda.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-secondary text-left text-text-secondary">
                <th className="py-2 pr-4">Nome</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Serviço</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-secondary/50">
                  <td className="py-3 pr-4 text-text">{lead.name}</td>
                  <td className="py-3 pr-4 text-text-secondary">
                    {lead.email}
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">
                    {lead.serviceType}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value as Lead["status"])
                      }
                      className="rounded-md border border-border bg-primary px-2 py-1 text-xs text-text focus:border-gold focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => remove(lead.id)}
                      className="text-xs text-error hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

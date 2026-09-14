"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-[80vh] bg-primary px-6 py-16 sm:px-10">
      <h1 className="text-3xl font-bold text-text">
        Bem-vindo, {user?.name ?? "..."}!
      </h1>
      <p className="mt-2 text-text-secondary">
        Painel completo chega no próximo prompt.
      </p>
    </main>
  );
}

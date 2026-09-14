"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export default function ProfilePage() {
  const { user } = useAuth();
  const { locale, currency, setLocale, setCurrency } = useLocale();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PUT /api/users/me quando a edição de perfil tiver persistência real.
    setSaved(true);
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-text sm:text-3xl">Perfil</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm text-text">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-text">Email</label>
          <input
            disabled
            value={user?.email ?? ""}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-text-secondary"
          />
        </div>

        <div>
          <label className="text-sm text-text">Idioma</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-text">Moeda</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
          >
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-green px-6 py-2 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
        >
          Salvar Alterações
        </button>
        {saved && (
          <p className="text-sm text-green">Preferências atualizadas.</p>
        )}
      </form>
    </div>
  );
}

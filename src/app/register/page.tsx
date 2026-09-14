"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const { locale } = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao registrar");
        return;
      }

      await refresh();
      router.push("/dashboard");
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-primary to-secondary px-6 py-16">
      <div className="glass w-full max-w-md rounded-lg border-gold/40 p-10">
        <Link href="/" className="text-lg font-bold text-text">
          STERK
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-text">Registrar</h1>
        <p className="mt-1 text-sm text-text-secondary">Crie sua conta</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-text">Nome completo</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Empresa</label>
            <input
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Telefone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Senha</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
            <p className="mt-1 text-xs text-text-secondary">
              Mínimo 8 caracteres, com letras e números
            </p>
          </div>

          <div>
            <label className="text-sm text-text">Confirmar senha</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-text-secondary">
            <input
              type="checkbox"
              required
              checked={form.acceptedTerms}
              onChange={(e) => update("acceptedTerms", e.target.checked)}
              className="mt-0.5"
            />
            Aceito os termos de uso e política de privacidade
          </label>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover disabled:opacity-60"
          >
            {isSubmitting ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Já tem conta?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}

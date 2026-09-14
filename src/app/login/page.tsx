"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Email ou senha inválidos");
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
      <div className="w-full max-w-md rounded-lg border border-gold bg-secondary p-10">
        <Link href="/" className="text-lg font-bold text-text">
          STERK
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-text">Login</h1>
        <p className="mt-1 text-sm text-text-secondary">Acesse seu painel</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-text">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover disabled:opacity-60"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center text-sm text-text-secondary">
          <Link href="/forgot-password" className="hover:text-gold">
            Esqueceu a senha?
          </Link>
          <p>
            Não tem conta?{" "}
            <Link href="/register" className="text-gold hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

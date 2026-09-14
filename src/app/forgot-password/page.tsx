"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("sent");
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
        <h1 className="mt-6 text-3xl font-bold text-text">Recuperar Senha</h1>

        {status === "sent" ? (
          <p className="mt-6 text-sm text-text-secondary">
            Se o email existir em nossa base, você receberá as instruções em
            instantes. Verifique sua caixa de entrada.
          </p>
        ) : (
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar Instruções"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-text-secondary">
          <Link href="/login" className="text-gold hover:underline">
            Voltar para login
          </Link>
        </p>
      </div>
    </main>
  );
}

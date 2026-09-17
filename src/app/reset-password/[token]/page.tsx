"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token, password, confirmPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao redefinir senha");
        return;
      }

      router.push("/login");
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-primary to-secondary px-6 py-16">
      <div className="glass w-full max-w-md rounded-lg border-gold/40 p-10">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text">
          <Image src="/logo-icon.svg" alt="" width={28} height={28} />
          LocalHood <span className="text-[#5B93F5]">Tec</span>
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-text">Nova Senha</h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-text">Nova senha</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-text">Confirmar senha</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover disabled:opacity-60"
          >
            {isSubmitting ? "Salvando..." : "Redefinir Senha"}
          </button>
        </form>
      </div>
    </main>
  );
}

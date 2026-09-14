"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: encaminhar para Sentry assim que SENTRY_DSN estiver configurado (ver .env.example).
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-primary px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-error">
        Algo deu errado
      </p>
      <h1 className="mt-4 text-3xl font-bold text-text">
        Ocorreu um erro inesperado
      </h1>
      <p className="mt-3 max-w-md text-text-secondary">
        Nossa equipe já foi notificada. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
      >
        Tentar novamente
      </button>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-primary px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">
        Erro 404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-text-secondary">
        A página que você procura não existe ou foi movida. Volte para a
        home ou explore nosso portfolio.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
        >
          Voltar para a Home
        </Link>
        <Link
          href="/portfolio"
          className="rounded-md border-2 border-gold px-6 py-3 text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
        >
          Ver Portfolio
        </Link>
      </div>
    </main>
  );
}

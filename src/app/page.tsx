export default function Home() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-8 py-20 text-center">
      <h1 className="max-w-3xl text-4xl font-bold text-text sm:text-5xl">
        Websites e Automações que Geram Resultados
      </h1>
      <p className="max-w-xl text-base text-text-secondary sm:text-lg">
        De startups a grandes empresas, transformamos ideias em soluções
        digitais profissionais.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="#contato"
          className="rounded-md bg-green px-8 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
        >
          Solicitar Proposta
        </a>
        <a
          href="/portfolio"
          className="rounded-md border-2 border-gold px-8 py-3 text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
        >
          Ver Nossos Projetos
        </a>
      </div>
    </main>
  );
}

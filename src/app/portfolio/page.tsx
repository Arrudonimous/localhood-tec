import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio — Sterk",
  description: "Projetos de websites, e-commerce, apps e automações entregues pela Sterk.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Portfolio</h1>
        <p className="mt-2 max-w-2xl text-text-secondary">
          Uma seleção de projetos que entregamos para clientes no Brasil e nos
          EUA.
        </p>

        <div className="mt-10">
          <PortfolioGrid />
        </div>
      </div>
    </main>
  );
}

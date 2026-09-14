import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Planos — Sterk",
  description: "Conheça os planos Startup, Professional e Enterprise da Sterk.",
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <FAQ />
    </>
  );
}

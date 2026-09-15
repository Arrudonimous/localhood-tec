import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: `Planos — ${siteConfig.name}`,
  description: `Conheça os planos Startup, Professional e Enterprise da ${siteConfig.name}.`,
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <FAQ />
    </>
  );
}

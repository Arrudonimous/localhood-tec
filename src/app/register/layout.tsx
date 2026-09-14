import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta — Sterk",
  description: "Crie sua conta para acompanhar seu projeto na Sterk.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

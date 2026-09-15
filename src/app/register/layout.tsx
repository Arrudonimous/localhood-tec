import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta — LocalHood Tec",
  description: "Crie sua conta para acompanhar seu projeto na LocalHood Tec.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

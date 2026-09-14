import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Sterk",
  description: "Acesse o painel de acompanhamento do seu projeto na Sterk.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

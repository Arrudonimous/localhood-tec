import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Senha — Sterk",
  description: "Recupere o acesso à sua conta Sterk.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

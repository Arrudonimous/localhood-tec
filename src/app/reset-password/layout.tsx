import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir Senha — Sterk",
  description: "Defina uma nova senha para sua conta Sterk.",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

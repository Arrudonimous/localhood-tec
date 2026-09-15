import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Senha — LocalHood Tec",
  description: "Recupere o acesso à sua conta LocalHood Tec.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

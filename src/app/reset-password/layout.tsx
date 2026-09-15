import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir Senha — LocalHood Tec",
  description: "Defina uma nova senha para sua conta LocalHood Tec.",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

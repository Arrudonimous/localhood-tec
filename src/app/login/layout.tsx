import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — LocalHood Tec",
  description: "Acesse o painel de acompanhamento do seu projeto na LocalHood Tec.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

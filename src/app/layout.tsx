import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import { LocaleProvider } from "@/context/LocaleContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sterk — Websites e Automações que Geram Resultados",
  description:
    "Websites, automações e sistemas sob medida para empresas no Brasil e nos EUA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        <LocaleProvider>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
            <LeadMagnetPopup />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

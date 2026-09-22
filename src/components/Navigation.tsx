"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { useAuth } from "@/hooks/useAuth";

const LANGUAGES = [
  { code: "pt-BR" as const, label: "Brasil", flag: "🇧🇷" },
  { code: "en-US" as const, label: "USA", flag: "🇺🇸" },
];

const CURRENCIES = ["BRL", "USD"] as const;

export default function Navigation() {
  const { locale, currency, setLocale, setCurrency, t } = useLocale();
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLanguage = LANGUAGES.find((lang) => lang.code === locale)!;

  const navItems = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b px-8 py-4 transition-all duration-base ${
        scrolled
          ? "border-white/10 bg-primary/50 backdrop-blur-xl"
          : "border-secondary bg-primary"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.svg" alt="" width={32} height={32} priority />
          <span className="font-sans text-lg font-bold text-text">
            LocalHood <span className="text-[#5B93F5]">Tec</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text transition-colors duration-fast hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLangOpen((open) => !open);
                setCurrencyOpen(false);
              }}
              className="flex items-center gap-1 text-sm text-text transition-colors duration-fast hover:text-gold"
            >
              <span>{activeLanguage.flag}</span>
              <span>{activeLanguage.code === "pt-BR" ? "BR" : "EN"}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 rounded-md border border-secondary bg-secondary py-1 shadow-lg">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code);
                      setLangOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text transition-colors duration-fast hover:text-gold"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCurrencyOpen((open) => !open);
                setLangOpen(false);
              }}
              className="text-sm text-text transition-colors duration-fast hover:text-gold"
            >
              {currency}
            </button>
            {currencyOpen && (
              <div className="absolute right-0 top-full mt-2 w-24 rounded-md border border-secondary bg-secondary py-1 shadow-lg">
                {CURRENCIES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text transition-colors duration-fast hover:text-gold"
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
              >
                {t("nav.accessDashboard")}
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
              >
                {t("nav.logout")}
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-text" />
          <span className="h-0.5 w-6 bg-text" />
          <span className="h-0.5 w-6 bg-text" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col gap-6 bg-secondary p-8 md:hidden"
            >
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMobileOpen(false)}
                className="self-end text-2xl text-text"
              >
                ×
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-text transition-colors duration-fast hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center gap-3 border-t border-primary pt-6 text-sm text-text-secondary">
                <span>
                  {activeLanguage.flag} {activeLanguage.code}
                </span>
                <span>•</span>
                <span>{currency}</span>
              </div>

              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md bg-green px-4 py-2 text-center text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
                  >
                    {t("nav.accessDashboard")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-left text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

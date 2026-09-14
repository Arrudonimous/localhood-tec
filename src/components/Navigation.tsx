import Link from "next/link";
import { siteConfig } from "@/config/site-config";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary bg-primary/95 px-8 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-sans text-lg font-bold text-text">
          {siteConfig.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text transition-colors duration-fast hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
        >
          Acessar Painel
        </Link>
      </div>
    </header>
  );
}

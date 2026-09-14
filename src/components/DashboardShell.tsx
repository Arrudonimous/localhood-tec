"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Início", href: "/dashboard" },
  { label: "Projetos", href: "/dashboard/projects" },
  { label: "Mensagens", href: "/dashboard/messages" },
  { label: "Perfil", href: "/dashboard/profile" },
];

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setDrawerOpen(false)}
            className={`rounded-md px-3 py-2 text-sm transition-colors duration-fast ${
              isActive
                ? "bg-secondary text-gold"
                : "text-text-secondary hover:text-gold"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-[80vh] bg-primary">
      <aside className="hidden w-56 flex-col gap-1 border-r border-secondary p-6 lg:flex">
        <p className="mb-4 text-sm text-text-secondary">
          Olá, {user?.name?.split(" ")[0] ?? "..."}
        </p>
        <NavLinks />
        <button
          type="button"
          onClick={() => logout()}
          className="mt-auto rounded-md px-3 py-2 text-left text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
        >
          Sair
        </button>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-secondary p-4 lg:hidden">
          <p className="text-sm text-text-secondary">
            Olá, {user?.name?.split(" ")[0] ?? "..."}
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen((open) => !open)}
            className="text-sm text-gold"
          >
            Menu
          </button>
        </div>

        {drawerOpen && (
          <div className="flex flex-col gap-1 border-b border-secondary p-4 lg:hidden">
            <NavLinks />
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-md px-3 py-2 text-left text-sm text-text-secondary hover:text-gold"
            >
              Sair
            </button>
          </div>
        )}

        <div className="p-6 sm:p-10">{children}</div>
      </div>
    </div>
  );
}

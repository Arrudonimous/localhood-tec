"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Projetos", href: "/admin/projects" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-[80vh] bg-primary">
      <aside className="hidden w-56 flex-col gap-1 border-r border-secondary p-6 lg:flex">
        <p className="mb-1 text-xs uppercase tracking-wide text-gold">Admin</p>
        <p className="mb-4 text-sm text-text-secondary">{user?.name}</p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
        <button
          type="button"
          onClick={() => logout()}
          className="mt-auto rounded-md px-3 py-2 text-left text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
        >
          Sair
        </button>
      </aside>

      <div className="flex-1 p-6 sm:p-10">{children}</div>
    </div>
  );
}

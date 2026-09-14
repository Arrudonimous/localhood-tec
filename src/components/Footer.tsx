import { siteConfig } from "@/config/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-primary px-8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-sans text-lg font-bold text-text">
            {siteConfig.name.toUpperCase()}
          </p>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-text-secondary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-fast hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-xs text-copyright">
        © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}

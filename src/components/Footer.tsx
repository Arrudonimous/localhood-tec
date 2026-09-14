import Link from "next/link";
import { siteConfig } from "@/config/site-config";

const socialAbbreviations: Record<string, string> = {
  LinkedIn: "in",
  Instagram: "ig",
  GitHub: "gh",
  "Twitter/X": "x",
  WhatsApp: "wa",
};

export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-primary px-8 py-12 lg:min-h-[400px] lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="font-sans text-lg font-bold text-text">
            {siteConfig.name.toUpperCase()}
          </p>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex gap-3">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-text-secondary text-xs font-semibold uppercase text-text-secondary transition-all duration-fast hover:scale-110 hover:border-gold hover:text-gold"
              >
                {socialAbbreviations[social.label]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            Serviços
          </h3>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerColumns.services.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            Empresa
          </h3>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerColumns.company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            Legal
          </h3>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerColumns.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors duration-fast hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            <li>{siteConfig.contactEmail}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.businessHours}</li>
          </ul>
          <a
            href="#contato"
            className="mt-4 inline-block rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            Fale Conosco
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-3 border-t border-secondary pt-6 text-xs text-copyright sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
          reservados.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-gold">
            Política de Privacidade
          </Link>
          <Link href="/terms" className="hover:text-gold">
            Termos de Uso
          </Link>
          <Link href="/gdpr" className="hover:text-gold">
            GDPR
          </Link>
        </div>
      </div>
    </footer>
  );
}

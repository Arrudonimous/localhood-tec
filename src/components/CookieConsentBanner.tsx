"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_KEY = "cookieConsent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-changed";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold bg-secondary p-4 sm:p-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-text-secondary">
          Usamos cookies essenciais para o site funcionar e, com sua permissão,
          cookies de analytics para entender como o site é usado. Veja nossa{" "}
          <Link href="/privacy#cookies" className="text-gold hover:underline">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-md border border-border px-4 py-2 text-sm text-text-secondary transition-colors duration-fast hover:text-text"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { siteConfig } from "@/config/site-config";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_EVENT,
} from "@/components/CookieConsentBanner";

export default function WhatsAppButton() {
  const { locale } = useLocale();
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setCookieBannerVisible(!localStorage.getItem(COOKIE_CONSENT_KEY));
    };
    checkConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, checkConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, checkConsent);
  }, []);

  const message =
    locale === "en-US"
      ? "Hi! I came from the website and I'd like to know more."
      : "Olá! Vim pelo site e quero saber mais.";

  const href = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`glass fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border-green/40 text-green shadow-lg transition-all duration-base hover:scale-105 ${
        cookieBannerVisible ? "bottom-24 sm:bottom-28" : "bottom-6"
      }`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

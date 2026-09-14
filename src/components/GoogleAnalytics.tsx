"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/components/CookieConsentBanner";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () =>
      setHasConsent(localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted");
    checkConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, checkConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, checkConsent);
  }, []);

  if (!enabled || !gaId || !hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

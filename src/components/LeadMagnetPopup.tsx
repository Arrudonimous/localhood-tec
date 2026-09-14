"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const DISMISSED_KEY = "leadMagnetDismissed";

export default function LeadMagnetPopup() {
  const { t, locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-spam
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 20000);

    const onExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setVisible(true);
      }
    };
    document.addEventListener("mouseleave", onExitIntent);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onExitIntent);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "popup", locale }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-[70] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gold bg-secondary p-8"
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={dismiss}
              className="absolute right-4 top-4 text-xl text-text-secondary hover:text-gold"
            >
              ×
            </button>

            {status === "success" ? (
              <p className="text-center text-text">{t("contact.success")}</p>
            ) : (
              <>
                <h3 className="text-xl font-bold text-text">
                  {t("contact.popupHeadline")}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {t("contact.popupBody")}
                </p>
                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
                  {/* Honeypot anti-spam: invisível para pessoas, bots costumam preencher */}
                  <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                    <label htmlFor="popup-website">Não preencha este campo</label>
                    <input
                      id="popup-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.email")}
                    className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-green px-6 py-2 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
                  >
                    {t("contact.popupCta")}
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-xs text-text-secondary hover:text-gold"
                  >
                    {t("contact.popupDismiss")}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-error">{t("contact.error")}</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

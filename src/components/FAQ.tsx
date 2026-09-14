"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { translations } from "@/config/translations";

export default function FAQ() {
  const { locale } = useLocale();
  const { faq } = translations[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text sm:text-4xl">
            {faq.headline}
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            {faq.subheadline}
          </p>
        </div>

        <div className="mt-10 divide-y divide-secondary">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-fast hover:text-gold"
                >
                  <span className="font-semibold text-text">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-xl text-gold"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

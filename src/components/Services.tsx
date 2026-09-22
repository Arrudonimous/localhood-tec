"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { translations } from "@/config/translations";
import TiltCard from "@/components/TiltCard";

export default function Services() {
  const { t, locale } = useLocale();
  const { categories } = translations[locale].services;

  return (
    <section id="services" className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-text sm:text-4xl">
          {t("services.headline")}
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          {t("services.subheadline")}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="flex"
          >
            <TiltCard className="glass flex flex-1 flex-col rounded-lg border-2 border-gold p-8 transition-shadow duration-base hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
              <h3 className="text-xl font-bold text-text">
                {category.name.toUpperCase()}
              </h3>
              <ul className="mt-4 flex-1 space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary">
                    • {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="mt-6 text-sm font-semibold text-gold transition-colors duration-fast hover:text-gold/80"
              >
                {t("services.learnMore")}
              </a>
            </TiltCard>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: categories.length * 0.15 }}
          whileHover={{ y: -8 }}
          className="flex"
        >
          <TiltCard className="glass flex flex-1 flex-col rounded-lg border-2 border-dashed border-gold/50 p-8 transition-shadow duration-base hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
            <h3 className="text-xl font-bold text-text">
              {t("services.customTitle").toUpperCase()}
            </h3>
            <p className="mt-4 flex-1 text-sm text-text-secondary">
              {t("services.customDescription")}
            </p>
            <a
              href="#contato"
              className="mt-6 text-sm font-semibold text-gold transition-colors duration-fast hover:text-gold/80"
            >
              {t("services.customCta")}
            </a>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

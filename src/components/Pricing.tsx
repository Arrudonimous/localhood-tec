"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { translations } from "@/config/translations";

const PRICES_USD = { startup: 2990, professional: 7990 };

export default function Pricing() {
  const { locale, formatPrice } = useLocale();
  const { pricing } = translations[locale];

  return (
    <section className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          {pricing.headline}
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          {pricing.subheadline}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col rounded-lg border border-secondary bg-secondary p-8"
        >
          <p className="text-lg font-bold text-text">
            {pricing.plans.startup.name}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {pricing.plans.startup.bestFor}
          </p>
          <p className="mt-4 text-3xl font-bold text-text">
            {formatPrice(PRICES_USD.startup)}
          </p>
          <ul className="mt-6 flex-1 space-y-2">
            {pricing.plans.startup.features.map((feature) => (
              <li key={feature} className="text-sm text-text-secondary">
                ✓ {feature}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="mt-8 rounded-md border-2 border-gold px-6 py-3 text-center text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
          >
            {pricing.plans.startup.cta}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative flex flex-col rounded-lg border-2 border-gold bg-secondary p-8 lg:scale-105 lg:py-10"
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-primary">
            {pricing.popular}
          </span>
          <p className="text-lg font-bold text-text">
            {pricing.plans.professional.name}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {pricing.plans.professional.bestFor}
          </p>
          <p className="mt-4 text-3xl font-bold text-text">
            {formatPrice(PRICES_USD.professional)}
          </p>
          <ul className="mt-6 flex-1 space-y-2">
            {pricing.plans.professional.features.map((feature) => (
              <li key={feature} className="text-sm text-text-secondary">
                ✓ {feature}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="mt-8 rounded-md bg-green px-6 py-3 text-center text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            {pricing.plans.professional.cta}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col rounded-lg border border-secondary bg-secondary p-8"
        >
          <p className="text-lg font-bold text-text">
            {pricing.plans.enterprise.name}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {pricing.plans.enterprise.bestFor}
          </p>
          <p className="mt-4 text-3xl font-bold text-text">
            {pricing.ctaCustom}
          </p>
          <ul className="mt-6 flex-1 space-y-2">
            {pricing.plans.enterprise.features.map((feature) => (
              <li key={feature} className="text-sm text-text-secondary">
                ✓ {feature}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="mt-8 rounded-md border-2 border-gold px-6 py-3 text-center text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
          >
            {pricing.ctaCustom}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

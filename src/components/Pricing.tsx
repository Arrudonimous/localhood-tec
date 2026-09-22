"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { translations } from "@/config/translations";
import TiltCard from "@/components/TiltCard";

const PRICES_USD = { landing: 497, startup: 2990, professional: 7990 };

const PLAN_ORDER = ["landing", "startup", "professional", "enterprise"] as const;

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

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4 lg:items-center">
        {PLAN_ORDER.map((key, index) => {
          const plan = pricing.plans[key];
          const highlighted = key === "professional";
          const price =
            key in PRICES_USD
              ? formatPrice(PRICES_USD[key as keyof typeof PRICES_USD])
              : pricing.ctaCustom;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={highlighted ? "relative xl:scale-105" : "relative"}
            >
              {highlighted && (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-primary">
                  {pricing.popular}
                </span>
              )}
              <TiltCard
                className={`glass flex h-full flex-col rounded-lg p-8 ${
                  highlighted
                    ? "border-2 border-gold lg:py-10"
                    : "border border-white/10"
                }`}
              >
                <p className="text-lg font-bold text-text">{plan.name}</p>
                <p className="mt-1 text-sm text-text-secondary">
                  {plan.bestFor}
                </p>
                <p className="mt-4 text-3xl font-bold text-text">{price}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-text-secondary">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={`mt-8 rounded-md px-6 py-3 text-center text-sm font-bold transition-colors duration-fast ${
                    highlighted
                      ? "bg-green text-primary hover:bg-green-hover"
                      : "border-2 border-gold text-gold hover:bg-gold/10"
                  }`}
                >
                  {"cta" in plan ? plan.cta : pricing.ctaCustom}
                </a>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

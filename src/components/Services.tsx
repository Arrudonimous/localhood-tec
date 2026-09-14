"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const phases = [
  {
    number: "1",
    name: "Serviços",
    items: [
      "Websites",
      "Landing pages",
      "E-commerce",
      "Sistemas internos",
      "Automação",
      "Integrações",
      "Manutenção/hosting",
    ],
  },
  {
    number: "2",
    name: "Produtos",
    items: [
      "SaaS para pequenas empresas",
      "Sistema de gestão",
      "CRM",
      "Agendamento",
      "Automação de atendimento",
      "Ferramentas de IA",
    ],
  },
  {
    number: "3",
    name: "Escala",
    items: [
      "Assinaturas mensais",
      "Produtos próprios",
      "Marketplace",
      "APIs abertas",
      "Licenciamento",
      "Clientes internacionais",
    ],
  },
];

export default function Services() {
  const { t } = useLocale();

  return (
    <section className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-text sm:text-4xl">
          {t("services.headline")}
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          {t("services.subheadline")}
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-stretch">
        {phases.map((phase, index) => (
          <div key={phase.number} className="flex flex-1 items-stretch gap-8">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="flex flex-1 flex-col rounded-lg border-2 border-gold bg-secondary p-8 transition-shadow duration-base hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]"
            >
              <span className="text-5xl font-bold text-gold">
                {phase.number}
              </span>
              <h3 className="mt-2 text-xl font-bold text-text">
                FASE {phase.number} — {phase.name.toUpperCase()}
              </h3>
              <ul className="mt-4 flex-1 space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary"
                  >
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
            </motion.div>

            {index < phases.length - 1 && (
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden items-center text-2xl text-gold lg:flex"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

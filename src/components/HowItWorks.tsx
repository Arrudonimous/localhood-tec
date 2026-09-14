"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phases = [
  {
    number: "01",
    name: "Entendimento",
    duration: "3-5 dias",
    icon: "🔍",
    activities: [
      "Reunião inicial para entender a necessidade",
      "Análise de concorrência e mercado",
      "Definição clara de objetivos e KPIs",
    ],
  },
  {
    number: "02",
    name: "Ideação & Proposta",
    duration: "5-7 dias",
    icon: "💡",
    activities: [
      "Brainstorm e sugestões de soluções",
      "Criação de wireframes e mockups",
      "Apresentação do cronograma e orçamento",
    ],
  },
  {
    number: "03",
    name: "Desenvolvimento",
    duration: "15-30 dias",
    icon: "⚙️",
    activities: [
      "Desenvolvimento frontend/backend",
      "Integração com sistemas",
      "Testes e ajustes de qualidade",
    ],
  },
  {
    number: "04",
    name: "Implantação",
    duration: "3-5 dias",
    icon: "🚀",
    activities: [
      "Deploy em produção",
      "Setup de analytics e SEO",
      "Treinamento do cliente",
    ],
  },
  {
    number: "05",
    name: "Suporte & Crescimento",
    duration: "Contínuo",
    icon: "📈",
    activities: [
      "Monitoramento 24/7 do sistema",
      "Melhorias e otimizações contínuas",
      "Implementação de novas features",
    ],
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-text sm:text-4xl">
          Como Funciona Nosso Processo
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          5 fases que transformam sua ideia em realidade
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-3xl gap-6 overflow-x-auto pb-4 lg:block lg:overflow-visible">
        {phases.map((phase, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={phase.number} className="min-w-[280px] lg:min-w-0">
              <motion.button
                type="button"
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                whileHover={{ scale: 1.02 }}
                className={`w-full rounded-lg border-l-4 bg-secondary p-6 text-left transition-colors duration-base ${
                  isActive ? "border-green" : "border-gold"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{phase.icon}</span>
                  <div>
                    <span className="text-sm font-bold text-gold">
                      {phase.number}
                    </span>
                    <h3 className="text-lg font-bold text-text">
                      {phase.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {phase.duration}
                    </p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <li className="mt-4 space-y-2 border-t border-primary pt-4">
                        {phase.activities.map((activity) => (
                          <p
                            key={activity}
                            className="text-sm text-text-secondary"
                          >
                            • {activity}
                          </p>
                        ))}
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.button>

              {index < phases.length - 1 && (
                <div className="my-4 hidden justify-center lg:flex">
                  <div className="h-8 w-0.5 bg-gold" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const stats = [
  { icon: "✓", value: "200+", label: "Projetos Realizados" },
  { icon: "★", value: "95%", label: "Satisfação de Clientes" },
  { icon: "⏱", value: "15+", label: "Anos de Expertise" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary px-6 py-20 sm:px-10 lg:py-[120px]">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-5"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:[grid-template-areas:'headline_illustration'_'stats_illustration'_'cta_illustration']">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:[grid-area:headline]"
        >
          <h1 className="text-4xl font-bold leading-tight text-text sm:text-5xl">
            Websites e Automações que Geram Resultados
          </h1>
          <p className="mt-6 max-w-lg text-sm text-text-secondary sm:text-lg">
            De startups a grandes empresas, transformamos ideias em soluções
            digitais profissionais.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary lg:aspect-auto lg:h-full lg:min-h-[420px] lg:[grid-area:illustration]"
        >
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="h-2/3 w-2/3 text-gold/40"
          >
            <polygon
              points="100,10 190,60 190,140 100,190 10,140 10,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

        <div className="flex flex-wrap gap-8 sm:gap-12 lg:[grid-area:stats]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="text-xl text-gold">{stat.icon}</span>
              <div>
                <motion.p
                  className="text-2xl font-bold text-text"
                  animate={
                    index === 0 ? { scale: [1, 1.05, 1] } : undefined
                  }
                  transition={
                    index === 0
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-text-secondary">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col gap-4 sm:flex-row lg:[grid-area:cta]"
        >
          <a
            href="#contato"
            className="rounded-md bg-green px-8 py-3 text-center text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            Solicitar Proposta
          </a>
          <a
            href="/portfolio"
            className="rounded-md border-2 border-gold px-8 py-3 text-center text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
          >
            Ver Nossos Projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
}

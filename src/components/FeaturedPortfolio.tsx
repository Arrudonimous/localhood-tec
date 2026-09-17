"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/mock-portfolio";
import TiltCard from "@/components/TiltCard";

const featured = portfolioProjects.slice(0, 6);

function statusColorClass(status: string) {
  if (status === "Realizado") return "text-green";
  if (status === "Em Andamento") return "text-gold";
  return "text-text-secondary";
}

export default function FeaturedPortfolio() {
  return (
    <section className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-text sm:text-4xl">
          Projetos em Destaque
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          Projetos que já desenvolvemos e conceitos que mostram o que fazemos
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="h-full"
          >
            <TiltCard className="h-full">
              <Link
                href={`/portfolio/${project.slug}`}
                className="glass flex h-full flex-col rounded-lg p-5 transition-all duration-base hover:-translate-y-1 hover:border-gold/60"
              >
                <div className="flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-text-secondary">
                  {project.category}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold text-text">{project.name}</p>
                  <span className={`text-xs font-semibold ${statusColorClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-text-secondary">
                  {project.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-gold">
                  Ver Detalhes →
                </span>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="inline-block rounded-md border-2 border-gold px-6 py-3 text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
        >
          Ver Portfolio Completo
        </Link>
      </div>
    </section>
  );
}

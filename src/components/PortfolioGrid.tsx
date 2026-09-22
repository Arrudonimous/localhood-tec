"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/mock-portfolio";
import {
  getCategoryLabel,
  getConceptBadgeLabel,
  getDescription,
  getStatusLabel,
} from "@/lib/portfolio-i18n";
import { useLocale } from "@/hooks/useLocale";
import TiltCard from "@/components/TiltCard";

const categories = ["Todos", "Website", "E-commerce", "App", "Automação"] as const;
const statuses = ["Todos", "Realizado", "Em Andamento", "Projeto Conceito", "Projeto Acadêmico"] as const;

function statusColorClass(status: string) {
  if (status === "Realizado") return "text-green";
  if (status === "Em Andamento") return "text-gold";
  return "text-text-secondary";
}

export default function PortfolioGrid() {
  const { locale } = useLocale();
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Todos");

  const filtered = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchesCategory = category === "Todos" || project.category === category;
      const matchesStatus = status === "Todos" || project.status === status;
      return matchesCategory && matchesStatus;
    });
  }, [category, status]);

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-fast ${
                category === option
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-secondary text-text-secondary hover:text-gold"
              }`}
            >
              {option === "Todos"
                ? locale === "en-US"
                  ? "All"
                  : "Todos"
                : getCategoryLabel(option, locale)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-fast ${
                status === option
                  ? "border-green bg-green/10 text-green"
                  : "border-secondary text-text-secondary hover:text-green"
              }`}
            >
              {option === "Todos"
                ? locale === "en-US"
                  ? "All"
                  : "Todos"
                : getStatusLabel(option, locale)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="h-full"
          >
            <TiltCard className="h-full">
              <Link
                href={`/portfolio/${project.slug}`}
                className="glass flex h-full flex-col rounded-lg p-5 transition-all duration-base hover:-translate-y-1 hover:border-gold/60"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Preview do site ${project.name}`}
                    className="aspect-video w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-text-secondary">
                    {getCategoryLabel(project.category, locale)}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="font-bold text-text">{project.name}</p>
                  <span className={`text-xs font-semibold ${statusColorClass(project.status)}`}>
                    {getStatusLabel(project.status, locale)}
                  </span>
                </div>
                {!project.isReal && (
                  <span className="mt-2 inline-block w-fit rounded-full border border-text-secondary/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-secondary">
                    {getConceptBadgeLabel(locale)}
                  </span>
                )}
                <p className="mt-2 flex-1 text-sm text-text-secondary">
                  {getDescription(project, locale)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary px-2 py-1 text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="mt-4 text-sm font-semibold text-gold">
                  {locale === "en-US" ? "View Details →" : "Ver Detalhes →"}
                </span>
              </Link>
            </TiltCard>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-text-secondary">
            {locale === "en-US"
              ? "No projects match this filter."
              : "Nenhum projeto encontrado para esse filtro."}
          </p>
        )}
      </div>
    </div>
  );
}

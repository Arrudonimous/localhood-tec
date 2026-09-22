import type { Locale } from "@/config/translations";
import type { PortfolioProject } from "@/lib/mock-portfolio";

const categoryLabels: Record<PortfolioProject["category"], Record<Locale, string>> = {
  Website: { "pt-BR": "Website", "en-US": "Website" },
  "E-commerce": { "pt-BR": "E-commerce", "en-US": "E-commerce" },
  App: { "pt-BR": "App", "en-US": "App" },
  Automação: { "pt-BR": "Automação", "en-US": "Automation" },
};

const statusLabels: Record<PortfolioProject["status"], Record<Locale, string>> = {
  Realizado: { "pt-BR": "Realizado", "en-US": "Completed" },
  "Em Andamento": { "pt-BR": "Em Andamento", "en-US": "In Progress" },
  "Projeto Conceito": { "pt-BR": "Projeto Conceito", "en-US": "Concept Project" },
  "Projeto Acadêmico": { "pt-BR": "Projeto Acadêmico", "en-US": "Academic Project" },
};

export function getCategoryLabel(
  category: PortfolioProject["category"],
  locale: Locale,
): string {
  return categoryLabels[category][locale];
}

export function getStatusLabel(
  status: PortfolioProject["status"],
  locale: Locale,
): string {
  return statusLabels[status][locale];
}

export function getDescription(project: PortfolioProject, locale: Locale): string {
  if (locale === "en-US" && project.descriptionEn) return project.descriptionEn;
  return project.description;
}

export function getConceptBadgeLabel(locale: Locale): string {
  return locale === "en-US" ? "Illustrative concept" : "Conceito ilustrativo";
}

export interface PortfolioProject {
  slug: string;
  name: string;
  category: "Website" | "E-commerce" | "App" | "Automação";
  technologies: string[];
  description: string;
  status: "Realizado" | "Em Andamento";
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "pesqueiro-arrudas",
    name: "Pesqueiro Arruda's",
    category: "Website",
    technologies: ["Next.js", "Tailwind", "Pix"],
    description:
      "Landing page institucional para pesqueiro e restaurante em Santana de Parnaíba (SP), com sistema de reservas online, pagamento de sinal via Pix e cardápio integrado.",
    status: "Realizado",
  },
];

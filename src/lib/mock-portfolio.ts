export interface PortfolioProject {
  slug: string;
  name: string;
  category: "Website" | "E-commerce" | "App" | "Automação";
  technologies: string[];
  description: string;
  status: "Realizado" | "Em Andamento" | "Projeto Conceito";
  link?: string;
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
  {
    slug: "ponto-do-sabor",
    name: "Ponto do Sabor",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para restaurante e lanchonete de bairro, com cardápio, ambiente e pedidos direto pelo WhatsApp.",
    status: "Projeto Conceito",
    link: "https://ponto-do-sabor-six.vercel.app/",
  },
  {
    slug: "barbearia-nova-era",
    name: "Barbearia Nova Era",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para barbearia, com tabela de serviços e preços e agendamento pelo WhatsApp.",
    status: "Projeto Conceito",
    link: "https://barbearia-nova-era.vercel.app/",
  },
  {
    slug: "loja-encanto",
    name: "Loja Encanto",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para loja de presentes e decoração artesanal, com vitrine de produtos e contato pelo WhatsApp.",
    status: "Projeto Conceito",
    link: "https://loja-encanto.vercel.app/",
  },
  {
    slug: "contabilidade-rocha",
    name: "Rocha & Associados",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para escritório de contabilidade, com lista de serviços e contato direto pelo WhatsApp.",
    status: "Projeto Conceito",
    link: "https://contabilidade-rocha-rouge.vercel.app/",
  },
];

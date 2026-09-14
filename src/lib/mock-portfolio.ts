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
    slug: "clinica-vida-plena",
    name: "Clínica Vida Plena",
    category: "Website",
    technologies: ["Next.js", "Tailwind"],
    description:
      "Site institucional para clínica multidisciplinar, com agendamento online e blog de saúde integrado.",
    status: "Realizado",
  },
  {
    slug: "loja-verde-organicos",
    name: "Loja Verde Orgânicos",
    category: "E-commerce",
    technologies: ["Next.js", "Stripe", "Prisma"],
    description:
      "E-commerce de produtos orgânicos com catálogo dinâmico, checkout integrado e painel de pedidos.",
    status: "Realizado",
  },
  {
    slug: "fitpro-app",
    name: "FitPro",
    category: "App",
    technologies: ["React Native", "Node.js"],
    description:
      "Aplicativo de acompanhamento de treinos com planos personalizados e integração com wearables.",
    status: "Realizado",
  },
  {
    slug: "automacao-financeira-nexo",
    name: "Nexo Financeiro",
    category: "Automação",
    technologies: ["Node.js", "Zapier", "PostgreSQL"],
    description:
      "Automação de conciliação bancária e emissão de boletos para escritório de contabilidade.",
    status: "Realizado",
  },
  {
    slug: "studio-arquitetura-linha",
    name: "Studio Linha Arquitetura",
    category: "Website",
    technologies: ["Next.js", "Framer Motion"],
    description:
      "Portfolio visual para escritório de arquitetura com galeria de projetos e formulário de orçamento.",
    status: "Realizado",
  },
  {
    slug: "marketplace-artesanal",
    name: "Marketplace Artesanal",
    category: "E-commerce",
    technologies: ["Next.js", "Supabase"],
    description:
      "Marketplace multi-vendedor para artesãos locais, com split de pagamento e avaliações.",
    status: "Em Andamento",
  },
  {
    slug: "crm-imobiliaria-chave",
    name: "CRM Chave Imóveis",
    category: "Automação",
    technologies: ["React", "Node.js", "PostgreSQL"],
    description:
      "Sistema de gestão de leads e imóveis para imobiliária, com funil de vendas automatizado.",
    status: "Em Andamento",
  },
  {
    slug: "app-delivery-sabor",
    name: "Sabor Delivery",
    category: "App",
    technologies: ["React Native", "Firebase"],
    description:
      "App de delivery para restaurante local com rastreamento de pedido em tempo real.",
    status: "Realizado",
  },
];

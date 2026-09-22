export interface PortfolioProject {
  slug: string;
  name: string;
  category: "Website" | "E-commerce" | "App" | "Automação";
  technologies: string[];
  description: string;
  descriptionEn?: string;
  status: "Realizado" | "Em Andamento" | "Projeto Conceito" | "Projeto Acadêmico";
  isReal: boolean;
  link?: string;
  linkLabel?: string;
  image?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "pesqueiro-arrudas",
    name: "Pesqueiro Arruda's",
    category: "Website",
    technologies: ["Next.js", "Tailwind", "Pix"],
    description:
      "Landing page institucional para pesqueiro e restaurante em Santana de Parnaíba (SP), com sistema de reservas online, pagamento de sinal via Pix e cardápio integrado.",
    descriptionEn:
      "Website for a fishing lodge and restaurant in Santana de Parnaíba, Brazil, with online reservations, a Pix deposit payment, and an integrated menu.",
    status: "Realizado",
    isReal: true,
    image: "/portfolio/pesqueiro-arrudas.jpg",
  },
  {
    slug: "snugglify",
    name: "Snugglify",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Shopify-ready"],
    description:
      "Loja online de produtos para bebês e itens personalizados (bolsas de maternidade, mochilas, malas de viagem), com catálogo, carrinho, checkout via WhatsApp e arquitetura pronta para conectar fornecedores via Shopify.",
    descriptionEn:
      "Online store for baby products and personalized items (diaper bags, backpacks, travel bags), with a catalog, cart, WhatsApp checkout, and an architecture ready to connect suppliers through Shopify.",
    status: "Em Andamento",
    isReal: true,
    link: "https://snugglify.vercel.app/",
    image: "/portfolio/snugglify.jpg",
  },
  {
    slug: "trainya",
    name: "Trainya",
    category: "App",
    technologies: ["Node.js", "Prisma", "MySQL", "React Native"],
    description:
      "Plataforma de gestão para academias (TCC em grupo, Etec, 2022): alunos acompanham metas e progresso, academias gerenciam equipe e alunos. Contribuí no back-end e no app mobile dos membros.",
    descriptionEn:
      "Gym management platform (group thesis project, Etec, 2022): members track goals and progress, gyms manage staff and students. I worked on the back-end and the members' mobile app.",
    status: "Projeto Acadêmico",
    isReal: true,
    link: "https://github.com/trainya-app",
    linkLabel: "Ver repositórios ↗",
  },
  {
    slug: "ponto-do-sabor",
    name: "Ponto do Sabor",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para restaurante e lanchonete de bairro, com cardápio, ambiente e pedidos direto pelo WhatsApp.",
    descriptionEn:
      "Landing page for a neighborhood restaurant and diner, with a menu, photos of the space, and orders straight through WhatsApp.",
    status: "Projeto Conceito",
    isReal: false,
    link: "https://ponto-do-sabor-six.vercel.app/",
    image: "/portfolio/ponto-do-sabor.jpg",
  },
  {
    slug: "barbearia-nova-era",
    name: "Barbearia Nova Era",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para barbearia, com tabela de serviços e preços e agendamento pelo WhatsApp.",
    descriptionEn:
      "Landing page for a barbershop, with a services and pricing table and WhatsApp booking.",
    status: "Projeto Conceito",
    isReal: false,
    link: "https://barbearia-nova-era.vercel.app/",
    image: "/portfolio/barbearia-nova-era.jpg",
  },
  {
    slug: "loja-encanto",
    name: "Loja Encanto",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para loja de presentes e decoração artesanal, com vitrine de produtos e contato pelo WhatsApp.",
    descriptionEn:
      "Landing page for a handmade gifts and decor shop, with a product showcase and WhatsApp contact.",
    status: "Projeto Conceito",
    isReal: false,
    link: "https://loja-encanto.vercel.app/",
    image: "/portfolio/loja-encanto.jpg",
  },
  {
    slug: "contabilidade-rocha",
    name: "Rocha & Associados",
    category: "Website",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page para escritório de contabilidade, com lista de serviços e contato direto pelo WhatsApp.",
    descriptionEn:
      "Landing page for an accounting office, with a services list and direct WhatsApp contact.",
    status: "Projeto Conceito",
    isReal: false,
    link: "https://contabilidade-rocha-rouge.vercel.app/",
    image: "/portfolio/contabilidade-rocha.jpg",
  },
];

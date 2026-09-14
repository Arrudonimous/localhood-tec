export type Locale = "pt-BR" | "en-US";

export const translations = {
  "pt-BR": {
    nav: {
      services: "Serviços",
      portfolio: "Portfolio",
      howItWorks: "Como Funciona",
      pricing: "Planos",
      blog: "Blog",
      contact: "Contato",
      accessDashboard: "Acessar Painel",
    },
    hero: {
      headline: "Websites e Automações que Geram Resultados",
      subheadline:
        "De startups a grandes empresas, transformamos ideias em soluções digitais profissionais.",
      ctaPrimary: "Solicitar Proposta",
      ctaSecondary: "Ver Nossos Projetos",
      statsProjects: "Projetos Realizados",
      statsSatisfaction: "Satisfação de Clientes",
      statsExpertise: "Anos de Expertise",
    },
    howItWorks: {
      headline: "Como Funciona Nosso Processo",
      subheadline: "5 fases que transformam sua ideia em realidade",
    },
    services: {
      headline: "Serviços Completos Por Fase de Crescimento",
      subheadline: "Cada fase da sua empresa encontra a solução perfeita",
      learnMore: "Saiba mais",
    },
    footer: {
      description:
        "Websites, automações e sistemas sob medida para empresas no Brasil e nos EUA.",
      servicesTitle: "Serviços",
      companyTitle: "Empresa",
      legalTitle: "Legal",
      contactTitle: "Contato",
      cta: "Fale Conosco",
      copyright: "Todos os direitos reservados.",
    },
  },
  "en-US": {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      howItWorks: "How It Works",
      pricing: "Pricing",
      blog: "Blog",
      contact: "Contact",
      accessDashboard: "Access Dashboard",
    },
    hero: {
      headline: "Websites and Automations That Drive Results",
      subheadline:
        "From startups to large companies, we turn ideas into professional digital solutions.",
      ctaPrimary: "Request a Proposal",
      ctaSecondary: "See Our Projects",
      statsProjects: "Projects Delivered",
      statsSatisfaction: "Client Satisfaction",
      statsExpertise: "Years of Expertise",
    },
    howItWorks: {
      headline: "How Our Process Works",
      subheadline: "5 stages that turn your idea into reality",
    },
    services: {
      headline: "Full Services For Every Growth Stage",
      subheadline: "Every stage of your business finds the right solution",
      learnMore: "Learn more",
    },
    footer: {
      description:
        "Custom websites, automations and systems for companies in Brazil and the US.",
      servicesTitle: "Services",
      companyTitle: "Company",
      legalTitle: "Legal",
      contactTitle: "Contact",
      cta: "Get in Touch",
      copyright: "All rights reserved.",
    },
  },
} as const;

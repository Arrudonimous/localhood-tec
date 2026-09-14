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
    contact: {
      headline: "Solicite uma Proposta Personalizada",
      name: "Nome Completo",
      email: "Email",
      phone: "Telefone",
      company: "Empresa",
      serviceType: "Tipo de Serviço",
      serviceTypePlaceholder: "Selecione um serviço",
      budget: "Budget Aproximado",
      budgetPlaceholder: "Qual seu budget?",
      description: "Descreva seu projeto",
      descriptionPlaceholder: "Conte-nos mais sobre seu projeto...",
      privacy: "Aceito a política de privacidade e termos de uso",
      submit: "Enviar Proposta",
      submitting: "Enviando...",
      success: "Obrigado! Entraremos em contato em breve.",
      error: "Erro ao enviar. Tente novamente ou envie email direto.",
      services: {
        website: "Website Profissional",
        ecommerce: "E-commerce",
        system: "Sistema Customizado",
        automation: "Automação",
        consulting: "Consultoria",
        other: "Outro",
      },
      budgets: {
        b1: "$1,000 - $5,000",
        b2: "$5,000 - $10,000",
        b3: "$10,000 - $25,000",
        b4: "$25,000 - $50,000",
        b5: "Acima de $50,000",
      },
      popupHeadline: "Ganhe um Checklist Gratuito",
      popupBody:
        "50 pontos essenciais para o seu website converter mais. Deixe seu email e enviamos agora.",
      popupCta: "Quero Receber",
      popupDismiss: "Agora não",
    },
    pricing: {
      headline: "Planos para Cada Fase do Seu Negócio",
      subheadline: "Escolha o plano ideal para o momento da sua empresa",
      popular: "Popular",
      ctaCustom: "Falar com Especialista",
      plans: {
        startup: {
          name: "Startup",
          bestFor: "Pequenas empresas e freelancers",
          features: [
            "Website até 5 páginas",
            "Design responsivo",
            "Formulário de contato",
            "SEO básico",
            "Suporte por email",
          ],
          cta: "Começar Agora",
        },
        professional: {
          name: "Professional",
          bestFor: "Empresas em crescimento",
          features: [
            "Website até 20 páginas",
            "E-commerce integrado",
            "Automações básicas",
            "SEO avançado",
            "Analytics e relatórios",
            "Suporte prioritário 48h",
            "3 meses de manutenção",
          ],
          cta: "Contratar Plano",
        },
        enterprise: {
          name: "Enterprise",
          bestFor: "Grandes empresas e escalas internacionais",
          features: [
            "Solução customizada 100%",
            "Infraestrutura dedicada",
            "APIs personalizadas",
            "Painel administrativo avançado",
            "Equipe dedicada",
            "Suporte 24/7",
          ],
        },
      },
    },
    faq: {
      headline: "Perguntas Frequentes",
      subheadline: "Tire suas dúvidas antes de começar",
      items: [
        {
          q: "Quanto tempo leva para meu projeto ficar pronto?",
          a: "Depende do escopo e do plano contratado. Websites institucionais costumam levar de 3 a 5 semanas; projetos Enterprise têm prazo definido junto com você na proposta.",
        },
        {
          q: "Como funciona o pagamento (à vista, parcelado, por fase)?",
          a: "Aceitamos pagamento à vista com desconto ou parcelado por fase do projeto (entrada + entregas). Os detalhes são combinados na proposta.",
        },
        {
          q: "Vocês atendem empresas fora do Brasil?",
          a: "Sim, atendemos empresas no Brasil e nos EUA, com preços em BRL ou USD conforme sua localização.",
        },
        {
          q: "Preciso ter tudo pronto (conteúdo, logo, textos) antes de começar?",
          a: "Não. Podemos começar com o que você já tem e evoluir o conteúdo junto com o desenvolvimento, ou usar placeholders até você finalizar os materiais.",
        },
        {
          q: "O que acontece se eu precisar de ajustes depois da entrega?",
          a: "Os planos Professional e Enterprise incluem período de manutenção após a entrega. Fora desse período, ajustes podem ser contratados avulsos ou via plano de suporte contínuo.",
        },
        {
          q: "Vocês oferecem suporte e manutenção contínua?",
          a: "Sim, todos os planos incluem algum nível de suporte, e é possível contratar manutenção contínua separadamente.",
        },
        {
          q: "Qual a diferença entre os planos Startup, Professional e Enterprise?",
          a: "Startup é ideal para quem está começando, Professional atende empresas em crescimento com mais páginas e automações, e Enterprise é uma solução 100% customizada com equipe dedicada.",
        },
        {
          q: "Como acompanho o andamento do meu projeto?",
          a: "Você tem acesso a um painel de cliente com timeline do projeto, checklist de tarefas, documentos compartilhados e chat direto com o time.",
        },
        {
          q: "Posso migrar de um site que já existe?",
          a: "Sim, ajudamos a migrar conteúdo e, quando possível, o histórico de SEO do site atual para a nova plataforma.",
        },
        {
          q: "Como funciona garantia ou reembolso?",
          a: "Se identificarmos que não conseguimos entregar o que foi combinado na proposta, oferecemos reembolso proporcional ao que ainda não foi entregue.",
        },
      ],
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
    contact: {
      headline: "Request a Custom Proposal",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      serviceType: "Service Type",
      serviceTypePlaceholder: "Select a service",
      budget: "Estimated Budget",
      budgetPlaceholder: "What's your budget?",
      description: "Describe your project",
      descriptionPlaceholder: "Tell us more about your project...",
      privacy: "I accept the privacy policy and terms of use",
      submit: "Send Proposal",
      submitting: "Sending...",
      success: "Thanks! We'll be in touch shortly.",
      error: "Something went wrong. Try again or email us directly.",
      services: {
        website: "Professional Website",
        ecommerce: "E-commerce",
        system: "Custom System",
        automation: "Automation",
        consulting: "Consulting",
        other: "Other",
      },
      budgets: {
        b1: "$1,000 - $5,000",
        b2: "$5,000 - $10,000",
        b3: "$10,000 - $25,000",
        b4: "$25,000 - $50,000",
        b5: "Above $50,000",
      },
      popupHeadline: "Get a Free Checklist",
      popupBody:
        "50 essential points to make your website convert more. Leave your email and we'll send it now.",
      popupCta: "Send It to Me",
      popupDismiss: "Not now",
    },
    pricing: {
      headline: "Plans For Every Stage of Your Business",
      subheadline: "Choose the right plan for where your company is today",
      popular: "Popular",
      ctaCustom: "Talk to a Specialist",
      plans: {
        startup: {
          name: "Startup",
          bestFor: "Small businesses and freelancers",
          features: [
            "Website up to 5 pages",
            "Responsive design",
            "Contact form",
            "Basic SEO",
            "Email support",
          ],
          cta: "Get Started",
        },
        professional: {
          name: "Professional",
          bestFor: "Growing businesses",
          features: [
            "Website up to 20 pages",
            "Integrated e-commerce",
            "Basic automations",
            "Advanced SEO",
            "Analytics and reports",
            "Priority support 48h",
            "3 months of maintenance",
          ],
          cta: "Choose Plan",
        },
        enterprise: {
          name: "Enterprise",
          bestFor: "Large companies and international scale",
          features: [
            "100% custom solution",
            "Dedicated infrastructure",
            "Custom APIs",
            "Advanced admin panel",
            "Dedicated team",
            "24/7 support",
          ],
        },
      },
    },
    faq: {
      headline: "Frequently Asked Questions",
      subheadline: "Get your questions answered before you start",
      items: [
        {
          q: "How long does it take to finish my project?",
          a: "It depends on scope and plan. Institutional websites usually take 3 to 5 weeks; Enterprise projects get a timeline defined together with you in the proposal.",
        },
        {
          q: "How does payment work (upfront, installments, per phase)?",
          a: "We accept upfront payment with a discount or installments per project phase (deposit + deliverables). Details are agreed in the proposal.",
        },
        {
          q: "Do you work with companies outside Brazil?",
          a: "Yes, we serve companies in Brazil and the US, with pricing in BRL or USD depending on your location.",
        },
        {
          q: "Do I need everything ready (content, logo, copy) before starting?",
          a: "No. We can start with what you already have and evolve the content alongside development, or use placeholders until your materials are ready.",
        },
        {
          q: "What happens if I need changes after delivery?",
          a: "Professional and Enterprise plans include a maintenance period after delivery. Outside that period, changes can be purchased separately or through an ongoing support plan.",
        },
        {
          q: "Do you offer ongoing support and maintenance?",
          a: "Yes, every plan includes some level of support, and ongoing maintenance can be purchased separately.",
        },
        {
          q: "What's the difference between Startup, Professional and Enterprise?",
          a: "Startup is ideal for those just starting out, Professional serves growing businesses with more pages and automations, and Enterprise is a 100% custom solution with a dedicated team.",
        },
        {
          q: "How do I track my project's progress?",
          a: "You get access to a client dashboard with project timeline, task checklist, shared documents and direct chat with the team.",
        },
        {
          q: "Can I migrate from an existing website?",
          a: "Yes, we help migrate content and, when possible, the SEO history of your current site to the new platform.",
        },
        {
          q: "How does the guarantee or refund work?",
          a: "If we identify that we can't deliver what was agreed in the proposal, we offer a refund proportional to what hasn't been delivered yet.",
        },
      ],
    },
  },
} as const;

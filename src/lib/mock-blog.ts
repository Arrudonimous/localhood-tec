export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTimeMinutes: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-completo-ecommerce-que-converte",
    title: "Guia Completo: Como Criar um E-commerce Que Converte",
    excerpt:
      "Os elementos essenciais de um e-commerce de alta conversão, do checkout à confiança visual.",
    category: "E-commerce",
    tags: ["e-commerce", "conversão", "ux"],
    author: "Equipe Sterk",
    date: "2026-08-05",
    readTimeMinutes: 7,
    content: [
      "Um e-commerce bem-sucedido vai muito além de ter produtos cadastrados e um botão de comprar. Cada etapa da jornada do cliente precisa ser pensada para reduzir atrito e aumentar a confiança.",
      "O checkout é o momento mais crítico: formulários longos, poucas opções de pagamento e falta de clareza sobre frete são os principais motivos de abandono de carrinho.",
      "Investir em fotos de qualidade, depoimentos reais e políticas de troca claras aumenta significativamente a taxa de conversão, especialmente para lojas novas que ainda não têm marca consolidada.",
      "Por fim, performance importa: cada segundo a mais de carregamento reduz a conversão. Otimizar imagens e usar um framework moderno como Next.js faz diferença real nos resultados.",
    ],
  },
  {
    slug: "tendencias-design-web-2026",
    title: "10 Tendências de Design Web para 2026",
    excerpt:
      "Do minimalismo funcional às microinterações, o que está definindo os melhores sites do ano.",
    category: "Design",
    tags: ["design", "tendências", "ui"],
    author: "Equipe Sterk",
    date: "2026-07-20",
    readTimeMinutes: 6,
    content: [
      "O design web em 2026 caminha para interfaces mais limpas, com tipografia forte e espaçamento generoso substituindo elementos decorativos desnecessários.",
      "Microinterações sutis — hover states, transições suaves, feedback visual imediato — continuam sendo um diferencial que separa sites amadores de sites profissionais.",
      "Dark mode deixou de ser tendência e virou expectativa padrão em produtos digitais, especialmente para marcas que buscam transmitir sofisticação.",
      "Acessibilidade também ganhou peso: contraste adequado e navegação por teclado não são mais opcionais, são parte do design responsável.",
    ],
  },
  {
    slug: "automacoes-que-aumentam-vendas",
    title: "Automações que Aumentam Vendas em 300%",
    excerpt:
      "Como fluxos automáticos de nutrição de leads e follow-up transformam visitantes em clientes.",
    category: "Automação",
    tags: ["automação", "vendas", "marketing"],
    author: "Equipe Sterk",
    date: "2026-06-10",
    readTimeMinutes: 8,
    content: [
      "A maioria dos leads não compra na primeira interação. Automações de email e WhatsApp mantêm o relacionamento aquecido sem exigir esforço manual da equipe de vendas.",
      "Um fluxo simples — obrigado, apresentação, case de sucesso, CTA para reunião — já é suficiente para recuperar boa parte dos leads que sairiam do funil.",
      "Integrar essas automações ao CRM permite priorizar quem está mais engajado, focando o tempo do time comercial em quem realmente tem intenção de compra.",
    ],
  },
  {
    slug: "como-escolher-agencia-para-seu-projeto",
    title: "Como Escolher a Agência Certa para Seu Projeto",
    excerpt:
      "Perguntas que você deve fazer antes de contratar uma agência de desenvolvimento web.",
    category: "Negócios",
    tags: ["negócios", "contratação", "processo"],
    author: "Equipe Sterk",
    date: "2026-05-02",
    readTimeMinutes: 5,
    content: [
      "Nem toda agência é igual. Antes de contratar, pergunte sobre o processo de trabalho, quem serão os responsáveis pelo seu projeto e como a comunicação vai acontecer.",
      "Peça exemplos reais de projetos entregues, de preferência no mesmo segmento ou com desafios parecidos com os seus.",
      "Desconfie de prazos muito curtos e preços muito abaixo do mercado — geralmente indicam corte de escopo ou qualidade que aparecerá depois da entrega.",
      "Por fim, avalie se existe um plano claro de suporte pós-entrega. Um site bom não termina no lançamento, ele continua evoluindo.",
    ],
  },
];

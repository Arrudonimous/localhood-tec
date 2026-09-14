export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  result: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Fernanda Costa",
    company: "Clínica Vida Plena",
    role: "Diretora",
    message:
      "A Sterk entendeu exatamente o que precisávamos. O site ficou elegante e o agendamento online mudou nossa operação.",
    rating: 5,
    result: "Aumentou agendamentos em 180%",
  },
  {
    id: "t2",
    name: "Rafael Mendes",
    company: "Loja Verde Orgânicos",
    role: "Fundador",
    message:
      "Processo transparente do início ao fim. A equipe entregou no prazo e o e-commerce vende muito mais que o esperado.",
    rating: 5,
    result: "Aumentou vendas online em 240%",
  },
  {
    id: "t3",
    name: "Juliana Alves",
    company: "FitPro",
    role: "CEO",
    message:
      "O app superou nossas expectativas. Suporte rápido e atencioso em cada etapa do desenvolvimento.",
    rating: 5,
    result: "12 mil downloads no primeiro mês",
  },
  {
    id: "t4",
    name: "Marcos Vidal",
    company: "Nexo Financeiro",
    role: "Sócio",
    message:
      "A automação eliminou horas de trabalho manual por semana. Recomendo a Sterk para qualquer negócio que queira escalar.",
    rating: 4,
    result: "Reduziu tempo operacional em 70%",
  },
  {
    id: "t5",
    name: "Patrícia Lima",
    company: "Studio Linha Arquitetura",
    role: "Arquiteta",
    message:
      "O portfolio ficou lindo e profissional. Já recebi vários elogios de clientes sobre o novo site.",
    rating: 5,
    result: "Dobrou pedidos de orçamento",
  },
  {
    id: "t6",
    name: "Bruno Tanaka",
    company: "Sabor Delivery",
    role: "Proprietário",
    message:
      "Equipe muito profissional. O app de delivery funcionou perfeitamente desde o primeiro dia no ar.",
    rating: 5,
    result: "Aumentou pedidos em 95%",
  },
];

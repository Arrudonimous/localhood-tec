# PROJECT_BRIEF — Sterk

Website institucional + painel de cliente para venda de websites, automações e sistemas.
Público-alvo: empresas no Brasil e nos EUA. Consolidado a partir de 3 documentos de referência
(`GUIA RAPIDO.pdf`, `PROMPTS CLAUDE CODE.pdf`, `projeto agencia tech.pdf`), com o nome de marca
atualizado de "Agência Tech" para **Sterk**.

## Visão geral

- **Objetivo**: plataforma de alta credibilidade que apresenta e vende serviços digitais, com
  atração automática de leads, conversão de moedas, tradução de idiomas e painel de acompanhamento
  para clientes.
- **Localizações**: Brasil (pt-BR) e EUA (en-US).
- **Tempo estimado**: 6-8 semanas de desenvolvimento full-time (40-50 dias).

## Pendências de negócio (resolver antes/durante as fases indicadas)

- [ ] Domínio definido e registrado (ex: sterk.com.br / sterk.com)
- [ ] Provider de email transacional (SendGrid / Resend / Mailtrap para dev)
- [ ] Contas de API: câmbio (exchangerate-api.com ou openexchangerates.org), geo IP (ipapi.co),
      CRM opcional (HubSpot/Pipedrive)
- [ ] Logo (ao menos placeholder)
- [ ] Copy revisado em pt-BR e traduzido para en-US
- [ ] 6-8 case studies / projetos de portfolio (podem ser mockados no início)
- [ ] 3-4 testimonials reais de clientes
- [ ] Estrutura de preços final validada
- [ ] Banco de dados escolhido (Postgres local vs Supabase free tier)
- [ ] Hosting definido (Vercel recomendado)

## Nota: primeiro usuário admin

Ainda não existe UI de convite/promoção de admin (fora de escopo até o Postgres/Prisma
entrarem no roteiro). Para acessar `/admin` em dev: registre uma conta normal em `/register`,
edite `data/users.json` trocando `"role": "client"` para `"role": "admin"` nesse usuário, e
faça login novamente (o JWT antigo não é revalidado automaticamente).

Nenhuma pendência acima bloqueia o Prompt 1 (setup técnico). Elas bloqueiam etapas específicas:
sem domínio não há deploy final; sem case studies o Portfolio fica só com dados mock; sem contas
de API o câmbio/geo ficam com fallback fixo.

## Identidade visual

| Token | Valor | Uso |
|---|---|---|
| Primária | `#0a0e27` | fundo principal (azul escuro/quase preto) |
| Secundária | `#1a1f3a` | cards, seções |
| Ouro | `#d4af37` | detalhes luxuosos, bordas, hover |
| Verde | `#00d084` | CTAs, status positivo |
| Texto | `#f5f5f5` | texto principal |
| Texto secundário | `#9ca3af` | texto de apoio |

- Tipografia: Inter (Bold para headers, Regular para body). Tamanhos: 14px body, 16px labels,
  24px subheaders, 48px+ headers.
- Princípios: espaçamento generoso, linhas minimalistas, animações suaves e não intrusivas,
  dark mode como padrão, nada infantil ou decorativo desnecessário.

## Stack técnica

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Formulários**: React Hook Form + Zod
- **Auth**: JWT + refresh tokens, bcrypt, cookies HttpOnly, middleware de proteção de rotas
- **Backend**: Next.js API Routes + Prisma ORM
- **Banco**: PostgreSQL (local ou Supabase free)
- **Email**: SendGrid (ou Resend/Mailtrap em dev)
- **Câmbio**: exchangerate-api.com, cache de 1h, fallback se API cair
- **Geolocalização**: ipapi.co (país → idioma/moeda padrão: BR→pt-BR/BRL, US→en-US/USD, outros→en-US/USD)
- **Deploy**: Vercel (frontend) + Cloudflare (CDN/DNS) + AWS RDS ou Supabase (DB)
- **Observability**: Sentry (erros) + Google Analytics 4
- **State**: Zustand ou Redux mínimo; React Query para data fetching

## Estrutura de pastas

```
sterk/
├─ public/{images,icons,fonts}/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx, page.tsx (home)
│  │  ├─ services/, portfolio/, how-it-works/, pricing/, blog/, contact/
│  │  ├─ login/, register/, forgot-password/, reset-password/[token]/
│  │  ├─ dashboard/ (projects/, project/[id]/, messages/, profile/, settings/)
│  │  ├─ admin/ (projects/, blog/, testimonials/)
│  │  └─ api/ (auth/, leads/, projects/, blog/)
│  ├─ components/ (Navigation, Hero, HowItWorks, Services, Portfolio, Testimonials, Pricing,
│  │  ContactForm, Footer, ...)
│  ├─ lib/ (auth.ts, db.ts, api.ts, currency.ts, utils.ts)
│  ├─ context/ (LocaleContext.tsx)
│  ├─ hooks/ (useLocale.ts, useAuth.ts, useProject.ts)
│  ├─ config/ (translations.ts, site-config.ts)
│  └─ styles/ (globals.css, variables.css)
├─ .env.example / .env.local
├─ package.json, tsconfig.json, tailwind.config.js, next.config.js, middleware.ts
└─ DATABASE_SCHEMA.sql
```

## Seções da homepage

1. Header — logo, nav (Serviços/Portfolio/Como Funciona/Planos/Blog/Contato), seletor idioma/moeda,
   botão "Acessar Painel".
2. Hero — headline "Websites e Automações que Geram Resultados", subheadline, stats (projetos,
   satisfação, anos), CTA primário/secundário.
3. Como Funciona — timeline interativa de 5 fases: Entendimento, Ideação & Proposta,
   Desenvolvimento, Implantação, Suporte & Crescimento.
4. Serviços por fase de crescimento: Fase 1 Serviços (websites, landing pages, e-commerce,
   sistemas, automação, integrações, manutenção), Fase 2 Produtos/SaaS (gestão, CRM, agendamento,
   automação de atendimento, IA), Fase 3 Escala (assinaturas, produtos próprios, marketplace, APIs,
   licenciamento, clientes internacionais).
5. Portfolio — grid com filtros (categoria/tecnologia/status), 6-8 projetos.
6. Testimonials — carousel de 6+ depoimentos com rating e resultado quantificável.
7. Planos — Startup ($2.990), Professional ($7.990, destaque popular), Enterprise (sob consulta).
8. FAQ — accordion de perguntas frequentes (prazo, pagamento, atendimento internacional, ajustes
   pós-entrega, suporte, diferença entre planos). Ver spec completa em "Prompt novo (FAQ)" abaixo.
9. Processo criativo (diferencial) — Descoberta, Estratégia, Design, Desenvolvimento, Otimização,
   Crescimento.
10. Por que nos escolher — 5-7 pontos com ícones.
11. Blog/Insights — 3 últimos posts, CMS-ready.
12. CTA final — "Solicitar Proposta Personalizada" / "Agendar Chamada de 20 Min".
13. Footer — 5 colunas (marca+social, serviços, empresa, legal, contato) + copyright.

## Painel de cliente (dashboard)

- Autenticação: login simples, JWT, sessions seguras, recuperação de senha, 2FA opcional.
- Home: boas-vindas, cards (projetos em andamento, fase atual, próxima reunião, msgs não lidas,
  plano contratado + renovação).
- Projeto individual: dados gerais, gerente de projeto, timeline de 5 fases com progresso,
  checklist de tarefas, seção "O que precisamos de você", documentos compartilhados.
- Comunicação: nível de suporte varia por plano (Startup=email 48h; Professional=chat + email
  prioritário 24h + 1 reunião mensal; Enterprise=Slack/Teams + reuniões semanais + resposta
  imediata).
- Relatórios/Analytics: visitantes, conversão, bounce rate, funil — exportável em PDF.
- Gerenciamento de acesso (Professional+): adicionar/remover membros do time, permissões, log.

## Schema de banco (referência)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR,
  name VARCHAR,
  company VARCHAR,
  phone VARCHAR,
  avatar_url VARCHAR,
  locale ENUM('pt-BR', 'en-US'),
  currency ENUM('BRL', 'USD'),
  plan ENUM('startup', 'professional', 'enterprise'),
  status ENUM('active', 'inactive', 'suspended'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  description TEXT,
  category ENUM('website', 'ecommerce', 'app', 'automation', 'system'),
  start_date DATE,
  end_date DATE,
  status ENUM('discovery', 'ideation', 'development', 'deployment', 'support'),
  progress_percentage INT,
  budget DECIMAL,
  project_manager_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE project_phases (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  phase_number INT,
  phase_name VARCHAR,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed'),
  due_date DATE,
  progress_percentage INT,
  created_at TIMESTAMP
);

CREATE TABLE project_tasks (
  id UUID PRIMARY KEY,
  phase_id UUID REFERENCES project_phases(id),
  title VARCHAR,
  description TEXT,
  assigned_to VARCHAR,
  status ENUM('pending', 'in_progress', 'completed', 'awaiting_client'),
  priority ENUM('low', 'medium', 'high'),
  due_date DATE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE project_documents (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  title VARCHAR,
  file_url VARCHAR,
  file_type ENUM('pdf', 'image', 'figma', 'spreadsheet', 'other'),
  uploaded_by VARCHAR,
  visibility ENUM('private', 'shared_with_client'),
  created_at TIMESTAMP
);

CREATE TABLE project_messages (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  sender_id UUID,
  sender_type ENUM('client', 'staff'),
  message TEXT,
  attachments VARCHAR[],
  read_by_client BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE leads (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  company VARCHAR,
  phone VARCHAR,
  service_interested ENUM('website', 'ecommerce', 'app', 'automation', 'other'),
  budget_range VARCHAR,
  message TEXT,
  source ENUM('form', 'google_ads', 'facebook_ads', 'organic'),
  status ENUM('new', 'contacted', 'qualified', 'converted', 'lost'),
  converted_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE,
  content TEXT,
  excerpt VARCHAR,
  category VARCHAR,
  tags VARCHAR[],
  author VARCHAR,
  featured_image_url VARCHAR,
  seo_meta_description VARCHAR,
  published BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY,
  client_name VARCHAR,
  client_company VARCHAR,
  client_role VARCHAR,
  client_photo_url VARCHAR,
  message TEXT,
  rating INT,
  result_achieved VARCHAR,
  featured BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE reset_tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token_hash VARCHAR NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Roteiro de execução (ordem única — sem duplicar prompts entre os 3 PDFs)

Regra dos próprios documentos: nunca rodar dois prompts em paralelo; sempre testar antes de avançar.

| # | Etapa | Prompt de origem | Critério de teste |
|---|---|---|---|
| 1 | Setup Next.js 14 + TS + Tailwind + design tokens | `PROMPTS CLAUDE CODE.pdf` → Prompt 1 | `npm run dev` sobe página em branco sem erro |
| 2 | Header/Navegação responsivo | `PROMPTS CLAUDE CODE.pdf` → Prompt 2 | Menu mobile abre/fecha, sticky ao scroll |
| 3 | Hero Section | `PROMPTS CLAUDE CODE.pdf` → Prompt 3 | Headline, stats e CTAs renderizam desktop/mobile |
| 4 | "Como Funciona" (timeline 5 fases) | `PROMPTS CLAUDE CODE.pdf` → Prompt 4 | Clicar em fase expande detalhes |
| 5 | Serviços (3 fases em cards) | `PROMPTS CLAUDE CODE.pdf` → Prompt 5 | Cards responsivos, hover funciona |
| 6 | Footer | `PROMPTS CLAUDE CODE.pdf` → Prompt 6 | Links e colunas corretos em mobile/desktop |
| 7 | Idiomas + Moedas (i18n, geo IP, câmbio) | `PROMPTS CLAUDE CODE.pdf` → Prompt 7 | Trocar idioma persiste após reload; preço converte |
| 8 | Formulário de Contato + Lead Capture (+ pop-up lead magnet) | `PROMPTS CLAUDE CODE.pdf` → Prompt 8 + `projeto agencia tech.pdf` → Prompt 12 (lead magnet) | Envio salva lead, dispara email de confirmação |
| 9 | Autenticação (login/registro/recuperação de senha) | `PROMPTS CLAUDE CODE.pdf` → Prompt 9 | Registro → login → rota protegida funciona; rate limit ativo |
| 10 | Dashboard do Cliente | `projeto agencia tech.pdf` → Prompt 10 | Login → dashboard mostra projeto mock com timeline |
| 11 | Portfolio (`/portfolio`) | `projeto agencia tech.pdf` → Prompt 6 | Grid com filtros por categoria/tecnologia funciona |
| 12 | Testimonials (carousel) | `projeto agencia tech.pdf` → Prompt 7 | Carousel avança automaticamente e com setas |
| 13 | Planos (`/pricing`) | `projeto agencia tech.pdf` → Prompt 8 | 3 planos exibidos, preço converte USD/BRL |
| 14 | FAQ (accordion de perguntas frequentes) | Novo — ver "Prompt novo (FAQ)" abaixo | Clicar numa pergunta expande a resposta; só uma aberta por vez |
| 15 | Blog + SEO (`/blog`) | `projeto agencia tech.pdf` → Prompt 13 | Listagem, post individual, meta tags e sitemap |
| 16 | Admin Panel (`/admin`) | `projeto agencia tech.pdf` → Prompt 14 | CRUD de projetos/blog/testimonials/leads funciona |
| 17 | SEO, performance e monitoring | `projeto agencia tech.pdf` → Prompt 15 | Lighthouse 90+, Sentry captura erro de teste |
| 18 | Deploy (Vercel + Cloudflare + SSL + domínio) | `GUIA RAPIDO.pdf` → seção "Deploy" | Site acessível via domínio final com HTTPS — **requer ação sua, ver abaixo** |

### Etapa 18 — o que precisa de você

Diferente das etapas anteriores, o deploy não pode ser feito pelo Claude Code sozinho: exige
conectar sua conta pessoal da Vercel, comprar/configurar um domínio real e mexer no DNS via
Cloudflare — tudo coisa que só você (dono da conta) pode autorizar. O que já foi preparado no
código:

- [x] `npm run build` passa limpo (validado a cada prompt)
- [x] Workflow de CI (`.github/workflows/ci.yml`) rodando `lint` + `build` a cada push/PR no
      GitHub, para pegar erro antes de qualquer deploy
- [x] `.env.example` documenta todas as variáveis de ambiente necessárias em produção

O que falta e depende de você:

1. Criar conta na [Vercel](https://vercel.com) (se ainda não tiver) e importar o repositório
   `Arrudonimous/sterk` do GitHub.
2. Configurar em Project Settings → Environment Variables da Vercel todas as chaves do
   `.env.example` com valores reais (especialmente `JWT_SECRET` com um valor forte e único —
   nunca reaproveitar o do `.env.local` de dev).
3. Registrar o domínio final (ex: sterk.com.br) em um registrador (Registro.br, Namecheap, etc).
4. Adicionar o domínio em Project Settings → Domains na Vercel e apontar o DNS para a Vercel
   (ou usar Cloudflare na frente como CDN, seguindo as instruções que a própria Vercel mostra
   ao adicionar o domínio).
5. A Vercel emite o certificado SSL automaticamente assim que o DNS propagar — não precisa
   configurar nada manualmente.
6. Trocar `url` em `src/config/site-config.ts` para o domínio final antes do primeiro deploy
   (hoje está com o placeholder `https://sterk.com.br`).

Depois desses passos, cada push na branch `master` faz deploy automático na Vercel.

### Prompt novo (FAQ)

Não existia nos 3 PDFs originais — adicionado ao roteiro por pedido do cliente. Spec pronta para
colar no Claude Code quando chegar a etapa 14:

> Crie uma seção de FAQ (Perguntas Frequentes) em formato accordion.
>
> Localização: `src/app/page.tsx` (adicionar após a seção de Planos). Componente:
> `src/components/FAQ.tsx`.
>
> Perguntas e respostas sugeridas (8-10 pares, pode ajustar o texto):
> 1. Quanto tempo leva para meu projeto ficar pronto?
> 2. Como funciona o pagamento (à vista, parcelado, por fase)?
> 3. Vocês atendem empresas fora do Brasil?
> 4. Preciso ter tudo pronto (conteúdo, logo, textos) antes de começar?
> 5. O que acontece se eu precisar de ajustes depois da entrega?
> 6. Vocês oferecem suporte e manutenção contínua?
> 7. Qual a diferença entre os planos Startup, Professional e Enterprise?
> 8. Como acompanho o andamento do meu projeto?
> 9. Posso migrar de um site que já existe?
> 10. Como funciona garantia ou reembolso?
>
> Design:
> - Headline "Perguntas Frequentes" (36px) + subheadline "Tire suas dúvidas antes de começar"
>   (16px, `#9ca3af`).
> - Cada item: pergunta em `#f5f5f5` (bold) com ícone +/− ou chevron que rotaciona ao abrir;
>   resposta em `#9ca3af`; borda inferior sutil (`#1a1f3a`) separando os itens.
> - Apenas uma pergunta expandida por vez, com animação de altura suave (Framer Motion).
> - Hover na pergunta muda a cor para `#d4af37` (ouro).
> - Background da seção `#0a0e27`, padding 80px vertical / 40px horizontal, max-width ~800px
>   centralizado.
> - Responsivo: mesma estrutura em accordion no mobile, sem necessidade de layout diferente.
>
> Teste: clicar em cada pergunta expande e recolhe corretamente; abrir uma fecha a anterior;
> funciona igual em mobile e desktop; sem erros de console.

## Fluxo de trabalho com Claude Code

1. Copiar o prompt da etapa da tabela acima (do PDF indicado, adaptando "Agência Tech" para "Sterk").
2. Colar no Claude Code e aguardar execução.
3. Testar em `http://localhost:3000` (layout, responsividade, console sem erros).
4. Se OK → próxima etapa. Se erro → descrever o erro e o componente para o Claude corrigir.
5. Commits sempre via `/commit` (nunca `git commit` direto), seguindo Conventional Commits.
6. Branches por etapa/feature: `feature/setup-inicial-nextjs`, `feature/header-navegacao`,
   `feature/auth-login-registro`, etc.

## Gate final antes de publicar ao público

Checklist completo validado em 14/09/2026 (ver histórico de commits `chore/prelaunch-checklist-fixes`
para o que foi corrigido nesta passada):

**Legal e conformidade**
1. [x] Política de privacidade — `/privacy`. **Revisar com um advogado antes de publicar de
       verdade** (conteúdo genérico, não é aconselhamento jurídico)
2. [x] Termos e condições — `/terms` (mesma ressalva acima)

**Segurança**
3. [x] Nenhum segredo exposto no frontend — `JWT_SECRET` só é lido em `lib/session.ts`,
       importado exclusivamente por rotas de API/middleware (nunca por client components);
       `.env.local` nunca foi commitado (só `.env.example` com placeholders)
4. [ ] HTTPS forçado em todas as rotas — depende do deploy; a Vercel força isso
       automaticamente, nada a fazer no código
5. [x] Banner de consentimento de cookies — `CookieConsentBanner.tsx`; Google Analytics só
       carrega depois do usuário aceitar (gate por `localStorage`)

**SEO e metadados**
6. [x] Meta titles + descriptions em todas as páginas (incluindo `/login`, `/register`,
       `/forgot-password`, `/reset-password` via layouts dedicados, já que são client components)
7. [x] Imagem de preview para redes sociais — `opengraph-image.tsx` (gerada dinamicamente,
       sem depender de asset externo)
8. [x] Favicon — `icon.tsx` (monograma "S" dourado gerado dinamicamente, branded)
9. [x] Sitemap.xml e robots.txt — `sitemap.ts` / `robots.ts`
10. [ ] Texto alternativo em imagens — **não aplicável ainda**: o site não usa `<img>`/`<Image>`
        reais, só gradientes/emoji/SVG como placeholder. Revisar assim que entrarem fotos reais.

**Performance**
11. [ ] Compressão de imagens — não aplicável pelo mesmo motivo do item 10
12. [ ] Velocidade de carregamento (Lighthouse) — não testado formalmente neste ambiente;
        bundle da home fica em ~175kB First Load JS, razoável, mas recomendo rodar
        PageSpeed Insights depois do deploy (build de produção real, não o dev server)

**Acessibilidade e UX**
13. [x] Contraste de cores — validado por cálculo de razão WCAG nas combinações principais
        (texto branco/dourado/verde sobre os fundos escuros), todas passam AA e a maioria AAA
14. [x] Responsivo mobile-first — testado em cada prompt do roteiro
15. [x] Página 404 customizada — `not-found.tsx`
16. [x] Sem links quebrados — corrigido nesta passada (menu/footer apontavam para
        `/services`, `/how-it-works`, `/about`, `/careers`, `/press`, `/cookies`, `/gdpr`,
        `/accessibility` sem essas rotas existirem; removido também um array `nav` morto em
        `site-config.ts` que carregava os mesmos hrefs quebrados sem ser usado em lugar nenhum)

**Formulários e robustez**
17. [x] Validação de formulários — React Hook Form + Zod (contato, registro) e validação
        nativa + Zod no servidor (login, forgot/reset password)
18. [x] Proteção contra spam — honeypot (campo `website` invisível) no formulário de contato,
        no pop-up de lead magnet e validado em `/api/leads`; testado enviando um payload de
        "bot" (recebe falso sucesso, nada é salvo) e um payload normal (salva normalmente)

**Métricas e conversão**
19. [x] Analytics configurado — Google Analytics (`GoogleAnalytics.tsx`), condicionado a
        `NEXT_PUBLIC_ENABLE_ANALYTICS=true` + `NEXT_PUBLIC_GA_ID` **e** ao consentimento de
        cookies do item 5
20. [x] CTA clara na página — "Solicitar Proposta" no Hero, repetida em Services/Pricing/Portfolio

**Pendências reais para revisar antes de ir ao ar:** itens 4 (automático no deploy), 10-12
(dependem de fotos reais e de um teste de Lighthouse pós-deploy).

## Troubleshooting comum

| Problema | Solução |
|---|---|
| `npm install` falha | Deletar `node_modules` e `package-lock.json`, rodar de novo |
| Porta 3000 em uso | Matar processo ou `npm run dev -- -p 3001` |
| Erro de conexão com banco | Checar `.env.local` e se o Postgres está rodando |
| Erros de TypeScript | `npm run build` para ver erros, corrigir em `src/types` |
| Imagens não carregam | Confirmar que estão em `public/` |
| Tailwind não aplica | Reiniciar `npm run dev` |
| CORS errors | Configurar headers em `next.config.js` |
| Email não envia | Checar `SENDGRID_API_KEY`, testar com mailtrap.io |

## Próximos passos após o MVP

1. Publicar 5-10 artigos de blog (SEO)
2. Campanhas Google Ads
3. Campanhas Meta Ads (Facebook/Instagram)
4. Email marketing automático
5. Integração com CRM (HubSpot/Pipedrive)
6. Chat ao vivo com suporte
7. Calendário de agendamento de demos
8. Programa de referência para clientes
9. Case studies em vídeo
10. Webinar sobre tendências digitais

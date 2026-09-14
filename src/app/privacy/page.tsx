import type { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade — Sterk",
  description: "Como a Sterk coleta, usa e protege seus dados pessoais.",
};

// Conteúdo genérico de referência — revisar com um advogado antes de publicar
// para o público (LGPD/GDPR variam por jurisdição e tipo de dado coletado).
export default function PrivacyPage() {
  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <article className="mx-auto max-w-2xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-text sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Última atualização: 14 de setembro de 2026
          </p>
        </div>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            1. Quais dados coletamos
          </h2>
          <p>
            Coletamos dados que você nos fornece diretamente (nome, email,
            telefone, empresa) ao preencher formulários de contato, criar
            uma conta ou solicitar uma proposta, além de dados de uso do
            site coletados automaticamente via cookies e ferramentas de
            analytics.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            2. Como usamos seus dados
          </h2>
          <p>
            Usamos seus dados para responder solicitações, prestar os
            serviços contratados, enviar comunicações relacionadas ao seu
            projeto e, quando autorizado, enviar conteúdo de marketing.
            Não vendemos seus dados a terceiros.
          </p>
        </section>

        <section id="cookies" className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            3. Cookies
          </h2>
          <p>
            Usamos cookies essenciais para o funcionamento do site (sessão,
            preferência de idioma/moeda) e, quando você autorizar, cookies
            de analytics para entender como o site é usado. Você pode
            gerenciar cookies nas configurações do seu navegador.
          </p>
        </section>

        <section id="gdpr" className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            4. Seus direitos (LGPD/GDPR)
          </h2>
          <p>
            Você pode solicitar acesso, correção, portabilidade ou exclusão
            dos seus dados pessoais a qualquer momento, entrando em contato
            pelo email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            . Se você está na União Europeia, seus direitos sob o GDPR são
            respeitados da mesma forma.
          </p>
        </section>

        <section id="accessibility" className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            5. Acessibilidade
          </h2>
          <p>
            Buscamos seguir boas práticas de acessibilidade (contraste
            adequado, navegação por teclado, textos alternativos em
            imagens). Se encontrar alguma barreira de acesso, avise-nos
            pelo email de contato.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">6. Contato</h2>
          <p>
            Dúvidas sobre esta política podem ser enviadas para{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}

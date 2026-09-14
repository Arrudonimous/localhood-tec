import type { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso — Sterk",
  description: "Termos e condições de uso do site e dos serviços da Sterk.",
};

// Conteúdo genérico de referência — revisar com um advogado antes de publicar
// para o público, especialmente as cláusulas de escopo/pagamento/garantia.
export default function TermsPage() {
  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <article className="mx-auto max-w-2xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-text sm:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Última atualização: 14 de setembro de 2026
          </p>
        </div>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">1. Aceitação</h2>
          <p>
            Ao usar este site ou contratar os serviços da {siteConfig.name},
            você concorda com estes Termos de Uso. Se não concordar, pedimos
            que não utilize o site ou os serviços.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            2. Serviços prestados
          </h2>
          <p>
            Prestamos serviços de desenvolvimento de websites, automações e
            sistemas sob demanda. O escopo, prazo e valor de cada projeto
            são definidos em proposta comercial específica, que prevalece
            sobre este documento em caso de conflito.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            3. Pagamento
          </h2>
          <p>
            As condições de pagamento (à vista ou parcelado por fase) são
            acordadas na proposta comercial. Atrasos podem impactar o
            cronograma de entrega do projeto.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            4. Propriedade intelectual
          </h2>
          <p>
            Após a quitação integral do projeto, o código-fonte e os
            materiais produzidos especificamente para o cliente são
            transferidos ao cliente, exceto bibliotecas e ferramentas de
            terceiros com licença própria.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            5. Garantia e suporte
          </h2>
          <p>
            Cada plano inclui um período de suporte pós-entrega conforme
            descrito na página de Planos. Ajustes fora desse período podem
            ser contratados separadamente.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">
            6. Limitação de responsabilidade
          </h2>
          <p>
            Não nos responsabilizamos por perdas indiretas decorrentes do
            uso do site ou sistema entregue, exceto nos casos previstos em
            lei ou expressamente acordados em contrato.
          </p>
        </section>

        <section className="space-y-3 text-text-secondary">
          <h2 className="text-lg font-bold text-text">7. Contato</h2>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para{" "}
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

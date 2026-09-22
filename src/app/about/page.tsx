import type { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: `Sobre Nós — ${siteConfig.name}`,
  description: `Conheça a ${siteConfig.name}, nosso time e como trabalhamos.`,
};

export default function AboutPage() {
  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl space-y-16">
        <section>
          <h1 className="text-3xl font-bold text-text sm:text-4xl">
            Sobre a {siteConfig.name}
          </h1>
          <p className="mt-4 text-text-secondary">
            Somos uma agência de tecnologia focada em criar websites,
            automações e sistemas sob medida para empresas no Brasil e nos
            EUA. Unimos estratégia, design e engenharia para entregar
            soluções que geram resultado real, não só um site bonito.
          </p>
        </section>

        {/* TODO: adicionar nomes reais e foto do time antes de considerar esta seção final */}
        <section id="team">
          <h2 className="text-xl font-bold text-text">Nosso Time</h2>
          <p className="mt-3 text-text-secondary">
            A LocalHood nasceu do encontro de duas trajetórias: uma do lado
            da estratégia, outra do lado da tecnologia. Quem cuida da
            estratégia pensa em como cada negócio local pode vender mais e
            se posicionar melhor. Quem cuida da tecnologia constrói o site,
            o sistema ou a automação que faz isso acontecer na prática.
          </p>
          <p className="mt-3 text-text-secondary">
            É um time pequeno, então cada projeto passa pelas duas cabeças,
            do primeiro contato até a entrega.
          </p>
        </section>

        <section id="careers">
          <h2 className="text-xl font-bold text-text">Vagas</h2>
          <p className="mt-3 text-text-secondary">
            No momento não temos vagas abertas, mas estamos sempre abertos a
            conhecer profissionais talentosos. Envie seu portfolio para{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>

        <section id="press">
          <h2 className="text-xl font-bold text-text">Imprensa</h2>
          <p className="mt-3 text-text-secondary">
            Para solicitações de imprensa, entre em contato pelo email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

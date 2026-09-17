import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/lib/mock-portfolio";
import { siteConfig } from "@/config/site-config";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = portfolioProjects.find((p) => p.slug === params.slug);
  return {
    title: project ? `${project.name} — ${siteConfig.name}` : `Projeto — ${siteConfig.name}`,
    description: project?.description,
  };
}

export default function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/portfolio"
          className="text-sm text-gold hover:underline"
        >
          ← Voltar para o Portfolio
        </Link>

        {project.image ? (
          <img
            src={project.image}
            alt={`Preview do site ${project.name}`}
            className="mt-6 aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          <div className="mt-6 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-primary text-text-secondary">
            {project.category}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text">{project.name}</h1>
          <span
            className={`text-sm font-semibold ${
              project.status === "Realizado"
                ? "text-green"
                : project.status === "Em Andamento"
                  ? "text-gold"
                  : "text-text-secondary"
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-text-secondary">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contato"
            className="inline-block rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            Quero um projeto assim
          </a>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md border-2 border-gold px-6 py-3 text-sm font-bold text-gold transition-colors duration-fast hover:bg-gold/10"
            >
              {project.linkLabel ?? "Ver site ao vivo ↗"}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

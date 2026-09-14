import Link from "next/link";
import { mockProjects } from "@/lib/mock-projects";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        Meus Projetos
      </h1>

      <div className="mt-8 space-y-4">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/project/${project.id}`}
            className="block rounded-lg border border-secondary bg-secondary p-6 transition-colors duration-fast hover:border-gold"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-bold text-text">{project.name}</p>
                <p className="text-sm text-text-secondary">
                  {project.category} · Gerente: {project.projectManager}
                </p>
              </div>
              <p className="text-sm font-semibold text-gold">
                {project.progress}% concluído
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  category: string;
  progress: number;
  projectManager: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data.projects ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">Projetos</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Visão geral dos projetos de clientes (dados mockados até o Postgres
        entrar no roteiro — ver PROJECT_BRIEF).
      </p>

      {loading ? (
        <p className="mt-6 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded-md bg-secondary p-4">
              <p className="font-semibold text-text">{project.name}</p>
              <p className="text-xs text-text-secondary">
                {project.category} · Gerente: {project.projectManager}
              </p>
              <p className="mt-1 text-xs font-semibold text-gold">
                {project.progress}% concluído
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { mockProjects, getUnreadMessagesCount } from "@/lib/mock-projects";

export default function DashboardPage() {
  const { user } = useAuth();
  const project = mockProjects[0];
  const currentPhase = project?.phases.find((p) => p.status === "in_progress");
  const unread = getUnreadMessagesCount();

  const stats = [
    { label: "Projetos em andamento", value: mockProjects.length },
    { label: "Fase atual", value: currentPhase?.name ?? "-" },
    { label: "Próxima reunião", value: project?.nextMeeting ?? "-" },
    { label: "Mensagens não lidas", value: unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        Bem-vindo, {user?.name ?? "..."}!
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-secondary bg-secondary p-5"
          >
            <p className="text-xs text-text-secondary">{stat.label}</p>
            <p className="mt-2 text-xl font-bold text-text">{stat.value}</p>
          </div>
        ))}
      </div>

      {project ? (
        <div className="mt-8 rounded-lg border border-gold bg-secondary p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-text-secondary">Plano contratado</p>
              <p className="text-lg font-bold text-text">Professional</p>
              <p className="text-xs text-text-secondary">
                Renovação em 15/12/2026
              </p>
            </div>
            <Link
              href={`/dashboard/project/${project.id}`}
              className="rounded-md bg-green px-4 py-2 text-center text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
            >
              Ver Projeto Atual
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-secondary bg-secondary p-6 text-center">
          <p className="text-text-secondary">
            Você ainda não tem nenhum projeto em andamento.
          </p>
        </div>
      )}
    </div>
  );
}

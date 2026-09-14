import { notFound } from "next/navigation";
import { mockProjects, type MockTask } from "@/lib/mock-projects";

const statusIcon: Record<MockTask["status"], string> = {
  completed: "✓",
  in_progress: "◐",
  pending: "○",
  awaiting_client: "⚠",
};

const phaseStatusStyle: Record<string, string> = {
  completed: "border-green text-green",
  in_progress: "border-gold text-gold",
  pending: "border-border text-text-secondary",
};

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = mockProjects.find((p) => p.id === params.id);
  if (!project) notFound();

  const awaitingClient = project.tasks.filter(
    (task) => task.status === "awaiting_client",
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        {project.name}
      </h1>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-secondary">
        <span>Início: {project.startDate}</span>
        <span>Previsão: {project.endDate}</span>
        <span>Gerente: {project.projectManager}</span>
      </div>

      <h2 className="mt-10 text-lg font-bold text-text">Timeline</h2>
      <div className="mt-4 space-y-3">
        {project.phases.map((phase) => (
          <div
            key={phase.number}
            className={`flex items-center justify-between rounded-md border-l-4 bg-secondary p-4 ${phaseStatusStyle[phase.status]}`}
          >
            <div>
              <p className="text-sm font-semibold text-text">
                Fase {phase.number}: {phase.name}
              </p>
            </div>
            <p className="text-sm text-text-secondary">
              {phase.status === "completed"
                ? "Concluído"
                : phase.status === "in_progress"
                  ? `${phase.progress}%`
                  : "Aguardando"}
            </p>
          </div>
        ))}
      </div>

      {awaitingClient.length > 0 && (
        <div className="mt-10 rounded-md border border-gold bg-secondary p-5">
          <h2 className="text-sm font-bold text-gold">
            O que precisamos de você
          </h2>
          <ul className="mt-3 space-y-2">
            {awaitingClient.map((task) => (
              <li key={task.id} className="text-sm text-text">
                {task.title}
                {task.dueDate && (
                  <span className="text-text-secondary">
                    {" "}
                    · prazo {task.dueDate}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-text">Checklist de Tarefas</h2>
      <ul className="mt-4 space-y-2">
        {project.tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 rounded-md bg-secondary px-4 py-3 text-sm"
          >
            <span className="text-gold">{statusIcon[task.status]}</span>
            <span className="text-text">{task.title}</span>
            {task.assignedTo && (
              <span className="ml-auto text-xs text-text-secondary">
                {task.assignedTo}
              </span>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-bold text-text">
        Documentos Compartilhados
      </h2>
      <ul className="mt-4 space-y-2">
        {project.documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center justify-between rounded-md bg-secondary px-4 py-3 text-sm text-text"
          >
            <span>{doc.title}</span>
            <span className="text-xs uppercase text-text-secondary">
              {doc.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

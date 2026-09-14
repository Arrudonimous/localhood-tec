export interface MockPhase {
  number: number;
  name: string;
  status: "completed" | "in_progress" | "pending";
  progress: number;
}

export interface MockTask {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "pending" | "awaiting_client";
  assignedTo?: string;
  dueDate?: string;
}

export interface MockDocument {
  id: string;
  title: string;
  type: "pdf" | "figma" | "spreadsheet" | "other";
}

export interface MockProject {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  progress: number;
  phases: MockPhase[];
  tasks: MockTask[];
  documents: MockDocument[];
  nextMeeting: string;
}

export const mockProjects: MockProject[] = [
  {
    id: "proj-1",
    name: "Website Institucional",
    category: "Website",
    startDate: "2026-08-01",
    endDate: "2026-10-15",
    projectManager: "Ana Ribeiro",
    progress: 65,
    nextMeeting: "2026-09-20 às 14h",
    phases: [
      { number: 1, name: "Entendimento", status: "completed", progress: 100 },
      { number: 2, name: "Ideação & Proposta", status: "completed", progress: 100 },
      { number: 3, name: "Desenvolvimento", status: "in_progress", progress: 65 },
      { number: 4, name: "Implantação", status: "pending", progress: 0 },
      { number: 5, name: "Suporte", status: "pending", progress: 0 },
    ],
    tasks: [
      { id: "t1", title: "Design da homepage aprovado", status: "completed" },
      { id: "t2", title: "Database schema definido", status: "completed" },
      {
        id: "t3",
        title: "Desenvolvimento das páginas de produto",
        status: "in_progress",
        assignedTo: "João Silva",
        dueDate: "2026-09-25",
      },
      {
        id: "t4",
        title: "Aprovação do mockup da página de contato",
        status: "awaiting_client",
        dueDate: "2026-09-18",
      },
      { id: "t5", title: "Testes de carga", status: "pending" },
      { id: "t6", title: "Deploy em produção", status: "pending" },
    ],
    documents: [
      { id: "d1", title: "Briefing do projeto", type: "pdf" },
      { id: "d2", title: "Wireframes", type: "figma" },
      { id: "d3", title: "Relatório de progresso - Agosto", type: "pdf" },
    ],
  },
];

export function getUnreadMessagesCount() {
  return 2;
}

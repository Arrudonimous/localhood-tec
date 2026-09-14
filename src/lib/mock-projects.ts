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

export const mockProjects: MockProject[] = [];

export function getUnreadMessagesCount() {
  return 0;
}

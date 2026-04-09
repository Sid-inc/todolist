export interface TodoItem {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export type CreateTodoRequest = {
  title: string;
  description?: string | null;
}

export type UpdateTodRequest = {
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
}

import type { TodoColor } from "~/enums/todoColor";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  color: TodoColor;
}

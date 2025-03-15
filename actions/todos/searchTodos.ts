import actions from "..";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  color: string;
}

export async function searchTodos(query: string) {
  await actions.todos.fetchTodos(query);
}

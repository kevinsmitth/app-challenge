import actions from "..";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  color: string;
}

export async function createTodo(todo: Todo) {
  await usePost("api/todos", { body: todo });

  await actions.todos.fetchTodos();
}

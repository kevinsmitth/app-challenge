import actions from "..";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  color: string;
}

export async function updateTodo(todo: Todo) {
  await usePut(`api/todos/${todo.id}`, { body: todo });

  await actions.todos.fetchTodos();
}

import actions from "..";

export async function deleteTodo(id: number) {
  await useDelete(`api/todos/${id}`);
  await actions.todos.fetchTodos();
}

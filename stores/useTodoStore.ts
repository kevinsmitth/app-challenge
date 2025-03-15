import type { Todo } from "~~/types/todo";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);
  const favorites = ref<Todo[]>([]);
  const setTodos = (newTodos: Todo[]) => (todos.value = newTodos);
  const setFavorites = (newFavorites: Todo[]) =>
    (favorites.value = newFavorites);

  return { todos, favorites, setTodos, setFavorites };
});

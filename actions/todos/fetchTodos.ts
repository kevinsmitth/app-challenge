export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  color: string;
}

export async function fetchTodos(query: string = "") {
  const todos = await useGet("api/todos/search?favorite=0&" + query);

  useTodoStore().setTodos(todos.data.value as Todo[]);

  const favorites = await useGet("api/todos/search?favorite=1&" + query);

  useTodoStore().setFavorites(favorites.data.value as Todo[]);
}

import { Todo } from "../types/Todo";
import { CreatedTodo } from "../types/createTodo";
import { buildTree } from "../utils/createNestedArr";

const BASE_URL = "http://localhost:4000";

export const getTodos = async () => {
  const fetchUrl = `${BASE_URL}/api/todos`;

  try {
    const response = await fetch(fetchUrl);
    let data = await response.json();
    data.sort((a: Todo, b: Todo) => a.id - b.id);
    const tree = buildTree(data, null);

    return tree;
  } catch {
    throw new Error("bad request");
  }
};

export const addTodoToServer = async (todo: CreatedTodo) => {
  const fetchUrl = `${BASE_URL}/api/todos`;

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    });

    const data = await response.json();

    return data;
  } catch {
    throw new Error("bad request");
  }
};

export const updateTodoOnServer = async (
  id: number,
  completed: boolean,
  title: string
) => {
  const fetchUrl = `${BASE_URL}/api/todos/${id}`;
  const update = {
    title,
    completed,
  };
  try {
    const response = await fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(update),
    });

    const data = await response.json();

    return data;
  } catch {
    throw new Error("bad request");
  }
};

export const deleteTodoOnServer = async (id: number) => {
  const fetchUrl = `${BASE_URL}/api/todos/${id}`;
  try {
    await fetch(fetchUrl, {
      method: "DELETE",
    });
  } catch {
    throw new Error("bad request");
  }
};

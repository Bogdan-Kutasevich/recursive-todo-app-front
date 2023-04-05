import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  addTodoToServer,
  deleteTodoOnServer,
  getTodos,
  updateTodoOnServer,
} from "./api/api";
import { Todo } from "./types/Todo";
import { TodosList } from "./components/TodosList/TodosList";
import { Header } from "./components/Header/Header";
import { ErrorNotification } from "./components/ErrorNotification/ErrorNotification";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTodosFromServer = async () => {
    try {
      setIsLoading(true);
      const data = await getTodos();
      setTodos(data);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (parentId: number | null, title: string) => {
    try {
      await addTodoToServer({ parentId, title });
      await getTodosFromServer();
    } catch {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: number, completed: boolean, title: string) => {
    try {
      await updateTodoOnServer(id, completed, title);
      await getTodosFromServer();
    } catch {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    let deletedTodos = todos.find((todo) => todo.id === id) || null;

    if (deletedTodos === null) {
      const findTodo = (subTodos: Todo[]) => {
        for (let todo of subTodos) {
          if (todo.id === id) {
            deletedTodos = todo;
          } else {
          }
          if (Array.isArray(todo.children)) {
            findTodo(todo.children);
          }
        }
      };
      findTodo(todos);
    }

    const ids: number[] = [id];

    function getDeletedIds(todo: Todo | null) {
      if (todo === null) {
        return;
      }

      if (todo.children) {
        for (let values of todo.children) {
          if (Array.isArray(values.children)) {
            ids.push(values.id);
            getDeletedIds(values);
          } else {
            ids.push(values.id);
          }
        }
      }
    }

    getDeletedIds(deletedTodos);

    try {
      for (const id of ids) {
        await deleteTodoOnServer(id);
      }

      await getTodosFromServer();
    } catch {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const removeError = () => {
    setIsError(false);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <div className="app">
      <Header addTodo={addTodo} isLoading={isLoading} />
      <div className="app__container">
        <TodosList
          todos={todos}
          addTodo={addTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
      {!todos.length && <span className="no-task">No tasks yet</span>}
      {isError && <ErrorNotification removeError={removeError} />}
    </div>
  );
};

export default App;

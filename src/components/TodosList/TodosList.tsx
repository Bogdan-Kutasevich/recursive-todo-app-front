import React from "react";
import { Todo } from "../../types/Todo";
import { TodosChildren } from "../TodosChildren/TodosChildren";

type Props = {
  todos: Todo[];
  addTodo: (parentId: number | null, title: string) => void;
  updateTodo: (id: number, completed: boolean, title: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodosList: React.FC<Props> = ({
  todos,
  addTodo,
  updateTodo,
  deleteTodo,
}) => (
  <>
    {todos.map((todo) => (
      <TodosChildren
        todo={todo}
        key={todo.id}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </>
);

import React, { useState } from "react";
import { Todo } from "../../types/Todo";
import "./TodosChildren.scss";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import cn from "classnames";

type Props = {
  todo: Todo;
  addTodo: (parentId: number | null, title: string) => void;
  updateTodo: (id: number, completed: boolean, title: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodosChildren: React.FC<Props> = ({
  todo,
  addTodo,
  updateTodo,
  deleteTodo,
}) => {
  const [isSubTodosVisible, setIsSubTodosVisible] = useState(false);
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const expandTodos = () => {
    setIsSubTodosVisible(!isSubTodosVisible);
  };

  const editTodo = (id: number) => {
    setIsTodoEditing(false);
    updateTodo(id, false, editValue);
  };

  const completeTodo = (id: number, title: string, completed: boolean) => {
    updateTodo(id, completed, title);
  };

  return (
    <div className="todos">
      <div className="todos__container">
        {isTodoEditing ? (
          <div className="add-sub__form">
            <input
              className="input is-small is-primary"
              type="text"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
            />
            <button
              className="button is-small is-primary is-light is-outlined"
              onClick={() => {
                editTodo(todo.id);
              }}
            >
              Done
            </button>
            <button
              className="button is-small is-danger is-light is-outlined"
              onClick={() => setIsTodoEditing(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div
              className={cn("todos__main", {
                "todos__main--completed": todo.completed,
              })}
              onClick={expandTodos}
            >
              <span className="material-icons">noise_control_off</span>
              <span className="todos__title">{todo.title}</span>
              <span className="material-icons">chevron_right</span>
            </div>
            <div className="todos__buttons">
              <button
                className={cn("button is-small is-info is-rounded", {
                  "is-light ": !todo.completed,
                })}
                onClick={() =>
                  completeTodo(todo.id, todo.title, !todo.completed)
                }
              >
                <span className="material-icons">done</span>
              </button>
              <button
                className="button is-small is-success is-light is-rounded"
                onClick={() => {
                  setEditValue(todo.title);
                  setIsTodoEditing(true);
                }}
              >
                <span className="material-icons">edit</span>
              </button>
              <button
                className="button is-small is-danger is-light is-rounded"
                onClick={() => deleteTodo(todo.id)}
              >
                <span className="material-icons">clear</span>
              </button>
            </div>
          </>
        )}
      </div>

      {isSubTodosVisible ? (
        todo?.children?.map((child) => {
          return (
            <React.Fragment key={child.id}>
              <div className="todos__sub">
                <TodosChildren
                  todo={child}
                  addTodo={addTodo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                />
              </div>
              <hr />
            </React.Fragment>
          );
        })
      ) : (
        <></>
      )}

      {isSubTodosVisible && <CreateTodo addTodo={addTodo} todoId={todo.id} />}
    </div>
  );
};

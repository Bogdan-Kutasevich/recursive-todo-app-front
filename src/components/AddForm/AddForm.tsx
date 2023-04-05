import React, { useState } from "react";
import "./AddForm.scss";

type Props = {
  addTodo: (parentId: number | null, title: string) => void;
  todoId: number | null;
  openForm: () => void;
};

export const AddForm: React.FC<Props> = ({ addTodo, todoId, openForm }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="add-sub__form">
      <input
        className="input is-small is-primary"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className="button is-small is-primary is-light is-outlined"
        onClick={() => {
          addTodo(todoId, inputValue);
          openForm();
        }}
      >
        Add task
      </button>
      <button
        className="button is-small is-danger is-light is-outlined"
        onClick={openForm}
      >
        Close
      </button>
    </div>
  );
};

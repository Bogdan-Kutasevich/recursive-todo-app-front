import React, { useState } from "react";
import "./CreateTodo.scss";
import { AddForm } from "../AddForm/AddForm";

type Props = {
  addTodo: (parentId: number | null, title: string) => void;
  todoId: number | null;
};

export const CreateTodo: React.FC<Props> = ({ addTodo, todoId }) => {
  const [isFormVisible, setIsFromVisible] = useState(false);

  const openForm = () => {
    setIsFromVisible(!isFormVisible);
  };

  return (
    <div className="add-sub">
      {!isFormVisible ? (
        <button
          className="button is-small add-sub__open-form add-sub__click"
          onClick={openForm}
        >
          <span>Click to add</span>
          <span className="material-icons">add</span>
        </button>
      ) : (
        <AddForm openForm={openForm} addTodo={addTodo} todoId={todoId} />
      )}
    </div>
  );
};

import React from "react";
import "./Header.scss";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import { Loader } from "../Loader";

type Props = {
  addTodo: (parentId: number | null, title: string) => void;
  isLoading: boolean;
};

export const Header: React.FC<Props> = ({ addTodo, isLoading }) => {
  return (
    <header className="header">
      <h1 className="header__title">Task List</h1>
      <CreateTodo addTodo={addTodo} todoId={null} />
      {isLoading && <Loader />}
    </header>
  );
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  parentId: number | null;
  children?: Todo[];
};

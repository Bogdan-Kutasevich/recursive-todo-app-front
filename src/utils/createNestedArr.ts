import { Todo } from "../types/Todo";

export const buildTree = (items: Todo[], parent: number | null) => {
  parent = parent || null;
  const result: Todo[] = [];

  items.forEach((item) => {
    if (item.parentId === parent) {
      result.push(item);
      item.children = buildTree(items, item.id);

      if (!item.children.length) {
        delete item.children;
      }
    }
  });

  return result;
};

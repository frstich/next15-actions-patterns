"use client";

import { toggleTodoAction, deleteTodoAction } from "@/app/_actions";
import { Todo } from "@/lib/todos";
import { useTransition } from "react";

export function TodoItemWithUseTransition({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();
  return (
    <form className="flex items-center space-x-2 mb-2">
      <input type="hidden" name="todoId" value={todo.id} />
      <button
        type="submit"
        className={`px-2 py-1 flex-1 text-left cursor-pointer disabled:text-gray-400 ${
          todo.completed ? "line-through" : ""
        }`}
        disabled={isPending}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          startTransition(() => {
            const data = new FormData();
            data.append("todoId", todo.id);
            toggleTodoAction(data);
          });
        }}
      >
        {todo.title}
      </button>
      <div className="flex items-center">
        <button
          type="submit"
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 disabled:bg-gray-400"
          disabled={isPending}
          onClick={(e) =>
            startTransition(() => {
              startTransition(() => {
                const data = new FormData();
                data.append("todoId", todo.id);
                deleteTodoAction(data);
              });
            })
          }
        >
          Delete
        </button>
      </div>
    </form>
  );
}

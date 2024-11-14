"use client";

import { deleteTodoAction, toggleTodoAction } from "@/app/_actions";
import { Todo } from "@/lib/todos";
import { useTransition } from "react";


export function TodoItemClient({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center space-x-2 mb-2">
      <span
        className={`text-white flex-1 cursor-pointer ${todo.completed ? "line-through" : ""
          }`}
        onClick={() =>
          startTransition(() =>
            toggleTodoAction(
              {
                todoId: todo.id,
                path: "/native-client-form"
              }
            )
          )
        }
      >
        {todo.title}
      </span>
      <div className="flex items-center">
        <button
          disabled={isPending}
          className={`px-2 py-1 ml-2 text-white rounded ${isPending ? "bg-gray-400" : "bg-red-500"
            }`}
          onClick={() =>
            startTransition(() =>
              deleteTodoAction(
                {
                  todoId: todo.id,
                  path: "/native-client-form"
                }
              )
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

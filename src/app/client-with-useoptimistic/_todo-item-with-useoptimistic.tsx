"use client";

import { toggleTodoAction, deleteTodoAction } from "@/app/_actions";
import { useOptimistic, useTransition } from "react";
import {
  OptimisticActionType,
  TodoIntent,
} from "./_todo-app-with-useoptimistic";

export function TodoItemWithUseOptimistic({
  todo,
  onOptimisticDelete,
}: {
  todo: TodoIntent;
  onOptimisticDelete: (action: {
    type: OptimisticActionType;
    todo: TodoIntent;
  }) => void;
}) {
  const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(
    todo,
    (state: TodoIntent, completed: boolean) => ({ ...state, completed })
  );
  const [isPending, startTransition] = useTransition();

  async function handleOnUpdate() {
    startTransition(async () => {
      toggleOptimisticTodo(!todo.completed);
      const data = new FormData();
      if (todo.id) {
        data.append("todoId", todo.id);
      }
      await toggleTodoAction(data);
    });
  }

  return (
    <div className="flex items-center space-x-2 mb-2">
      <button
        type="submit"
        className={`px-2 py-1 flex-1 text-left cursor-pointer disabled:text-gray-400 ${
          optimisticTodo.completed ? "line-through" : ""
        }`}
        disabled={isPending}
        onClick={handleOnUpdate}
      >
        {todo.title}
      </button>
      <div className="flex items-center">
        <button
          type="submit"
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 disabled:bg-gray-400"
          onClick={() => {
            startTransition(async () => {
              onOptimisticDelete({
                type: OptimisticActionType.DELETE_TODO,
                todo,
              });
              const data = new FormData();
              if (todo.id) {
                data.append("todoId", todo.id);
              }
              await deleteTodoAction(data);
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

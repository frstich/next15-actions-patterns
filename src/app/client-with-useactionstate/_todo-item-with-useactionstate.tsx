"use client";

import { toggleTodoClientAction, deleteTodoClientAction } from "@/app/_actions";
import { Todo } from "@/lib/todos";
import { useActionState } from "react";

function TodoUpdateForm({ todo }: { todo: Todo }) {
  const [_, formAction, isPending] = useActionState(toggleTodoClientAction, {
    message: "",
    success: false,
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="todoId" value={todo.id} />
      <button
        disabled={isPending}
        className={`px-2 py-1 flex-1 text-left cursor-pointer disabled:text-gray-500 ${
          todo.completed ? "line-through" : ""
        }`}
      >
        {todo.title}
      </button>
    </form>
  );
}

function TodoDeleteForm({ todo }: { todo: Todo }) {
  const [_, formAction, isPending] = useActionState(deleteTodoClientAction, {
    message: "",
    success: false,
  });
  return (
    <form action={formAction}>
      <input type="hidden" name="todoId" value={todo.id} />
      <button
        disabled={isPending}
        className="px-2 py-1 ml-2 text-white rounded bg-red-500 disabled:bg-gray-400"
      >
        Delete
      </button>
    </form>
  );
}

export function TodoItemWithUseActionState({ todo }: { todo: Todo }) {
  return (
    <div className="flex justify-between items-center space-x-2 mb-2">
      <TodoUpdateForm todo={todo} />
      <TodoDeleteForm todo={todo} />
    </div>
  );
}

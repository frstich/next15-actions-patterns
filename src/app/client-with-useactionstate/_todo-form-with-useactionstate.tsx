"use client";

import { addTodoClientAction } from "@/app/_actions";
import { useActionState } from "react";

export function TodoAddFormWithUseActionState() {
  const [state, formAction, isPending] = useActionState(addTodoClientAction, {
    message: "",
    success: false,
  });

  return (
    <>
      <form action={formAction} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          name="title"
          className="border rounded px-2 py-1 flex-1 text-black"
          required
          min="1"
          max="50"
          placeholder="Add a new todo"
          autoFocus
        />
        <button
          disabled={isPending}
          className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-gray-400"
        >
          Add
        </button>
      </form>
      {state.message && (
        <span
          className={`text-sm ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </span>
      )}
    </>
  );
}

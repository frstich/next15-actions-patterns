"use client";

import {
  OptimisticActionType,
  TodoIntent,
} from "./_todo-app-with-useoptimistic";
import { Todo } from "@/lib/todos";
import { useRef } from "react";

export function TodoFormWitUseOptimistic({
  onSubmit,
  action,
}: {
  onSubmit: (action: { type: OptimisticActionType; todo: TodoIntent }) => void;
  action: (data: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // TODO: HANDLE ERRORS
  async function submitForm(data: FormData) {
    const todo: TodoIntent = {
      id: `optimistic_${Math.random()}`,
      title: data.get("title") as string,
      completed: false,
    };
    if (formRef.current) formRef.current.reset();
    onSubmit({
      type: OptimisticActionType.ADD_TODO,
      todo,
    });
    data.append("completed", todo.completed.toString());
    await action(data);
  }

  return (
    <form
      ref={formRef}
      action={submitForm}
      className="flex items-center space-x-2 mb-4"
    >
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
        type="submit"
        className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-gray-400"
      >
        Add
      </button>
    </form>
  );
}

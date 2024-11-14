"use client";

import { addTodoAction } from "@/app/_actions";
import { useRef, useState, useTransition } from "react";

export function TodoFormWithUseTransition() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setFormState] = useState<{ message: string; success: boolean }>(
    {
      message: "",
      success: false,
    }
  );
  const [isPending, startTransition] = useTransition();

  async function action(data: FormData) {
    startTransition(async () => {
      try {
        await addTodoAction(data);
        formRef.current?.reset();
        setFormState({
          message: "Todo added",
          success: true,
        });
      } catch (error) {
        setFormState({
          message: "Failed to add todo",
          success: false,
        });
      }
    });
  }

  return (
    <form action={action} className="flex items-center space-x-2 mb-4">
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
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add"}
      </button>
      {state.message && (
        <span
          className={`text-sm ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </span>
      )}
    </form>
  );
}

"use client";

import { addTodoAction } from "@/app/_actions";
import { useActionState } from "react";

async function action(
  prevState: { success: boolean; error?: string },
  data: FormData
) {
  const title = data.get("title");

  if (!title || typeof title !== "string") {
    return {
      success: false,
      error: "Title is required"
    };
  }

  await addTodoAction(
    {
      title,
      path: "/native-client-form"
    }
  );
  return { success: true };
}

export function TodoClientForm() {
  const [state, formAction, isPending] = useActionState(action, { success: false });

  return (
    <>
      <form
        action={formAction}
        className="flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          name="title"
          className="border rounded px-2 py-1 flex-1 text-black"
        />
        <button
          className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-slate-400 "
          disabled={isPending}
        >
          Add
        </button>
      </form>
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && <p className="text-green-500">Todo added successfully</p>}
    </>
  );
}
import { useId } from "react";
import { addTodoAction } from "@/app/only-server/_actions";

export function TodoOnlyServerForm() {
  return (
    <form
      action={addTodoAction}
      key={useId()}
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

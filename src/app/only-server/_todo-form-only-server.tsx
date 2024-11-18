import { addTodoAction } from "@/app/_actions";

export function TodoOnlyServerForm() {
  return (
    <form action={addTodoAction} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        name="title"
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md      text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        required
        aria-required="true"
        minLength={1}
        maxLength={50}
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

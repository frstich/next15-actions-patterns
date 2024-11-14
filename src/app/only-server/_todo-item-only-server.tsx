import { deleteTodoAction, toggleTodoAction } from "@/app/actions";
import { Todo } from "@/lib/todos";

export function TodoItemOnlyServer({ todo }: { todo: Todo }) {

  return (
    <form className="flex items-center space-x-2 mb-2">
      <input type="hidden" name="id" value={todo.id} />
      <button
        type="submit"
        className={`px-2 py-1 flex-1 text-left cursor-pointer ${todo.completed ? "line-through" : ""}`}
        formAction={toggleTodoAction}
      >
        {todo.title}
      </button>
      <div className="flex items-center">
        <button
          type="submit"
          className="px-2 py-1 ml-2 text-white rounded bg-red-500"
          formAction={deleteTodoAction}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

import { deleteTodoAction, toggleTodoAction } from "@/app/_actions";
import { Todo } from "@/lib/todos";

export function TodoItemServer({ todo }: { todo: Todo }) {

  return (
    <form className="flex items-center space-x-2 mb-2">
      <button
        className={`px-2 py-1 flex-1 text-left cursor-pointer ${todo.completed ? "line-through" : ""}`}
        formAction={async () => {
          "use server"
          await toggleTodoAction({
            todoId: todo.id,
            path: "/native-server-form"
          })
        }}
      >
        {todo.title}
      </button>
      <div className="flex items-center">
        <button
          className="px-2 py-1 ml-2 text-white rounded bg-red-500"
          formAction={async () => {
            "use server"
            await deleteTodoAction({
              todoId: todo.id,
              path: "/native-server-form"
            })
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

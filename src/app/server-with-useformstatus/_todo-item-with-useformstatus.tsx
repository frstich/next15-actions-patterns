import { deleteTodoAction, toggleTodoAction } from "@/app/_actions";
import { ButtonFormStatus } from "@/app/server-with-useformstatus/_button-form-status";
import { Todo } from "@/lib/todos";

export function TodoItemWithUseFormStatus({ todo }: { todo: Todo }) {
  return (
    <form className="flex items-center space-x-2 mb-2">
      <input type="hidden" name="todoId" value={todo.id} />
      <ButtonFormStatus
        className={`px-2 py-1 flex-1 text-left cursor-pointer disabled:text-gray-500 ${
          todo.completed ? "line-through" : ""
        }`}
        formAction={toggleTodoAction}
      >
        {todo.title}
      </ButtonFormStatus>
      <div className="flex items-center">
        <ButtonFormStatus
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 disabled:bg-gray-400"
          formAction={deleteTodoAction}
        >
          Delete
        </ButtonFormStatus>
      </div>
    </form>
  );
}

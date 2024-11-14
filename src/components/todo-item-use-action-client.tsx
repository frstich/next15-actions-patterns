"use client";

//import { deleteTodoAction, toggleTodoAction } from "@/actions";
import { Todo } from "@/lib/todos";
import { useTransition } from "react";
//import { useFormStatus } from "react-dom";


/* function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button className={`px-2 py-1 ml-2 text-white rounded ${pending ? "bg-gray-400" : "bg-red-500"
      }`} type="submit" aria-disabled={pending}>
      Delete
    </button>
  );
} */


export function TodoItemClient({ todo }: { todo: Todo }) {
  const [isPending] = useTransition();
  //const [state, formAction] = useActionState(clientDeleteTodoAction, { message: "" });

  return (
    <div className="flex items-center space-x-2 mb-2">
      { /* Example with prev startTransition */}
      <span
        className={`text-white flex-1 cursor-pointer ${todo.completed ? "line-through" : ""
          }  ${isPending ? "text-gray-400" : "text-black"}`}
      /* onClick={() =>
        startTransition(() =>
          toggleTodoAction(
            {
              todoId: todo.id,
              path: "/native-client-form"
            }
          )
        )
      } */
      >
        {todo.title}
      </span>
      { /* Example with new useActionState */}
      {/* <form action={formAction} className="flex items-center">
        <input type="hidden" name="id" value={todo.id} />
        <DeleteButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form> */}
    </div>
  );
};

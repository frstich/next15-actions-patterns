import { useId } from "react";
import { addTodoAction } from "@/app/only-server/_actions";
import { ButtonFormStatus } from "@/app/server-with-useformstatus/_button-form-status";

/*
 * In this example we are reusing the same actions from the only-server example.
 * In this action we are revalidating "/only-server" path,
 * however "/server-with-useformstatus" path is revalidated too.
 * Question: This is a miss behavior or useFormState do the revaidation of the path?
 * From docs: Currently, revalidatePath invalidates all the routes in the client-side Router Cache.
 * This behavior is temporary and will be updated in the future to apply only to the specific path.
 */

export function TodoAddFormWithUseFormStatus() {
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
      <ButtonFormStatus className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-gray-400">
        Add
      </ButtonFormStatus>
    </form>
  );
}

import { useId } from "react";
import { addTodoAction } from "@/app/only-server/_actions";
import { Button } from "@/components/button";

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
      />
      <Button> Add </Button>
    </form>
  );
}

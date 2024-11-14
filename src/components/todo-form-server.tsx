
import { useId } from "react";
import { addTodoAction } from "@/app/_actions";
import { ButtonFormStatus } from "./button-form-status";

export function TodoServerForm() {
  return (
    <form
      action={async (data: FormData) => {
        "use server"
        const title = data.get("title");
        if (!title || typeof title !== "string") {
          return;
        }
        await addTodoAction({ title, path: "/native-server-form" });
      }}
      key={useId()}
      className="flex items-center space-x-2 mb-4"
    >
      <input
        type="text"
        name="title"
        className="border rounded px-2 py-1 flex-1 text-black"
      />
      <ButtonFormStatus> Add </ButtonFormStatus>
    </form>
  );
}
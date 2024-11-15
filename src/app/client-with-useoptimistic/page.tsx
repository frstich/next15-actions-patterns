import { getTodos } from "@/lib/todos";
import { App, TodoAppWithOptimistic } from "./_todo-app-with-useoptimistic";
import { addTodoCientAction } from "../_actions";

export default async function ClientWithOptimisticPage() {
  const todos = await getTodos();
  console.log("render");
  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {/* <App initTodos={todos} /> */}
      <TodoAppWithOptimistic todos={todos} action={addTodoCientAction} />
    </div>
  );
}

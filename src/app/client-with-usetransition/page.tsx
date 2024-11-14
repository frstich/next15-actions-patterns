import { getTodos } from "@/lib/todos";
import { TodoFormWithUseTransition } from "./_todo-form-with-usetransition";
import { TodoItemWithUseTransition } from "./_todo-item-with-usetransition";

export default async function ClientWithTransitionPage() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoFormWithUseTransition />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemWithUseTransition key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
}

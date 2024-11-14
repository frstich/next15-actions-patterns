import { getTodos } from "@/lib/todos";
import { TodoAddFormWithUseActionState } from "./_todo-form-with-useactionstate";
import { TodoItemWithUseActionState } from "./_todo-item-with-useactionstate";

export default async function ServerWithUseFormStatus() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoAddFormWithUseActionState />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemWithUseActionState key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
}

import { getTodos } from "@/lib/todos";
import { TodoAddFormWithUseFormStatus } from "./_todo-form-with-useformstatus";
import { TodoItemWithUseFormStatus } from "./_todo-item-with-useformstatus";

export default async function ServerWithUseFormStatus() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoAddFormWithUseFormStatus />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemWithUseFormStatus key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
}

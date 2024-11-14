import { TodoOnlyServerForm } from "@/app/only-server/_todo-form-only-server";
import { TodoItemOnlyServer } from "@/app/only-server/_todo-item-only-server";
import { getTodos } from "@/lib/todos";

export default async function OnlyServerPage() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoOnlyServerForm />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => <TodoItemOnlyServer key={todo.id} todo={todo} />)
      )}
    </div>
  );
}

import { TodoClientForm } from "@/components/todo-form-client";
import { TodoItemClient } from "@/components/todo-item-client";
import { getTodos } from "@/lib/todos";

const Page = async () => {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoClientForm />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemClient key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};

export default Page;
import { TodoServerForm } from "@/components/todo-form-server";
import { TodoItemServer } from "@/components/todo-item-server";
import { getTodos } from "@/lib/todos";

const Page = async () => {
  const todos = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoServerForm />
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemServer key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};

export default Page;
"use client";

import { Todo } from "@/lib/todos";
import { TodoItemWithUseOptimistic } from "./_todo-item-with-useoptimistic";
import { useId, useOptimistic, useState } from "react";
import { TodoFormWitUseOptimistic } from "./_todo-form-with-useoptimistic";
import { addTodoCientAction } from "../_actions";

export enum OptimisticActionType {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export type TodoIntent = {
  id?: string;
  title: string;
  completed: boolean;
};
function TodoListWithOptimistic({
  todos,
  onOptimisticDeleteItem,
}: {
  todos: TodoIntent[];
  onOptimisticDeleteItem: (action: {
    type: OptimisticActionType;
    todo: TodoIntent;
  }) => void;
}) {
  if (todos.length === 0) return <p className="text-center">No Todos Found</p>;

  return todos?.map((todo) => {
    return (
      <TodoItemWithUseOptimistic
        key={todo.id}
        todo={todo}
        onOptimisticDelete={onOptimisticDeleteItem}
      />
    );
  });
}

export function TodoAppWithOptimistic({
  todos,
  action,
}: {
  todos: Todo[];
  action: (data: FormData) => void;
}) {
  const [optimisticTodos, optimisticTodoAction] = useOptimistic(
    todos,
    (
      currentTodos: TodoIntent[],
      optimisticAction: {
        type: OptimisticActionType;
        todo: TodoIntent;
      }
    ) => {
      switch (optimisticAction.type) {
        case OptimisticActionType.ADD_TODO:
          return [optimisticAction.todo, ...currentTodos];
        case OptimisticActionType.DELETE_TODO:
          return currentTodos.filter(
            (todo) => todo.id !== optimisticAction.todo.id
          );
        default:
          return currentTodos;
      }
    }
  );

  return (
    <>
      <TodoFormWitUseOptimistic
        action={action}
        onSubmit={optimisticTodoAction}
      />
      <TodoListWithOptimistic
        todos={optimisticTodos}
        onOptimisticDeleteItem={optimisticTodoAction}
      />
    </>
  );
}

export function App({ initTodos }: { initTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  async function action(data: FormData) {
    const todo = await addTodoCientAction(data);
    setTodos((prevTodos) => [todo, ...prevTodos]);
  }

  return <TodoAppWithOptimistic todos={todos} action={action} />;
}

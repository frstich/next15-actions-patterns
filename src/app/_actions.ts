"use server";

import "server-only";
import { sleep } from "@/lib/sleep";
import { createTodo, deleteTodo, Todo, toggleTodo } from "@/lib/todos";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function addTodoAction(data: FormData) {
  await sleep();
  const title = data.get("title") as string;
  await createTodo({
    id: randomUUID().toString(),
    title,
    completed: false,
  });
  revalidatePath("/only-server");
}

export async function toggleTodoAction(data: FormData) {
  await sleep();
  const todoId = data.get("todoId") as string;
  await toggleTodo(todoId);
  revalidatePath("/only-server");
}

export async function deleteTodoAction(data: FormData) {
  await sleep();
  const todoId = data.get("todoId") as string;
  await deleteTodo(todoId);
  revalidatePath("/only-server");
}

/*
 * composition of server actions for useActionState compatibility
 */

export async function addTodoClientAction(
  prevState: { message: string; success: boolean },
  data: FormData
) {
  try {
    await addTodoAction(data);
    return { success: true, message: "Todo added" };
  } catch (error) {
    return { success: false, message: "Failed to add todo" };
  }
}

export async function toggleTodoClientAction(
  prevState: { message: string; success: boolean },
  data: FormData
) {
  try {
    await toggleTodoAction(data);
    return { success: true, message: "Todo toggled" };
  } catch (error) {
    return { success: false, message: "Failed to toggle todo" };
  }
}

export async function deleteTodoClientAction(
  prevState: { message: string; success: boolean },
  data: FormData
) {
  try {
    await deleteTodoAction(data);
    return { success: true, message: "Todo deleted" };
  } catch (error) {
    return { success: false, message: "Failed to delete todo" };
  }
}

export async function addTodoCientAction(data: FormData): Promise<Todo> {
  await sleep();
  const id = randomUUID().toString(),
    title = data.get("title") as string,
    completed = (data.get("complete") === "true") as boolean;
  const todo: Todo = {
    id,
    title,
    completed,
  };
  await createTodo(todo);
  revalidatePath("/only-server");
  return todo;
}

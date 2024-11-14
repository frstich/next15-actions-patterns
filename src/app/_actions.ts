"use server"

import 'server-only'
import { sleep } from "@/lib/sleep";
import { createTodo, deleteTodo, toggleTodo } from "@/lib/todos";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function addTodoAction(
  { title, path }: { title: string; path: string }
) {
  await sleep()

  await createTodo({
    id: randomUUID().toString(),
    title,
    completed: false
  });
  revalidatePath(path);
}

export async function deleteTodoAction(
  { todoId, path }: { todoId: string; path: string }
) {
  await sleep();

  await deleteTodo(todoId);
  revalidatePath(path);
}


export async function toggleTodoAction(
  { todoId, path }: { todoId: string, path: string }
) {
  await sleep();
  await toggleTodo(todoId);
  revalidatePath(path);
}
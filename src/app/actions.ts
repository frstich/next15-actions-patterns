"use server"

import 'server-only'
import { sleep } from "@/lib/sleep";
import { createTodo, deleteTodo, toggleTodo } from "@/lib/todos";
import { randomUUID } from "crypto";

export async function addTodoAction(
  data: FormData
) {
  await sleep()
  const title = data.get('title') as string
  await createTodo({
    id: randomUUID().toString(),
    title,
    completed: false
  });
}

export async function deleteTodoAction(
  data: FormData
) {
  await sleep()
  const todoId = data.get('todoId') as string
  await deleteTodo(todoId);
}

export async function toggleTodoAction(
  data: FormData
) {
  await sleep()
  const todoId = data.get('todoId') as string
  await toggleTodo(todoId);
}

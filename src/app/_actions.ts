"use server";

import "server-only";
import { sleep } from "@/lib/sleep";
import { createTodo, deleteTodo, Todo, toggleTodo } from "@/lib/todos";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import zod from "zod";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

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
const registerUserSchema = zod.object({
  name: zod.string().min(5).max(55),
  email: zod.string().email(),
  password: zod.string().min(8).max(55),
  confirmPassword: zod.string(),
  terms: zod.boolean(),
})


export async function registerUserOnlyServerZod(data: FormData) {
  const validatedFields = registerUserSchema.safeParse(Object.fromEntries(data.entries()));

  if (!validatedFields.success) {
    const errors = Object.entries(validatedFields.error.flatten().fieldErrors).map(([key, value]) => {
      return `${key}: ${value}`;
    });
    redirect(`/server-with-zod-validation?errors=${errors}&name=${data.get("name")}`);
  }

  if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
    redirect(`/server-with-zod-validation?errors=passwords do not match`);
  }

  if (validatedFields.data.email === "existing@example.com") {
    redirect(`/server-with-zod-validation?errors=email already exists`);
  }

  redirect(`/success-form-submission`);
}

const schemaFormData = zfd.formData({
  name: zfd.text(zod.string().min(5).max(55)),
  email: zfd.text(zod.string().email()),
  password: zfd.text(zod.string().min(8).max(55)),
  confirmPassword: zfd.text(zod.string().min(8).max(55)),
  terms: zfd.checkbox().refine((val) => val, "Please check this box"),
});

// Derivamos el tipo de validación de los errores desde el esquema
type SchemaType = zod.infer<typeof schemaFormData>;

export type zodFormDataFieldErrors = {
  [K in keyof SchemaType]?: string[]
}

// Actualizamos el tipo de `prevState` para ser consistente con `FieldErrors`
export type PrevStateType = {
  success: boolean;
  errors?: zodFormDataFieldErrors;
};


export async function registerUserWithZodFormData(
  prevState: PrevStateType | undefined,
  data: FormData
): Promise<{ success: false; errors?: zodFormDataFieldErrors } | { success: true }> {

  const validatedFields = schemaFormData.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors as zodFormDataFieldErrors,
    }
  }

  if (validatedFields.data?.password !== validatedFields.data?.confirmPassword) {
    return {
      success: false,
      errors: {
        confirmPassword: ["Passwords do not match"],
      },
    }
  }

  if (validatedFields.data?.email === "existing@example.com") {
    return {
      success: false,
      errors: {
        email: ["Email already exists"],
      },
    }
  }

  return {
    success: true,
  }

}

export const registerUserSafeAction = actionClient
  .schema(registerUserSchema)
  .action(async ({ parsedInput: {
    name,
    email,
    password,
    confirmPassword,
    terms,
  } }) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        errors: {
          confirmPassword: ["Passwords do not match"],
        },
      }
    }

    if (email === "existing@example.com") {
      return {
        success: false,
        errors: {
          email: ["Email already exists"],
        },
      }
    }

    if (!terms) {
      return {
        success: false,
        errors: {
          terms: ["Please check this box"],
        },
      }
    }

    return {
      success: true,
    }
  });
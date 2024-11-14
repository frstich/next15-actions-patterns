import 'server-only'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

const todos: Todo[] = [
  { id: '1', title: 'Buy Milk', completed: false },
  { id: '2', title: 'Buy Eggs', completed: true },
  { id: '3', title: 'Buy Bread', completed: false },
]

export async function getTodos() {
  return todos
}

export async function createTodo(todo: Todo): Promise<Todo> {
  todos.push(todo)
  return todo
}

export async function deleteTodo(id: string) {
  const index = todos.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
  }
}

export async function toggleTodo(id: string) {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
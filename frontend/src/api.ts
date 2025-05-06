import { Todo } from './types/Todo';

const BASE = '/api/todos';          

export async function getTodos(owner?: string, list?: string): Promise<Todo[]> {
  let url = owner ? `${BASE}/user/${encodeURIComponent(owner)}` : BASE;

  if (list) url += `?list=${encodeURIComponent(list)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} failed – ${res.statusText}`);
  return res.json();
}

export async function createTodo(todo: Omit<Todo, 'id' | 'id'>): Promise<Todo> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error(`POST ${BASE} failed: ${res.statusText}`);
  return res.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${BASE}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error(`PUT ${BASE}/${todo.id} failed: ${res.statusText}`);
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE ${BASE}/${id} failed: ${res.statusText}`);
}

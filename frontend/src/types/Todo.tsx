export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  list: string;
  owner:string;
}

export interface TodoListInterface {
  id: number;
  name: string;
  todos: Todo[];
}
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo:     (id: number) => void;
}

export default function TodoItem({ todo, toggleComplete, deleteTodo }: Props) {
  const due  = new Date(todo.dueDate);
  const now  = new Date();
  const days = Math.ceil((due.getTime() - now.getTime()) / 86_400_000);

  let colour = 'todo-green';
  if (days <= 7 && days >= 4) colour = 'todo-yellow';
  if (days < 4)               colour = 'todo-red';

  return (
    <Card
      body
      className={`todo-item mb-3 ${colour}`}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      <h5>{todo.title}</h5>
      {todo.description && <p className="mb-2">{todo.description}</p>}

      <p className="mb-1">
        <strong>Due:</strong> {todo.dueDate}
      </p>

      
      <p className="mb-3">
        <strong>List:</strong> {todo.list}&nbsp;todo
      </p>

      <Button
        size="sm"
        variant={todo.completed ? 'secondary' : 'success'}
        onClick={() => toggleComplete(todo.id)}
        className="me-2"
      >
        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>

      <Button
        size="sm"
        variant="danger"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </Button>
    </Card>
  );
}
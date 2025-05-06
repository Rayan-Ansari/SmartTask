import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Todo } from '../types/Todo';
import { useUser } from '../context/UserContext';   
import '../styles/AddTodo.css';

interface Props {
  addTodo: (t: Omit<Todo, 'id' | 'owner'>) => void;
}

export default function AddTodo({ addTodo }: Props) {
  const { user } = useUser();                      
  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [dueDate,     setDueDate]     = useState('');
  const [list,        setList]        = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate || !user) return;

   
    addTodo({
      title,
      description,
      dueDate,               
      completed: false,
      list: list || 'General',
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setList('');
  };

  return (
    <Card body>
      <h5 className="mb-3">Add Todo</h5>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="List (e.g., Work, Health)"
            value={list}
            onChange={e => setList(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Add</Button>
      </Form>
    </Card>
  );
}

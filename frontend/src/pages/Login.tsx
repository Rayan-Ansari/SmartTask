import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useUser } from '../context/UserContext';
import { Todo } from '../types/Todo';
import { todosBrian, todosTest, todosKramer } from '../assets/sampleTodos';

type User = { name: string; email: string; todos: Todo[] };

const PREDEFINED: Record<string, { pwd: string; name: string; todos: Todo[] }> = {
  'test@example.com':    { pwd: 'password123', name: 'John Doe',        todos: todosTest   },
  'bodonnell@gmail.com': { pwd: 'password123', name: 'Brian ODonnell',  todos: todosBrian  },
  'kramer@seinfeld.com': { pwd: 'password123', name: 'Cosmo Kramer',    todos: todosKramer },
};

export default function Login() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [isNew,    setIsNew]    = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isNew) {
      if (!name || !email || !password) { setError('Please fill in all fields'); return; }
      setUser({ name, email, todos: [] });
      navigate('/dashboard');
      return;
    }

    const record = PREDEFINED[email];
    if (!record || record.pwd !== password) { setError('Invalid credentials'); return; }

    setUser({ name: record.name, email, todos: record.todos });
    navigate('/dashboard');
  };

  if (user) {
    return (
      <Container className="mt-4">
        <Alert variant="success" role="alert">
          {`Welcome, ${user.name}! You have ${user.todos.length} todo items.`}{' '}
          <Link to="/dashboard" className="alert-link">Go to your dashboard</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Sign In</h2>   {/* ← heading no longer “Login” */}

      {error && <Alert role="alert" variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="login-email">Email address</Form.Label>
          <Form.Control id="login-email" type="email"
                        value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="login-password">Password</Form.Label>
          <Form.Control id="login-password" type="password"
                        value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        {isNew && (
          <Form.Group className="mb-3">
            <Form.Label htmlFor="new-name">Name (for new users)</Form.Label>
            <Form.Control id="new-name" type="text"
                          value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
        )}

        <Button
          variant={isNew ? 'secondary' : 'outline-secondary'}
          className="me-2"
          type="button"
          onClick={() => setIsNew(p => !p)}
        >
          {isNew ? 'Existing user' : 'I am a new user'}
        </Button>

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

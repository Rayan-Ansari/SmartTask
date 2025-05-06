import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext';
import { Todo } from '../types/Todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import AddTodo  from '../components/AddTodo';
import TodoList from '../components/TodoList';

export default function MyList() {
  const { user, setUser } = useUser();
  const nav               = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      nav('/login');
      return;
    }
    setLoading(true);
    getTodos(user.email)
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [user]);

  const addTodo = (t: Omit<Todo, 'id' | 'owner'>) => {
    createTodo({ ...t, owner: user!.email })   
      .then(newItem => setTodos(prev => [...prev, newItem]));
  };
  
  

  const toggleComplete = (id: number) => {
    const t = todos.find(x => x.id === id);
    if (!t) return;
    updateTodo({ ...t, completed: !t.completed })
      .then(updated =>
        setTodos(prev =>
          prev.map(x => (x.id === id ? updated : x))
        )
      );
  };

  const deleteHandler = (id: number) => {
    deleteTodo(id).then(() =>
      setTodos(prev => prev.filter(x => x.id !== id))
    );
  };

  const handleLogout = () => {
    setUser(null);
    nav('/');
  };

  if (!user) return null;
  if (loading) return <p>Loading…</p>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="h3 mb-0">{user.name}’s Todo List</h1>
        <Button size="sm" variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Row>
        <Col md={4}>
          <AddTodo addTodo={addTodo} />
        </Col>
        <Col md={6} className="my-4">
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteHandler}
          />
        </Col>
      </Row>
    </Container>
  );
}

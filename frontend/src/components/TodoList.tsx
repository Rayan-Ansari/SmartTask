import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { ListGroup } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { Tabs, Tab } from 'react-bootstrap'; 

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const lists = Array.from(new Set(todos.map((todo) => todo.list)));

  const filteredTodos = filter ? todos.filter((todo) => todo.list === filter) : todos;

  return (
    <div>
      <Tabs
        activeKey={filter || 'all'}
        onSelect={(key) => setFilter(key === 'all' ? null : key)}
        className="mb-3"
      >
        <Tab eventKey="all" title="All" />
        {lists.map((list) => (
          <Tab key={list} eventKey={list} title={list} />
        ))}
      </Tabs>
      {filteredTodos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
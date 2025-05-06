import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';
import App from '../App'; // Import the main App component
import { sampleTodos } from '../assets/sampleTodos'; // Import the sample todos

describe('TodoItem Component', () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('applies the correct green class based on the due date', () => {
    const futureTodo = { ...sampleTodos[0], dueDate: sampleTodos[0].dueDate };
    render(
      <TodoItem
        todo={futureTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    const todoItem = screen.getByText(futureTodo.title).closest('.todo-item');
    expect(todoItem).toHaveClass('todo-green');
  });

  test('applies the correct warning class based on the due date', () => {
    const warningTodo = { ...sampleTodos[2], dueDate: sampleTodos[2].dueDate };
    render(
      <TodoItem
        todo={warningTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    const warningTodoItem = screen.getByText(warningTodo.title).closest('.todo-item');
    expect(warningTodoItem).toHaveClass('todo-yellow');
  });

  test('applies the correct urgent class based on the due date', () => {
    const urgentTodo = { ...sampleTodos[3], dueDate: sampleTodos[3].dueDate };
    render(
      <TodoItem
        todo={urgentTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    const urgentTodoItem = screen.getByText(urgentTodo.title).closest('.todo-item');
    expect(urgentTodoItem).toHaveClass('todo-red');
  });
  test('calls toggleComplete when the "Mark Complete/Mark Incomplete" button is clicked', () => {
    render(
      <TodoItem
        todo={sampleTodos[0]}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );

    const toggleButton = screen.getByText('Mark Complete');
    fireEvent.click(toggleButton);

    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockToggleComplete).toHaveBeenCalledWith(sampleTodos[0].id);
  });

  test('calls deleteTodo when the "Delete" button is clicked', () => {
    render(
      <TodoItem
        todo={sampleTodos[0]}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(sampleTodos[0].id);
  });

  test('displays the correct text decoration when the todo is completed', () => {
    const completedTodo = { ...sampleTodos[0], completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );

    const todoItem = screen.getByText(completedTodo.title).closest('.todo-item');
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });
});
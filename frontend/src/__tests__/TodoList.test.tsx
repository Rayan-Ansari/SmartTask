import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';
import { Todo } from '../types/Todo';

describe('TodoList Component', () => {
  // Mock functions
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  // Sample todo items for testing
  const sampleTodos: Todo[] = [
    {
      id: 1,
      title: 'Complete assignment',
      description: 'Finish React assignment',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
      list: 'School'
    },
    {
      id: 2,
      title: 'Go grocery shopping',
      description: 'Buy fruits and vegetables',
      completed: true,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      list: 'Personal'
    },
    {
      id: 3,
      title: 'Plan meeting',
      description: 'Schedule team sync',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
      list: 'Work'
    },
    {
      id: 4,
      title: 'Read book',
      description: 'Chapter 5-7',
      completed: false,
      dueDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
      list: 'School'
    }
  ];

  // Reset mocks before each test
  beforeEach(() => {
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('renders all todo items when first loaded', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Check if all todo items are rendered
    expect(screen.getByText('Complete assignment')).toBeInTheDocument();
    expect(screen.getByText('Go grocery shopping')).toBeInTheDocument();
    expect(screen.getByText('Plan meeting')).toBeInTheDocument();
    expect(screen.getByText('Read book')).toBeInTheDocument();
  });

  test('displays "No todos yet!" message when no todos are provided', () => {
    render(
      <TodoList
        todos={[]}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    expect(screen.getByText('No todos yet!')).toBeInTheDocument();
  });

  test('renders correct tabs based on todo lists', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Check if all list tabs are rendered
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  test('filters todos when a list tab is clicked', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Click on School tab
    fireEvent.click(screen.getByText('School'));
    
    // School items should be visible
    expect(screen.getByText('Complete assignment')).toBeInTheDocument();
    expect(screen.getByText('Read book')).toBeInTheDocument();
    
    // Other items should not be visible
    expect(screen.queryByText('Go grocery shopping')).not.toBeInTheDocument();
    expect(screen.queryByText('Plan meeting')).not.toBeInTheDocument();
  });

  test('shows all todos when "All" tab is clicked after filtering', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // First filter by School
    fireEvent.click(screen.getByText('School'));
    
    // Then click All
    fireEvent.click(screen.getByText('All'));
    
    // All items should be visible again
    expect(screen.getByText('Complete assignment')).toBeInTheDocument();
    expect(screen.getByText('Go grocery shopping')).toBeInTheDocument();
    expect(screen.getByText('Plan meeting')).toBeInTheDocument();
    expect(screen.getByText('Read book')).toBeInTheDocument();
  });

  test('calls toggleComplete when a todo item is clicked', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Find and click the toggle button for the first todo
    const toggleButton = screen.getAllByText('Mark Complete')[0];
    fireEvent.click(toggleButton);
    
    // Check if toggleComplete was called with correct ID
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  test('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Find and click the delete button for the first todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if deleteTodo was called with correct ID
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });

  test('renders completed todo items with line-through style', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // Find the completed todo item (the grocery shopping one)
    const completedTodoElement = screen.getByText('Go grocery shopping').closest('.todo-item');
    expect(completedTodoElement).toHaveStyle('text-decoration: line-through');
  });

  test('displays correct action button text for completed and incomplete todos', () => {
    render(
      <TodoList
        todos={sampleTodos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // For incomplete todos, button should say "Mark Complete"
    expect(screen.getAllByText('Mark Complete').length).toBe(3);
    
    // For completed todos, button should say "Mark Incomplete"
    expect(screen.getByText('Mark Incomplete')).toBeInTheDocument();
  });

  test('displays unique list tabs without duplicates', () => {
    // Add a duplicate School list todo
    const todosWithDuplicateList = [
      ...sampleTodos,
      {
        id: 5,
        title: 'Another school task',
        description: 'One more for school',
        completed: false,
        dueDate: new Date().toISOString(),
        list: 'School'
      }
    ];
    
    render(
      <TodoList
        todos={todosWithDuplicateList}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );
    
    // There should still be only one "School" tab
    const schoolTabs = screen.getAllByText('School');
    expect(schoolTabs.length).toBe(1);
  });
});
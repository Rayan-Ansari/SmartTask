//import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Login from '../pages/Login';

// filepath: src/pages/Login.test.tsx

describe('Login Component', () => {
  const mockSetUser = jest.fn();

  const renderWithContext = (user: { name: string; email: string; todos: any[] } | null = null) => {
    render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <Router>
          <Login />
        </Router>
      </UserContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    renderWithContext();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('I am a new user')).toBeInTheDocument();
  });

  test('toggles between new user and existing user modes', () => {
    renderWithContext();
    const toggleButton = screen.getByText('I am a new user');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Name (for new users)')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.queryByLabelText('Name (for new users)')).not.toBeInTheDocument();
  });

  test('logs in an existing user with valid credentials', () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      todos: expect.any(Array),
    });
    expect(screen.queryByText('Please provide a name for new users.')).not.toBeInTheDocument();
  });

  test('creates a new user with valid inputs', () => {
    renderWithContext();
    fireEvent.click(screen.getByText('I am a new user'));
    fireEvent.change(screen.getByLabelText('Name (for new users)'), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'New User',
      email: 'newuser@example.com',
      todos: [],
    });
    expect(screen.queryByText('Please provide a name for new users.')).not.toBeInTheDocument();
  });

  test('shows an error when new user name is missing', () => {
    renderWithContext();
    fireEvent.click(screen.getByText('I am a new user'));
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    expect(screen.getByText('Name (for new users)')).toBeInTheDocument();
    expect(mockSetUser).not.toHaveBeenCalled();
  });

  test('displays a success message after login', () => {
    renderWithContext({ name: 'John Doe', email: 'test@example.com', todos: [] });
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveClass('alert-success');

  });

  // Additional tests for Login component

  test('logs in as Brian ODonnell with valid credentials', () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'bodonnell@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'Brian ODonnell',
      email: 'bodonnell@gmail.com',
      todos: expect.any(Array),
    });
  });

  test('logs in as Cosmo Kramer with valid credentials', () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'kramer@seinfeld.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'Cosmo Kramer',
      email: 'kramer@seinfeld.com',
      todos: expect.any(Array),
    });
  });

  test('displays error for invalid credentials', () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login'));
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveClass('alert-danger');
  
  expect(mockSetUser).not.toHaveBeenCalled();
  });

  test('clears error message after successful login', () => {
    renderWithContext();
    
    // First trigger an error
    fireEvent.click(screen.getByText('I am a new user'));
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveClass('alert-danger');
    
    // Then complete a successful login
    fireEvent.change(screen.getByLabelText('Name (for new users)'), { target: { value: 'New User' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.queryByText('Please provide a name for new users.')).not.toBeInTheDocument();
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'New User',
      email: 'newuser@example.com',
      todos: [],
    });
  });

  test('shows correct number of todos in welcome message', () => {
    renderWithContext({ 
      name: 'Test User', 
      email: 'test@example.com', 
      todos: [
        { id: '1', title: 'Test Todo', completed: false, dueDate: '2023-12-31' },
        { id: '2', title: 'Another Todo', completed: true, dueDate: '2023-12-30' }
      ] 
    });
    expect(screen.getByText(/You have 2 todo items/)).toBeInTheDocument();
  });

  test('shows dashboard link after successful login', () => {
    renderWithContext({ name: 'Test User', email: 'test@example.com', todos: [] });
    const dashboardLink = screen.getByText('Go to your dashboard');
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard');
  });
});
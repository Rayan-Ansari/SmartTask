import { Todo } from '../types/Todo';

const today = new Date();
const addDays = (date: Date, days: number): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};

export const sampleTodos: Todo[] = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Go through the official React documentation and build a small project.',
    dueDate: addDays(today, 10),
    completed: false,
    list: 'Education',
  },
  {
    id: 2,
    title: 'Complete Assignment',
    description: 'Finish the web development assignment on building a Todo List app.',
    dueDate: addDays(today, 7),
    completed: false,
    list: 'Work',
  },
  {
    id: 3,
    title: 'Grocery Shopping',
    description: 'Buy vegetables, fruits, and other essentials for the week.',
    dueDate: addDays(today, 5),
    completed: true,
    list: 'Personal',
  },
  {
    id: 4,
    title: 'Workout',
    description: 'Complete a 30-minute workout session.',
    dueDate: addDays(today, 2),
    completed: false,
    list: 'Health',
  },
];

export const sampleTodosUser2: Todo[] = [
  {
    id: 5,
    title: 'Prepare Presentation',
    description: 'Create slides for the upcoming project presentation.',
    dueDate: addDays(today, 8),
    completed: false,
    list: 'Work',
  },
  {
    id: 6,
    title: 'Meditation',
    description: 'Spend 15 minutes meditating to relax and focus.',
    dueDate: addDays(today, 1),
    completed: false,
    list: 'Health',
  },
  {
    id: 7,
    title: 'Plan Vacation',
    description: 'Research and plan for the upcoming family vacation.',
    dueDate: addDays(today, 20),
    completed: false,
    list: 'Personal',
  },
  {
    id: 8,
    title: 'Learn TypeScript',
    description: 'Complete an online course on TypeScript basics.',
    dueDate: addDays(today, 12),
    completed: false,
    list: 'Education',
  },
];

export const sampleTodosUser3: Todo[] = [
  {
    id: 9,
    title: 'Organize Workspace',
    description: 'Clean and organize the workspace for better productivity.',
    dueDate: addDays(today, 3),
    completed: false,
    list: 'Personal',
  },
  {
    id: 10,
    title: 'Finish Reading Book',
    description: 'Complete reading the current book and write a summary.',
    dueDate: addDays(today, 14),
    completed: false,
    list: 'Education',
  },
  {
    id: 11,
    title: 'Team Building Activity',
    description: 'Participate in the scheduled team-building activity.',
    dueDate: addDays(today, 6),
    completed: false,
    list: 'Work',
  },
  {
    id: 12,
    title: 'Yoga Session',
    description: 'Attend a yoga session to improve flexibility and reduce stress.',
    dueDate: addDays(today, 4),
    completed: false,
    list: 'Health',
  },
];
export const todosTest   = sampleTodos;        
export const todosBrian  = sampleTodosUser2;   
export const todosKramer = sampleTodosUser3;   
import { Task, Habit, Expense } from './types';

export const mockTasks: Task[] = [
  { id: '1', title: 'Review Q3 OKRs', status: 'todo', priority: 'high', tags: ['work', 'planning'], estimatedTime: 60, color: 'bg-blue-500' },
  { id: '2', title: 'Wireframe for new Dashboard', status: 'in-progress', priority: 'medium', tags: ['design'], estimatedTime: 120, color: 'bg-purple-500' },
  { id: '3', title: 'Read 2 chapters of atomic habits', status: 'todo', priority: 'low', tags: ['personal'], estimatedTime: 30, color: 'bg-green-500' },
  { id: '4', title: 'Reply to investor emails', status: 'waiting', priority: 'high', tags: ['work'], estimatedTime: 15, color: 'bg-orange-500' },
  { id: '5', title: 'Book flight to Hanoi', status: 'done', priority: 'medium', tags: ['personal'], color: 'bg-gray-500' },
];

export const mockHabits: Habit[] = [
  { id: '1', title: 'Drink Water', icon: '💧', targetCount: 8, currentCount: 5, streak: 12, color: 'bg-blue-500' },
  { id: '2', title: 'Read Book', icon: '📚', targetCount: 1, currentCount: 1, streak: 45, color: 'bg-purple-500' },
  { id: '3', title: 'Workout', icon: '🏋️', targetCount: 1, currentCount: 0, streak: 0, color: 'bg-orange-500' },
  { id: '4', title: 'Meditate', icon: '🧘', targetCount: 1, currentCount: 1, streak: 3, color: 'bg-green-500' },
];

export const mockExpenses: Expense[] = [
  { id: '1', title: 'Highlands Coffee', amount: 55000, category: 'Cafe', date: new Date() },
  { id: '2', title: 'Grab to Office', amount: 45000, category: 'Transport', date: new Date() },
  { id: '3', title: 'Lunch at Pho Thin', amount: 80000, category: 'Food', date: new Date() },
  { id: '4', title: 'Netflix Subscription', amount: 260000, category: 'Entertainment', date: new Date(new Date().setDate(new Date().getDate() - 2)) },
];

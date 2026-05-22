export type TaskStatus = 'todo' | 'in-progress' | 'waiting' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date;
  tags?: string[];
  estimatedTime?: number; // in minutes
  color?: string;
}

export interface Habit {
  id: string;
  title: string;
  icon: string;
  targetCount: number;
  currentCount: number;
  streak: number;
  color: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export type ViewType = 'dashboard' | 'tasks' | 'calendar' | 'habits' | 'focus' | 'expenses' | 'analytics' | 'automation' | 'settings';

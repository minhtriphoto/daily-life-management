import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Habit, Expense, ViewType } from '../types';
import { mockTasks, mockHabits, mockExpenses } from '../data';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AppContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  deleteHabit: (id: string) => void;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  income: number;
  setIncome: (income: number) => void;
  budget: number;
  setBudget: (budget: number) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : mockTasks;
  });
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('app_habits');
    return saved ? JSON.parse(saved) : mockHabits;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('app_expenses');
    return saved ? JSON.parse(saved) : mockExpenses;
  });
  const [income, setIncome] = useState<number>(() => {
    const saved = localStorage.getItem('app_income');
    return saved && !isNaN(Number(saved)) ? Number(saved) : 24500000;
  });
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('app_budget');
    return saved && !isNaN(Number(saved)) ? Number(saved) : 15000000;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('app_user');
    }
  }, [currentUser]);

  useEffect(() => { localStorage.setItem('app_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('app_habits', JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('app_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('app_income', income.toString()); }, [income]);
  useEffect(() => { localStorage.setItem('app_budget', budget.toString()); }, [budget]);

  const login = (email: string, pass: string) => {
    if (email === 'minhtri89.no1@gmail.com' && pass === 'Lov3nov3l@89') {
      setCurrentUser({
        id: '1',
        name: 'Trí (Admin)',
        email,
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=b6e3f4'
      });
      return true;
    } else if (email && pass) {
      setCurrentUser({
        id: '2',
        name: email.split('@')[0],
        email,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}&backgroundColor=ffd5dc`
      });
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const addTask = (task: Omit<Task, 'id'>) => setTasks((prev) => [...prev, { ...task, id: Math.random().toString(36).substr(2, 9) }]);
  const deleteHabit = (id: string) => setHabits((prev) => prev.filter((h) => h.id !== id));
  const addHabit = (habit: Omit<Habit, 'id'>) => setHabits((prev) => [...prev, { ...habit, id: Math.random().toString(36).substr(2, 9) }]);
  const deleteExpense = (id: string) => setExpenses((prev) => prev.filter((e) => e.id !== id));
  const addExpense = (expense: Omit<Expense, 'id'>) => setExpenses((prev) => [...prev, { ...expense, id: Math.random().toString(36).substr(2, 9) }]);

  const resetAll = () => {
    setTasks([]);
    setHabits([]);
    setExpenses([]);
  };

  return (
    <AppContext.Provider value={{
      currentUser, login, logout,
      tasks, setTasks, deleteTask, addTask,
      habits, setHabits, deleteHabit, addHabit,
      expenses, setExpenses, deleteExpense, addExpense,
      income, setIncome, budget, setBudget,
      resetAll
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TaskStatus } from '../types';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'task' | 'habit' | 'expense';
}

export function QuickAddModal({ isOpen, onClose, defaultTab = 'task' }: QuickAddModalProps) {
  const [tab, setTab] = useState<'task' | 'habit' | 'expense'>(defaultTab);
  const { addTask, addHabit, addExpense } = useAppContext();

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('todo');

  // Habit form state
  const [habitTitle, setHabitTitle] = useState('');
  const [habitIcon, setHabitIcon] = useState('🧘');
  const [habitTarget, setHabitTarget] = useState(1);

  // Expense form state
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'task') {
      if (!taskTitle.trim()) return;
      addTask({ title: taskTitle, status: taskStatus, priority: 'medium' });
      setTaskTitle('');
    } else if (tab === 'habit') {
      if (!habitTitle.trim()) return;
      addHabit({ title: habitTitle, icon: habitIcon, targetCount: habitTarget, currentCount: 0, streak: 0, color: 'bg-primary text-white' });
      setHabitTitle('');
      setHabitIcon('🧘');
      setHabitTarget(1);
    } else if (tab === 'expense') {
      if (!expenseTitle.trim() || !expenseAmount) return;
      addExpense({ title: expenseTitle, amount: parseFloat(expenseAmount), category: expenseCategory, date: new Date() });
      setExpenseTitle('');
      setExpenseAmount('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-xl shadow-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Quick Add</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors">
             <X size={16} />
          </button>
        </div>
        
        <div className="flex border-b border-border">
          <button 
            type="button"
            className={`flex-1 p-3 text-sm font-medium ${tab === 'task' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
            onClick={() => setTab('task')}
          >
            Task
          </button>
          <button 
            type="button"
            className={`flex-1 p-3 text-sm font-medium ${tab === 'habit' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
            onClick={() => setTab('habit')}
          >
            Habit
          </button>
          <button 
            type="button"
            className={`flex-1 p-3 text-sm font-medium ${tab === 'expense' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
            onClick={() => setTab('expense')}
          >
            Expense
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {tab === 'task' && (
            <>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Task Title</label>
                <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" placeholder="What needs to be done?" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Status</label>
                <select value={taskStatus} onChange={e => setTaskStatus(e.target.value as TaskStatus)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm">
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="waiting">Waiting</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </>
          )}

          {tab === 'habit' && (
            <>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Habit Name</label>
                <input type="text" value={habitTitle} onChange={e => setHabitTitle(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" placeholder="e.g. Read 10 pages" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Select Emoji Icon</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['🧘', '🏃‍♂️', '💧', '📚', '💻', '🏋️', '🍎', '🎨', '💸', '🧹'].map(emoji => (
                    <button 
                      key={emoji} 
                      type="button" 
                      onClick={() => setHabitIcon(emoji)}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border transition-colors ${habitIcon === emoji ? 'border-primary bg-primary/10' : 'border-border bg-background hover:bg-secondary'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-20">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Emoji</label>
                  <input type="text" value={habitIcon} onChange={e => setHabitIcon(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm text-center" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Daily Target (times)</label>
                  <input type="number" min="1" value={habitTarget} onChange={e => setHabitTarget(parseInt(e.target.value) || 1)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" />
                </div>
              </div>
            </>
          )}

          {tab === 'expense' && (
            <>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Description</label>
                <input type="text" value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" placeholder="e.g. Coffee" autoFocus />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Amount</label>
                  <input type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" placeholder="e.g. 50000" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Category</label>
                  <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm">
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Cafe">Cafe</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="mt-6">
            <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { tasks, habits, expenses } = useAppContext();

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  const filteredHabits = habits.filter(h => h.title.toLowerCase().includes(query.toLowerCase()));
  const filteredExpenses = expenses.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));

  const hasResults = query.trim() !== '' && (filteredTasks.length > 0 || filteredHabits.length > 0 || filteredExpenses.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="text-muted-foreground mr-3" size={20} />
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tasks, habits, or expenses..." 
                className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground"
                autoFocus
              />
              <button onClick={onClose} className="p-1 px-2 hover:bg-secondary rounded-lg text-xs font-semibold text-muted-foreground transition-colors ml-2">
                ESC
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!query.trim() && (
                <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center">
                  <Search size={32} className="mb-3 opacity-20" />
                  <p>Start typing to search across your workspace</p>
                </div>
              )}
              
              {query.trim() && !hasResults && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No results found for "{query}"
                </div>
              )}

              {query.trim() && hasResults && (
                <div className="space-y-4 p-2">
                  {filteredTasks.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Tasks</h3>
                      {filteredTasks.map(task => (
                        <div key={task.id} className="p-3 hover:bg-secondary rounded-lg flex items-center justify-between cursor-pointer transition-colors group">
                          <span className="text-sm font-medium">{task.title}</span>
                          <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Task</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredHabits.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Habits</h3>
                      {filteredHabits.map(habit => (
                        <div key={habit.id} className="p-3 hover:bg-secondary rounded-lg flex items-center justify-between cursor-pointer transition-colors group">
                          <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">{habit.icon}</span> {habit.title}</span>
                          <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Habit</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredExpenses.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Expenses</h3>
                      {filteredExpenses.map(expense => (
                        <div key={expense.id} className="p-3 hover:bg-secondary rounded-lg flex items-center justify-between cursor-pointer transition-colors group">
                          <span className="text-sm font-medium">{expense.title}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-mono font-bold text-rose-500">{expense.amount.toLocaleString()}₫</span>
                            <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Expense</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

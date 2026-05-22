import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Flame, Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { useAppContext } from '../context/AppContext';

export function HabitsView({ onOpenAdd }: { onOpenAdd: () => void }) {
  const { habits, deleteHabit } = useAppContext();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Habit Tracker</h2>
        <button onClick={onOpenAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> New Habit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:border-primary/30 transition-all hover:bg-secondary relative group">
              <button 
                onClick={() => deleteHabit(habit.id)}
                className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-rose-500 rounded bg-background shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <Trash2 size={14} />
              </button>
              <CardContent className="p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-2xl border border-border shadow-inner">
                      {habit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold tracking-tight text-foreground">{habit.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Target: {habit.targetCount} / day</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 bg-orange-100 text-orange-600 px-2.5 py-1 rounded border border-orange-200 text-xs font-bold shadow-sm inline-flex">
                      <Flame size={14} className="animate-pulse" />
                      {habit.streak}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  {days.map((day, idx) => {
                    const isCompleted = Math.random() > 0.4;
                    return (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase">{day.charAt(0)}</span>
                        <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 border ${
                          isCompleted 
                            ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20' 
                            : 'bg-secondary border-border text-transparent hover:border-primary/50 hover:bg-black/5'
                        }`}>
                          {isCompleted && <Check size={14} strokeWidth={3} />}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

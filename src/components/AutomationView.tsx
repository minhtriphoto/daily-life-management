import React, { useState } from 'react';
import { Plus, Zap, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

export function AutomationView() {
  const [automations, setAutomations] = useState([
    { id: 1, title: 'Sync Google Cal to Telegram', active: true, trigger: 'Event starts in 15m', action: 'Send TG message' },
    { id: 2, title: 'Daily Expense Recap', active: true, trigger: 'At 9:00 PM', action: 'Summary to TG' },
    { id: 3, title: 'Auto-archive done tasks', active: false, trigger: 'Task marked Done', action: 'Move to Archive' },
    { id: 4, title: 'Weekly Productivity Report', active: false, trigger: 'Every Sunday', action: 'Email report' },
    { id: 5, title: 'Budget Limit Alert', active: true, trigger: 'Expenses > 80% budget', action: 'Send TG message' },
    { id: 6, title: 'Auto Focus Mode', active: false, trigger: 'At 9:00 AM', action: 'Turn on Deep Focus' },
    { id: 7, title: 'Mute Notifications', active: true, trigger: 'Focus Mode started', action: 'Turn on DND' },
    { id: 8, title: 'Sync Habits to Notion', active: false, trigger: 'Habit checked', action: 'Update Notion DB' },
    { id: 9, title: 'Motivation Reminder', active: false, trigger: 'No habit done by 8 PM', action: 'Send TG message' },
    { id: 10, title: 'Auto-tag Large Expense', active: true, trigger: 'Expense > 1,000,000₫', action: 'Tag as Major' },
  ]);

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleCreate = () => {
    alert('Creating custom automations will be supported in a future update! Try toggling the predefined ones.');
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Automations</h2>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20">
          <Plus size={16} /> Create Automation
        </button>
      </div>

      <div className="space-y-4">
        {automations.map(auto => (
          <Card key={auto.id} className="hover:border-indigo-500/30 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${auto.active ? 'bg-indigo-500/10 text-indigo-600' : 'bg-secondary text-muted-foreground'}`}>
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{auto.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Play size={14} className="text-emerald-500" /> {auto.trigger}</span>
                    <span>→</span>
                    <span className="flex items-center gap-1"><CheckCircle size={14} className="text-indigo-500" /> {auto.action}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={auto.active} onChange={() => toggleAutomation(auto.id)} />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

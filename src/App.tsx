import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { TasksView } from './components/TasksView';
import { FocusView } from './components/FocusView';
import { CalendarView } from './components/CalendarView';
import { HabitsView } from './components/HabitsView';
import { ExpensesView } from './components/ExpensesView';
import { AnalyticsView } from './components/AnalyticsView';
import { AutomationView } from './components/AutomationView';
import { SettingsView } from './components/SettingsView';
import { ViewType } from './types';
import { AppProvider, useAppContext } from './context/AppContext';

import { QuickAddModal } from './components/QuickAddModal';
import { SearchModal } from './components/SearchModal';

function MainLayout() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickAddTab, setQuickAddTab] = useState<'task' | 'habit' | 'expense'>('task');
  const { currentUser, login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-card p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] w-full max-w-sm border border-border">
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              H
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>
          <form onSubmit={(e) => { e.preventDefault(); login(email, password); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" required />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-2">Sign into Workspace</button>
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Demo Accounts</p>
              <p className="text-xs text-muted-foreground">Admin: minhtri89.no1@gmail.com / Lov3nov3l@89</p>
              <p className="text-xs text-muted-foreground">User: user@gmail.com / password</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const openQuickAdd = (tab: 'task' | 'habit' | 'expense') => {
    setQuickAddTab(tab);
    setIsQuickAddOpen(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard onQuickAdd={openQuickAdd} />;
      case 'tasks': return <TasksView onOpenAdd={() => openQuickAdd('task')} />;
      case 'calendar': return <CalendarView onOpenAdd={() => openQuickAdd('task')} />;
      case 'habits': return <HabitsView onOpenAdd={() => openQuickAdd('habit')} />;
      case 'focus': return <FocusView />;
      case 'expenses': return <ExpensesView onOpenAdd={() => openQuickAdd('expense')} />;
      case 'analytics': return <AnalyticsView />;
      case 'automation': return <AutomationView />;
      case 'settings': return <SettingsView />;
      default: return <div className="p-8 text-center text-muted-foreground">View under construction.</div>;
    }
  };

  const getViewTitle = () => activeView.charAt(0).toUpperCase() + activeView.slice(1);

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground font-sans">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-secondary/50">
        <Topbar title={getViewTitle()} onQuickAdd={() => openQuickAdd('task')} onSearch={() => setIsSearchOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      <QuickAddModal 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)} 
        defaultTab={quickAddTab} 
      />
      
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

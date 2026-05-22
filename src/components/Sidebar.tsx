import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CheckSquare, Calendar, Activity, 
  Clock, CreditCard, BarChart2, Zap, Settings, Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewType } from '../types';
import { useAppContext } from '../context/AppContext';

interface SidebarProps {
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
}

const navItems: { id: ViewType; label: string; icon: any }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'habits', label: 'Habits', icon: Activity },
  { id: 'focus', label: 'Focus', icon: Clock },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onChangeView }: SidebarProps) {
  const { currentUser } = useAppContext();

  return (
    <div className="w-60 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-primary-foreground font-bold text-lg">
          H
        </div>
      </div>
      
      <div className="px-3 pb-2 pt-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-secondary hover:bg-black/5 rounded-md transition-colors">
          <Search size={16} />
          <span>Search...</span>
          <span className="ml-auto text-xs border border-border rounded px-1.5 py-0.5">⌘K</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">Main Menu</div>
        {navItems.slice(0, 5).map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative group",
                isActive ? "text-foreground bg-black/5 border border-black/5" : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )}
            >
              <Icon size={16} className={cn(isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        <div className="pt-4 px-3 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">Finance & Ops</div>
        {navItems.slice(5).map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative group",
                isActive ? "text-foreground bg-black/5 border border-black/5" : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )}
            >
              <Icon size={16} className={cn(isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3 bg-secondary p-2 rounded-lg">
          <img src={currentUser?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=b6e3f4'} alt="avatar" className="w-8 h-8 rounded-full border border-border" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">{currentUser?.name || 'Guest'}</span>
            <span className="text-[10px] text-muted-foreground italic">{currentUser?.role === 'admin' ? 'Admin' : 'Premium Plan'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

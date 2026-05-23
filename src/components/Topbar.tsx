import { Bell, Plus, Search } from 'lucide-react';
import { ViewType } from '../types';
import { useAppContext } from '../context/AppContext';

interface TopbarProps {
  title: string;
  onQuickAdd: () => void;
  onSearch: () => void;
}

export function Topbar({ title, onQuickAdd, onSearch }: TopbarProps) {
  const { currentUser } = useAppContext();

  return (
    <header className="h-14 border-b border-border px-8 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-tighter">
          {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h2>
        <div className="h-4 w-[1px] bg-border"></div>
        <span className="text-sm font-semibold">Chào buổi sáng, {currentUser?.name?.split(' ')[0] || 'Trí'}!</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={onSearch} className="p-1.5 hover:bg-secondary rounded-md border border-border text-muted-foreground transition-colors">
          <Search size={16} />
        </button>
        <button className="p-1.5 hover:bg-secondary rounded-md border border-border text-primary transition-colors">
          <Bell size={16} />
        </button>
        <button onClick={onQuickAdd} className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-md text-xs font-bold flex items-center gap-2 transition-colors">
          <Plus size={14} />
          <span>Quick Add</span>
        </button>
      </div>
    </header>
  );
}

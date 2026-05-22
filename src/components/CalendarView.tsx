import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card } from './ui/Card';

export function CalendarView({ onOpenAdd }: { onOpenAdd: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // Mock some events randomly
      const hasEvent = Math.random() > 0.8;
      
      days.push(
        <div
          className={`min-h-[100px] border-b border-r border-border p-2 transition-colors hover:bg-secondary bg-card flex flex-col ${
            !isSameMonth(day, monthStart)
              ? "text-muted-foreground opacity-50 bg-secondary/30"
              : isSameDay(day, new Date())
              ? "text-primary font-bold bg-primary/5 ring-1 ring-inset ring-primary/30"
              : "text-foreground"
          }`}
          key={day.toString()}
        >
          <span className="flex justify-end p-1">
            <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-mono shadow-sm ${isSameDay(day, new Date()) ? 'bg-primary text-white shadow-primary/20' : ''}`}>{formattedDate}</span>
          </span>
          <div className="flex-1 overflow-y-auto mt-1 space-y-1">
             {hasEvent && (
              <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded truncate">
                10:00 - Team Sync
              </div>
             )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 text-sm" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-4 text-foreground">
          <button onClick={prevMonth} className="p-1.5 hover:bg-secondary rounded-md border border-border transition-colors text-muted-foreground hover:text-foreground"><ChevronLeft size={16} /></button>
          <span className="min-w-[140px] text-center font-mono tracking-wide">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={nextMonth} className="p-1.5 hover:bg-secondary rounded-md border border-border transition-colors text-muted-foreground hover:text-foreground"><ChevronRight size={16} /></button>
        </h2>
        <button onClick={onOpenAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Add Event
        </button>
      </div>
      
      <Card className="flex-1 flex flex-col border-border shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border text-center py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/50">
           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {rows}
        </div>
      </Card>
    </div>
  )
}

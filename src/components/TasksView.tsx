import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, CheckCircle2, Circle, Clock, Tag, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Task, TaskStatus } from '../types';
import { Card } from './ui/Card';

export function TasksView({ onOpenAdd }: { onOpenAdd: () => void }) {
  const { tasks, deleteTask } = useAppContext();
  const [viewMode, setViewMode] = useState<'list' | 'board'>('board');

  const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-white text-black' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500 text-white' },
    { id: 'waiting', title: 'Waiting', color: 'bg-orange-500 text-white' },
    { id: 'done', title: 'Done', color: 'bg-green-500 text-white' }
  ];

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('board')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'board' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
          >
            Board
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
          >
            List
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={onOpenAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>

      {viewMode === 'board' ? (
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-6 h-full min-w-max pb-4">
            {columns.map(col => {
              const colTasks = tasks.filter(t => t.status === col.id);
              
              return (
                <div key={col.id} className="w-80 flex flex-col max-h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${col.color}`}>
                        {col.title}
                      </span>
                      <span className="text-muted-foreground text-sm font-medium">{colTasks.length}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-3 pb-2 pr-1">
                    {colTasks.map((task, idx) => (
                      <TaskCard key={task.id} task={task} index={idx} onDelete={() => deleteTask(task.id)} />
                    ))}
                    {colTasks.length === 0 && (
                      <div className="h-24 border border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm">
          <p className="text-muted-foreground">List view implementation goes here</p>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, index, onDelete }: { task: Task, index: number, onDelete: () => void, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="hover:border-primary/50 cursor-pointer group bg-card border-border transition-colors relative shadow-sm">
        <div className="p-4">
          <div className="flex items-start justify-between mb-2 gap-2">
            <div className="flex items-start gap-2 flex-1">
              <button className="mt-0.5 text-muted-foreground hover:text-primary transition-colors shrink-0">
                {task.status === 'done' ? <CheckCircle2 size={16} className="text-primary" /> : <Circle size={16} />}
              </button>
              <h4 className={`text-sm font-medium leading-tight ${task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </h4>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 text-muted-foreground hover:text-rose-500 rounded hover:bg-rose-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          {(task.tags || task.estimatedTime) && (
            <div className="mt-4 flex items-center gap-3 overflow-hidden ml-6 text-xs text-muted-foreground">
              {task.estimatedTime && (
                <div className="flex items-center gap-1 shrink-0">
                  <Clock size={12} />
                  <span>{task.estimatedTime}m</span>
                </div>
              )}
              {task.tags && task.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
                  <Tag size={12} className="shrink-0" />
                  <div className="flex gap-1 overflow-hidden">
                    {task.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-secondary text-[10px] uppercase font-semibold rounded leading-none whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

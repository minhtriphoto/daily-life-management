import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Target, Droplet, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';
import { useAppContext } from '../context/AppContext';

const productivityData = [
  { day: 'Mon', hours: 4.5 },
  { day: 'Tue', hours: 6.2 },
  { day: 'Wed', hours: 5.8 },
  { day: 'Thu', hours: 7.1 },
  { day: 'Fri', hours: 4.0 },
  { day: 'Sat', hours: 2.1 },
  { day: 'Sun', hours: 1.5 },
];

interface DashboardProps {
  onQuickAdd: (tab: 'task' | 'habit' | 'expense') => void;
}

export function Dashboard({ onQuickAdd }: DashboardProps) {
  const { currentUser, tasks, habits } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Good morning, {currentUser?.name?.split(' ')[0] || 'User'}</h2>
          <p className="text-muted-foreground text-sm">Here is what's happening today.</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-2xl font-mono tracking-tight">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Productivity Score / Focus */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={16} className="text-primary" />
                Focus & Productivity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-semibold">28.4</span>
                  <span className="text-sm text-muted-foreground">hrs this week</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-500 font-medium bg-green-500/10 w-fit px-2 py-0.5 rounded">
                  <span>+12%</span> vs last week
                </div>
              </div>
              <div className="h-32 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} dy={10} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e4e4e7', borderRadius: '8px' }} />
                    <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                      {productivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#e4e4e7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  Today's Priority
                </span>
                <button className="text-xs font-medium text-primary hover:underline">View all</button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="p-3 bg-secondary rounded-lg border border-border flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <button className="mt-0.5 text-muted-foreground hover:text-primary transition-colors">
                        {task.status === 'done' ? <CheckCircle2 size={16} className="text-primary" /> : <Circle size={16} />}
                      </button>
                      <div className="flex-1">
                        <span className={`text-sm ${task.status === 'done' ? 'line-through opacity-50 text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                    {task.estimatedTime && (
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded">
                        {task.estimatedTime}m
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Habits */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Daily Habits Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {habits.map((habit) => {
                  const progress = habit.currentCount / habit.targetCount;
                  return (
                    <div key={habit.id} className="bg-secondary rounded-xl p-4 border border-border flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
                      <span className="text-3xl mb-2">{habit.icon}</span>
                      <span className="text-sm font-medium">{habit.title}</span>
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <span className={progress >= 1 ? "text-emerald-600 font-bold" : ""}>{habit.currentCount}</span>
                        <span>/</span>
                        <span>{habit.targetCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(progress * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Water Intake Quick Widget */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="h-full flex flex-col bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-blue-900/30">
            <CardHeader className="border-blue-900/20">
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Droplet size={16} />
                Water Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center relative">
              <div className="text-center relative z-10 w-full">
                <div className="text-4xl font-bold text-blue-100 mb-1">1.2<span className="text-xl text-blue-400 font-medium">L</span></div>
                <div className="text-xs text-blue-500 uppercase tracking-widest font-semibold mb-6">Of 2.5L Goal</div>
              </div>
              
              <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 active:translate-y-0.5">
                <Plus size={16} />
                Add 250ml
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

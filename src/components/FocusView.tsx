import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Coffee, Settings } from 'lucide-react';

export function FocusView() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break' | 'read' | 'code' | 'gaming'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const getTargetTimeForMode = (m: 'focus' | 'break' | 'read' | 'code' | 'gaming') => {
    if (m === 'focus') return 25 * 60;
    if (m === 'break') return 5 * 60;
    if (m === 'read') return 60 * 60;
    if (m === 'code') return 90 * 60;
    if (m === 'gaming') return 120 * 60;
    return 25 * 60;
  };

  const getModeColor = () => {
    switch(mode) {
      case 'focus': return 'stroke-primary';
      case 'break': return 'stroke-emerald-500';
      case 'read': return 'stroke-amber-600';
      case 'code': return 'stroke-cyan-600';
      case 'gaming': return 'stroke-purple-600';
      default: return 'stroke-primary';
    }
  }

  const getModeText = () => {
    switch(mode) {
      case 'focus': return 'Do Not Disturb';
      case 'break': return 'Resting';
      case 'read': return 'Reading Mode';
      case 'code': return 'Coding Session';
      case 'gaming': return 'Game On';
      default: return '';
    }
  }

  const getModeBtnColor = () => {
    switch(mode) {
      case 'focus': return 'bg-primary hover:bg-primary/90 shadow-primary/30';
      case 'break': return 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30';
      case 'read': return 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30';
      case 'code': return 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30';
      case 'gaming': return 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30';
      default: return 'bg-primary hover:bg-primary/90';
    }
  }

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getTargetTimeForMode(mode));
  };

  const switchMode = (newMode: 'focus' | 'break' | 'read' | 'code' | 'gaming') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(getTargetTimeForMode(newMode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const progress = 1 - (timeLeft / getTargetTimeForMode(mode));

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 bg-secondary p-1.5 rounded-3xl mb-12 border border-border shadow-inner">
          <button 
            onClick={() => switchMode('focus')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${mode === 'focus' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Deep Focus
          </button>
          <button 
            onClick={() => switchMode('read')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${mode === 'read' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Read Book
          </button>
          <button 
            onClick={() => switchMode('code')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${mode === 'code' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Vibe Code
          </button>
          <button 
            onClick={() => switchMode('gaming')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${mode === 'gaming' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Gaming
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 uppercase tracking-wider ${mode === 'break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Coffee size={14} /> Break
          </button>
        </div>

        <div className="relative w-80 h-80 flex items-center justify-center mb-12">
          {/* Circular Progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="150"
              className="stroke-border fill-none"
              strokeWidth="6"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="150"
              className={`fill-none ${getModeColor()}`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={150 * 2 * Math.PI}
              initial={{ strokeDashoffset: 150 * 2 * Math.PI }}
              animate={{ strokeDashoffset: (150 * 2 * Math.PI) * (1 - progress) }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          
          <div className="text-center">
            <h2 className="text-7xl font-mono font-medium tracking-tighter tabular-nums mb-2 text-foreground drop-shadow-sm">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h2>
            <p className="text-primary font-bold uppercase tracking-widest text-[10px]">
              {getModeText()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-all">
            <Volume2 size={20} />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 shadow-xl ${getModeBtnColor()}`}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-all"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

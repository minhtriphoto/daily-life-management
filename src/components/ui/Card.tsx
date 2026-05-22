import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  key?: React.Key;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-xl overflow-hidden shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-4 border-b border-border flex items-center justify-between bg-card", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3 className={cn("text-xs font-bold uppercase tracking-wider text-muted-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

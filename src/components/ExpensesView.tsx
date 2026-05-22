import React from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, Coffee, Car, Utensils, MonitorPlay, Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { useAppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export function ExpensesView({ onOpenAdd }: { onOpenAdd: () => void }) {
  const { expenses, deleteExpense, income, budget } = useAppContext();
  const pieData = [
    { name: 'Food/Dining', value: 35 },
    { name: 'Transport', value: 15 },
    { name: 'Entertainment', value: 20 },
    { name: 'Shopping', value: 30 },
  ];
  const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981'];

  const barData = [
    { name: '1', amount: 150000 },
    { name: '2', amount: 320000 },
    { name: '3', amount: 45000 },
    { name: '4', amount: 200000 },
    { name: '5', amount: 850000 },
    { name: '6', amount: 120000 },
    { name: '7', amount: 55000 },
  ];

  const getIconForCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'cafe': return <Coffee size={16} />;
      case 'transport': return <Car size={16} />;
      case 'food': return <Utensils size={16} />;
      case 'entertainment': return <MonitorPlay size={16} />;
      default: return <Coffee size={16} />;
    }
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Expenses</h2>
        <button onClick={onOpenAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Total Spent (This Month)</p>
            <h3 className="text-4xl font-mono font-bold text-foreground tracking-tight">
              {expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              <span className="text-xl text-muted-foreground ml-1">₫</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-2">of {budget.toLocaleString()}₫ budget</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 bg-secondary hover:bg-black/5 transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <p className="text-xs text-muted-foreground mb-2 flex items-center justify-between uppercase tracking-widest font-bold">
              Income <ArrowUpRight size={14} className="text-emerald-600" />
            </p>
            <h3 className="text-2xl font-mono font-bold text-emerald-600">+{income.toLocaleString()}<span className="text-sm ml-1">₫</span></h3>
          </CardContent>
        </Card>
        <Card className="col-span-1 bg-secondary hover:bg-black/5 transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <p className="text-xs text-muted-foreground mb-2 flex items-center justify-between uppercase tracking-widest font-bold">
              Fixed Bills <ArrowDownRight size={14} className="text-rose-600" />
            </p>
            <h3 className="text-2xl font-mono font-bold text-rose-600">-3.2M<span className="text-sm ml-1">₫</span></h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest">Recent Transactions</h3>
              <button className="text-xs text-primary hover:text-primary/80 font-medium">View All</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {expenses.map(expense => (
                <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer border border-transparent hover:border-border group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center border border-border font-bold shadow-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {getIconForCategory(expense.category)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{expense.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{expense.category} • {expense.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-foreground font-mono font-medium text-sm">
                      - {expense.amount.toLocaleString()} ₫
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); deleteExpense(expense.id); }} className="text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[250px] flex flex-col items-center justify-center relative bg-card p-4">
            <h3 className="absolute top-5 left-5 font-semibold text-xs text-muted-foreground uppercase tracking-widest">Spending Profile</h3>
            <ResponsiveContainer width="100%" height={200} className="mt-8">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e4e4e7', borderRadius: '8px' }}
                  itemStyle={{ fill: '#09090b', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="h-40 flex flex-col p-4 bg-card">
            <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-4">Last 7 Days</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Bar dataKey="amount" fill="#4f46e5" radius={[2, 2, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}

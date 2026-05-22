import React, { useState } from 'react';
import { Trash2, ShieldAlert, LogOut, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useAppContext } from '../context/AppContext';

export function SettingsView() {
  const { currentUser, logout, resetAll, income, setIncome, budget, setBudget } = useAppContext();
  const isAdmin = currentUser?.role === 'admin';

  const [localIncome, setLocalIncome] = useState(income.toString());
  const [localBudget, setLocalBudget] = useState(budget.toString());

  const handleSaveFinances = () => {
    setIncome(Number(localIncome) || 0);
    setBudget(Number(localBudget) || 0);
    alert('Financial settings saved!');
  }

  return (
    <div className="p-6 md:p-8 h-full flex flex-col max-w-4xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={currentUser?.avatar} alt="Avatar" className="w-16 h-16 rounded-full border border-border" />
            <div>
              <p className="font-semibold text-lg">{currentUser?.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser?.email} • {isAdmin ? 'Admin' : 'User'}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Monthly Income (VND)</label>
              <input type="number" value={localIncome} onChange={e => setLocalIncome(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Monthly Budget (VND)</label>
              <input type="number" value={localBudget} onChange={e => setLocalBudget(e.target.value)} className="w-full p-2.5 border border-border bg-background rounded-lg outline-none focus:border-primary transition-colors text-sm" />
            </div>
          </div>
          <button onClick={handleSaveFinances} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md justify-center border border-transparent transition-colors shadow-sm font-medium text-sm">
            <Save size={16} /> Save Finance Settings
          </button>
        </CardContent>
      </Card>

      {isAdmin && (
        <Card className="border-rose-500/30">
          <CardHeader>
            <CardTitle className="text-rose-500 flex items-center gap-2">
               <ShieldAlert size={16} /> Danger Zone (Admin Only)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
               As the family/workspace administrator, you have the ability to reset all data. This action is irreversible.
            </p>
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to reset all tasks, habits, and expenses? This cannot be undone.')) {
                  resetAll();
                }
              }}
              className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-md justify-center border border-rose-200 transition-colors shadow-sm font-medium"
            >
              <Trash2 size={16} /> Reset All System Data
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { UserRole, AppState, BusinessConfig, Transaction, InventoryItem, Employee } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import FinanceModule from './components/FinanceModule';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('bizscale_state');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: true, // Auto-login for MVP simplicity
      userRole: UserRole.ADMIN,
      businessConfig: null,
      transactions: [],
      inventory: [],
      employees: []
    };
  });

  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('bizscale_state', JSON.stringify(state));
  }, [state]);

  const handleOnboarding = (config: BusinessConfig) => {
    setState(prev => ({ ...prev, businessConfig: config }));
  };

  const addTransaction = (t: Transaction) => {
    setState(prev => ({ ...prev, transactions: [t, ...prev.transactions] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('bizscale_state');
    window.location.reload();
  };

  if (!state.businessConfig) {
    return <Onboarding onComplete={handleOnboarding} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard state={state} />;
      case 'finance': return <FinanceModule state={state} onAddTransaction={addTransaction} />;
      case 'inventory': return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
          <i className="fas fa-boxes-stacked text-6xl mb-4"></i>
          <h2 className="text-2xl font-bold">Inventory Module</h2>
          <p>This module is coming soon in the next update.</p>
        </div>
      );
      case 'employees': return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
          <i className="fas fa-users text-6xl mb-4"></i>
          <h2 className="text-2xl font-bold">Staff Management</h2>
          <p>Payroll and Attendance features are under construction.</p>
        </div>
      );
      case 'settings': return (
        <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Business Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Company Name</label>
              <p className="text-lg font-bold">{state.businessConfig.name}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Business Type</label>
              <p className="text-lg font-bold">{state.businessConfig.type}</p>
            </div>
            <button 
              onClick={() => setState({...state, businessConfig: null})}
              className="mt-6 text-red-600 font-bold hover:underline"
            >
              Reset Business Configuration
            </button>
          </div>
        </div>
      );
      default: return <Dashboard state={state} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      businessConfig={state.businessConfig}
      userRole={state.userRole}
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
};

export default App;

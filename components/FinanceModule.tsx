
import React, { useState } from 'react';
import { Transaction, AppState } from '../types';

interface FinanceModuleProps {
  state: AppState;
  onAddTransaction: (t: Transaction) => void;
}

const FinanceModule: React.FC<FinanceModuleProps> = ({ state, onAddTransaction }) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<'SALE' | 'EXPENSE'>('SALE');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date
    });
    setShowModal(false);
    setFormData({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Financial Ledger</h2>
          <p className="text-slate-500">Track every penny in and out of your business.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Add Entry
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {state.transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                    <div className="mb-4 text-4xl opacity-20">
                      <i className="fas fa-inbox"></i>
                    </div>
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                state.transactions.sort((a,b) => b.date.localeCompare(a.date)).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.type === 'SALE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">{t.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">{t.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${
                      t.type === 'SALE' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {t.type === 'SALE' ? '+' : '-'}{state.businessConfig?.currency} {t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md p-10 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800">New Transaction</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setType('SALE')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'SALE' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
                >
                  Sale
                </button>
                <button
                  type="button"
                  onClick={() => setType('EXPENSE')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'EXPENSE' ? 'bg-white shadow-sm text-red-600' : 'text-slate-400'}`}
                >
                  Expense
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount ({state.businessConfig?.currency})</label>
                  <input
                    required
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold text-xl"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                  <input
                    required
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none"
                    placeholder="e.g. Inventory, Utilities, Daily Sales"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl transition-all ${
                  type === 'SALE' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Add {type === 'SALE' ? 'Income' : 'Expense'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceModule;

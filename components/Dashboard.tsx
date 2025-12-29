
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AppState } from '../types';
import { BUSINESS_MODELS } from '../constants';
import { getBusinessInsights } from '../services/geminiService';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const [insights, setInsights] = useState<{ summary: string, recommendations: string[] } | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const businessModel = BUSINESS_MODELS.find(m => m.id === state.businessConfig?.type);
  const sales = state.transactions.filter(t => t.type === 'SALE');
  const expenses = state.transactions.filter(t => t.type === 'EXPENSE');
  
  const totalSales = sales.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalSales - totalExpenses;

  // Mock data for charts - in a real app these would come from state
  const chartData = [
    { name: 'Mon', sales: 4000, expenses: 2400 },
    { name: 'Tue', sales: 3000, expenses: 1398 },
    { name: 'Wed', sales: 2000, expenses: 9800 },
    { name: 'Thu', sales: 2780, expenses: 3908 },
    { name: 'Fri', sales: 1890, expenses: 4800 },
    { name: 'Sat', sales: 2390, expenses: 3800 },
    { name: 'Sun', sales: 3490, expenses: 4300 },
  ];

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getBusinessInsights(state);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [state]);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-10">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <i className="fas fa-coins text-xl md:text-2xl"></i>
            </div>
            <span className="text-green-500 font-bold text-xs bg-green-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1">
              {state.businessConfig?.currency} {totalSales.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <i className="fas fa-receipt text-xl md:text-2xl"></i>
            </div>
            <span className="text-rose-500 font-bold text-xs bg-rose-50 px-2 py-1 rounded-lg">+4%</span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Expenses</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1">
              {state.businessConfig?.currency} {totalExpenses.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <i className="fas fa-hand-holding-dollar text-xl md:text-2xl"></i>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Net Profit</p>
            <h3 className={`text-xl md:text-2xl font-black mt-1 ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {state.businessConfig?.currency} {netProfit.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
              <i className="fas fa-boxes-stacked text-xl md:text-2xl"></i>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Items</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1">
              {state.inventory.length} SKUs
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Financial Growth</h3>
            <div className="flex bg-slate-50 p-1 rounded-xl w-full sm:w-auto">
              <button className="flex-1 sm:px-4 py-2 text-xs font-bold bg-white text-blue-600 shadow-sm rounded-lg transition-all">Weekly</button>
              <button className="flex-1 sm:px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all">Monthly</button>
            </div>
          </div>
          <div className="h-[250px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}} 
                  itemStyle={{fontWeight: 700}}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#f43f5e" 
                  strokeWidth={4} 
                  fill="transparent" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 rounded-xl">
                <i className="fas fa-wand-magic-sparkles text-blue-400"></i>
              </span>
              Insights AI
            </h3>
            
            {loadingInsights ? (
              <div className="space-y-6 animate-pulse mt-4">
                <div className="h-4 bg-slate-800 rounded-full w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-slate-800 rounded-2xl w-full"></div>
                  <div className="h-20 bg-slate-800 rounded-2xl w-full"></div>
                </div>
              </div>
            ) : insights ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {insights.summary}
                </p>
                <div className="space-y-3 flex-1">
                  {insights.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-[1.25rem] border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="min-w-[28px] h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-100 font-medium leading-snug">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-4">
                  <i className="fas fa-robot text-2xl"></i>
                </div>
                <p className="text-slate-500 italic text-sm">Waiting for more data to generate insights.</p>
                <button 
                   onClick={() => window.location.reload()}
                   className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40"
                >
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Row: Business Specific KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {businessModel?.metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-all">
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{metric}</p>
              <h4 className="text-xl md:text-2xl font-black text-slate-800">
                {idx === 0 ? '94%' : idx === 1 ? 'LOW' : 'TOP-3'}
              </h4>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
              idx === 0 ? 'bg-blue-50 text-blue-500' : 
              idx === 1 ? 'bg-emerald-50 text-emerald-500' : 
              'bg-amber-50 text-amber-500'
            }`}>
              <i className={`fas ${idx === 0 ? 'fa-chart-pie' : idx === 1 ? 'fa-bolt' : 'fa-trophy'}`}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

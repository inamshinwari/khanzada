
import React, { useState } from 'react';
import { UserRole, BusinessConfig } from '../types';
import { BUSINESS_MODELS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  businessConfig: BusinessConfig | null;
  userRole: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, businessConfig, userRole, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const businessModel = BUSINESS_MODELS.find(m => m.id === businessConfig?.type);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
    { id: 'finance', label: 'Finance', icon: 'fa-money-bill-wave' },
    ...(businessModel?.modules.includes('Inventory') ? [{ id: 'inventory', label: 'Inventory', icon: 'fa-boxes-stacked' }] : []),
    ...(businessModel?.modules.includes('Employees') ? [{ id: 'employees', label: 'Employees', icon: 'fa-users' }] : []),
    ...(userRole === UserRole.ADMIN ? [{ id: 'settings', label: 'Settings', icon: 'fa-cog' }] : []),
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false); // Close mobile drawer on navigation
  };

  const handleContentClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false); // Close mobile drawer when clicking content
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Backdrop for Mobile: Closes sidebar when background is clicked */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out md:relative md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0 md:w-auto'}
          ${sidebarOpen ? 'md:w-64' : 'md:w-20'} 
          flex flex-col shadow-2xl
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800 min-w-[280px] md:min-w-0">
          {(sidebarOpen || mobileMenuOpen) ? (
            <span className="font-bold text-xl tracking-tight flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <i className="fas fa-layer-group text-blue-400 shrink-0"></i>
              <span className="animate-fade-in">BizScale</span>
            </span>
          ) : (
            <i className="fas fa-layer-group text-blue-400 text-2xl mx-auto"></i>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-slate-500 hover:text-white transition-colors">
            <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <nav className="flex-1 mt-6 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-all ${
                activeView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center text-lg shrink-0`}></i>
              {(sidebarOpen || mobileMenuOpen) && <span className="ml-3 font-medium whitespace-nowrap animate-fade-in">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center p-3 text-red-400 hover:bg-red-900/30 rounded-xl transition-colors group"
          >
            <i className="fas fa-sign-out-alt w-6 text-center shrink-0 group-hover:translate-x-1 transition-transform"></i>
            {(sidebarOpen || mobileMenuOpen) && <span className="ml-3 font-medium whitespace-nowrap animate-fade-in">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col overflow-hidden min-w-0 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}
        onClick={handleContentClick}
      >
        {/* Topbar */}
        <header className="bg-white h-16 shadow-sm border-b border-gray-100 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true); }}
              className="p-2 -ml-2 text-slate-600 md:hidden hover:bg-slate-50 rounded-lg transition-colors"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="hidden sm:flex p-2 bg-slate-50 rounded-lg shrink-0">{businessModel?.icon}</span>
              <h1 className="text-base md:text-xl font-bold text-slate-800 truncate max-w-[120px] sm:max-w-none">
                {businessConfig?.name}
              </h1>
            </div>
            <span className="hidden xs:inline-block bg-blue-50 text-blue-600 text-[10px] md:text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wider border border-blue-100 shrink-0">
              {businessConfig?.type.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">{userRole === UserRole.ADMIN ? 'Administrator' : 'Employee'}</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live
              </p>
            </div>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 shrink-0 ring-2 ring-white">
              {userRole === UserRole.ADMIN ? 'A' : 'E'}
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active role based on path, fallback to localStorage
  const getRole = () => {
    if (location.pathname.startsWith('/officer')) return 'officer';
    if (location.pathname.startsWith('/enterprise')) return 'enterprise';
    return localStorage.getItem('userRole') || 'enterprise';
  };

  const isOfficer = getRole() === 'officer';

  // Menu lists based on current role
  const enterpriseMenu = [
    { name: 'Dashboard', icon: 'dashboard', path: '/enterprise/dashboard' },
    { name: 'Cash Flow', icon: 'payments', path: '/enterprise/cashflow' },
    { name: 'Risk Alerts', icon: 'warning', path: '/enterprise/risk-analysis' },
    { name: 'AI Recommendations', icon: 'trending_up', path: '/enterprise/recommendations' },
    { name: 'Alerts Center', icon: 'campaign', path: '/alerts' },
  ];

  const officerMenu = [
    { name: 'Dashboard', icon: 'dashboard', path: '/officer/dashboard' },
    { name: 'Portfolio Analytics', icon: 'analytics', path: '/officer/analytics' },
    { name: 'Enterprise Profile', icon: 'store', path: '/officer/enterprise' },
    { name: 'Alerts Center', icon: 'campaign', path: '/alerts' },
  ];

  const activeMenu = isOfficer ? officerMenu : enterpriseMenu;

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col pt-24 pb-8 px-4 z-40 bg-surface-container-lowest dark:bg-surface-container border-r border-outline-variant w-64 shadow-md transition-all hidden md:flex">


      <nav className="flex-1 space-y-2">
        {activeMenu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-md rounded-xl px-4 py-3.5 transition-all overflow-hidden font-semibold ${
                isActive
                  ? 'bg-[#e8f5e9] text-[#0d631b] border-l-4 border-[#0d631b] shadow-sm font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={() => alert('Demo Action: Add Transaction modal would open here.')}
        className="mt-auto bg-primary text-on-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm"
      >
        <span className="material-symbols-outlined font-bold">add</span>
        <span>Add Transaction</span>
      </button>
    </aside>
  );
}

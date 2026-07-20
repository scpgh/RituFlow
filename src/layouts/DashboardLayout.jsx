import React from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

export default function DashboardLayout() {
  const location = useLocation();

  // Determine active role based on path, fallback to localStorage
  const getRole = () => {
    if (location.pathname.startsWith('/officer')) return 'officer';
    if (location.pathname.startsWith('/enterprise')) return 'enterprise';
    return localStorage.getItem('userRole') || 'enterprise';
  };

  const isOfficer = getRole() === 'officer';

  // Mobile Bottom Navigation config
  const enterpriseMobileMenu = [
    { name: 'Dashboard', icon: 'dashboard', path: '/enterprise/dashboard' },
    { name: 'Cash Flow', icon: 'payments', path: '/enterprise/cashflow' },
    { name: 'Risk', icon: 'warning', path: '/enterprise/risk-analysis' },
    { name: 'Insights', icon: 'trending_up', path: '/enterprise/recommendations' },
  ];

  const officerMobileMenu = [
    { name: 'Dashboard', icon: 'dashboard', path: '/officer/dashboard' },
    { name: 'Analytics', icon: 'analytics', path: '/officer/analytics' },
    { name: 'Profile', icon: 'store', path: '/officer/enterprise' },
    { name: 'Alerts', icon: 'campaign', path: '/alerts' },
  ];

  const mobileMenu = isOfficer ? officerMobileMenu : enterpriseMobileMenu;

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 md:pl-64 min-h-screen px-gutter pb-24 md:pb-8">
          <div className="max-w-container-max mx-auto py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Suppressed on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-16 flex items-center justify-around px-4 z-50 border-t border-outline-variant/30">
        {mobileMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={() =>
                `flex flex-col items-center gap-1 text-[10px] transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

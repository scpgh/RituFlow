import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active role based on path, fallback to localStorage
  const getInitialRole = () => {
    if (location.pathname.startsWith('/officer')) return 'officer';
    if (location.pathname.startsWith('/enterprise')) return 'enterprise';
    return localStorage.getItem('userRole') || 'enterprise';
  };

  const [role, setRole] = useState(getInitialRole());

  useEffect(() => {
    const activeRole = getInitialRole();
    setRole(activeRole);
    localStorage.setItem('userRole', activeRole);
  }, [location.pathname]);

  const isOfficer = role === 'officer';
  
  const handleRoleToggle = () => {
    const newRole = isOfficer ? 'enterprise' : 'officer';
    localStorage.setItem('userRole', newRole);
    setRole(newRole);
    if (newRole === 'officer') {
      navigate('/officer/dashboard');
    } else {
      navigate('/enterprise/dashboard');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-20 bg-surface dark:bg-surface-dim shadow-sm border-b border-outline-variant/30">
      <div 
        onClick={() => navigate(isOfficer ? '/officer/dashboard' : '/enterprise/dashboard')} 
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        <img src="/l2.png" alt="RituFlow Logo" className="h-14 w-auto object-contain shrink-0" />
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-primary dark:text-primary-fixed leading-tight tracking-tight">RituFlow</h1>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Rural Fintech</p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary text-body-md" 
            placeholder={isOfficer ? "Search enterprises by name, sector or village..." : "Search transactions, alerts, updates..."} 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-md">
        {/* Role Quick Switcher for Demo */}
        <button 
          onClick={handleRoleToggle} 
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-outline hover:bg-surface-container-high transition-colors text-label-sm font-bold"
          title="Toggle view between Micro-Enterprise and Field Officer"
        >
          <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          <span className="hidden lg:inline">Switch to {isOfficer ? 'Enterprise' : 'Officer'}</span>
        </button>

        <button 
          onClick={() => navigate('/alerts')} 
          className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <button 
          onClick={() => {
            localStorage.removeItem('userRole');
            navigate('/login');
          }} 
          className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant flex items-center justify-center"
          title="Logout"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
}

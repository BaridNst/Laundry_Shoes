import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Box, LogOut, Wallet } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('kasir');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['kasir', 'pemilik'] },
    { name: 'Data Antrean', path: '/queue', icon: <Users className="w-5 h-5" />, roles: ['kasir', 'pemilik'] },
    { name: 'Stok Bahan', path: '/stock', icon: <Box className="w-5 h-5" />, roles: ['kasir', 'pemilik'] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard Overview';
    if (location.pathname.startsWith('/queue')) return 'Data Antrean';
    if (location.pathname === '/stock') return 'Stok Bahan';
    return location.pathname.replace('/', '');
  };

  return (
    <div className="min-h-screen bg-brand-gray font-sans flex flex-col md:flex-row selection:bg-brand-cedar selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-black text-white flex flex-col md:min-h-screen relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-cedar/30 rounded-full blur-2xl"></div>

        <div className="p-6 border-b border-white/10 relative z-10">
          <h1 className="text-2xl font-black tracking-tight text-white">Barid</h1>
          <p className="text-xs text-brand-purple-light font-bold uppercase tracking-widest mt-1">Laundry Shoes</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 relative z-10">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-cedar text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.39)]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 relative z-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl font-bold transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="glass-panel mx-6 mt-6 px-8 py-5 flex justify-between items-center shrink-0 rounded-2xl z-10">
          <h2 className="text-xl font-black text-brand-black capitalize">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-brand-black leading-none capitalize">{role}</p>
              <p className="text-xs text-brand-black/50 mt-1 font-semibold">{role}@soleclean.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-cedar/10 border border-brand-cedar/30 flex items-center justify-center text-brand-cedar font-black text-lg shadow-sm">
              {role.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, UserCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('kasir');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-gray relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-purple-light/40 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-cedar/30 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md glass-panel p-10 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-brand-black tracking-tight mb-2">
            Barid
          </h1>
          <p className="text-brand-cedar font-bold text-xs uppercase tracking-widest">
            Laundry Shoes System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-brand-purple-light" />
              </div>
              <input
                type="email"
                required
                defaultValue="kasir@soleclean.com"
                className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-brand-purple-light/30 rounded-xl text-brand-black font-medium focus:ring-2 focus:ring-brand-cedar focus:border-transparent transition-all outline-none"
                placeholder="Masukkan email..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-brand-purple-light" />
              </div>
              <input
                type="password"
                required
                defaultValue="password"
                className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-brand-purple-light/30 rounded-xl text-brand-black font-medium focus:ring-2 focus:ring-brand-cedar focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">
              Masuk Sebagai
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserCircle className="h-5 w-5 text-brand-purple-light" />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-brand-purple-light/30 rounded-xl text-brand-black font-medium focus:ring-2 focus:ring-brand-cedar focus:border-transparent transition-all outline-none appearance-none"
              >
                <option value="kasir">Kasir</option>
                <option value="pemilik">Pemilik</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 btn-primary flex justify-between items-center"
          >
            <span>{loading ? 'MEMPROSES...' : 'MASUK KE SISTEM'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

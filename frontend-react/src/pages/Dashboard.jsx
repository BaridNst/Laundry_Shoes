import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CheckCircle, AlertTriangle, ArrowRight, Wallet, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('kasir');
  const [recentQueue, setRecentQueue] = useState([]);
  const [laporan, setLaporan] = useState({
    total_pendapatan: 0,
    total_antrean_aktif: 0,
    selesai_hari_ini: 0
  });

  useEffect(() => {
    const storedRole = localStorage.getItem('role') || 'kasir';
    setRole(storedRole);

    // Fetch Antrean
    fetch('http://localhost:8000/api/antrean')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setRecentQueue(data.slice(0, 5)); // Ambil 5 terbaru
        }
      })
      .catch(err => console.error(err));

    // Fetch Laporan
    if (storedRole === 'pemilik') {
      fetch('http://localhost:8000/api/laporan-keuangan')
        .then(res => res.json())
        .then(data => setLaporan(data))
        .catch(err => console.error(err));
    } else {
      // Untuk kasir hanya perlu tau antrean aktif, bisa ambil dari data array
      fetch('http://localhost:8000/api/laporan-keuangan')
        .then(res => res.json())
        .then(data => setLaporan(prev => ({...prev, total_antrean_aktif: data.total_antrean_aktif, selesai_hari_ini: data.selesai_hari_ini})))
        .catch(err => console.error(err));
    }
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const getStats = () => {
    if (role === 'pemilik') {
      return [
        { label: 'Total Pendapatan', value: formatRupiah(laporan.total_pendapatan), icon: <Wallet className="w-6 h-6" />, color: 'bg-brand-black text-white' },
        { label: 'Antrean Aktif', value: laporan.total_antrean_aktif.toString(), icon: <Package className="w-6 h-6" />, color: 'bg-brand-cedar text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.39)]' },
        { label: 'Selesai Hari Ini', value: laporan.selesai_hari_ini.toString(), icon: <CheckCircle className="w-6 h-6" />, color: 'bg-green-50 text-green-700 border border-green-200' },
      ];
    } else {
      return [
        { label: 'Antrean Aktif', value: laporan.total_antrean_aktif.toString(), icon: <Package className="w-6 h-6" />, color: 'bg-brand-cedar text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.39)]' },
        { label: 'Selesai Hari Ini', value: laporan.selesai_hari_ini.toString(), icon: <CheckCircle className="w-6 h-6" />, color: 'bg-brand-black text-white' },
        { label: 'Peringatan Stok', value: '0', icon: <AlertTriangle className="w-6 h-6" />, color: 'bg-red-50 text-red-600 border border-red-100' },
      ];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Quick Action for Kasir */}
      {role === 'kasir' && (
        <div className="flex justify-end mb-4">
          <button onClick={() => navigate('/queue')} className="btn-primary flex items-center gap-2">
            + Tambah Pelanggan Baru
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getStats().map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl flex items-center justify-between transition-transform hover:-translate-y-1 ${stat.color} shadow-sm`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black">{stat.value}</h3>
            </div>
            <div className="opacity-80">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Antrean Table */}
      <div className="glass-panel overflow-hidden">
        <div className="px-6 py-5 border-b border-brand-purple-light/20 flex justify-between items-center bg-white/50">
          <h3 className="text-sm font-black text-brand-black uppercase tracking-widest">Antrean Terbaru</h3>
          <button onClick={() => navigate('/queue')} className="text-xs font-bold text-brand-cedar hover:text-brand-purple-dark flex items-center gap-1 transition-colors">
            Lihat Semua <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-gray/30 border-b border-brand-purple-light/20">
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Kode</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Pelanggan</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Layanan</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Tgl. Selesai</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Cucian</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Pembayaran</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-black/50 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-purple-light/10">
              {recentQueue.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-brand-black/50 font-medium">Belum ada data antrean.</td>
                </tr>
              ) : recentQueue.map((item) => (
                <tr key={item.id} className="hover:bg-brand-purple-light/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-black text-brand-black">{item.kode_antrean}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-brand-black">{item.nama_pelanggan}</p>
                    <p className="text-xs text-brand-black/50 mt-1">{item.tanggal_terima}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-black capitalize">{item.jenis_layanan.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-black">{item.tanggal_selesai}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                      item.status_cucian === 'selesai' || item.status_cucian === 'diambil' ? 'bg-green-50 text-green-700 border-green-200' :
                      item.status_cucian === 'dicuci' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {item.status_cucian}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${item.status_pembayaran === 'lunas' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                      {item.status_pembayaran.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => navigate(`/queue/${item.kode_antrean}`)}
                      className="text-xs font-bold text-brand-cedar hover:text-brand-purple-dark transition-colors bg-brand-cedar/10 px-3 py-1.5 rounded-lg"
                    >
                      Kelola
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

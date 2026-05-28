import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Search, ArrowRight } from 'lucide-react';

export default function QueueList() {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nama_pelanggan: '',
    no_whatsapp: '',
    jenis_sepatu: '',
    jenis_layanan: 'deep_clean',
    total_harga: '',
    status_cucian: 'antri',
    status_pembayaran: 'belum_bayar',
    tanggal_terima: new Date().toISOString().split('T')[0],
    tanggal_selesai: ''
  });

  const fetchQueues = () => {
    setLoading(true);
    fetch('http://localhost:8000/api/antrean')
      .then(res => res.json())
      .then(data => {
        setQueues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);

    fetch('http://localhost:8000/api/antrean', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setFormLoading(false);
        setIsModalOpen(false);
        fetchQueues(); // Refresh data
        // Reset form
        setFormData({
          nama_pelanggan: '',
          no_whatsapp: '',
          jenis_sepatu: '',
          jenis_layanan: 'deep_clean',
          total_harga: '',
          status_cucian: 'antri',
          status_pembayaran: 'belum_bayar',
          tanggal_terima: new Date().toISOString().split('T')[0],
          tanggal_selesai: ''
        });
      })
      .catch(err => {
        console.error(err);
        setFormLoading(false);
        alert('Gagal menambahkan antrean.');
      });
  };

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Daftar Antrean</h1>
          <p className="text-sm text-brand-black/60 font-medium mt-1">Kelola semua antrean laundry sepatu di sini.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Antrean Baru
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="px-6 py-5 border-b border-brand-purple-light/20 flex justify-between items-center bg-white/50">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-black/40" />
            <input
              type="text"
              placeholder="Cari pelanggan..."
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-brand-purple-light/30 rounded-lg text-sm text-brand-black font-medium focus:ring-2 focus:ring-brand-cedar outline-none transition-all"
            />
          </div>
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-brand-black/50 font-medium">Memuat data...</td>
                </tr>
              ) : queues.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-brand-black/50 font-medium">Belum ada antrean.</td>
                </tr>
              ) : queues.map((item) => (
                <tr key={item.id} className="hover:bg-brand-purple-light/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-black text-brand-black">{item.kode_antrean}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-brand-black">{item.nama_pelanggan}</p>
                    <p className="text-xs text-brand-black/50 mt-1">{item.tanggal_terima}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-black capitalize">{item.jenis_layanan.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-black">{item.tanggal_selesai}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${item.status_cucian === 'selesai' || item.status_cucian === 'diambil' ? 'bg-green-50 text-green-700 border-green-200' :
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
                      className="text-xs font-bold text-brand-cedar hover:text-brand-purple-dark transition-colors bg-brand-cedar/10 px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      Kelola <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Antrean */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

            <div className="px-6 py-5 border-b border-brand-purple-light/20 flex justify-between items-center bg-brand-gray/30">
              <h2 className="text-xl font-black text-brand-black">Tambah Antrean Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-black/50 hover:text-brand-black transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="addQueueForm" onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Nama Pelanggan</label>
                    <input type="text" name="nama_pelanggan" value={formData.nama_pelanggan} onChange={handleInputChange} required className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">No. WhatsApp</label>
                    <input type="text" name="no_whatsapp" value={formData.no_whatsapp} onChange={handleInputChange} required className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" placeholder="0812..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Jenis Sepatu</label>
                    <input type="text" name="jenis_sepatu" value={formData.jenis_sepatu} onChange={handleInputChange} required className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" placeholder="Sneakers Nike" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Jenis Layanan</label>
                    <select name="jenis_layanan" value={formData.jenis_layanan} onChange={handleInputChange} className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all appearance-none">
                      <option value="deep_clean">Deep Clean</option>
                      <option value="fast_clean">Fast Clean</option>
                      <option value="unyellowing">Unyellowing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Tanggal Terima</label>
                    <input type="date" name="tanggal_terima" value={formData.tanggal_terima} onChange={handleInputChange} required className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Tanggal Selesai</label>
                    <input type="date" name="tanggal_selesai" value={formData.tanggal_selesai} onChange={handleInputChange} required className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Total Harga (Rp)</label>
                    <input type="number" name="total_harga" value={formData.total_harga} onChange={handleInputChange} required min="0" className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all" placeholder="50000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-black/70 uppercase tracking-wider mb-2">Status Pembayaran</label>
                    <select name="status_pembayaran" value={formData.status_pembayaran} onChange={handleInputChange} className="w-full px-4 py-3 bg-brand-gray border border-brand-purple-light/30 rounded-xl text-brand-black focus:ring-2 focus:ring-brand-cedar outline-none transition-all appearance-none">
                      <option value="belum_bayar">Belum Bayar</option>
                      <option value="lunas">Lunas</option>
                    </select>
                  </div>
                </div>

              </form>
            </div>

            <div className="px-6 py-5 border-t border-brand-purple-light/20 flex justify-end gap-3 bg-brand-gray/30">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" form="addQueueForm" disabled={formLoading} className="btn-primary">
                {formLoading ? 'Menyimpan...' : 'Simpan Antrean'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, MessageSquare, Loader2, Info, ArrowLeft, Calendar } from 'lucide-react';

// Komponen Toast Minimalis
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="glass-panel text-brand-black px-6 py-4 flex items-center gap-3">
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-brand-cedar" />
        ) : (
          <Info className="w-5 h-5 text-red-400" />
        )}
        <p className="text-sm font-bold tracking-wide">{message}</p>
        <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 transition-opacity">
          &times;
        </button>
      </div>
    </div>
  );
};

export default function QueueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [activePreview, setActivePreview] = useState('antri');

  useEffect(() => {
    fetch(`http://localhost:8000/api/antrean/${id}`)
      .then(res => res.json())
      .then(data => {
        if(data.status !== 'error') {
          setCustomerData(data);
          setPhoneNumber(data.no_whatsapp);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number || 0);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const getPreviewMessage = (statusType = activePreview) => {
    if (!customerData) return '';
    const name = customerData.nama_pelanggan.split(' ')[0];
    const service = customerData.jenis_layanan.replace('_', ' ').toUpperCase();
    const statusBayar = customerData.status_pembayaran === 'lunas' ? 'LUNAS' : 'Belum Bayar';

    switch (statusType) {
      case 'antri':
        return `*ANTRIPROGRESS - BARID LAUNDRY SHOES* 👟

Halo *${name}*,
Terima kasih telah mempercayakan perawatan sepatu Anda kepada kami. Sepatu Anda telah berhasil masuk ke dalam sistem antrean kami.

Berikut adalah detail nota digital Anda:
------------------------------------------
▪️ *Kode Antrean :* ${customerData.kode_antrean}
▪️ *Jenis Sepatu :* ${customerData.jenis_sepatu}
▪️ *Layanan      :* ${service}
▪️ *Total Biaya  :* ${formatRupiah(customerData.total_harga)} (Status: ${statusBayar})
▪️ *Estimasi Selesai :* ${customerData.tanggal_selesai}
------------------------------------------

Status pengerjaan sepatu Anda dapat dipantau secara berkala. Kami akan mengirimkan notifikasi kembali jika sepatu Anda sudah masuk ke tahap pencucian.

_Note: Harap simpan pesan ini untuk mendapatkan pembaruan status laundry Anda._

Best regards,
*Barid Laundry Shoes*`;

      case 'dicuci':
        return `*WORK IN PROGRESS - BARID LAUNDRY SHOES* 🧼

Halo *${name}*,
Kami ingin menginformasikan bahwa sepatu Anda saat ini sedang ditangani oleh spesialis kami.

------------------------------------------
▪️ *Kode Antrean :* ${customerData.kode_antrean}
▪️ *Jenis Sepatu :* ${customerData.jenis_sepatu}
▪️ *Tahap Kini   :* Sedang dalam Proses Pencucian / Perawatan Detailing
------------------------------------------

Kami memastikan setiap bagian sepatu Anda dibersihkan menggunakan cairan khusus (premium cleaner) yang aman untuk material sepatu tersebut. Mohon tunggu notifikasi selanjutnya setelah proses *quality control* selesai.

Terima kasih atas kesabaran Anda.

Best regards,
*Barid Laundry Shoes*`;

      case 'selesai':
        const bayarText = customerData.status_pembayaran === 'lunas' ? 'LUNAS' : `Sisa Pembayaran: ${formatRupiah(customerData.total_harga)}`;
        return `*READY FOR PICKUP - BARID LAUNDRY SHOES* ✨

Halo *${name}*,
Kabar baik! Proses perawatan sepatu Anda telah selesai 100% dan sudah lulus uji *quality control*. Sepatu Anda kini sudah bersih, segar, dan siap untuk diambil.

------------------------------------------
▪️ *Kode Antrean :* ${customerData.kode_antrean}
▪️ *Jenis Sepatu :* ${customerData.jenis_sepatu}
▪️ *Status Bayar :* ${bayarText}
------------------------------------------

*Jam Operasional Toko:*
Senin - Minggu (09.00 - 21.00 WIB)

Silakan tunjukkan *Kode Antrean* di atas kepada kasir kami saat melakukan pengambilan. Sampai jumpa di toko kami!

Best regards,
*Barid Laundry Shoes*`;

      default:
        return '';
    }
  };

  const handleSendNotification = (tipe_notifikasi) => {
    setIsLoading(tipe_notifikasi);

    let waNumber = phoneNumber;
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }

    const message = encodeURIComponent(getPreviewMessage(tipe_notifikasi));
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      showToast('Berhasil membuka WhatsApp untuk mengirim pesan.', 'success');
      setIsLoading(null);
    }, 800);
  };

  const handleUpdateStatus = (field, value) => {
    fetch(`http://localhost:8000/api/antrean/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [field]: value })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === 'sukses') {
        setCustomerData(data.data);
        showToast(`Status berhasil diperbarui menjadi ${value.replace('_', ' ')}`, 'success');
      } else {
        showToast('Gagal memperbarui status', 'error');
      }
    })
    .catch(err => {
      console.error(err);
      showToast('Terjadi kesalahan', 'error');
    });
  };

  if (!customerData) {
    return <div className="text-center p-10 font-bold text-brand-black">Memuat data...</div>;
  }

  return (
    <div className="animate-fade-in pb-10">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-brand-black/50 hover:text-brand-cedar mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">

        {/* 2. CARD DETAIL ANTREAN (Sisi Kiri) */}
        <section className="lg:col-span-5">
          <div className="glass-panel p-8 transition-all hover:-translate-y-1">

            <div className="flex justify-between items-start mb-8 border-b border-brand-purple-light/20 pb-6">
              <div>
                <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1">Kode Antrean</p>
                <h2 className="text-3xl font-black text-brand-cedar">{customerData.kode_antrean}</h2>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                      customerData.status_cucian === 'selesai' || customerData.status_cucian === 'diambil' ? 'bg-green-50 text-green-700 border-green-200' :
                      customerData.status_cucian === 'dicuci' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {customerData.status_cucian}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1">Pelanggan</p>
              <h3 className="text-xl font-bold text-brand-black mb-2">{customerData.nama_pelanggan}</h3>
              <p className="text-brand-black/70 flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="w-4 h-4 text-brand-cedar" />
                {customerData.no_whatsapp}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div>
                <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1">Jenis Sepatu</p>
                <p className="text-sm font-bold text-brand-black">{customerData.jenis_sepatu}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1">Layanan</p>
                <p className="text-sm font-bold text-brand-black capitalize">{customerData.jenis_layanan.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Tgl. Terima</p>
                <p className="text-sm font-bold text-brand-black">{customerData.tanggal_terima}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Tgl. Selesai</p>
                <p className="text-sm font-bold text-brand-black">{customerData.tanggal_selesai}</p>
              </div>

              <div className="col-span-2 border-t border-brand-purple-light/20 pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-1">Total Biaya</p>
                    <p className="text-2xl font-black text-brand-cedar">{formatRupiah(customerData.total_harga)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border ${customerData.status_pembayaran === 'lunas'
                        ? 'bg-brand-black text-white border-brand-black'
                        : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                      {customerData.status_pembayaran.replace('_', ' ')}
                    </div>
                    {customerData.status_pembayaran === 'belum_bayar' && (
                      <button 
                        onClick={() => handleUpdateStatus('status_pembayaran', 'lunas')}
                        className="text-xs font-bold text-brand-cedar hover:text-brand-purple-dark underline"
                      >
                        Tandai Lunas
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Aksi Ubah Status Cucian */}
            <div className="mt-8 pt-6 border-t border-brand-purple-light/20">
              <p className="text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-3">Ubah Status Cucian</p>
              <div className="flex flex-wrap gap-2">
                {['antri', 'dicuci', 'selesai', 'diambil'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus('status_cucian', status)}
                    disabled={customerData.status_cucian === status}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                      customerData.status_cucian === status 
                        ? 'bg-brand-black text-white cursor-not-allowed' 
                        : 'bg-brand-purple-light/10 text-brand-black hover:bg-brand-purple-light/30'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. PANEL KONTROL WHATSAPP NOTIFICATION (Sisi Kanan) */}
        <section className="lg:col-span-7">
          <div className="glass-panel p-8 h-full flex flex-col">

            <h3 className="text-lg font-black text-brand-black mb-6 border-b border-brand-purple-light/20 pb-4">
              Kirim Notifikasi WhatsApp
            </h3>

            <div className="mb-8">
              <label className="block text-sm font-bold text-brand-black mb-2">
                Nomor WhatsApp Tujuan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-brand-cedar" />
                </div>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-brand-purple-light/30 rounded-xl text-brand-black font-medium focus:ring-2 focus:ring-brand-cedar transition-all outline-none"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <label className="block text-sm font-bold text-brand-black mb-2">
                Pilih Teks & Kirim
              </label>

              {[
                { type: 'antri', label: 'Kirim Bukti Masuk Antrean' },
                { type: 'dicuci', label: 'Kirim Notifikasi Proses Cuci' },
                { type: 'selesai', label: 'Kirim Notifikasi Siap Diambil' }
              ].map((btn) => (
                <div
                  key={btn.type}
                  className="flex flex-col sm:flex-row gap-2"
                  onMouseEnter={() => setActivePreview(btn.type)}
                >
                  <button
                    onClick={() => handleSendNotification(btn.type)}
                    disabled={isLoading !== null && isLoading !== false}
                    className={`flex-1 flex justify-between items-center px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-sm
                      ${activePreview === btn.type ? 'bg-brand-cedar text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] scale-[1.01]' : 'bg-white/50 text-brand-black hover:bg-brand-purple-light/20'}
                      ${isLoading === btn.type ? 'opacity-80 cursor-wait' : ''}
                      ${(isLoading !== null && isLoading !== btn.type && isLoading !== false) ? 'opacity-50 grayscale' : ''}
                    `}
                  >
                    <span>{isLoading === btn.type ? 'MENGALIHKAN KE WA...' : btn.label}</span>
                    {isLoading === btn.type ? (
                      <Loader2 className="w-5 h-5 animate-spin text-white/70" />
                    ) : (
                      <Send className={`w-5 h-5 ${activePreview === btn.type ? 'opacity-100 text-white' : 'opacity-40 text-brand-cedar'}`} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Live Preview Message */}
            <div className="mt-auto pt-6 border-t border-brand-purple-light/20">
              <label className="block text-xs font-bold text-brand-black/50 uppercase tracking-wider mb-3">
                Live Preview Teks (Status: <span className="text-brand-cedar">{activePreview}</span>)
              </label>
              <div className="bg-brand-purple-light/10 border-l-4 border-brand-cedar p-5 rounded-r-xl relative">
                <p className="text-sm text-brand-black/80 whitespace-pre-line leading-relaxed font-medium">
                  {getPreviewMessage()}
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

<?php

namespace App\Repositories;

use App\Contracts\DashboardContract;
use App\Models\Antrean;
use App\Models\Inventory;
use Carbon\Carbon;

class DashboardRepository implements DashboardContract
{
    // Menghitung jumlah 'Antrean Aktif' (yang belum diambil/selesai)
    public function getActiveOrdersCount()
    {
        return Antrean::whereIn('status_cucian', ['antri', 'dicuci'])->count();
    }

    // Menghitung jumlah cucian yang statusnya 'selesai' pada HARI INI
    public function getCompletedTodayCount()
    {
        return Antrean::where('status_cucian', 'selesai')
                    ->whereDate('updated_at', Carbon::today())
                    ->count();
    }

    // Menghitung berapa jenis bahan yang stoknya mau habis (< 5) untuk kotak merah warning
    public function getLowStockCount()
    {
        // Guard check incase Inventory doesn't exist
        if (!class_exists(Inventory::class)) {
            return 0;
        }
        return Inventory::where('stok', '<', 5)->count();
    }

    // Laporan Keuangan (pindahan dari AntreanController)
    public function getLaporanKeuangan()
    {
        $totalPendapatan = Antrean::where('status_pembayaran', 'lunas')->sum('total_harga');
        $totalAntrean = Antrean::where('status_cucian', '!=', 'diambil')->count();
        $selesaiHariIni = Antrean::where('status_cucian', 'selesai')->count();

        return [
            'total_pendapatan' => $totalPendapatan,
            'total_antrean_aktif' => $totalAntrean,
            'selesai_hari_ini' => $selesaiHariIni,
        ];
    }
}
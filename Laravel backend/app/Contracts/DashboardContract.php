<?php

namespace App\Contracts;

interface DashboardContract
{
    // Menghitung jumlah 'Antrean Aktif' (pada gambar ada 3)
    public function getActiveOrdersCount();

    // Menghitung jumlah cucian yang 'Selesai Hari Ini'
    public function getCompletedTodayCount();

    // Menghitung berapa jenis bahan yang masuk 'Peringatan Stok'
    public function getLowStockCount();

    // Laporan Keuangan
    public function getLaporanKeuangan();
}
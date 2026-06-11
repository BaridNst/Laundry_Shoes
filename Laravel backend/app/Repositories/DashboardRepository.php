<?php

namespace App\Repositories;

use App\Contracts\DashboardContract;
use App\Models\Order;
use App\Models\Inventory;
use Carbon\Carbon;

class DashboardRepository implements DashboardContract
{
    // Menghitung jumlah 'Antrean Aktif' (yang belum diambil/selesai)
    public function getActiveOrdersCount()
    {
        return Order::whereIn('status_cucian', ['ANTRI', 'DICUCI'])->count();
    }

    // Menghitung jumlah cucian yang statusnya 'DIAMBIL' atau selesai pada HARI INI
    public function getCompletedTodayCount()
    {
        return Order::where('status_cucian', 'DIAMBIL')
                    ->whereDate('updated_at', Carbon::today())
                    ->count();
    }

    // Menghitung berapa jenis bahan yang stoknya mau habis (< 5) untuk kotak merah warning
    public function getLowStockCount()
    {
        return Inventory::where('stok', '<', 5)->count();
    }
}
<?php

namespace App\Repositories;

use App\Contracts\InventoryContract;
use App\Models\Inventory; // Sesuaikan dengan nama Model Laravel kamu

class InventoryRepository implements InventoryContract
{
    // Mengambil semua list bahan/stok untuk halaman Stok Bahan
    public function getAllItems()
    {
        return Inventory::all();
    }

    // Update jumlah stok (tambah/kurang)
    public function updateStock(int $itemId, int $quantity)
    {
        $item = Inventory::findOrFail($itemId);
        $item->stok = $quantity;
        $item->save();

        return $item;
    }

    // Mencari bahan yang stoknya kritis/mau habis (misal stok di bawah 5)
    public function getLowStockAlerts()
    {
        return Inventory::where('stok', '<', 5)->get();
    }
}
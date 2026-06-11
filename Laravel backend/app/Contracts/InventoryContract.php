<?php

namespace App\Contracts;

interface InventoryContract
{
    // Mengambil semua daftar bahan/stok
    public function getAllItems();

    // Menambah bahan baru atau restock jumlah bahan
    public function updateStock(int $itemId, int $quantity);

    // Mengecek bahan yang hampir habis (untuk memicu "Peringatan Stok" di dashboard)
    public function getLowStockAlerts();
}
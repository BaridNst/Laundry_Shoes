<?php

namespace App\Contracts;

interface OrderContract
{
    // Mengambil semua data antrean terupdate
    public function getLatestOrders(int $limit = 10);

    // Membuat antrean/orderan laundry baru (ketika klik + Tambah Pelanggan Baru)
    public function createOrder(array $data);

    // Update status cucian (misal: dari ANTRI -> DICUCI -> DIAMBIL)
    public function updateCucianStatus(int $orderId, string $status);

    // Update status pembayaran (misal: dari BELUM BAYAR -> LUNAS)
    public function updatePaymentStatus(int $orderId, string $status);
}
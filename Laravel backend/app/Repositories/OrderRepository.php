<?php

namespace App\Repositories;

use App\Contracts\OrderContract;
use App\Models\Order; // Sesuaikan dengan nama Model Laravel kamu

class OrderRepository implements OrderContract
{
    // Mengambil antrean terbaru untuk ditampilkan di tabel dashboard
    public function getLatestOrders(int $limit = 10)
    {
        return Order::orderBy('created_at', 'desc')->take($limit)->get();
    }

    // Membuat antrean laundry baru saat klik "+ Tambah Pelanggan Baru"
    public function createOrder(array $data)
    {
        return Order::create([
            'kode_antrean' => $data['kode_antrean'], // misal: ANT005
            'pelanggan'    => $data['pelanggan'],
            'layanan'      => $data['layanan'],
            'tgl_selesai'  => $data['tgl_selesai'],
            'status_cucian'=> 'ANTRI', // Default awal masuk
            'pembayaran'   => 'BELUM BAYAR', // Default awal masuk
        ]);
    }

    // Mengubah status cucian (ANTRI -> DICUCI -> DIAMBIL)
    public function updateCucianStatus(int $orderId, string $status)
    {
        $order = Order::findOrFail($orderId);
        $order->status_cucian = $status;
        $order->save();

        return $order;
    }

    // Mengubah status pembayaran (BELUM BAYAR -> LUNAS)
    public function updatePaymentStatus(int $orderId, string $status)
    {
        $order = Order::findOrFail($orderId);
        $order->pembayaran = $status;
        $order->save();

        return $order;
    }
}
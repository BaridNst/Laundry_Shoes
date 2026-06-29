<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;

class AntreanController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        $antreans = $this->orderService->getAllOrders();
        return response()->json($antreans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pelanggan' => 'required|string|max:100',
            'no_whatsapp' => 'required|string|max:20',
            'jenis_sepatu' => 'required|string|max:50',
            'jenis_layanan' => 'required|in:deep_clean,fast_clean,unyellowing',
            'total_harga' => 'required|integer',
            'status_cucian' => 'required|in:antri,dicuci,selesai,diambil',
            'status_pembayaran' => 'required|in:belum_bayar,lunas',
            'tanggal_terima' => 'required|date',
            'tanggal_selesai' => 'required|date',
        ]);

        $antrean = $this->orderService->createOrder($validated);

        // --- KODE WHATSAPP GATEWAY (Saat Antrean Baru Dibuat) ---
        $pesanWA = "Halo {$antrean->nama_pelanggan}, pesanan cuci sepatu Anda dengan kode {$antrean->kode_antrean} telah kami terima dan masuk ke dalam antrean. Terima kasih!";
        $this->sendWhatsAppNotification($antrean->no_whatsapp, $pesanWA);

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Antrean berhasil ditambahkan',
            'data' => $antrean
        ]);
    }

    public function show($id)
    {
        $antrean = $this->orderService->getOrderById($id);

        if ($antrean) {
            return response()->json($antrean);
        }

        return response()->json(['status' => 'error', 'pesan' => 'Antrean tidak ditemukan'], 404);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'status_cucian' => 'sometimes|in:antri,dicuci,selesai,diambil',
            'status_pembayaran' => 'sometimes|in:belum_bayar,lunas',
        ]);

        $antrean = $this->orderService->updateOrder($id, $validated);

        if (!$antrean) {
            return response()->json(['status' => 'error', 'pesan' => 'Antrean tidak ditemukan'], 404);
        }

        // --- KODE WHATSAPP GATEWAY (Saat Status Selesai) ---
        if (isset($validated['status_cucian']) && $validated['status_cucian'] == 'selesai') {
            $pesanWA = "Halo {$antrean->nama_pelanggan}, sepatu Anda sudah selesai dicuci dan siap untuk diambil ya!";
            $this->sendWhatsAppNotification($antrean->no_whatsapp, $pesanWA);
        }

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Antrean berhasil diupdate',
            'data' => $antrean
        ]);
    }

    /**
     * ========================================================
     * KODE THIRD-PARTY API WHATSAPP GATEWAY (MENGGUNAKAN GUZZLE)
     * ========================================================
     */
    private function sendWhatsAppNotification($no_whatsapp, $pesan)
    {
        // Contoh implementasi menggunakan Vendor Fonnte (Berbasis Guzzle HTTP)
        // Token API biasanya disimpan di .env (misal: env('FONNTE_TOKEN'))
        $apiToken = 'TOKEN_API_WHATSAPP_KAMU_DISINI'; 

        try {
            // Kita menggunakan Laravel HTTP Facade (yang di belakangnya adalah Guzzle HTTP Client)
            \Illuminate\Support\Facades\Http::withHeaders([
                'Authorization' => $apiToken,
            ])->post('https://api.fonnte.com/send', [
                'target' => $no_whatsapp,
                'message' => $pesan,
                'countryCode' => '62', // Kode negara Indonesia
            ]);
        } catch (\Exception $e) {
            // Log error jika WhatsApp gagal terkirim (agar aplikasi tidak crash)
            \Illuminate\Support\Facades\Log::error('WhatsApp Error: ' . $e->getMessage());
        }
    }
}

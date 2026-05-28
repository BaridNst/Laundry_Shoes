<?php

namespace App\Http\Controllers;

use App\Models\Antrean;
use Illuminate\Http\Request;

class AntreanController extends Controller
{
    public function index()
    {
        $antreans = Antrean::orderBy('id', 'desc')->get();
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

        // Generate Kode Antrean (e.g. ANT001)
        $latest = Antrean::orderBy('id', 'desc')->first();
        if ($latest) {
            $lastNumber = intval(substr($latest->kode_antrean, 3));
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
            $validated['kode_antrean'] = 'ANT' . $newNumber;
        } else {
            $validated['kode_antrean'] = 'ANT001';
        }

        $antrean = Antrean::create($validated);

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Antrean berhasil ditambahkan',
            'data' => $antrean
        ]);
    }

    public function show($id)
    {
        $antrean = Antrean::find($id);
        if (!$antrean) {
            $antrean = Antrean::where('kode_antrean', $id)->first();
        }

        if ($antrean) {
            return response()->json($antrean);
        }

        return response()->json(['status' => 'error', 'pesan' => 'Antrean tidak ditemukan'], 404);
    }

    public function update(Request $request, $id)
    {
        $antrean = Antrean::find($id);
        if (!$antrean) {
            $antrean = Antrean::where('kode_antrean', $id)->first();
        }

        if (!$antrean) {
            return response()->json(['status' => 'error', 'pesan' => 'Antrean tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'status_cucian' => 'sometimes|in:antri,dicuci,selesai,diambil',
            'status_pembayaran' => 'sometimes|in:belum_bayar,lunas',
        ]);

        $antrean->update($validated);

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Antrean berhasil diupdate',
            'data' => $antrean
        ]);
    }

    public function laporanKeuangan()
    {
        // Simple aggregate
        $totalPendapatan = Antrean::where('status_pembayaran', 'lunas')->sum('total_harga');
        $totalAntrean = Antrean::where('status_cucian', '!=', 'diambil')->count();
        $selesaiHariIni = Antrean::where('status_cucian', 'selesai')->count(); // simplified

        return response()->json([
            'total_pendapatan' => $totalPendapatan,
            'total_antrean_aktif' => $totalAntrean,
            'selesai_hari_ini' => $selesaiHariIni,
        ]);
    }
}

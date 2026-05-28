<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AntreanController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/tes-koneksi', function () {
    return response()->json([
        'status' => 'sukses',
        'pesan' => 'Halo! Koneksi antara Laravel dan React sudah berhasil terhubung!'
    ]);
});

Route::get('/laporan-keuangan', [AntreanController::class, 'laporanKeuangan']);
Route::apiResource('antrean', AntreanController::class);

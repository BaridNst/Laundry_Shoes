<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrean extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_antrean',
        'nama_pelanggan',
        'no_whatsapp',
        'jenis_sepatu',
        'jenis_layanan',
        'total_harga',
        'status_cucian',
        'status_pembayaran',
        'tanggal_terima',
        'tanggal_selesai'
    ];

    public $timestamps = false; // We use created_at and updated_at with nullable, but let's let Laravel handle timestamps if they exist, or just leave it. The migration uses `nullable` for created_at and updated_at. We will enable timestamps.
}

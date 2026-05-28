<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['name' => 'Pemilik Toko', 'email' => 'pemilik@soleclean.com', 'password' => Hash::make('password'), 'role' => 'pemilik'],
            ['name' => 'Kasir Satu', 'email' => 'kasir@soleclean.com', 'password' => Hash::make('password'), 'role' => 'kasir'],
        ]);

        DB::table('antreans')->insert([
            [
                'kode_antrean' => 'ANT001',
                'nama_pelanggan' => 'Andi',
                'no_whatsapp' => '081234567890',
                'jenis_sepatu' => 'Sneakers Nike',
                'jenis_layanan' => 'deep_clean',
                'total_harga' => 50000,
                'status_cucian' => 'antri',
                'status_pembayaran' => 'belum_bayar',
            ],
            [
                'kode_antrean' => 'ANT002',
                'nama_pelanggan' => 'Budi',
                'no_whatsapp' => '081298765432',
                'jenis_sepatu' => 'Sepatu Kulit',
                'jenis_layanan' => 'fast_clean',
                'total_harga' => 30000,
                'status_cucian' => 'dicuci',
                'status_pembayaran' => 'lunas',
            ]
        ]);

        DB::table('stok_bahans')->insert([
            [
                'nama_bahan' => 'Sabun Cuci Premium',
                'jenis_bahan' => 'sabun',
                'volume_ml' => 5000,
                'batas_minimum' => 1000,
                'status_stok' => 'aman'
            ],
            [
                'nama_bahan' => 'Parfum Sepatu Kopi',
                'jenis_bahan' => 'parfum',
                'volume_ml' => 800,
                'batas_minimum' => 1000,
                'status_stok' => 'kritis'
            ]
        ]);
    }
}

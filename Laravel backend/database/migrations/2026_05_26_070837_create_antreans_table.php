<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('antreans', function (Blueprint $table) {
            $table->id();
            $table->string('kode_antrean', 10)->unique();
            $table->string('nama_pelanggan', 100);
            $table->string('no_whatsapp', 20);
            $table->string('jenis_sepatu', 50);
            $table->enum('jenis_layanan', ['deep_clean', 'fast_clean', 'unyellowing']);
            $table->integer('total_harga');
            $table->enum('status_cucian', ['antri', 'dicuci', 'selesai', 'diambil']);
            $table->enum('status_pembayaran', ['belum_bayar', 'lunas']);
            $table->date('tanggal_terima');
            $table->date('tanggal_selesai');
            $table->timestamp('tanggal_masuk')->useCurrent();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antreans');
    }
};

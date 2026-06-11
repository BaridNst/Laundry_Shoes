Identitas Kelompok

---

Nama Kelompok: Kelompok 9

Nama Proyek / Aplikasi: SoleClean RKTI (Sistem Manajemen Stok & Antrean Jasa Cuci Sepatu)

Jumlah Anggota: 3 orang

Repositori: https://github.com/BaridNst/Kelompok-9
---
Anggota & Role

Anggota 1
- Nama Lengkap: Ajmalussirah
- NIM: 230705048
- Role: Frontend
- Teknologi: React.js, Tailwind CSS, Axios, Context API

Anggota 2
- Nama Lengkap: A Barid Dinda Khair Nasution
- NIM: 230705197
- Role: Backend
- Teknologi: Laravel 11, Guzzle HTTP Client, Laravel Sanctum, MySQL Driver

Anggota 3
- Nama Lengkap: Muhammad Abiyyi Thufail
- NIM: 230705146
- Role: DevOps
- Teknologi: MySQL, Docker, GitHub Actions, Nginx, Render.com

---
Stack Teknologi

Frontend: React.js

Backend: Laravel 11

Database: MySQL

DevOps / Infrastruktur: Docker, GitHub Actions, Nginx, Render.com (Free Tier)

---

Arsitektur Aplikasi

Sistem ini dirancang menggunakan arsitektur berbasis layanan (service-based) dengan memisahkan aplikasi Frontend dan Backend. Aplikasi Frontend dibangun menggunakan React.js yang bertindak sebagai antarmuka tunggal untuk diakses oleh Kasir dan Pemilik Toko via penjelajah web (browser). Aplikasi React.js akan berkomunikasi secara asinkronus dengan Backend menggunakan RESTful API melalui pustaka Axios. 

Aplikasi Backend yang dibangun dengan Laravel 11 bertindak sebagai pusat logika bisnis, pemrosesan query ke database MySQL, menangani sesi autentikasi token, kalkulasi stok bahan, serta menjembatani integrasi dengan layanan eksternal (Third-Party API WhatsApp Gateway) secara aman tanpa mengekspos kredensial API ke sisi klien.

Aplikasi 1 — Frontend
Nama Aplikasi: SoleClean Dashboard UI
Deskripsi Singkat: Aplikasi web berbasis React.js yang digunakan oleh Kasir untuk mencatat antrean cuci sepatu baru, mengubah status cucian, serta digunakan oleh Pemilik untuk memantau sisa volume stok bahan pembersih dan melihat visualisasi peringatan stok kritis.
Berkomunikasi dengan: Aplikasi 3 — SoleClean Core API

Aplikasi 2 — Backend (Laravel)
 Nama Aplikasi / Service: SoleClean Core API
Deskripsi Singkat: Layanan backend berbasis Laravel 11 yang mengelola basis data MySQL (data user, rekam transaksi cuci, kalkulasi sisa mililiter sabun & parfum), menyediakan endpoints RESTful API terlindungi, serta mengintegrasikan Third-Party API WhatsApp Gateway untuk pengiriman pesan otomatis.
Menyediakan layanan untuk: Aplikasi 1 — SoleClean Dashboard UI
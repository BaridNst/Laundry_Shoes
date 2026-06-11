# 02 – Rencana Fitur

## Fitur 1 — Manajemen Antrean Cuci Sepatu

**Role Penanggung Jawab:** Frontend & Backend

**Sumber Data:** Internal System

**Deskripsi & Ekspektasi:**

Fitur ini digunakan untuk mencatat pelanggan yang melakukan jasa cuci sepatu. Kasir dapat memasukkan data pelanggan seperti nama, nomor WhatsApp, jenis layanan cuci, jumlah sepatu, dan estimasi waktu pengerjaan. Data tersebut akan disimpan ke database dan secara otomatis masuk ke daftar antrean.

Sistem diharapkan mampu menampilkan status antrean secara real-time mulai dari status "Menunggu", "Diproses", hingga "Selesai". Dengan adanya fitur ini, proses pencatatan antrean menjadi lebih terstruktur, mengurangi risiko kehilangan data pelanggan, serta memudahkan kasir dalam memantau progres pekerjaan.

---

## Fitur 2 — Manajemen Stok Bahan Pembersih

**Role Penanggung Jawab:** Backend

**Sumber Data:** Internal System

**Deskripsi & Ekspektasi:**

Fitur ini berfungsi untuk mengelola stok bahan yang digunakan dalam proses pencucian sepatu, seperti sabun pembersih, parfum sepatu, cairan disinfektan, dan bahan pendukung lainnya. Setiap transaksi pencucian akan mengurangi jumlah stok berdasarkan kebutuhan yang telah ditentukan.

Sistem diharapkan mampu melakukan perhitungan stok secara otomatis dan menyajikan informasi sisa stok yang akurat. Dengan demikian, pemilik usaha dapat mengetahui kondisi persediaan bahan setiap saat dan menghindari kehabisan stok yang dapat menghambat operasional usaha.

---

## Fitur 3 — Dashboard Monitoring dan Visualisasi Stok

**Role Penanggung Jawab:** Frontend

**Sumber Data:** Internal System

**Deskripsi & Ekspektasi:**

Fitur dashboard menyediakan tampilan ringkasan informasi penting bagi pemilik usaha. Informasi yang ditampilkan meliputi jumlah antrean aktif, jumlah transaksi yang telah selesai, serta kondisi stok bahan pembersih dalam bentuk tabel maupun grafik visual.

Sistem diharapkan mampu memberikan informasi yang mudah dipahami sehingga pemilik dapat melakukan pengawasan operasional secara cepat. Dashboard juga menampilkan indikator stok kritis untuk membantu pengambilan keputusan terkait pengadaan bahan sebelum stok benar-benar habis.

---

## Fitur 4 — Notifikasi WhatsApp Otomatis

**Role Penanggung Jawab:** Backend

**Sumber Data:** Third-Party API — WhatsApp Gateway

**Deskripsi & Ekspektasi:**

Fitur ini memungkinkan sistem mengirimkan pesan WhatsApp secara otomatis kepada pelanggan. Pesan akan dikirim ketika antrean berhasil didaftarkan, saat proses pencucian selesai, atau ketika sepatu siap diambil oleh pelanggan.

Integrasi dilakukan melalui layanan WhatsApp Gateway yang diakses oleh Backend Laravel menggunakan Guzzle HTTP Client. Implementasi fitur ini diharapkan dapat meningkatkan kualitas layanan karena pelanggan memperoleh informasi status cucian secara cepat tanpa harus menghubungi pihak toko.

---

## Fitur 5 — Sistem Autentikasi dan Manajemen Hak Akses

**Role Penanggung Jawab:** Security & Backend

**Sumber Data:** Internal System

**Deskripsi & Ekspektasi:**

Fitur autentikasi digunakan untuk mengamankan akses ke dalam sistem. Pengguna diwajibkan melakukan login menggunakan akun yang telah terdaftar. Sistem akan menerapkan autentikasi berbasis token menggunakan Laravel Sanctum.

Hak akses dibedakan berdasarkan peran pengguna, yaitu Kasir dan Pemilik Toko. Kasir hanya dapat mengelola antrean dan transaksi, sedangkan Pemilik memiliki akses tambahan untuk melihat laporan serta kondisi stok. Fitur ini diharapkan dapat menjaga keamanan data dan memastikan setiap pengguna hanya dapat mengakses fungsi yang sesuai dengan tugasnya.

---

## Fitur 6 — Deployment Otomatis dan Monitoring Aplikasi

**Role Penanggung Jawab:** DevOps

**Sumber Data:** Internal System

**Deskripsi & Ekspektasi:**

Fitur ini berfokus pada proses pengelolaan infrastruktur aplikasi. Setiap perubahan kode yang dikirim ke repositori GitHub akan secara otomatis diuji dan dideploy menggunakan GitHub Actions. Aplikasi dijalankan dalam lingkungan Docker dan dipublikasikan melalui platform Render.com dengan konfigurasi Nginx sebagai web server.

Implementasi fitur ini diharapkan mampu mempercepat proses pengembangan, mengurangi kesalahan saat deployment, serta memastikan aplikasi dapat berjalan dengan stabil dan mudah dipelihara selama masa operasional maupun pengembangan lanjutan.

---
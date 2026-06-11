# API Specification

---

## Login User

**Method:** `POST`

**URL:** `/api/v1/login`

**Deskripsi:** Melakukan autentikasi pengguna (Kasir atau Pemilik Toko) dan menghasilkan token akses menggunakan Laravel Sanctum.

**Autentikasi Diperlukan:** `Tidak`

**Sumber:** `Internal System`

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "token": "sanctum_token",
  "role": "kasir"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Email atau password salah"
}
```

---

## Tambah Antrean Cuci Sepatu

**Method:** `POST`

**URL:** `/api/v1/antrian`

**Deskripsi:** Menambahkan data antrean baru pelanggan yang melakukan jasa cuci sepatu.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "nama_pelanggan": "string",
  "nomor_whatsapp": "string",
  "jenis_layanan": "Deep Clean",
  "jumlah_sepatu": 1
}
```

**Response Sukses (`201 Created`):**

```json
{
  "status": "success",
  "message": "Antrean berhasil ditambahkan"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data tidak valid"
}
```

---

## Daftar Antrean Cuci

**Method:** `GET`

**URL:** `/api/v1/antrian`

**Deskripsi:** Menampilkan seluruh daftar antrean pelanggan beserta status pengerjaannya.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Body:** `-`

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama_pelanggan": "Andi",
      "status": "Diproses"
    }
  ]
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data tidak ditemukan"
}
```

---

## Update Status Cucian

**Method:** `PUT`

**URL:** `/api/v1/antrian/{id}`

**Deskripsi:** Mengubah status cucian pelanggan dari Menunggu, Diproses, hingga Selesai.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "status": "Selesai"
}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "message": "Status berhasil diperbarui"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data antrean tidak ditemukan"
}
```

---

## Monitoring Stok Bahan

**Method:** `GET`

**URL:** `/api/v1/stok`

**Deskripsi:** Menampilkan informasi stok bahan pembersih seperti sabun, parfum, dan cairan disinfektan.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Body:** `-`

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": {
    "sabun": 1500,
    "parfum": 800,
    "disinfektan": 500
  }
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data stok tidak tersedia"
}
```

---

## Dashboard Ringkasan

**Method:** `GET`

**URL:** `/api/v1/dashboard`

**Deskripsi:** Menampilkan data ringkasan operasional berupa jumlah antrean aktif, transaksi selesai, dan stok kritis.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Body:** `-`

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": {
    "antrian_aktif": 12,
    "transaksi_selesai": 85,
    "stok_kritis": 2
  }
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Gagal mengambil data dashboard"
}
```

---

## Kirim Notifikasi WhatsApp

**Method:** `POST`

**URL:** `/api/v1/whatsapp/send`

**Deskripsi:** Mengirim notifikasi otomatis kepada pelanggan ketika status cucian berubah atau telah selesai.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Third-Party API — WhatsApp Gateway`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "phone": "628xxxxxxxxxx",
  "message": "Sepatu Anda telah selesai dicuci dan siap diambil."
}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "message": "Notifikasi berhasil dikirim"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Gagal mengirim pesan WhatsApp"
}
```

---

## Logout User

**Method:** `POST`

**URL:** `/api/v1/logout`

**Deskripsi:** Menghapus token autentikasi pengguna dan mengakhiri sesi login.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```
Authorization: Bearer <token>
```

**Request Body:** `-`

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "message": "Logout berhasil"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Token tidak valid"
}
```

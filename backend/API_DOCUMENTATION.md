# Kosane Yoyok - Backend API Documentation

Base URL Default: `http://localhost:8000/api`

> **Note - JSON Only:** 
> API ini diatur secara *strict* untuk HANYA Menerima dan Mengembalikan format **JSON**. 
> Anda wajib mengirimkan kedua Header berikut pada setiap request:
> - `Content-Type: application/json`
> - `Accept: application/json`
>
> **Note - Authorization:** 
> Kecuali untuk Login dan Register, semua endpoint wajib menggunakan header **Authorization** dengan Bearer token yang didapat dari respons Login.
> `Authorization: Bearer <token>`

---

## 1. Authentication

### 1.1 Login Admin
- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Login admin berdasarkan `nama_profile` dan `password`.

**Request Body**
| Field | Type | Required | Description |
|---|---|---|---|
| `nama_profile` | String | Yes | Username akun |
| `password` | String | Yes | Kata sandi akun |

**Example Request**
```json
{
    "nama_profile": "admin",
    "password": "password123"
}
```

**Success Response (200 OK)**
```json
{
    "status": "success",
    "message": "Login berhasil",
    "data": {
        "id_profile": 1,
        "nama_profile": "admin"
    }
}
```

**Error Response (401 Unauthorized)**
```json
{
    "status": "error",
    "message": "Nama profile atau password salah"
}
```

### 1.2 Register Admin
- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Mendaftarkan admin/pengguna baru.

**Request Body**
| Field | Type | Required | Description |
|---|---|---|---|
| `nama_profile` | String | Yes | Nama pengguna (harus unik) |
| `password` | String | Yes | Kata sandi (min. 3 karakter) |
| `no_telp_profile` | String | Yes | Nomor telepon pengguna |

**Example Request**
```json
{
    "nama_profile": "budi",
    "password": "password123",
    "no_telp_profile": "081234567890"
}
```

**Success Response (200 OK)**
```json
{
    "status": "success",
    "message": "Register berhasil",
    "data": {
        "nama_profile": "budi",
        "no_telp_profile": "081234567890",
        "updated_at": "2024-03-01T10:00:00.000000Z",
        "created_at": "2024-03-01T10:00:00.000000Z",
        "id_profile": 2
    }
}
```

### 1.3 Logout Admin
- **URL:** `/api/logout`
- **Method:** `POST`
- **Description:** Logout admin dan menghapus token akses saat ini.

**Headers**
| Key | Value | Required | Description |
|---|---|---|---|
| `Authorization` | `Bearer <token>` | Yes | Token autentikasi |

**Success Response (200 OK)**
```json
{
    "status": "success",
    "message": "Logout berhasil"
}
```

---

## 2. Dashboard

### 2.1 Get Summary Dashboard
- **URL:** `/api/dashboard`
- **Method:** `GET`
- **Description:** Mengambil data ringkasan dashboard seperti jumlah sewa aktif per bulan, pemasukan lunas, pengeluaran keseluruhan, dan jumlah kamar tersedia.

**Success Response (200 OK)**
```json
{
    "sewa_aktif": [
        {
            "bulan": "Jan",
            "total": 2
        }
    ],
    "pemasukan": 15000000,
    "pengeluaran": 2000000,
    "kamar_tersedia": 8
}
```

**Error Response (500 Internal Server Error)**
```json
{
    "error": true,
    "message": "Pesan error internal database"
}
```

---

## 3. Kamar

### 3.1 Get Data Kamar
- **URL:** `/api/kamar`
- **Method:** `GET`
- **Description:** Endpoint controller `index` tersedia tetapi saat ini belum ada logic respons data (`KamarController::index` kosong).

---

## 4. Penyewa (Sewa Kamar)

### 4.1 Get List Penyewa & Ketersediaan
- **URL:** `/api/penyewa`
- **Method:** `GET`
- **Description:** Mengambil status seluruh kamar. Jika "Disewa", otomatis menampilkan data penyewa. Jika "Tersedia", form penyewa bernilai `null`.

**Success Response (200 OK)**
```json
[
    {
        "id": 1,
        "nama": "Kamar 1",
        "status": "Disewa",
        "harga": 1500000,
        "penyewa": {
            "nama": "Andi Firmansyah",
            "telp": "081xxx",
            "sewabrpbulan": 3,
            "catatan": "-"
        }
    },
    {
        "id": 2,
        "nama": "Kamar 2",
        "status": "Tersedia",
        "harga": 1500000,
        "penyewa": null
    }
]
```

### 4.2 Tambah Penyewa Baru (Store)
- **URL:** `/api/penyewa`
- **Method:** `POST`
- **Description:** Menambahkan data profil penyewa, detail sewa untuk kamar, dan mengubah status kamar menjadi "disewa".

**Request Body**
| Field | Type | Required | Description |
|---|---|---|---|
| `kamar_id` | Integer | Yes | ID Kamar |
| `nama_profile` | String | Yes | Nama lengkap penyewa |
| `no_telp_profile` | String | Yes | Nomor telepon penyewa |
| `tglsewa_sewa` | Date | Yes | Tanggal masuk/sewa |
| `sewa_berapa_bulan` | Integer| Yes | Lama durasi sewa (Bulan) |
| `metode_pembayaran` | String | Yes | `transfer` atau `tunai` |
| `cicilan` | Integer | No | Pembayaran pertama/cicilan (Opsional) |
| `catatan` | String | No | Catatan riwayat pembayaran |

**Example Request**
```json
{
    "kamar_id": 1,
    "nama_profile": "Andi Firmansyah",
    "no_telp_profile": "08123456789",
    "tglsewa_sewa": "2024-03-01",
    "sewa_berapa_bulan": 3,
    "metode_pembayaran": "transfer",
    "cicilan": 1500000,
    "catatan": "Pembayaran lunas untuk sewa pertama"
}
```

**Success Response (200 OK)**
```json
{
    "message": "Sewa berhasil dibuat",
    "profile": { ... },
    "sewa": { ... }
}
```

### 4.3 Update Data Penyewa
- **URL:** `/api/penyewa/{id_kamar}`
- **Method:** `PUT`
- **Description:** Memperbarui data penyewaan berdasarkan `id_kamar` (Update tabel profil dan detail sewa).

**Request Body**
*(Bisa mengirim data spesifik yang ingin diupdate saja, namun disarankan mengirim data form secara lengkap)*
- `nama_profile`
- `no_telp_profile`
- `sewa_berapa_bulan`
- `metode_pembayaran`
- `cicilan`
- `catatan`

**Example Request**
```json
{
    "nama_profile": "Andi Firmansyah",
    "no_telp_profile": "08123456789",
    "sewa_berapa_bulan": 6,
    "metode_pembayaran": "transfer",
    "cicilan": 0,
    "catatan": "Perpanjangan sewa"
}
```

**Success Response (200 OK)**
```json
{
    "message": "Data berhasil diupdate"
}
```

### 4.4 Get Detail Penyewa per Kamar
- **URL:** `/api/penyewa/kamar/{kamar_id}`
- **Method:** `GET`
- **Description:** Melihat summary penyewa aktif dari satu `kamar_id` yang spesifik.

**Success Response (200 OK)**
```json
{
    "nama_profile": "Budi",
    "no_telp_profile": "081222333",
    "sewa_berapa_bulan": 1,
    "metode_pembayaran": "tunai",
    "catatan": "Kekurangan bayar 500rb",
    "total_bayar": 1000000
}
```

---

## 5. Riwayat (History)

### 5.1 Get Riwayat Sewa
- **URL:** `/api/riwayat`
- **Method:** `GET`
- **Description:** Menampilkan log status penyewaan (Booking, Check-In, Check-Out). Riwayat otomatis membuang log `Booking` jika sudah lewat dari 2 hari. 

**Success Response (200 OK)**
```json
[
    {
        "id": 1,
        "tanggal": "2024-03-01",
        "kamar": "Kamar-1",
        "penyewa": "Siti Aminah",
        "status": "Check-In",
        "kategori": "pemilik",
        "keterangan": "Sewa bulanan baru"
    }
]
```

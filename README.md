# SITTA UT - Sistem Informasi Tiras & Transaksi Bahan Ajar

Nama : Ananda Ning Saputra

NIM : 043464564

Aplikasi web sederhana untuk pengelolaan stok bahan ajar dan pelacakan pengiriman (Delivery Order) di Universitas Terbuka. Proyek ini dikembangkan sebagai penyelesaian **Tugas Praktik 2 - Pemrograman Berbasis Web (STSI4209)**.

![Tech Stack](https://img.shields.io/badge/Vue.js-3-green) ![Tech Stack](https://img.shields.io/badge/Tailwind-CSS-blue) ![Tech Stack](https://img.shields.io/badge/FontAwesome-Icon-orange)

## 📋 Fitur Utama

### 1. Sistem Autentikasi (Keamanan)

- **Halaman Login:** Proteksi akses halaman utama.

- **Session Management:** Menggunakan **Cookies** dengan masa berlaku 3 jam.

- **Auto Redirect:** Pengguna yang belum login akan dilempar ke halaman login, dan pengguna yang sudah login tidak perlu login ulang.

- **Logout:** Fitur keluar aplikasi dengan aman.

### 2. Kelola Stok Bahan Ajar (`stok.html`)

- **Dashboard Data:** Menampilkan daftar stok dengan indikator warna status (Aman, Menipis, Kosong).

- **Advanced Filter:**

- Filter berdasarkan UPBJJ (UT-Daerah).

- Filter Kategori (Dependent Dropdown - menyesuaikan UPBJJ).

- Filter Khusus Stok Menipis/Kosong.

- **Sorting:** Urutkan berdasarkan Judul, Stok Terkecil, atau Harga Termurah.

- **Modal Detail:** Popup informatif untuk melihat detail lengkap item tanpa berpindah halaman.

- **Input Data:** Form tambah stok baru menggunakan Modal Popup.

### 3. Tracking Delivery Order (`tracking.html`)

- **Input DO:** Form input pengiriman dengan **Auto-Numbering** (Contoh: `DO2025-001`).

- **Cek Resi:** Fitur pencarian nomor DO secara _real-time_ dari data session.

- **Visual Timeline:** Menampilkan status perjalanan paket secara visual (grafis) saat resi dicari.

- **Kalkulasi Otomatis:** Harga total otomatis terisi berdasarkan paket yang dipilih.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur Halaman.

- **Vue.js 3 (Composition API)** - Logika aplikasi reaktif (via CDN).

- **Tailwind CSS** - Styling modern dan responsif (via CDN).

- **Font Awesome 6** - Ikon antarmuka.

- **Google Fonts (Montserrat)** - Tipografi.

- **Live-Server** - Local development server.

---

## 🚀 Cara Menjalankan Aplikasi

Pastikan sudah ter-install **Node.js** di komputer.

1.  **Clone atau Download** repository ini.

2.  Buka terminal/command prompt di folder project.

3.  Install dependency (hanya untuk server lokal):

```bash

npm install

```

4. Jalankan aplikasi:

```bash

npm start

```

5. Browser akan otomatis terbuka di `http://127.0.0.1:8080` (atau port lain yang tersedia).

---

## 🔐 Akun Demo (Login)

Gunakan kredensial berikut untuk masuk ke aplikasi:

| Role | Email | Password |

| :-------- | :--------------- | :--------- |

| **Admin** | `admin@ut.ac.id` | `P@ssw0rd` |

> **Catatan:** Jika sesi habis (lebih dari 3 jam), akan diminta login kembali.

---

## 📂 Struktur Folder

```text

/

├── css/

│ └── style.css # Custom CSS (Fix Glitch Vue)

├── js/

│ ├── auth.js # Logika Login & Cookies

│ ├── dataBahanAjar.js # Dummy Data (Database simulasi)

│ ├── stok-app.js # Logika Vue halaman Stok

│ └── tracking-app.js # Logika Vue halaman Tracking

├── index.html # Dashboard Menu Utama

├── login.html # Halaman Login

├── stok.html # Halaman Kelola Stok

├── tracking.html # Halaman Tracking DO

├── package.json # Konfigurasi NPM

└── README.md # Dokumentasi Proyek

```

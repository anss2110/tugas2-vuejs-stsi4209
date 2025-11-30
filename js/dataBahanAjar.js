/**
 * @typedef {Object} BahanAjar
 * @property {string} kode - Kode Mata Kuliah
 * @property {string} judul - Judul Mata Kuliah
 * @property {string} kategori - Kategori
 * @property {string} upbjj - Lokasi UT Daerah
 * @property {string} lokasi - Lokasi Rak
 * @property {number} qty - Jumlah Stok
 * @property {number} safety - Batas Aman Stok
 * @property {number} harga - Harga Satuan
 */

/**
 * @typedef {Object} Paket
 * @property {string} id
 * @property {string} nama
 * @property {string} detail
 * @property {number} harga
 */

/** @type {BahanAjar[]} */
export const dbBahanAjar = [
  {
    kode: "MK001",
    judul: "Pemrograman Web",
    kategori: "Teknologi",
    upbjj: "Jakarta",
    lokasi: "A-01",
    qty: 50,
    safety: 10,
    harga: 150000,
  },
  {
    kode: "MK002",
    judul: "Sistem Operasi",
    kategori: "Teknologi",
    upbjj: "Bandung",
    lokasi: "A-02",
    qty: 5,
    safety: 10,
    harga: 120000,
  },
  {
    kode: "MK003",
    judul: "Akuntansi Dasar",
    kategori: "Ekonomi",
    upbjj: "Surabaya",
    lokasi: "B-01",
    qty: 0,
    safety: 15,
    harga: 90000,
  },
  {
    kode: "MK004",
    judul: "Hukum Perdata",
    kategori: "Hukum",
    upbjj: "Jakarta",
    lokasi: "C-01",
    qty: 25,
    safety: 5,
    harga: 100000,
  },
  {
    kode: "MK005",
    judul: "Manajemen Pemasaran",
    kategori: "Ekonomi",
    upbjj: "Denpasar",
    lokasi: "D-05",
    qty: 12,
    safety: 10,
    harga: 95000,
  },
];

/** @type {Paket[]} */
export const dbPaket = [
  {
    id: "PKT01",
    nama: "Paket Semester 1 TI",
    detail: "Buku Web, Sistem Operasi, Logika Pemrograman",
    harga: 450000,
  },
  {
    id: "PKT02",
    nama: "Paket Semester 1 Hukum",
    detail: "Hukum Perdata, Hukum Pidana, Tata Negara",
    harga: 300000,
  },
  {
    id: "PKT03",
    nama: "Paket Semester 1 Ekonomi",
    detail: "Akuntansi, Manajemen, Makroekonomi",
    harga: 280000,
  },
];

export const dbUpbjj = ["Jakarta", "Bandung", "Surabaya", "Denpasar", "Medan"];

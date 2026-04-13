# Panduan Edit Website Desa Polewali (Static Version)

Website ini adalah **static site** (HTML + CSS + JS) yang bisa langsung di-hosting di Vercel. Tidak ada database dan tidak ada panel admin.

---

## 📁 Struktur File

```
static/
├── index.html          ← Halaman utama (jangan diubah sembarangan)
├── vercel.json         ← Konfigurasi Vercel (jangan diubah)
├── assets/
│   ├── css/style.css   ← Styling website
│   ├── js/
│   │   ├── data.js     ← ⭐ EDIT FILE INI untuk ubah konten
│   │   ├── app.js      ← Logika halaman (jangan diubah kecuali perlu)
│   │   └── main.js     ← Interaksi UI
│   └── images/
│       ├── struktur/   ← Foto perangkat desa
│       ├── galeri/     ← Foto galeri desa
│       └── umkm/       ← Foto produk UMKM
```

---

## ✏️ Cara Edit Konten

**Buka file** `assets/js/data.js` dan ubah nilai yang sesuai.

### Ubah Nomor WhatsApp
```js
whatsapp_no: '628xxxxxxxxxx',  // Ganti dengan nomor WA desa
```
Format: `628` + nomor tanpa angka 0 di depan. Contoh: `6281234567890`

### Ubah Profil Desa
```js
profil: {
    nama_kades: 'Nama Kepala Desa',
    foto_kades: 'assets/images/struktur/kades.jpg',  // path foto kades
    sambutan_kades: `Isi sambutan...`,
    sejarah: `Isi sejarah desa...`,
    visi: '"Isi visi desa..."',
    misi: `Misi 1\nMisi 2\nMisi 3`,
    // ...
}
```

### Ubah Data Penduduk & Statistik
```js
penduduk: {
    total_penduduk: 2500,
    laki_laki: 1250,
    perempuan: 1250,
    total_kk: 650,
    tahun: 2024,
},
```

### Ubah Struktur Organisasi
```js
struktur: [
    { nama: 'Nama Kades', jabatan: 'Kepala Desa', foto: 'assets/images/struktur/kades.jpg' },
    { nama: 'Nama Sekdes', jabatan: 'Sekretaris Desa', foto: '' },  // foto kosong = icon default
    // tambah baris lagi untuk menambah anggota
],
```

### Tambah Galeri
```js
galeri: [
    { id: 7, judul: 'Nama Foto', deskripsi: 'Keterangan foto', foto: 'assets/images/galeri/foto.jpg' },
],
```
Taruh file foto di folder `assets/images/galeri/`.

### Tambah UMKM
```js
umkm: [
    {
        id: 4,
        nama_usaha: 'Nama Usaha',
        produk: 'Jenis Produk',
        deskripsi: 'Deskripsi usaha',
        harga: 'Mulai Rp 10.000',
        pemilik: 'Nama Pemilik',
        telepon: '08xxxxxxxxxx',   // untuk tombol WhatsApp
        alamat: 'Alamat usaha',
    },
],
```

### Upload Foto InfoGrafis Anggaran
```js
anggaran: {
    foto: ['assets/images/anggaran/realisasi.jpg'], 
},
```
Taruh gambar JPG/PNG infografis realisasi dana desa di dalam folder `assets/images/anggaran/`. Jika gambarnya lebih dari 1, pisahkan dengan koma seperti ini: `foto: ['foto1.jpg', 'foto2.jpg']`.

---

## 🚀 Deploy ke Vercel

### Cara 1: lewat GitHub (Rekomendasi)
1. Upload folder project ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project → pilih repo
3. Vercel otomatis deploy. Selesai!

### Cara 2: lewat Vercel CLI
```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Deploy (jalankan di dalam folder project)
vercel --prod
```

> [!TIP]
> Setiap kali kamu push perubahan ke GitHub, Vercel otomatis update website.

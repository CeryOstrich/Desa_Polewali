# PANDUAN DEPLOYMENT (HOSTING) KE VERCEL
Website Desa Polewali saat ini sudah menggunakan format Static (HTML, CSS, JS murni), sehingga sangat mudah dan 100% gratis untuk di-hosting menggunakan Vercel.

## Langkah 1: Persiapan Akun
1. Buka [https://vercel.com/signup](https://vercel.com/signup)
2. Daftar menggunakan akun GitHub, GitLab, Bitbucket, atau Email Anda.
3. Jika menggunakan Email, pastikan Anda juga membuat akun GitHub (sangat disarankan) agar proses update website ke depannya jauh lebih otomatis.

## Langkah 2: Upload Kode Website ke GitHub (Disarankan)
Dengan menggunakan GitHub, setiap kali Anda mengedit file `data.js` dan menyimpan perubahannya ke GitHub, Vercel akan otomatis melakukan update ke website Anda.
1. Download dan Install [GitHub Desktop](https://desktop.github.com/).
2. Login ke akun GitHub Anda.
3. Buat New Repository (misal: `desa-polewali`).
4. Copy semua file dan folder (index.html, assets/, foto/, data.js, dll) ke dalam folder repository tersebut.
5. Lakukan "Commit" dan "Push" repository tersebut agar tersimpan online di GitHub.

## Langkah 3: Deploy di Vercel
1. Login ke Dashboard Vercel Anda.
2. Klik tombol merah **"Add New..."** di kanan atas, lalu pilih **"Project"**.
3. Di bagian "Import Git Repository", cari repository `desa-polewali` yang baru saja Anda buat di GitHub, lalu klik **"Import"**.
4. Biarkan konfigurasi default (Framework Preset: Other) karena website kita HTML murni.
5. Langsung saja klik tombol **"Deploy"**.
6. Tunggu beberapa detik, dan website Desa Polewali Anda sudah online!

## Alternatif Deploy Tanpa GitHub (Drag & Drop)
Vercel juga mendukung upload manual (langsung drag & drop file/folder) jika Anda belum bisa menggunakan GitHub.

1. Install **Vercel CLI** jika Anda terbiasa menggunakan Command Line, atau cukup gunakan cara di bawah.
2. Karena fitur Drag & Drop langsung di web Vercel terkadang disembunyikan/berubah, cara termudahnya adalah menjadikan folder website menjadi satu folder (misal `desa-polewali`).
3. Buka halaman Deploy Vercel, lalu Anda bisa menarik (drag) folder `desa-polewali` ke area kerja untuk langsung melakukan deployment instan.
Namun, **sangat disarankan** menggunakan metode GitHub (Langkah 2 & 3) agar update data (seperti mengubah teks di `data.js` atau gambar) menjadi mudah dan otomatis.

## File `vercel.json`
Website ini sudah dilengkapi file konfigurasi khusus `vercel.json` untuk memastikan Vercel mengenai website sebagai website statik dengan baik (termasuk setting cache atau rewrite URL jika dibutuhkan). Jangan hapus file ini.

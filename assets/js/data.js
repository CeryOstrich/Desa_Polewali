/**
 * DATA KONFIGURASI WEBSITE DESA POLEWALI
 * ==========================================
 * Edit file ini untuk mengubah konten website.
 * Tidak perlu database - semua data ada di sini.
 */

const DATA = {

    // ========================================
    // NOMOR WHATSAPP UNTUK FORM KONTAK & SARAN
    // Format: 628xxxxxxxxxx (tanpa + atau -)
    // ========================================
    whatsapp_no: '628377779984',

    // ========================================
    // PROFIL DESA
    // ========================================
    profil: {
        nama_desa: 'Desa Polewali',
        kecamatan: 'Tellu Limpoe',
        kabupaten: 'Sidenreng Rappang',
        provinsi: 'Sulawesi Selatan',
        kode_pos: '91662',
        luas_wilayah: '...',   // Contoh: '12,5 km²'
        jumlah_dusun: 2,
        jumlah_rt: 8,
        jumlah_rw: 4,
        alamat: 'Jl. M. Djunaid Hamzah, Kec. Tellu Limpoe, Kab. Sidenreng Rappang',
        telepon: '-',
        email: 'desakupolewali@gmail.com',
        nama_kades: 'Abdillah Yasin',
        foto_kades: '', // Path ke foto: 'assets/images/struktur/kades.jpg'
        sambutan_kades: `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nPuji syukur kita panjatkan kepada Allah SWT atas segala nikmat dan karunia-Nya. Mewakili seluruh jajaran pemerintah Desa Polewali, saya menyambut baik kehadiran website resmi ini sebagai sarana komunikasi dan transparansi informasi kepada masyarakat.\n\nMelalui website ini, kami berkomitmen untuk terus memberikan pelayanan terbaik, menyajikan informasi yang akurat, serta membuka ruang partisipasi bagi seluruh warga Desa Polewali. Masukan dan saran dari masyarakat sangat kami harapkan demi kemajuan desa kita bersama.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.`,
        sejarah: ` Desa Polewali merupakan salah satu desa yang terbentuk melalui proses pemekaran wilayah dari Desa Teteaji pada tahun 1995. Pemekaran ini dilakukan sebagai upaya untuk meningkatkan efektivitas pelayanan pemerintahan serta mempercepat pembangunan di tingkat desa. Sejak resmi berdiri, Desa Polewali mulai menjalankan roda pemerintahan secara mandiri dengan dipimpin oleh kepala desa pertama, yaitu Bapak Haruna P. Di bawah kepemimpinan beliau, fondasi awal pemerintahan desa mulai dibangun, baik dalam aspek administrasi, pelayanan masyarakat, maupun pengembangan wilayah desa.`,
        visi: '"Membangun Desa Polewali yang Mandiri, Sejahtera, Beriman, dan Berdaya Saing."',
        misi: `1. Meningkatkan pendapatan masyarakat, khususnya petani, dengan menyediakan sarana dan prasarana yang memadai.\n2. Mengembangkan seluruh potensi sehingga desa tetap mempertahankan status sebagai Desa Mandiri.\n3. Meningkatkan Pendapatan Asli Desa (PADesa) melalui optimalisasi dan tata kelola usaha desa yang lebih baik..\n4. Meningkatkan kualitas Sumber Daya Manusia (SDM) perangkat desa agar memberikan pelayanan yang lebih profesional kepada masyarakat.\n5. Mendorong peningkatan kualitas layanan pemerintah serta penguatan kapasitas lembaga desa seperti BPD, PKK, dan Karang Taruna.`,
        google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d209635.241640373!2d119.6459847502886!3d-3.9342718599582374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d95c701aa3af5f9%3A0x5ffd879e4e4f27f2!2sKANTOR%20DESA%20POLEWALI!5e1!3m2!1sid!2sid!4v1774711676073!5m2!1sid!2sid',
    },

    // ========================================
    // DATA KEPENDUDUKAN
    // ========================================
    penduduk: {
        total_penduduk: 1165,   // Edit sesuai data terbaru
        laki_laki: 545,
        perempuan: 620,
        total_kk: 328,
        tahun: 2025,
    },

    // ========================================
    // STRUKTUR ORGANISASI DESA
    // Edit nama, jabatan, dan foto sesuai data asli.
    // foto: kosong ('') = tampilkan ikon, atau isi path foto
    // ========================================
    struktur: [
        { nama: 'Abdillah Yasin', jabatan: 'Kepala Desa', foto: 'assets/images/struktur/Kades.png' },
        { nama: 'Imaduddin, S.Pd.', jabatan: 'Sekretaris Desa', foto: 'assets/images/struktur/ima.png' },
        { nama: 'Kasmawati, S.Pd.', jabatan: 'Kaur Keuangan', foto: '' },
        { nama: 'Rasmi, S.Pd.I.', jabatan: 'Kasi Pelayanan', foto: 'assets/images/struktur/Rasmi.png' },
        { nama: 'Muh. Akbar Umar, S.Pd.', jabatan: 'Kaur TU & Umum', foto: '' },
        { nama: 'Dahlia', jabatan: 'Kasi Pemerintahan', foto: '' },
        { nama: 'Wahyullah Haruna, S.H.', jabatan: 'Kasi Kesejahteraan', foto: '' },
        { nama: 'Reski Lestari Ayu Nanda', jabatan: 'Kaur Perencanaan', foto: '' },
        { nama: 'Muh. Nur Salman Saini', jabatan: 'Staff Perencanaan', foto: '' },
        { nama: 'Muh. Vehmil, S.Pd.', jabatan: 'Staff Keuangan', foto: '' },
        { nama: 'Ambo Masse', jabatan: 'Kepala Dusun I', foto: '' },
        { nama: 'H. Sudarmin', jabatan: 'Kepala Dusun II', foto: '' },
    ],


    // ========================================
    // DATA ANGGARAN APBDes (FOTO)
    // Isi dengan path gambar atau URL gambar infografis.
    // Jika lebih dari 1 gambar, tambahkan dalam tanda array.
    // ========================================
    anggaran: {
        foto: ['assets/images/galeri/APBDES.jpeg'],
    },

    // ========================================
    // GALERI FOTO DESA
    // foto: path ke file gambar (misal 'assets/images/galeri/foto1.jpg')
    // atau URL gambar dari internet
    // ========================================
    galeri: [
        { id: 1, judul: 'Kantor Desa Polewali', deskripsi: 'Gedung Kantor Pemerintah Desa Polewali', foto: '' },
        { id: 2, judul: 'Kegiatan Gotong Royong', deskripsi: 'Warga bergotong royong membersihkan lingkungan desa', foto: '' },
        { id: 3, judul: 'Posyandu Desa', deskripsi: 'Kegiatan posyandu untuk kesehatan ibu dan anak', foto: '' },
        { id: 4, judul: 'Pertanian Desa', deskripsi: 'Lahan pertanian produktif warga Desa Polewali', foto: '' },
        { id: 5, judul: 'Musyawarah Desa', deskripsi: 'Suasana musyawarah desa yang demokratis', foto: '' },
        { id: 6, judul: 'Pemuda Desa', deskripsi: 'Kegiatan karang taruna dan pemuda desa', foto: '' },
    ],

    // ========================================
    // DATA UMKM DESA
    // telepon: nomor WA (untuk tombol Hubungi via WA)
    // ========================================
    umkm: [],

    // ========================================
    // LINK SOSIAL MEDIA
    // ========================================
    sosmed: {
        facebook: 'https://web.facebook.com/desi.perwina?locale=id_ID',
        instagram: 'https://www.instagram.com/desapolewali_/',
        youtube: '#',
        whatsapp: '#', // bisa diisi link WA resmi desa
    },
};  

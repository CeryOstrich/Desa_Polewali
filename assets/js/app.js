/**
 * APP.JS - SPA Router & Page Renderer
 * Website Resmi Desa Polewali (Static Version)
 */

// ===========================
// HELPERS
// ===========================
function formatTanggal(str) {
    if (!str) return '-';
    const d = new Date(str);
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}
function formatRupiah(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
}
function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===========================
// ROUTER
// ===========================
function getPage() {
    const hash = window.location.hash.replace('#', '').split('/')[0];
    return hash || 'beranda';
}

function navigate(page, params) {
    if (params) {
        window.location.hash = page + '/' + params;
    } else {
        window.location.hash = page;
    }
}

function setActiveNav(page) {
    document.querySelectorAll('.navbar-menu a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.page === page) a.classList.add('active');
    });
}

function renderPage() {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('/');
    const page = parts[0] || 'beranda';
    const param = parts[1] || null;

    // Update document title
    const titles = {
        beranda: 'Website Resmi Desa Polewali',
        profil: 'Profil Desa - Desa Polewali',
        anggaran: 'Transparansi Anggaran - Desa Polewali',
        galeri: 'Galeri - Desa Polewali',
        umkm: 'UMKM - Desa Polewali',
        kontak: 'Kontak - Desa Polewali',
        'kritik-saran': 'Kritik & Saran - Desa Polewali',
    };
    document.title = titles[page] || 'Desa Polewali';

    setActiveNav(page);
    const app = document.getElementById('app-content');
    const footer = document.getElementById('app-footer');

    // Scroll to top
    window.scrollTo(0, 0);

    switch (page) {
        case 'beranda': app.innerHTML = renderBeranda(); footer.style.display = ''; break;
        case 'profil': app.innerHTML = renderProfil(); footer.style.display = ''; initProfilChart(); break;
        case 'anggaran': app.innerHTML = renderAnggaran(); footer.style.display = ''; break;
        case 'galeri': app.innerHTML = renderGaleri(); footer.style.display = ''; break;
        case 'umkm': app.innerHTML = renderUMKM(); footer.style.display = ''; break;
        case 'kontak': app.innerHTML = renderKontak(); footer.style.display = ''; break;
        case 'kritik-saran': app.innerHTML = renderKritikSaran(); footer.style.display = ''; break;
        default: app.innerHTML = renderBeranda(); footer.style.display = ''; break;
    }

    // Re-init UI events after render
    initCounters();
    initProgressBars();
}

// ===========================
// BERANDA
// ===========================
function renderBeranda() {
    const p = DATA.profil;
    const pd = DATA.penduduk;
    const kades = DATA.struktur[0] || null;

    const fotoKades = kades && kades.foto
        ? `<img src="${esc(kades.foto)}" alt="Kepala Desa" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
        : `<i class="fas fa-user-tie"></i>`;

    return `
    <section class="hero">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
            <div class="hero-badge"><i class="fas fa-landmark"></i> Website Resmi</div>
            <h1>Desa Polewali</h1>
            <p class="hero-subtitle">Kecamatan Tellu Limpoe &bull; Kabupaten Sidenreng Rappang &bull; Sulawesi Selatan</p>
            <p class="hero-tagline">"Mewujudkan Desa yang Maju, Mandiri, dan Sejahtera"</p>
            <div class="hero-buttons">
                <a href="#profil" class="btn btn-primary btn-lg"><i class="fas fa-info-circle"></i> Profil Desa</a>
                <a href="#kontak" class="btn btn-outline btn-lg"><i class="fas fa-envelope"></i> Hubungi Kami</a>
            </div>
        </div>
        <div class="hero-wave"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="#ffffff"/></svg></div>
    </section>

    <section class="section stats-section">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-value" data-count="${pd.total_penduduk}">0</div>
                    <div class="stat-label">Jumlah Penduduk</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-home"></i></div>
                    <div class="stat-value" data-count="${pd.total_kk}">0</div>
                    <div class="stat-label">Kepala Keluarga</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-map-marked-alt"></i></div>
                    <div class="stat-value" data-count="${p.jumlah_dusun}">0</div>
                    <div class="stat-label">Dusun</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-expand"></i></div>
                    <div class="stat-value">${esc(p.luas_wilayah)}</div>
                    <div class="stat-label">Luas Wilayah</div>
                </div>
            </div>
        </div>
    </section>

    <section class="section sambutan-section">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Sambutan</span>
                <h2>Sambutan Kepala Desa</h2>
            </div>
            <div class="sambutan-card">
                <div class="sambutan-photo">
                    <div class="photo-frame">${fotoKades}</div>
                    <h3>${esc(p.nama_kades)}</h3>
                    <p>Kepala Desa Polewali</p>
                </div>
                <div class="sambutan-text">${p.sambutan_kades.replace(/\n/g, '<br>')}</div>
            </div>
        </div>
    </section>

    <section class="section cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Punya Masukan untuk Desa?</h2>
                <p>Sampaikan kritik dan saran Anda untuk pembangunan Desa Polewali yang lebih baik</p>
                <div class="cta-buttons">
                    <a href="#kritik-saran" class="btn btn-white btn-lg"><i class="fas fa-comment-dots"></i> Kritik &amp; Saran</a>
                    <a href="#kontak" class="btn btn-outline-white btn-lg"><i class="fas fa-envelope"></i> Hubungi Kami</a>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ===========================
// PROFIL
// ===========================
function renderProfil() {
    const p = DATA.profil;
    const pd = DATA.penduduk;
    const struktur = DATA.struktur;

    const strukturHTML = struktur.map(s => `
        <div class="struktur-card">
            <div class="struktur-badge">
                <i class="fas fa-landmark" style="font-size:1.8rem;color:var(--primary);"></i>
            </div>
            <div class="struktur-photo">
                ${s.foto ? `<img src="${esc(s.foto)}" alt="${esc(s.nama)}">` : '<i class="fas fa-user"></i>'}
            </div>
            <div class="struktur-info">
                <h4>${esc(s.nama)}</h4>
                <p>${esc(s.jabatan)}</p>
            </div>
        </div>
    `).join('');

    const misiHTML = p.misi.split('\n').map(m => m.trim()).filter(m => m).map(m =>
        `<li><i class="fas fa-check-circle"></i> ${esc(m.replace(/^\d+\.\s*/, ''))}</li>`
    ).join('');

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-info-circle"></i> Profil Desa</h1>
            <nav class="breadcrumb">
                <a href="#beranda">Beranda</a><span>/</span><span>Profil Desa</span>
            </nav>
        </div>
    </section>

    <section class="section" id="sejarah">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Sejarah</span>
                <h2>Sejarah Desa Polewali</h2>
            </div>
            <div class="content-card">
                <div class="content-card-body">
                    <p class="lead">${p.sejarah.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section bg-light" id="visi-misi">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Tujuan</span>
                <h2>Visi &amp; Misi</h2>
            </div>
            <div class="visi-misi-grid">
                <div class="visi-card">
                    <div class="visi-icon"><i class="fas fa-eye"></i></div>
                    <h3>Visi</h3>
                    <p class="visi-text">${esc(p.visi)}</p>
                </div>
                <div class="misi-card">
                    <div class="misi-icon"><i class="fas fa-bullseye"></i></div>
                    <h3>Misi</h3>
                    <ul class="misi-list">${misiHTML}</ul>
                </div>
            </div>
        </div>
    </section>

    <section class="section" id="struktur">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Organisasi</span>
                <h2>Struktur Organisasi Desa</h2>
            </div>
            <div class="struktur-grid">${strukturHTML}</div>
        </div>
    </section>

    <section class="section bg-light" id="data">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Data</span>
                <h2>Data Wilayah &amp; Kependudukan</h2>
            </div>
            <div class="data-grid">
                <div class="data-card">
                    <h3><i class="fas fa-map-marked-alt"></i> Data Wilayah</h3>
                    <table class="data-table">
                        <tr><th>Nama Desa</th><td>${esc(p.nama_desa)}</td></tr>
                        <tr><th>Kecamatan</th><td>${esc(p.kecamatan)}</td></tr>
                        <tr><th>Kabupaten</th><td>${esc(p.kabupaten)}</td></tr>
                        <tr><th>Provinsi</th><td>${esc(p.provinsi)}</td></tr>
                        <tr><th>Kode Pos</th><td>${esc(p.kode_pos)}</td></tr>
                        <tr><th>Luas Wilayah</th><td>${esc(p.luas_wilayah)}</td></tr>
                        <tr><th>Jumlah Dusun</th><td>${p.jumlah_dusun}</td></tr>
                        <tr><th>Jumlah RT</th><td>${p.jumlah_rt}</td></tr>
                        <tr><th>Jumlah RW</th><td>${p.jumlah_rw}</td></tr>
                    </table>
                </div>
                <div class="data-card">
                    <h3><i class="fas fa-users"></i> Data Kependudukan</h3>
                    <table class="data-table">
                        <tr><th>Total Penduduk</th><td>${Number(pd.total_penduduk).toLocaleString('id-ID')} Jiwa</td></tr>
                        <tr><th>Laki-laki</th><td>${Number(pd.laki_laki).toLocaleString('id-ID')} Jiwa</td></tr>
                        <tr><th>Perempuan</th><td>${Number(pd.perempuan).toLocaleString('id-ID')} Jiwa</td></tr>
                        <tr><th>Jumlah KK</th><td>${Number(pd.total_kk).toLocaleString('id-ID')} KK</td></tr>
                        <tr><th>Tahun Data</th><td>${pd.tahun}</td></tr>
                    </table>
                    <div class="penduduk-chart-container">
                        <canvas id="pendudukChart" width="300" height="200"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

function initProfilChart() {
    const pd = DATA.penduduk;
    setTimeout(() => {
        const el = document.getElementById('pendudukChart');
        if (!el) return;
        new Chart(el, {
            type: 'doughnut',
            data: {
                labels: ['Laki-laki', 'Perempuan'],
                datasets: [{ data: [pd.laki_laki, pd.perempuan], backgroundColor: ['#2196F3', '#E91E63'], borderWidth: 0 }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
    }, 100);
}

// ===========================
// BERITA
// ===========================
function renderBeritaList() {
    const berita = DATA.berita;
    const beritaHTML = berita.length ? berita.map(b => `
        <article class="berita-card">
            <div class="berita-card-img">
                <div class="berita-card-img-placeholder">
                    ${b.foto ? `<img src="${esc(b.foto)}" alt="${esc(b.judul)}" style="width:100%;height:100%;object-fit:cover;">` : '<i class="fas fa-newspaper"></i>'}
                </div>
                ${b.kategori ? `<span class="berita-kategori">${esc(b.kategori)}</span>` : ''}
            </div>
            <div class="berita-card-body">
                <div class="berita-meta">
                    <span><i class="far fa-calendar"></i> ${formatTanggal(b.tanggal)}</span>
                    <span><i class="far fa-user"></i> ${esc(b.penulis)}</span>
                </div>
                <h3><a href="#berita/${b.id}">${esc(b.judul)}</a></h3>
                <p>${esc(b.isi.substring(0, 150))}...</p>
                <a href="#berita/${b.id}" class="read-more">Selengkapnya <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `).join('') : `
        <div class="empty-state">
            <i class="fas fa-newspaper"></i>
            <h3>Belum ada berita</h3>
            <p>Tambahkan berita di file data.js</p>
        </div>
    `;

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-newspaper"></i> Berita Desa</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Berita</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="berita-list-grid">${beritaHTML}</div>
        </div>
    </section>
    `;
}

function renderBeritaDetail(id) {
    const berita = DATA.berita.find(b => b.id === id);
    if (!berita) {
        return `<div class="container section"><h2>Berita tidak ditemukan.</h2><a href="#berita" class="btn btn-primary">Kembali</a></div>`;
    }
    const beritaLain = DATA.berita.filter(b => b.id !== id).slice(0, 5);
    const currentUrl = encodeURIComponent(window.location.href);
    const judul = encodeURIComponent(berita.judul);

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-newspaper"></i> Detail Berita</h1>
            <nav class="breadcrumb">
                <a href="#beranda">Beranda</a><span>/</span>
                <a href="#berita">Berita</a><span>/</span><span>Detail</span>
            </nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="berita-detail-grid">
                <article class="berita-detail">
                    <div class="berita-detail-header">
                        ${berita.kategori ? `<span class="berita-kategori">${esc(berita.kategori)}</span>` : ''}
                        <h1>${esc(berita.judul)}</h1>
                        <div class="berita-detail-meta">
                            <span><i class="far fa-calendar"></i> ${formatTanggal(berita.tanggal)}</span>
                            <span><i class="far fa-user"></i> ${esc(berita.penulis)}</span>
                        </div>
                    </div>
                    <div class="berita-detail-img">
                        <div class="berita-card-img-placeholder large">
                            ${berita.foto ? `<img src="${esc(berita.foto)}" alt="${esc(berita.judul)}" style="width:100%;height:100%;object-fit:cover;">` : '<i class="fas fa-newspaper"></i>'}
                        </div>
                    </div>
                    <div class="berita-detail-content">${berita.isi.replace(/\n/g, '<br>')}</div>
                    <div class="berita-share">
                        <span>Bagikan:</span>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" class="share-btn facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://wa.me/?text=${judul}%20${currentUrl}" target="_blank" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://twitter.com/intent/tweet?url=${currentUrl}&text=${judul}" target="_blank" class="share-btn twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                </article>
                <aside class="berita-sidebar">
                    <div class="sidebar-widget">
                        <h3>Berita Lainnya</h3>
                        <ul class="sidebar-berita-list">
                            ${beritaLain.map(bl => `
                            <li>
                                <a href="#berita/${bl.id}">
                                    <span class="sidebar-berita-title">${esc(bl.judul)}</span>
                                    <span class="sidebar-berita-date"><i class="far fa-calendar"></i> ${formatTanggal(bl.tanggal)}</span>
                                </a>
                            </li>`).join('')}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    `;
}

// ===========================
// AGENDA
// ===========================
function renderAgenda() {
    const agenda = DATA.agenda;
    const agendaHTML = agenda.length ? agenda.map(a => `
        <div class="agenda-item" data-status="${esc(a.status)}">
            <div class="agenda-date">
                <span class="agenda-day">${new Date(a.tanggal).getDate().toString().padStart(2, '0')}</span>
                <span class="agenda-month">${['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][new Date(a.tanggal).getMonth()]}</span>
                <span class="agenda-year">${new Date(a.tanggal).getFullYear()}</span>
            </div>
            <div class="agenda-info">
                <h3>${esc(a.judul)}</h3>
                <p>${esc(a.deskripsi)}</p>
                <div class="agenda-details">
                    <span><i class="far fa-clock"></i> ${esc(a.waktu_mulai)} - ${esc(a.waktu_selesai)} WITA</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${esc(a.lokasi)}</span>
                </div>
            </div>
            <div class="agenda-status status-${esc(a.status)}">${a.status === 'akan_datang' ? 'Akan Datang' : 'Selesai'}</div>
        </div>
    `).join('') : `
        <div class="empty-state">
            <i class="fas fa-calendar-times"></i>
            <h3>Belum ada agenda</h3>
            <p>Tambahkan agenda di file data.js</p>
        </div>
    `;

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-calendar-alt"></i> Agenda Kegiatan</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Agenda</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="agenda-filter-bar">
                <button class="filter-btn active" data-filter="all">Semua</button>
                <button class="filter-btn" data-filter="akan_datang">Akan Datang</button>
                <button class="filter-btn" data-filter="selesai">Selesai</button>
            </div>
            <div class="agenda-list-full">${agendaHTML}</div>
        </div>
    </section>
    `;
}

function initAgendaFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            document.querySelectorAll('.agenda-item[data-status]').forEach(item => {
                item.style.display = (filter === 'all' || item.dataset.status === filter) ? 'flex' : 'none';
            });
        });
    });
}

// ===========================
// ANGGARAN
// ===========================
function renderAnggaran() {
    const ang = DATA.anggaran;
    let imagesHTML = '';

    if (ang.foto && ang.foto.length > 0) {
        imagesHTML = ang.foto.map(f => {
            if (f) return `<img src="${esc(f)}" alt="Realisasi Anggaran Desa" style="width:100%; max-width:100%; height:auto; display:block; margin: 0 auto 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px;">`;
            return '';
        }).join('');
    }

    if (!imagesHTML || imagesHTML.trim() === '') {
        imagesHTML = `
        <div class="empty-state">
            <i class="fas fa-file-invoice-dollar"></i>
            <h3>Data Anggaran Belum Tersedia</h3>
            <p>Silakan upload foto infografis APBDes/Realisasi di di folder assets/images/anggaran/ lalu update file data.js</p>
        </div>`;
    }

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-chart-pie"></i> Transparansi Anggaran</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Anggaran</span></nav>
        </div>
    </section>
    <section class="section" style="background-color: #f8f9fa;">
        <div class="container">
            <div class="anggaran-image-container" style="text-align: center; max-width: 1200px; margin: 0 auto;">
                ${imagesHTML}
            </div>
        </div>
    </section>
    `;
}

// ===========================
// GALERI
// ===========================
function renderGaleri() {
    const galeri = DATA.galeri;
    const galeriHTML = galeri.length ? `
        <div class="galeri-grid">
            ${galeri.map(g => `
            <div class="galeri-item" onclick="openGaleriModal('${esc(g.judul)}', '${esc(g.deskripsi)}', '${esc(g.foto)}')">
                <div class="galeri-img-placeholder">
                    ${g.foto ? `<img src="${esc(g.foto)}" alt="${esc(g.judul)}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">` : `<i class="fas fa-image"></i><span>${esc(g.judul)}</span>`}
                </div>
                <div class="galeri-overlay">
                    <i class="fas fa-search-plus"></i>
                    <h4>${esc(g.judul)}</h4>
                    <p>${esc(g.deskripsi.substring(0, 80))}</p>
                </div>
            </div>
            `).join('')}
        </div>
    ` : `
        <div class="empty-state">
            <i class="fas fa-images"></i>
            <h3>Galeri Kosong</h3>
            <p>Tambahkan foto di file data.js</p>
        </div>
    `;

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-images"></i> Galeri Desa</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Galeri</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">${galeriHTML}</div>
    </section>
    `;
}

function openGaleriModal(title, desc, foto) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    const container = document.getElementById('modalImgContainer');
    container.innerHTML = foto
        ? `<img src="${foto}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">`
        : '<i class="fas fa-image"></i>';
    document.getElementById('galeriModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeGaleriModal() {
    document.getElementById('galeriModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===========================
// UMKM
// ===========================
function renderUMKM() {
    const umkm = DATA.umkm;
    const umkmHTML = umkm.length ? `
        <div class="umkm-grid">
            ${umkm.map(u => {
        const telpon = u.telepon.replace(/[^0-9]/g, '');
        const wa = telpon.startsWith('0') ? '62' + telpon.substring(1) : telpon;
        return `
                <div class="umkm-card">
                    <div class="umkm-img">
                        <div class="umkm-img-placeholder">
                            ${u.foto ? `<img src="${esc(u.foto)}" alt="${esc(u.nama_usaha)}" style="width:100%;height:100%;object-fit:cover;">` : '<i class="fas fa-store"></i>'}
                        </div>
                    </div>
                    <div class="umkm-body">
                        <h3>${esc(u.nama_usaha)}</h3>
                        <p class="umkm-produk"><i class="fas fa-tag"></i> ${esc(u.produk)}</p>
                        <p class="umkm-desc">${esc(u.deskripsi)}</p>
                        <div class="umkm-price"><i class="fas fa-money-bill-wave"></i> ${esc(u.harga)}</div>
                        <div class="umkm-contact">
                            <div class="umkm-contact-item"><i class="fas fa-user"></i><span>${esc(u.pemilik)}</span></div>
                            <div class="umkm-contact-item"><i class="fas fa-phone"></i><span>${esc(u.telepon)}</span></div>
                            <div class="umkm-contact-item"><i class="fas fa-map-marker-alt"></i><span>${esc(u.alamat)}</span></div>
                        </div>
                        <a href="https://wa.me/${wa}" target="_blank" class="btn btn-success btn-sm">
                            <i class="fab fa-whatsapp"></i> Hubungi via WhatsApp
                        </a>
                    </div>
                </div>
                `;
    }).join('')}
        </div>
    ` : `
        <div class="empty-state">
            <i class="fas fa-store"></i>
            <h3>Coming Soon</h3>
            <p>Data potensi UMKM sedang dipersiapkan dan akan segera hadir.</p>
        </div>
    `;

    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-store"></i> Potensi Desa &amp; UMKM</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>UMKM</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Produk Lokal</span>
                <h2>Produk Unggulan Desa Polewali</h2>
                <p>Dukung produk lokal UMKM Desa Polewali untuk kesejahteraan bersama</p>
            </div>
            ${umkmHTML}
        </div>
    </section>
    `;
}

// ===========================
// KONTAK
// ===========================
function renderKontak() {
    const p = DATA.profil;
    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-envelope"></i> Kontak Desa</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Kontak</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="kontak-grid">
                <div class="kontak-info">
                    <h2>Hubungi Kami</h2>
                    <p>Silakan hubungi kami untuk informasi lebih lanjut mengenai pelayanan dan kegiatan Desa Polewali.</p>
                    <div class="kontak-detail">
                        <div class="kontak-item">
                            <div class="kontak-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div><h4>Alamat</h4><p>${esc(p.alamat)}</p></div>
                        </div>
                        <div class="kontak-item">
                            <div class="kontak-icon"><i class="fas fa-phone"></i></div>
                            <div><h4>Telepon</h4><p>${esc(p.telepon)}</p></div>
                        </div>
                        <div class="kontak-item">
                            <div class="kontak-icon"><i class="fas fa-envelope"></i></div>
                            <div><h4>Email</h4><p>${esc(p.email)}</p></div>
                        </div>
                        <div class="kontak-item">
                            <div class="kontak-icon"><i class="far fa-clock"></i></div>
                            <div><h4>Jam Pelayanan</h4><p>Senin - Jumat: 08:00 - 16:00 WITA<br>Sabtu - Minggu: Tutup</p></div>
                        </div>
                    </div>
                    <div class="kontak-map">
                        <iframe src="${p.google_maps_embed}" width="100%" height="300" style="border:0;border-radius:12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div class="kontak-form-wrap">
                    <div class="form-card">
                        <h3><i class="fas fa-paper-plane"></i> Kirim Pesan via WhatsApp</h3>
                        <form id="kontakForm" onsubmit="submitKontak(event)">
                            <div class="form-group">
                                <label for="k-nama"><i class="fas fa-user"></i> Nama Lengkap <span class="required">*</span></label>
                                <input type="text" id="k-nama" required placeholder="Masukkan nama Anda">
                            </div>
                            <div class="form-group">
                                <label for="k-email"><i class="fas fa-envelope"></i> Email</label>
                                <input type="email" id="k-email" placeholder="contoh@email.com">
                            </div>
                            <div class="form-group">
                                <label for="k-subjek"><i class="fas fa-tag"></i> Subjek</label>
                                <input type="text" id="k-subjek" placeholder="Subjek pesan">
                            </div>
                            <div class="form-group">
                                <label for="k-pesan"><i class="fas fa-comment"></i> Pesan <span class="required">*</span></label>
                                <textarea id="k-pesan" rows="5" required placeholder="Tulis pesan Anda di sini..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                <i class="fab fa-whatsapp"></i> Kirim via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

function submitKontak(e) {
    e.preventDefault();
    const nama = document.getElementById('k-nama').value.trim();
    const email = document.getElementById('k-email').value.trim();
    const subjek = document.getElementById('k-subjek').value.trim();
    const pesan = document.getElementById('k-pesan').value.trim();
    if (!nama || !pesan) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Nama dan Pesan wajib diisi!', confirmButtonColor: '#2E7D32' });
        return;
    }
    let teks = `*Pesan dari Website Desa Polewali*\n\n`;
    teks += `*Nama:* ${nama}\n`;
    if (email) teks += `*Email:* ${email}\n`;
    if (subjek) teks += `*Subjek:* ${subjek}\n`;
    teks += `\n*Pesan:*\n${pesan}`;
    const url = `https://wa.me/${DATA.whatsapp_no}?text=${encodeURIComponent(teks)}`;
    window.open(url, '_blank');
    Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Anda akan diarahkan ke WhatsApp.', confirmButtonColor: '#2E7D32' });
    e.target.reset();
}

// ===========================
// KRITIK & SARAN
// ===========================
function renderKritikSaran() {
    return `
    <section class="page-header">
        <div class="container">
            <h1><i class="fas fa-comment-dots"></i> Kritik &amp; Saran</h1>
            <nav class="breadcrumb"><a href="#beranda">Beranda</a><span>/</span><span>Kritik &amp; Saran</span></nav>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="kritik-container">
                <div class="kritik-info">
                    <div class="kritik-icon"><i class="fas fa-bullhorn"></i></div>
                    <h2>Suara Anda Penting!</h2>
                    <p>Sampaikan kritik dan saran Anda untuk membantu kami mewujudkan Desa Polewali yang lebih baik. Masukan dari masyarakat menjadi bahan evaluasi dan perbaikan pelayanan kami.</p>
                    <ul class="kritik-points">
                        <li><i class="fas fa-check-circle"></i> Identitas Anda dijaga kerahasiaannya</li>
                        <li><i class="fas fa-check-circle"></i> Setiap masukan akan ditindaklanjuti</li>
                        <li><i class="fas fa-check-circle"></i> Kritik membangun untuk desa yang lebih maju</li>
                    </ul>
                </div>
                <div class="kritik-form-wrap">
                    <div class="form-card">
                        <h3><i class="fas fa-edit"></i> Form Kritik &amp; Saran</h3>
                        <form id="kritikForm" onsubmit="submitKritik(event)">
                            <div class="form-group">
                                <label for="ks-nama"><i class="fas fa-user"></i> Nama (Opsional)</label>
                                <input type="text" id="ks-nama" placeholder="Kosongkan jika ingin anonim">
                            </div>
                            <div class="form-group">
                                <label for="ks-isi"><i class="fas fa-comment"></i> Kritik / Saran <span class="required">*</span></label>
                                <textarea id="ks-isi" rows="6" required placeholder="Tuliskan kritik atau saran Anda untuk Desa Polewali..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                <i class="fab fa-whatsapp"></i> Kirim via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

function submitKritik(e) {
    e.preventDefault();
    const nama = document.getElementById('ks-nama').value.trim();
    const isi = document.getElementById('ks-isi').value.trim();
    if (!isi) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Kritik/Saran wajib diisi!', confirmButtonColor: '#2E7D32' });
        return;
    }
    let teks = `*Kritik & Saran - Website Desa Polewali*\n\n`;
    teks += `*Dari:* ${nama || 'Anonim'}\n\n`;
    teks += `*Kritik/Saran:*\n${isi}`;
    const url = `https://wa.me/${DATA.whatsapp_no}?text=${encodeURIComponent(teks)}`;
    window.open(url, '_blank');
    Swal.fire({ icon: 'success', title: 'Terima Kasih!', text: 'Kritik & saran Anda telah dikirim via WhatsApp.', confirmButtonColor: '#2E7D32' });
    e.target.reset();
}

// ===========================
// FOOTER INIT
// ===========================
function initFooter() {
    const p = DATA.profil;
    const sm = DATA.sosmed;
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    document.getElementById('footer-contact').innerHTML = `
        <li><i class="fas fa-map-marker-alt"></i> ${esc(p.alamat)}</li>
        <li><i class="fas fa-phone"></i> ${esc(p.telepon)}</li>
        <li><i class="fas fa-envelope"></i> ${esc(p.email)}</li>
    `;
    document.getElementById('footer-social').innerHTML = `
        <a href="${esc(sm.facebook)}" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="${esc(sm.instagram)}" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="${esc(sm.youtube)}" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="${esc(sm.whatsapp)}" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    `;
    // Footer link clicks
    document.querySelectorAll('.footer a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.hash = this.getAttribute('href');
        });
    });
    document.querySelector('.navbar-brand').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '#beranda';
    });
}

// ===========================
// COUNTER & PROGRESS BAR
// ===========================
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const start = performance.now();
                const animate = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(target * eased).toLocaleString('id-ID');
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => { entry.target.style.width = width; }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(b => observer.observe(b));
}

// ===========================
// INIT APP
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    initFooter();
    renderPage();
    window.addEventListener('hashchange', renderPage);

    // Galeri modal close on overlay click
    document.getElementById('galeriModal').addEventListener('click', function (e) {
        if (e.target === this) closeGaleriModal();
    });
});

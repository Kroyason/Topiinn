/**
 * Semua tampilan dibangun dengan createElement + textContent.
 * Tidak ada innerHTML untuk data yang bisa diedit pengelola.
 */

import {
  DIVE_FERRY,
  GAMBAR_OPSI,
  KATEGORI,
  LIVE_MUSIC,
  PROFIL,
  WA_NUMBER,
  formatRupiah,
  hitungRingkasan,
  hitungRingkasanDashboard,
  statusStok,
} from './products.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const PLACEHOLDER = '/images/placeholder.svg';
const toastTimers = new WeakMap();

const PATHS = {
  whatsapp: [
    'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a.9.9 0 0 1 1.1-.2c1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8a.9.9 0 0 1-.2 1.1L6.6 10.8Z',
  ],
  sliders: ['M4 7h16', 'M4 12h16', 'M4 17h16', 'M9 5v4', 'M15 10v4', 'M7 15v4'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  search: ['M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z', 'm16.5 16.5 4 4'],
  star: ['m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z'],
  leaf: ['M20 4C9 4 4 9 4 16c0 2 1 4 2 4 7 0 14-5 14-16Z', 'M6 20c3-5 7-9 12-12'],
  info: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z', 'M12 11v6', 'M12 7.5h.01'],
  warning: ['M12 3 2 20h20L12 3Z', 'M12 9v5', 'M12 17.5h.01'],
  check: ['m5 12 4.5 4.5L19 7'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M4 20h16'],
  upload: ['M12 21V9', 'm7 14 5-5 5 5', 'M4 4h16'],
  snorkel: ['M4 15c3-8 13-8 16 0', 'M6 15v4', 'M18 15v4', 'M10 9h4'],
  ferry: ['M3 17h18', 'M5 17V9h14v8', 'M9 9V6h6v3', 'M7 20c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0'],
  waves: ['M2 9c3-3 5 3 8 0s5-3 8 0 4 0 4 0', 'M2 15c3-3 5 3 8 0s5-3 8 0 4 0 4 0'],
};

export function svgIcon(name, className = '') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  if (className) svg.setAttribute('class', className);

  for (const d of PATHS[name] || []) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  }
  return svg;
}

/** Mengisi placeholder ikon di index.html (<span data-icon="...">). */
export function pasangIkon(root = document) {
  root.querySelectorAll('[data-icon]').forEach((slot) => {
    if (!slot.querySelector('svg')) slot.appendChild(svgIcon(slot.dataset.icon));
  });
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function badge(teks, className, ikon) {
  const node = el('span', `badge ${className}`);
  if (ikon) node.appendChild(svgIcon(ikon));
  node.appendChild(document.createTextNode(teks));
  return node;
}

/** Hanya path lokal yang diizinkan (AC keamanan). */
function amanGambar(url) {
  if (typeof url === 'string' && /^\/images\/[a-z0-9-]+\.(webp|jpg|png|svg)$/i.test(url)) {
    return url;
  }
  return PLACEHOLDER;
}

function gambar(src, alt, className, width, height) {
  const img = el('img', className);
  img.src = amanGambar(src);
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.addEventListener(
    'error',
    () => {
      if (!img.src.endsWith(PLACEHOLDER)) img.src = PLACEHOLDER;
    },
    { once: true },
  );
  return img;
}

export function buatTautanWhatsApp(jenis, item = null) {
  let pesan;
  if (jenis === 'kamar' && item) {
    pesan =
      `Halo Topi Inn & Restaurant, saya ingin bertanya tentang ${item.nama}.\n` +
      'Apakah kamar masih tersedia dan berapa tarif per malam saat ini?\nTerima kasih.';
  } else if (jenis === 'kamar') {
    pesan =
      'Halo Topi Inn & Restaurant, saya ingin bertanya ketersediaan dan tarif kamar.\nTerima kasih.';
  } else if (jenis === 'live') {
    pesan =
      'Halo Topi Inn & Restaurant, saya ingin reservasi meja untuk live music.\n' +
      'Hari/tanggal: ...\nJumlah orang: ...\nJam: ...\nMohon informasinya, terima kasih.';
  } else {
    pesan =
      'Halo Topi Inn & Restaurant, saya ingin reservasi meja.\n' +
      'Jumlah orang: ...\nTanggal: ...\nJam: ...\nMohon informasinya, terima kasih.';
  }
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

/** Memasang href pada tautan statis di index.html. */
export function pasangTautanWA(root = document) {
  root.querySelectorAll('a[data-wa]').forEach((link) => {
    link.href = buatTautanWhatsApp(link.dataset.wa);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

/** Mengisi teks profil statis yang ditandai atribut data-profil. */
export function pasangDataProfil(root = document) {
  root.querySelectorAll('[data-profil]').forEach((node) => {
    const nilai = PROFIL[node.dataset.profil];
    if (typeof nilai === 'string') node.textContent = nilai;
  });
}

/** Jadwal live music dari konstanta LIVE_MUSIC (bukan teks hardcoded). */
export function renderLiveMusic(container) {
  container.replaceChildren();
  for (const jadwal of LIVE_MUSIC) {
    const baris = el('li');
    baris.append(
      el('span', 'schedule-day', jadwal.hari),
      el('span', 'schedule-time', jadwal.jam),
      el('span', 'schedule-kind', jadwal.jenis),
    );
    container.appendChild(baris);
  }
}

/** Kartu fasilitas dive/ferry dari konstanta DIVE_FERRY. */
export function renderFasilitas(container) {
  container.replaceChildren();
  const ikon = ['snorkel', 'ferry', 'waves'];
  DIVE_FERRY.forEach((fasilitas, index) => {
    const kartu = el('article', 'facility');
    const ikonWadah = el('span', 'facility-icon');
    ikonWadah.setAttribute('aria-hidden', 'true');
    ikonWadah.appendChild(svgIcon(ikon[index] || 'waves'));
    kartu.append(ikonWadah, el('h3', '', fasilitas.judul), el('p', '', fasilitas.detail));
    container.appendChild(kartu);
  });
}

export function formatJam(iso) {
  if (!iso) return '--.--';
  const tanggal = new Date(iso);
  if (Number.isNaN(tanggal.getTime())) return '--.--';
  const jam = String(tanggal.getHours()).padStart(2, '0');
  const menit = String(tanggal.getMinutes()).padStart(2, '0');
  return `${jam}.${menit}`;
}

export function renderChips(container, aktif) {
  container.replaceChildren();
  for (const kategori of KATEGORI) {
    const chip = el('button', 'chip', kategori);
    chip.type = 'button';
    chip.dataset.kategori = kategori;
    container.appendChild(chip);
  }
  setChipsActive(container, aktif);
}

export function setChipsActive(container, aktif) {
  container.querySelectorAll('.chip').forEach((chip) => {
    const isAktif = chip.dataset.kategori === aktif;
    chip.classList.toggle('is-active', isAktif);
    chip.setAttribute('aria-pressed', String(isAktif));
  });
}

const LABEL_RINGKASAN = [
  ['total', 'Total item', 'ungu'],
  ['tersedia', 'Tersedia', 'lime'],
  ['habis', 'Habis', 'plum'],
  ['unggulan', 'Unggulan', 'oranye'],
];

export function renderSummary(container, items, compact = false) {
  const ringkasan = hitungRingkasan(items);
  container.replaceChildren();

  for (const [key, label, aksen] of LABEL_RINGKASAN) {
    const kartu = el('div', `summary-card summary-${aksen}`);
    const angka = el('p', 'summary-value', String(ringkasan[key]));
    const caption = el('p', 'summary-label');
    if (compact) caption.appendChild(el('span', `dot dot-${aksen}`));
    caption.appendChild(document.createTextNode(label));
    kartu.append(angka, caption);
    container.appendChild(kartu);
  }
}

const LABEL_RINGKASAN_DASH = [
  ['total', 'Menu & layanan', 'ungu'],
  ['tersedia', 'Ketersediaan', 'lime'],
  ['totalStok', 'Total stok', 'oranye'],
  ['kategori', 'Kategori', 'ungu'],
];

export function renderDashboardSummary(container, items) {
  const ringkasan = hitungRingkasanDashboard(items);
  container.replaceChildren();
  for (const [key, label, aksen] of LABEL_RINGKASAN_DASH) {
    const kartu = el('div', `summary-card summary-${aksen}`);
    kartu.append(
      el('p', 'summary-value', String(ringkasan[key])),
      el('p', 'summary-label', label),
    );
    container.appendChild(kartu);
  }
}

/** Filter kategori dashboard, lengkap dengan jumlah item per kategori. */
export function renderDashboardFilter(container, items, aktif) {
  container.replaceChildren();
  for (const kategori of KATEGORI) {
    const jumlah = kategori === 'Semua'
      ? items.length
      : items.filter((item) => item.kategori === kategori).length;
    const chip = el('button', 'chip', `${kategori} (${jumlah})`);
    chip.type = 'button';
    chip.dataset.kategori = kategori;
    container.appendChild(chip);
  }
  setChipsActive(container, aktif);
}

export function renderGambarOptions(select) {
  select.replaceChildren();
  for (const opsi of GAMBAR_OPSI) {
    const option = el('option', '', opsi.label);
    option.value = opsi.value;
    select.appendChild(option);
  }
}

function sel(label) {
  const td = el('td');
  td.dataset.label = label;
  return td;
}

/** Tabel dashboard. Di layar sempit, tiap sel menampilkan label lewat CSS. */
export function renderDashboardTable(container, items) {
  container.replaceChildren();
  if (items.length === 0) {
    const td = el('td', 'dash-empty', 'Belum ada item pada kategori ini. Tambahkan menu atau layanan baru.');
    td.colSpan = 6;
    const tr = el('tr');
    tr.appendChild(td);
    container.appendChild(tr);
    return;
  }

  for (const item of items) {
    const tr = el('tr');
    tr.dataset.row = item.id;

    const tdNama = sel('Nama');
    const identitas = el('div', 'row-identity');
    identitas.appendChild(gambar(item.imageUrl, '', 'row-thumb', 40, 40));
    const teks = el('div');
    teks.appendChild(el('p', 'row-name', item.nama));
    const ringkas = item.deskripsi.length > 48
      ? `${item.deskripsi.slice(0, 48)}…`
      : item.deskripsi;
    teks.appendChild(el('p', 'caption', ringkas || 'Tanpa deskripsi'));
    identitas.appendChild(teks);
    tdNama.appendChild(identitas);

    const tdKategori = sel('Kategori');
    const kategori = el('span', 'badge badge-kategori');
    kategori.append(
      el('span', `dot dot-${dotKategori(item.kategori)}`),
      document.createTextNode(item.kategori),
    );
    tdKategori.appendChild(kategori);

    const tdHarga = sel('Harga');
    tdHarga.appendChild(el('span', 'price', formatRupiah(item.harga)));

    const tdStok = sel('Stok');
    tdStok.append(
      el('span', 'stok-angka', String(item.stok)),
      badge(statusStok(item.stok), `status-${statusStok(item.stok).toLowerCase()}`),
    );

    const tdUnggulan = sel('Unggulan');
    tdUnggulan.appendChild(
      item.unggulan ? badge('Ya', 'badge-unggulan', 'star') : el('span', 'caption', '—'),
    );

    const tdAksi = sel('Aksi');
    const aksi = el('div', 'row-actions');
    const edit = el('button', 'btn btn-secondary btn-small', 'Edit');
    edit.type = 'button';
    edit.dataset.edit = item.id;
    const hapus = el('button', 'btn btn-danger-ghost btn-small', 'Hapus');
    hapus.type = 'button';
    hapus.dataset.hapus = item.id;
    aksi.append(edit, hapus);
    tdAksi.appendChild(aksi);

    tr.append(tdNama, tdKategori, tdHarga, tdStok, tdUnggulan, tdAksi);
    container.appendChild(tr);
  }
}

function kartuItem(item) {
  const kartu = el('article', `card${item.stok === 0 ? ' card-habis' : ''}`);
  kartu.dataset.id = item.id;

  const media = el('div', 'card-media');
  media.appendChild(gambar(item.imageUrl, `Ilustrasi ${item.nama}`, 'card-img', 400, 300));
  if (item.unggulan) media.appendChild(badge('Unggulan', 'badge-unggulan', 'star'));
  if (item.kategori === 'Vegan / Plant-Based') {
    media.appendChild(badge('Vegan', 'badge-vegan', 'leaf'));
  }
  kartu.appendChild(media);

  const isi = el('div', 'card-body');
  const barisAtas = el('div', 'card-meta');
  const kategori = el('span', 'badge badge-kategori');
  kategori.append(el('span', `dot dot-${dotKategori(item.kategori)}`), document.createTextNode(item.kategori));

  const harga = el('span', 'price', formatRupiah(item.harga));
  if (item.kategori === 'Kamar') harga.appendChild(el('span', 'price-unit', '/malam'));
  barisAtas.append(kategori, harga);
  isi.appendChild(barisAtas);

  isi.appendChild(el('h3', 'card-title', item.nama));
  isi.appendChild(el('p', 'card-desc', item.deskripsi));

  if (item.deskripsi.includes('21+')) isi.appendChild(el('span', 'age-mark', '21+'));
  kartu.appendChild(isi);

  const footer = el('div', 'card-footer');
  footer.appendChild(badge(statusStok(item.stok), `status-${statusStok(item.stok).toLowerCase()}`));
  const stokTeks = item.kategori === 'Kamar'
    ? `${item.stok} kamar`
    : `Stok ${item.stok}`;
  footer.appendChild(el('span', 'stock-text', stokTeks));
  kartu.appendChild(footer);

  if (item.kategori === 'Kamar') {
    const link = el('a', 'btn btn-secondary btn-small');
    link.href = buatTautanWhatsApp('kamar', item);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(svgIcon('whatsapp'), document.createTextNode('Tanya Kamar'));
    kartu.appendChild(link);
  }

  return kartu;
}

function dotKategori(kategori) {
  if (kategori === 'Vegan / Plant-Based') return 'lime';
  if (kategori === 'Minuman & Koktail') return 'oranye';
  if (kategori === 'Kamar') return 'plum';
  return 'ungu';
}

export function renderCards(container, items) {
  container.replaceChildren();
  for (const item of items) container.appendChild(kartuItem(item));
}

export function setResultCount(node, tampil, total) {
  node.textContent = tampil === 0
    ? 'Tidak ada item yang cocok'
    : `Menampilkan ${tampil} dari ${total} item`;
}

export function renderEmptyState(container) {
  container.replaceChildren();
  const kartu = el('div', 'empty-state');
  kartu.appendChild(svgIcon('search', 'empty-icon'));
  kartu.appendChild(el('h3', '', 'Belum ada yang cocok.'));
  kartu.appendChild(el('p', '', 'Coba kata kunci lain atau reset pencarian dan filter.'));
  const tombol = el('button', 'btn btn-primary', 'Reset pencarian & filter');
  tombol.type = 'button';
  tombol.id = 'empty-reset';
  kartu.appendChild(tombol);
  container.appendChild(kartu);
}

/** Mengisi form dashboard. item = null berarti mode tambah. */
export function isiFormItem(form, item) {
  form.elements.namedItem('id').value = item ? item.id : '';
  form.elements.namedItem('nama').value = item ? item.nama : '';
  form.elements.namedItem('kategori').value = item ? item.kategori : '';
  form.elements.namedItem('harga').value = item ? String(item.harga) : '';
  form.elements.namedItem('stok').value = item ? String(item.stok) : '';
  form.elements.namedItem('deskripsi').value = item ? item.deskripsi : '';
  form.elements.namedItem('imageUrl').value = item ? item.imageUrl : '';
  form.elements.namedItem('unggulan').checked = item ? item.unggulan : false;
  bersihkanErrorForm(form);
}

export function bersihkanErrorForm(form) {
  form.querySelectorAll('.field-error').forEach((node) => {
    node.textContent = '';
  });
  form.querySelectorAll('[aria-invalid="true"]').forEach((node) => {
    node.setAttribute('aria-invalid', 'false');
  });
}

/** Menampilkan error validasi dan memfokuskan field pertama yang bermasalah. */
export function terapkanErrorForm(form, errors) {
  bersihkanErrorForm(form);
  let pertama = null;
  for (const [nama, pesan] of Object.entries(errors)) {
    if (!pesan) continue;
    const input = form.elements.namedItem(nama);
    if (!input) continue;
    input.setAttribute('aria-invalid', 'true');
    const error = input.closest('.field')?.querySelector('.field-error');
    if (error) error.textContent = pesan;
    if (!pertama) pertama = input;
  }
  if (pertama instanceof HTMLElement) pertama.focus();
}

export function setSaveIndicator(node, updatedAt, storageOk) {
  if (!storageOk) {
    node.textContent = 'Perubahan hanya berlaku selama halaman terbuka.';
    return;
  }
  node.textContent = updatedAt
    ? `Tersimpan di perangkat ini · ${formatJam(updatedAt)}`
    : 'Tersimpan di perangkat ini.';
}

export function tampilkanToast(node, pesan) {
  const timerLama = toastTimers.get(node);
  if (timerLama) clearTimeout(timerLama);
  node.textContent = pesan;
  node.hidden = false;
  toastTimers.set(
    node,
    setTimeout(() => {
      node.hidden = true;
      node.textContent = '';
    }, 3000),
  );
}

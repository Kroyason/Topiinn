/**
 * Semua tampilan dibangun dengan createElement + textContent.
 * Tidak ada innerHTML untuk data yang bisa diedit pengelola.
 */

import {
  KATEGORI,
  WA_NUMBER,
  formatRupiah,
  hitungRingkasan,
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

function buatInputField(item, nama, labelTeks, nilai) {
  const wrap = el('div', 'field');
  const id = `${nama}-${item.id}`;
  const errorId = `err-${nama}-${item.id}`;

  const label = el('label', 'field-label', labelTeks);
  label.htmlFor = id;

  const input = el('input', 'field-input');
  input.type = 'text';
  input.inputMode = 'numeric';
  input.autocomplete = 'off';
  input.id = id;
  input.value = String(nilai);
  input.dataset.field = nama;
  input.setAttribute('aria-describedby', errorId);
  input.setAttribute('aria-invalid', 'false');

  const error = el('p', 'field-error');
  error.id = errorId;
  error.dataset.error = nama;
  error.setAttribute('aria-live', 'polite');

  wrap.append(label, input, error);
  return wrap;
}

export function renderManagerRows(container, items) {
  container.replaceChildren();

  for (const item of items) {
    const row = el('article', 'manager-row');
    row.dataset.row = item.id;

    const identitas = el('div', 'row-identity');
    identitas.appendChild(gambar(item.imageUrl, '', 'row-thumb', 40, 40));
    const teks = el('div');
    teks.appendChild(el('p', 'row-name', item.nama));
    teks.appendChild(el('p', 'caption', item.kategori));
    identitas.appendChild(teks);
    row.appendChild(identitas);

    const fields = el('div', 'row-fields');
    fields.appendChild(buatInputField(item, 'harga', 'Harga (Rp)', item.harga));
    fields.appendChild(
      buatInputField(item, 'stok', item.kategori === 'Kamar' ? 'Stok (kamar)' : 'Stok', item.stok),
    );
    row.appendChild(fields);

    const toggleLabel = el('label', 'switch-row');
    const toggle = el('input');
    toggle.type = 'checkbox';
    toggle.id = `unggulan-${item.id}`;
    toggle.dataset.field = 'unggulan';
    toggle.checked = item.unggulan;
    toggleLabel.append(toggle, el('span', 'switch'), el('span', 'switch-label', 'Unggulan'));
    row.appendChild(toggleLabel);

    row.appendChild(badge(statusStok(item.stok), `status-${statusStok(item.stok).toLowerCase()}`));

    const simpan = el('button', 'btn btn-primary btn-small', 'Simpan');
    simpan.type = 'button';
    simpan.dataset.save = item.id;
    simpan.disabled = true;
    row.appendChild(simpan);

    container.appendChild(row);
  }
}

/** Dipanggil setelah simpan berhasil: tanpa mengganti fokus pada input. */
export function tandaiBarisTersimpan(row, item) {
  row.classList.remove('is-dirty');
  const simpan = row.querySelector('[data-save]');
  if (simpan) simpan.disabled = true;

  const statusLama = row.querySelector('[class*="status-"]');
  if (statusLama) {
    statusLama.className = `badge status-${statusStok(item.stok).toLowerCase()}`;
    statusLama.textContent = statusStok(item.stok);
  }
  row.querySelectorAll('.field-error').forEach((node) => {
    node.textContent = '';
  });
  row.querySelectorAll('[aria-invalid="true"]').forEach((node) => {
    node.setAttribute('aria-invalid', 'false');
  });
}

export function setSaveIndicator(node, updatedAt, storageOk) {
  node.textContent = storageOk
    ? `Tersimpan di perangkat ini · ${formatJam(updatedAt)}`
    : 'Perubahan hanya berlaku selama halaman terbuka.';
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

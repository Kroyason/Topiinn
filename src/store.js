/**
 * Satu-satunya "database": localStorage.
 * Menyimpan array produk di "Topiinn:products:v1", memvalidasi hasil JSON.parse,
 * memulihkan data contoh bila rusak, dan menyediakan ekspor/impor/reset demo.
 * Bila storage diblokir, aplikasi tetap berjalan in-memory.
 */

import { KATEGORI, SEED_ITEMS } from './products.js';

export const STORAGE_KEY = 'Topiinn:products:v1';

const ID_RE = /^[a-z0-9-]{3,48}$/;
const GAMBAR_RE = /^\/images\/[a-z0-9-]+\.(?:webp|jpg|png|svg)$/i;
const KATEGORI_VALID = KATEGORI.filter((k) => k !== 'Semua');
const FIELD_PRODUK = ['id', 'nama', 'kategori', 'harga', 'stok', 'deskripsi', 'imageUrl', 'unggulan'];

/** Salinan bersih: hanya field yang dikenal (field primitif semua). */
export function salinItems(items) {
  return items.map((item) => {
    const salinan = {};
    for (const field of FIELD_PRODUK) salinan[field] = item[field];
    return salinan;
  });
}

/**
 * Validasi satu produk. Mengembalikan pesan error yang bisa dibacakan ke pengguna,
 * atau string kosong bila semua field punya struktur dan tipe yang benar.
 */
function validasiItem(item, index, array) {
  const awal = `Item ke-${index + 1}: `;
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return `${awal}harus berupa objek.`;
  }
  if (typeof item.id !== 'string' || !ID_RE.test(item.id)) {
    return `${awal}id harus slug 3–48 karakter (a-z0-9-).`;
  }
  if (array.findIndex((calon) => calon && calon.id === item.id) !== index) {
    return `${awal}id “${item.id}” duplikat.`;
  }
  if (typeof item.nama !== 'string' || item.nama.length < 3 || item.nama.length > 60) {
    return `${awal}nama harus string 3–60 karakter.`;
  }
  if (!KATEGORI_VALID.includes(item.kategori)) {
    return `${awal}kategori tidak dikenal.`;
  }
  if (!Number.isInteger(item.harga) || item.harga < 0 || item.harga > 100000000) {
    return `${awal}harga harus bilangan bulat 0–100.000.000.`;
  }
  if (!Number.isInteger(item.stok) || item.stok < 0 || item.stok > 999) {
    return `${awal}stok harus bilangan bulat 0–999.`;
  }
  if (typeof item.deskripsi !== 'string' || item.deskripsi.length > 240) {
    return `${awal}deskripsi harus string maksimal 240 karakter.`;
  }
  if (typeof item.imageUrl !== 'string' || (item.imageUrl !== '' && !GAMBAR_RE.test(item.imageUrl))) {
    return `${awal}imageUrl harus path lokal /images/... atau kosong.`;
  }
  if (typeof item.unggulan !== 'boolean') {
    return `${awal}unggulan harus bernilai true atau false.`;
  }
  return '';
}

/** Validasi array produk: struktur array + tipe dan batas tiap field. */
export function validasiArrayProduk(nilai) {
  if (!Array.isArray(nilai)) {
    return { ok: false, error: 'data harus berupa array produk.' };
  }
  for (let index = 0; index < nilai.length; index += 1) {
    const error = validasiItem(nilai[index], index, nilai);
    if (error) return { ok: false, error };
  }
  return { ok: true, error: '' };
}

/** Menulis array produk apa adanya ke localStorage. */
function tulis(items) {
  const updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(salinItems(items)));
    return { ok: true, updatedAt };
  } catch {
    return { ok: false, updatedAt: null };
  }
}

/** Data rusak → tulis ulang seed agar reload berikutnya bersih, sambil kirim alasan. */
function pulihkanSeed(error) {
  const seed = salinItems(SEED_ITEMS);
  const hasil = tulis(seed);
  return { items: seed, status: 'corrupt', updatedAt: hasil.updatedAt, error };
}

/**
 * Muat array products. Status: 'ok' | 'corrupt' | 'unavailable'.
 * JSON.parse selalu dibungkus try/catch; struktur dan tiap field divalidasi.
 */
export function loadMenu() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { items: salinItems(SEED_ITEMS), status: 'unavailable', updatedAt: null, error: '' };
  }

  if (raw === null) {
    const seed = salinItems(SEED_ITEMS);
    const hasil = tulis(seed);
    return {
      items: seed,
      status: hasil.ok ? 'ok' : 'unavailable',
      updatedAt: hasil.updatedAt,
      error: '',
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return pulihkanSeed('JSON tidak valid.');
  }

  const validasi = validasiArrayProduk(parsed);
  if (!validasi.ok) return pulihkanSeed(validasi.error);

  return {
    items: salinItems(parsed),
    status: 'ok',
    updatedAt: null, // array tidak menyimpan waktu; indikator memakai waktu sesi ini
    error: '',
  };
}

export const saveMenu = tulis;

/** Reset demo: kembalikan seluruh produk ke data contoh. */
export function resetMenu() {
  const seed = salinItems(SEED_ITEMS);
  const hasil = tulis(seed);
  return { items: seed, ...hasil };
}

/** Ekspor array produk sebagai JSON terformat (siap ditulis ke file). */
export function eksporJSON(items) {
  return JSON.stringify(salinItems(items), null, 2);
}

/**
 * Impor JSON tervalidasi. Tidak menulis storage dulu, supaya pemanggil bisa
 * meminta konfirmasi sebelum menimpa data yang sedang dipakai.
 */
export function imporJSON(teks) {
  let parsed;
  try {
    parsed = JSON.parse(teks);
  } catch {
    return { ok: false, error: 'file bukan JSON yang valid.' };
  }
  const validasi = validasiArrayProduk(parsed);
  if (!validasi.ok) return { ok: false, error: validasi.error };
  return { ok: true, items: salinItems(parsed) };
}

/** Validasi input pengelola. Mengembalikan pesan error atau string kosong. */
export function validasiStok(value) {
  const teks = String(value ?? '').trim();
  if (!teks) return 'Stok wajib diisi.';
  if (!/^\d+$/.test(teks)) return 'Stok harus bilangan bulat 0–999.';
  const angka = Number(teks);
  if (angka < 0 || angka > 999) return 'Stok harus antara 0 dan 999.';
  return '';
}

export function validasiHarga(value) {
  const teks = String(value ?? '').trim();
  if (!teks) return 'Harga wajib diisi.';
  if (!/^\d+$/.test(teks)) return 'Harga harus bilangan bulat 0–100.000.000.';
  const angka = Number(teks);
  if (angka < 0 || angka > 100000000) return 'Harga harus antara 0 dan 100.000.000.';
  return '';
}

export function validasiNama(value) {
  const teks = String(value ?? '').trim();
  if (!teks) return 'Nama wajib diisi.';
  if (teks.length < 3) return 'Nama minimal 3 karakter.';
  if (teks.length > 60) return 'Nama maksimal 60 karakter.';
  return '';
}

export function validasiKategori(value) {
  if (!KATEGORI_VALID.includes(value)) return 'Pilih kategori yang valid.';
  return '';
}

export function validasiDeskripsi(value) {
  const teks = String(value ?? '').trim();
  if (teks.length > 240) return 'Deskripsi maksimal 240 karakter.';
  return '';
}

/** ID unik berbasis slug nama, aman untuk ID_RE (3–48 karakter a-z0-9-). */
export function buatId(nama, items) {
  let dasar = String(nama)
    .toLocaleLowerCase('id')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  if (dasar.length < 3) dasar = 'item';

  let kandidat = dasar;
  let nomor = 2;
  while (items.some((item) => item.id === kandidat)) {
    const akhir = `-${nomor}`;
    kandidat = `${dasar.slice(0, 48 - akhir.length)}${akhir}`;
    nomor += 1;
  }
  return kandidat;
}

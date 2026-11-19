/**
 * Satu-satunya "database": localStorage.
 * Menangani skema berversi, validasi, fallback data contoh, dan mode in-memory.
 */

import { KATEGORI, SEED_ITEMS } from './products.js';

export const STORAGE_KEY = 'topiinn.menu.v1';

const SCHEMA_VERSION = 1;
const ID_RE = /^[a-z0-9-]{3,48}$/;
const GAMBAR_RE = /^\/images\/[a-z0-9-]+\.(?:webp|jpg|png|svg)$/i;
const KATEGORI_VALID = KATEGORI.filter((k) => k !== 'Semua');

/** Salinan dangkal cukup: field primitif semua. */
export function salinItems(items) {
  return items.map((item) => ({ ...item }));
}

function itemValid(item, index, array) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || !ID_RE.test(item.id)) return false;
  if (array.findIndex((calon) => calon && calon.id === item.id) !== index) return false;
  if (typeof item.nama !== 'string' || item.nama.length < 3 || item.nama.length > 60) return false;
  if (!KATEGORI_VALID.includes(item.kategori)) return false;
  if (!Number.isInteger(item.harga) || item.harga < 0 || item.harga > 100000000) return false;
  if (!Number.isInteger(item.stok) || item.stok < 0 || item.stok > 999) return false;
  if (typeof item.deskripsi !== 'string' || item.deskripsi.length < 10 || item.deskripsi.length > 240) return false;
  if (typeof item.imageUrl !== 'string' || (item.imageUrl !== '' && !GAMBAR_RE.test(item.imageUrl))) return false;
  return typeof item.unggulan === 'boolean';
}

function tulis(items) {
  const updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION, updatedAt, items: salinItems(items) }),
    );
    return { ok: true, updatedAt };
  } catch {
    return { ok: false, updatedAt: null };
  }
}

/** Status: 'ok' | 'corrupt' | 'unavailable'. Selalu mengembalikan 8 item. */
export function loadMenu() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { items: salinItems(SEED_ITEMS), status: 'unavailable', updatedAt: null };
  }

  if (raw === null) {
    const seed = salinItems(SEED_ITEMS);
    const hasil = tulis(seed);
    return {
      items: seed,
      status: hasil.ok ? 'ok' : 'unavailable',
      updatedAt: hasil.updatedAt,
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { items: salinItems(SEED_ITEMS), status: 'corrupt', updatedAt: null };
  }

  const itemsValid =
    parsed &&
    parsed.version === SCHEMA_VERSION &&
    Array.isArray(parsed.items) &&
    parsed.items.length === 8 &&
    parsed.items.every(itemValid);

  if (!itemsValid) {
    return { items: salinItems(SEED_ITEMS), status: 'corrupt', updatedAt: null };
  }

  return {
    items: salinItems(parsed.items),
    status: 'ok',
    updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
  };
}

export const saveMenu = tulis;

export function resetMenu() {
  const seed = salinItems(SEED_ITEMS);
  const hasil = tulis(seed);
  return { items: seed, ...hasil };
}

/** Validasi input pengelola. Mengembalikan pesan error atau string kosong. */
export function validasiStok(value) {
  const teks = String(value).trim();
  if (!/^\d+$/.test(teks)) return 'Stok harus bilangan bulat 0–999.';
  const angka = Number(teks);
  if (angka < 0 || angka > 999) return 'Stok harus antara 0 dan 999.';
  return '';
}

export function validasiHarga(value) {
  const teks = String(value).trim();
  if (!/^\d+$/.test(teks)) return 'Harga harus bilangan bulat 0–100.000.000.';
  const angka = Number(teks);
  if (angka < 0 || angka > 100000000) return 'Harga harus antara 0 dan 100.000.000.';
  return '';
}

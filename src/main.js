/**
 * Titik masuk aplikasi: state UI (in-memory) + wiring event.
 * Alur: seed/localStorage → state → filter → render → aksi pengelola →validasi → simpan → render.
 */

import './style.css';
import { cari, filterKategori, urutkan } from './products.js';
import {
  STORAGE_KEY,
  loadMenu,
  resetMenu,
  saveMenu,
  validasiHarga,
  validasiStok,
} from './store.js';
import {
  pasangIkon,
  pasangTautanWA,
  renderCards,
  renderChips,
  renderEmptyState,
  renderManagerRows,
  renderSummary,
  setChipsActive,
  setResultCount,
  setSaveIndicator,
  tandaiBarisTersimpan,
  tampilkanToast,
} from './ui.js';

const state = {
  items: [],
  query: '',
  kategori: 'Semua',
  sort: 'unggulan',
  storageOk: true,
  corrupt: false,
  updatedAt: null,
};

const $ = (id) => document.getElementById(id);
const dom = {
  storageBanner: $('storage-banner'),
  corruptBanner: $('corrupt-banner'),
  search: $('search'),
  clearSearch: $('clear-search'),
  chips: $('chips'),
  sort: $('sort'),
  resultCount: $('result-count'),
  resetFiltersBtn: $('reset-filters'),
  grid: $('card-grid'),
  empty: $('empty-state'),
  summary: $('summary'),
  nav: $('site-nav'),
  navToggle: $('nav-toggle'),
  openManager: $('open-manager'),
  managerOverlay: $('manager-overlay'),
  managerDialog: $('manager-dialog'),
  managerClose: $('manager-close'),
  managerDone: $('manager-done'),
  managerSummary: $('manager-summary'),
  managerRows: $('manager-rows'),
  saveIndicator: $('save-indicator'),
  resetData: $('reset-data'),
  confirmOverlay: $('confirm-overlay'),
  confirmDialog: $('confirm-dialog'),
  confirmCancel: $('confirm-cancel'),
  confirmYes: $('confirm-yes'),
  toast: $('toast'),
};

let focusSebelumDialog = null;
let focusSebelumKonfirmasi = null;

function hasilFilter() {
  return urutkan(
    filterKategori(cari(state.items, state.query), state.kategori),
    state.sort,
  );
}

function perbaruiBanner() {
  dom.storageBanner.hidden = state.storageOk;
  dom.corruptBanner.hidden = !state.corrupt;
}

function renderKatalog() {
  const hasil = hasilFilter();
  renderCards(dom.grid, hasil);
  setResultCount(dom.resultCount, hasil.length, state.items.length);
  dom.empty.hidden = hasil.length !== 0;
  if (hasil.length === 0) renderEmptyState(dom.empty);
  dom.clearSearch.hidden = state.query.length === 0;
  dom.resetFiltersBtn.hidden =
    state.query === '' && state.kategori === 'Semua' && state.sort === 'unggulan';
  setChipsActive(dom.chips, state.kategori);
}

function renderSemua({ sertakanManager = true } = {}) {
  renderKatalog();
  renderSummary(dom.summary, state.items);
  if (sertakanManager && !dom.managerOverlay.hidden) {
    renderSummary(dom.managerSummary, state.items, true);
    renderManagerRows(dom.managerRows, state.items);
    setSaveIndicator(dom.saveIndicator, state.updatedAt, state.storageOk);
  }
}

function resetFilter({ diam = false } = {}) {
  state.query = '';
  state.kategori = 'Semua';
  state.sort = 'unggulan';
  dom.search.value = '';
  dom.sort.value = 'unggulan';
  renderKatalog();
  if (!diam) tampilkanToast(dom.toast, 'Pencarian dan filter dikembalikan.');
}

function bukaManager() {
  focusSebelumDialog = document.activeElement;
  dom.managerOverlay.hidden = false;
  document.body.classList.add('no-scroll');
  renderSemua();
  dom.managerClose.focus();
}

function tutupManager() {
  dom.managerOverlay.hidden = true;
  document.body.classList.remove('no-scroll');
  if (focusSebelumDialog instanceof HTMLElement) focusSebelumDialog.focus();
}

function adaPerubahanBelumDisimpan() {
  return Boolean(dom.managerRows.querySelector('.manager-row.is-dirty'));
}

function bukaKonfirmasiReset() {
  focusSebelumKonfirmasi = document.activeElement;
  dom.confirmOverlay.hidden = false;
  dom.confirmCancel.focus();
}

function tutupKonfirmasiReset() {
  dom.confirmOverlay.hidden = true;
  if (focusSebelumKonfirmasi instanceof HTMLElement) focusSebelumKonfirmasi.focus();
}

function jalankanReset() {
  const hasil = resetMenu();
  state.items = hasil.items;
  state.storageOk = hasil.ok;
  state.corrupt = false;
  state.updatedAt = hasil.updatedAt;
  resetFilter({ diam: true });
  perbaruiBanner();
  renderSemua();
  tutupKonfirmasiReset();
  tampilkanToast(dom.toast, 'Data contoh berhasil dimuat ulang.');
}

function tandaiBarisKotor(row) {
  const item = state.items.find((satu) => satu.id === row.dataset.row);
  if (!item) return;

  const inputHarga = row.querySelector('[data-field="harga"]');
  const inputStok = row.querySelector('[data-field="stok"]');
  const inputUnggulan = row.querySelector('[data-field="unggulan"]');
  const berubah =
    inputHarga.value.trim() !== String(item.harga) ||
    inputStok.value.trim() !== String(item.stok) ||
    inputUnggulan.checked !== item.unggulan;

  row.classList.toggle('is-dirty', berubah);
  row.querySelector('[data-save]').disabled = !berubah;
  row.querySelectorAll('.field-error').forEach((node) => {
    node.textContent = '';
  });
  row.querySelectorAll('[aria-invalid="true"]').forEach((node) => {
    node.setAttribute('aria-invalid', 'false');
  });
}

function terapkanError(input, pesan) {
  const error = input.parentElement.querySelector('.field-error');
  if (error) error.textContent = pesan;
  input.setAttribute('aria-invalid', pesan ? 'true' : 'false');
}

function simpanBaris(id) {
  const row = dom.managerRows.querySelector(`[data-row="${id}"]`);
  const item = state.items.find((satu) => satu.id === id);
  if (!row || !item) return;

  const inputHarga = row.querySelector('[data-field="harga"]');
  const inputStok = row.querySelector('[data-field="stok"]');
  const inputUnggulan = row.querySelector('[data-field="unggulan"]');

  const errorHarga = validasiHarga(inputHarga.value);
  const errorStok = validasiStok(inputStok.value);
  terapkanError(inputHarga, errorHarga);
  terapkanError(inputStok, errorStok);
  if (errorHarga || errorStok) {
    (errorHarga ? inputHarga : inputStok).focus();
    return;
  }

  item.harga = Number(inputHarga.value.trim());
  item.stok = Number(inputStok.value.trim());
  item.unggulan = inputUnggulan.checked;

  const hasil = saveMenu(state.items);
  state.storageOk = hasil.ok;
  if (hasil.ok) state.updatedAt = hasil.updatedAt;

  perbaruiBanner();
  renderKatalog();
  renderSummary(dom.summary, state.items);
  renderSummary(dom.managerSummary, state.items, true);
  setSaveIndicator(dom.saveIndicator, state.updatedAt, state.storageOk);
  tandaiBarisTersimpan(row, item);
  tampilkanToast(
    dom.toast,
    hasil.ok
      ? 'Perubahan tersimpan di perangkat ini.'
      : 'Perubahan diterapkan, tetapi penyimpanan lokal tidak tersedia.',
  );
}

function jebakFokus(event, kontainer) {
  const focusable = Array.from(
    kontainer.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((node) => node.offsetParent !== null || node === document.activeElement);
  if (focusable.length === 0) return;

  const pertama = focusable[0];
  const terakhir = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === pertama) {
    event.preventDefault();
    terakhir.focus();
  } else if (!event.shiftKey && document.activeElement === terakhir) {
    event.preventDefault();
    pertama.focus();
  }
}

function bindEvents() {
  dom.search.addEventListener('input', () => {
    state.query = dom.search.value;
    renderKatalog();
  });

  dom.clearSearch.addEventListener('click', () => {
    state.query = '';
    dom.search.value = '';
    renderKatalog();
    dom.search.focus();
  });

  dom.chips.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-kategori]');
    if (!chip) return;
    state.kategori = chip.dataset.kategori;
    renderKatalog();
    chip.focus();
  });

  dom.sort.addEventListener('change', () => {
    state.sort = dom.sort.value;
    renderKatalog();
  });

  dom.resetFiltersBtn.addEventListener('click', () => resetFilter());
  dom.empty.addEventListener('click', (event) => {
    if (event.target.closest('#empty-reset')) resetFilter();
  });

  document.querySelectorAll('[data-nav="kamar"]').forEach((link) => {
    link.addEventListener('click', () => {
      state.query = '';
      state.kategori = 'Kamar';
      dom.search.value = '';
      renderKatalog();
      dom.nav.classList.remove('is-open');
      dom.navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.site-nav a, .footer-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      dom.nav.classList.remove('is-open');
      dom.navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  dom.navToggle.addEventListener('click', () => {
    const terbuka = dom.nav.classList.toggle('is-open');
    dom.navToggle.setAttribute('aria-expanded', String(terbuka));
  });

  dom.openManager.addEventListener('click', bukaManager);
  dom.managerClose.addEventListener('click', tutupManager);
  dom.managerDone.addEventListener('click', tutupManager);
  dom.managerOverlay.addEventListener('click', (event) => {
    if (event.target !== dom.managerOverlay) return;
    if (adaPerubahanBelumDisimpan()) {
      tampilkanToast(dom.toast, 'Simpan perubahan baris terlebih dahulu.');
      return;
    }
    tutupManager();
  });

  dom.managerRows.addEventListener('input', (event) => {
    const row = event.target.closest('[data-row]');
    if (row && event.target.matches('input')) tandaiBarisKotor(row);
  });
  dom.managerRows.addEventListener('change', (event) => {
    const row = event.target.closest('[data-row]');
    if (row && event.target.matches('input[type="checkbox"]')) tandaiBarisKotor(row);
  });
  dom.managerRows.addEventListener('click', (event) => {
    const tombol = event.target.closest('[data-save]');
    if (tombol) simpanBaris(tombol.dataset.save);
  });

  dom.resetData.addEventListener('click', bukaKonfirmasiReset);
  dom.confirmCancel.addEventListener('click', tutupKonfirmasiReset);
  dom.confirmOverlay.addEventListener('click', (event) => {
    if (event.target === dom.confirmOverlay) tutupKonfirmasiReset();
  });
  dom.confirmYes.addEventListener('click', jalankanReset);

  document.addEventListener('keydown', (event) => {
    if (!dom.confirmOverlay.hidden) {
      if (event.key === 'Escape') tutupKonfirmasiReset();
      else if (event.key === 'Tab') jebakFokus(event, dom.confirmDialog);
      return;
    }
    if (!dom.managerOverlay.hidden) {
      if (event.key === 'Escape') tutupManager();
      else if (event.key === 'Tab') jebakFokus(event, dom.managerDialog);
    }
  });

  // Tab lain dengan origin sama: ambil data terbaru saat storage berubah.
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const hasil = loadMenu();
    state.items = hasil.items;
    state.storageOk = hasil.status !== 'unavailable';
    state.corrupt = hasil.status === 'corrupt';
    state.updatedAt = hasil.updatedAt;
    perbaruiBanner();
    renderSemua();
  });
}

function init() {
  const hasil = loadMenu();
  state.items = hasil.items;
  state.storageOk = hasil.status !== 'unavailable';
  state.corrupt = hasil.status === 'corrupt';
  state.updatedAt = hasil.updatedAt;

  pasangIkon(document);
  pasangTautanWA(document);
  renderChips(dom.chips, state.kategori);
  perbaruiBanner();
  renderSemua({ sertakanManager: false });
  bindEvents();
}

init();

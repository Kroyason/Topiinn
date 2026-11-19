/**
 * Titik masuk aplikasi: state UI (in-memory) + wiring event.
 * Alur: seed/localStorage → state → filter → render → aksi dashboard → validasi → simpan → render.
 * Dashboard demo sengaja tanpa login/password/sesi.
 */

import './style.css';
import { cari, filterKategori, urutkan } from './products.js';
import {
  STORAGE_KEY,
  buatId,
  eksporJSON,
  imporJSON,
  loadMenu,
  resetMenu,
  saveMenu,
  validasiDeskripsi,
  validasiHarga,
  validasiKategori,
  validasiNama,
  validasiStok,
} from './store.js';
import {
  isiFormItem,
  pasangDataProfil,
  pasangIkon,
  pasangTautanWA,
  renderCards,
  renderChips,
  renderDashboardFilter,
  renderDashboardSummary,
  renderDashboardTable,
  renderEmptyState,
  renderFasilitas,
  renderGambarOptions,
  renderLiveMusic,
  renderSummary,
  setChipsActive,
  setResultCount,
  setSaveIndicator,
  tampilkanToast,
  terapkanErrorForm,
} from './ui.js';

const state = {
  items: [],
  query: '',
  kategori: 'Semua',
  sort: 'unggulan',
  storageOk: true,
  corrupt: false,
  corruptError: '',
  updatedAt: null,
  dashKategori: 'Semua',
  editId: null,
  formKotor: false,
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
  dashFilter: $('dash-filter'),
  dashTambah: $('dash-tambah'),
  dashCount: $('dash-count'),
  tabDaftar: $('tab-daftar'),
  tabForm: $('tab-form'),
  panelDaftar: $('panel-daftar'),
  panelForm: $('panel-form'),
  managerRows: $('manager-rows'),
  itemForm: $('item-form'),
  formBatal: $('form-batal'),
  formSimpan: $('form-simpan'),
  formMode: $('form-mode'),
  saveIndicator: $('save-indicator'),
  exportJson: $('export-json'),
  importJson: $('import-json'),
  importFile: $('import-file'),
  resetData: $('reset-data'),
  confirmOverlay: $('confirm-overlay'),
  confirmDialog: $('confirm-dialog'),
  confirmTitle: $('confirm-title'),
  confirmDesc: $('confirm-desc'),
  confirmCancel: $('confirm-cancel'),
  confirmYes: $('confirm-yes'),
  toast: $('toast'),
  schedule: $('schedule'),
  facilities: $('facilities'),
};

let focusSebelumDialog = null;
let focusSebelumKonfirmasi = null;
let konfirmasiAksi = null;

function hasilFilter() {
  return urutkan(
    filterKategori(cari(state.items, state.query), state.kategori),
    state.sort,
  );
}

function itemsDashboard() {
  return urutkan(filterKategori(state.items, state.dashKategori), 'nama');
}

function perbaruiBanner() {
  dom.storageBanner.hidden = state.storageOk;
  dom.corruptBanner.hidden = !state.corrupt;
  dom.corruptBanner.textContent = state.corruptError
    ? `Data lokal tidak terbaca (${state.corruptError}), data contoh dimuat ulang.`
    : 'Data lokal tidak terbaca, data contoh dimuat ulang.';
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

function renderDashboard() {
  renderDashboardSummary(dom.managerSummary, state.items);
  renderDashboardFilter(dom.dashFilter, state.items, state.dashKategori);
  const tampil = itemsDashboard();
  renderDashboardTable(dom.managerRows, tampil);
  dom.dashCount.textContent = state.dashKategori === 'Semua'
    ? `Menampilkan ${tampil.length} dari ${state.items.length} item.`
    : `${tampil.length} item pada kategori ${state.dashKategori}.`;
  setSaveIndicator(dom.saveIndicator, state.updatedAt, state.storageOk);
}

function renderSemua({ sertakanManager = true } = {}) {
  renderKatalog();
  renderSummary(dom.summary, state.items);
  if (sertakanManager && !dom.managerOverlay.hidden) renderDashboard();
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

function pilihTab(nama, { fokus = false } = {}) {
  const daftar = nama === 'daftar';
  dom.panelDaftar.hidden = !daftar;
  dom.panelForm.hidden = daftar;
  for (const [tab, aktif] of [
    [dom.tabDaftar, daftar],
    [dom.tabForm, !daftar],
  ]) {
    tab.classList.toggle('is-active', aktif);
    tab.setAttribute('aria-selected', String(aktif));
    tab.tabIndex = aktif ? 0 : -1;
  }
  if (fokus) (daftar ? dom.tabDaftar : dom.tabForm).focus();
}

function bukaManager() {
  focusSebelumDialog = document.activeElement;
  state.dashKategori = 'Semua';
  state.editId = null;
  state.formKotor = false;
  isiFormItem(dom.itemForm, null);
  dom.formMode.textContent =
    'Mode tambah: item baru akan muncul di daftar menu & layanan publik setelah disimpan.';
  dom.formSimpan.textContent = 'Simpan item';
  pilihTab('daftar');
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
  return state.formKotor;
}

function kembalikanFokusKonfirmasi() {
  if (focusSebelumKonfirmasi instanceof HTMLElement && focusSebelumKonfirmasi.isConnected) {
    focusSebelumKonfirmasi.focus();
  } else if (!dom.managerOverlay.hidden) {
    dom.dashTambah.focus();
  }
}

function bukaKonfirmasi({ judul, deskripsi, labelYa, aksi }) {
  focusSebelumKonfirmasi = document.activeElement;
  dom.confirmTitle.textContent = judul;
  dom.confirmDesc.textContent = deskripsi;
  dom.confirmYes.textContent = labelYa;
  konfirmasiAksi = aksi;
  dom.confirmOverlay.hidden = false;
  dom.confirmCancel.focus();
}

function tutupKonfirmasi() {
  dom.confirmOverlay.hidden = true;
  konfirmasiAksi = null;
  kembalikanFokusKonfirmasi();
}

function jalankanKonfirmasi() {
  const aksi = konfirmasiAksi;
  if (!aksi) return;
  konfirmasiAksi = null;
  dom.confirmOverlay.hidden = true;
  aksi();
  kembalikanFokusKonfirmasi();
}

function jalankanReset() {
  const hasil = resetMenu();
  state.items = hasil.items;
  state.storageOk = hasil.ok;
  state.corrupt = false;
  state.updatedAt = hasil.updatedAt;
  state.dashKategori = 'Semua';
  state.editId = null;
  state.formKotor = false;
  isiFormItem(dom.itemForm, null);
  pilihTab('daftar');
  resetFilter({ diam: true });
  perbaruiBanner();
  renderSemua();
  tampilkanToast(dom.toast, 'Data contoh berhasil dimuat ulang.');
}

function eksporData() {
  const isi = eksporJSON(state.items);
  const url = URL.createObjectURL(new Blob([isi], { type: 'application/json' }));
  const tautan = document.createElement('a');
  tautan.href = url;
  tautan.download = `topiinn-products-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(tautan);
  tautan.click();
  tautan.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  tampilkanToast(dom.toast, `Diekspor: ${state.items.length} produk ke file JSON.`);
}

async function bacaImpor(file) {
  let teks;
  try {
    teks = await file.text();
  } catch {
    tampilkanToast(dom.toast, 'File tidak dapat dibaca. Coba lagi.');
    return;
  }
  const hasil = imporJSON(teks);
  if (!hasil.ok) {
    tampilkanToast(dom.toast, `Impor ditolak: ${hasil.error}`);
    return;
  }
  bukaKonfirmasi({
    judul: 'Ganti data dengan file JSON?',
    deskripsi: `File berisi ${hasil.items.length} produk yang valid. Seluruh data saat ini akan diganti. Tindakan ini tidak bisa dibatalkan.`,
    labelYa: 'Ya, ganti data',
    aksi: () => terapkanImpor(hasil.items),
  });
}

function terapkanImpor(items) {
  const hasil = saveMenu(items);
  state.items = items;
  state.storageOk = hasil.ok;
  if (hasil.ok) state.updatedAt = hasil.updatedAt;
  state.corrupt = false;
  state.corruptError = '';
  state.dashKategori = 'Semua';
  state.editId = null;
  state.formKotor = false;
  isiFormItem(dom.itemForm, null);
  pilihTab('daftar');
  resetFilter({ diam: true });
  perbaruiBanner();
  renderSemua();
  tampilkanToast(
    dom.toast,
    hasil.ok
      ? `Impor berhasil: ${items.length} produk tersimpan di perangkat ini.`
      : `Impor diterapkan (${items.length} produk), tetapi penyimpanan lokal tidak tersedia.`,
  );
}

function bukaKonfirmasiReset() {
  bukaKonfirmasi({
    judul: 'Reset data demo?',
    deskripsi:
      'Semua menu/layanan yang ditambah, diedit, atau dihapus di perangkat ini akan diganti dengan data contoh awal. Tindakan ini tidak bisa dibatalkan.',
    labelYa: 'Ya, reset demo',
    aksi: jalankanReset,
  });
}

function mulaiTambah() {
  state.editId = null;
  isiFormItem(dom.itemForm, null);
  state.formKotor = false;
  dom.formMode.textContent =
    'Mode tambah: item baru akan muncul di daftar menu & layanan publik setelah disimpan.';
  dom.formSimpan.textContent = 'Simpan item';
  pilihTab('form');
  dom.itemForm.elements.namedItem('nama').focus();
}

function mulaiEdit(id) {
  const item = state.items.find((satu) => satu.id === id);
  if (!item) return;
  state.editId = id;
  isiFormItem(dom.itemForm, item);
  state.formKotor = false;
  dom.formMode.textContent = `Mode edit: perubahan pada “${item.nama}” tampil di daftar publik setelah disimpan.`;
  dom.formSimpan.textContent = 'Simpan perubahan';
  pilihTab('form');
  dom.itemForm.elements.namedItem('nama').focus();
}

function batalkanForm() {
  state.editId = null;
  isiFormItem(dom.itemForm, null);
  state.formKotor = false;
  pilihTab('daftar');
  tampilkanToast(dom.toast, 'Perubahan form dibatalkan.');
}

function simpanForm(event) {
  event.preventDefault();
  const form = dom.itemForm;
  const nilai = (nama) => String(form.elements.namedItem(nama).value).trim();
  const modeEdit = Boolean(state.editId);

  const errors = {
    nama: validasiNama(nilai('nama')),
    kategori: validasiKategori(nilai('kategori')),
    harga: validasiHarga(nilai('harga')),
    stok: validasiStok(nilai('stok')),
    deskripsi: validasiDeskripsi(nilai('deskripsi')),
  };
  terapkanErrorForm(form, errors);
  if (Object.values(errors).some(Boolean)) return;

  const data = {
    nama: nilai('nama'),
    kategori: nilai('kategori'),
    harga: Number(nilai('harga')),
    stok: Number(nilai('stok')),
    deskripsi: nilai('deskripsi'),
    imageUrl: nilai('imageUrl'),
    unggulan: form.elements.namedItem('unggulan').checked,
  };

  if (modeEdit) {
    const item = state.items.find((satu) => satu.id === state.editId);
    if (!item) {
      tampilkanToast(dom.toast, 'Item tidak ditemukan. Tutup dan buka kembali dashboard.');
      return;
    }
    Object.assign(item, data);
  } else {
    state.items.push({ id: buatId(data.nama, state.items), ...data });
  }

  const hasil = saveMenu(state.items);
  state.storageOk = hasil.ok;
  if (hasil.ok) state.updatedAt = hasil.updatedAt;
  state.editId = null;
  state.formKotor = false;
  state.dashKategori = 'Semua';
  isiFormItem(form, null);
  pilihTab('daftar');
  resetFilter({ diam: true });
  perbaruiBanner();
  renderSemua();
  tampilkanToast(
    dom.toast,
    hasil.ok
      ? (modeEdit ? 'Perubahan tampil di daftar publik.' : 'Item baru tampil di daftar publik.')
      : 'Perubahan diterapkan, tetapi penyimpanan lokal tidak tersedia.',
  );
}

function mintaHapus(id) {
  const item = state.items.find((satu) => satu.id === id);
  if (!item) return;
  bukaKonfirmasi({
    judul: 'Hapus item ini?',
    deskripsi: `“${item.nama}” akan dihapus dari daftar menu & layanan publik di perangkat ini. Tindakan ini tidak bisa dibatalkan.`,
    labelYa: 'Ya, hapus',
    aksi: () => hapusItem(id),
  });
}

function hapusItem(id) {
  state.items = state.items.filter((satu) => satu.id !== id);
  if (state.editId === id) {
    state.editId = null;
    isiFormItem(dom.itemForm, null);
    state.formKotor = false;
  }
  const hasil = saveMenu(state.items);
  state.storageOk = hasil.ok;
  if (hasil.ok) state.updatedAt = hasil.updatedAt;
  resetFilter({ diam: true });
  perbaruiBanner();
  renderSemua();
  tampilkanToast(
    dom.toast,
    hasil.ok
      ? 'Item dihapus dari daftar publik.'
      : 'Item dihapus, tetapi penyimpanan lokal tidak tersedia.',
  );
}

function jebakFokus(event, kontainer) {
  const focusable = Array.from(
    kontainer.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

function pindahTabDenganPanah(event) {
  if (!event.target.matches?.('[data-dash-tab]')) return;
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  const berikut = event.key === 'ArrowRight' ? dom.tabForm : dom.tabDaftar;
  pilihTab(berikut.dataset.dashTab, { fokus: true });
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
      tampilkanToast(dom.toast, 'Simpan atau batalkan perubahan form terlebih dahulu.');
      return;
    }
    tutupManager();
  });

  document.querySelectorAll('[data-dash-tab]').forEach((tab) => {
    tab.addEventListener('click', () => pilihTab(tab.dataset.dashTab));
  });

  dom.dashFilter.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-kategori]');
    if (!chip) return;
    state.dashKategori = chip.dataset.kategori;
    renderDashboard();
    dom.dashFilter
      .querySelector(`[data-kategori="${state.dashKategori}"]`)
      ?.focus();
  });

  dom.dashTambah.addEventListener('click', mulaiTambah);
  dom.managerRows.addEventListener('click', (event) => {
    const edit = event.target.closest('[data-edit]');
    if (edit) {
      mulaiEdit(edit.dataset.edit);
      return;
    }
    const hapus = event.target.closest('[data-hapus]');
    if (hapus) mintaHapus(hapus.dataset.hapus);
  });

  dom.itemForm.addEventListener('input', () => {
    state.formKotor = true;
  });
  dom.itemForm.addEventListener('change', () => {
    state.formKotor = true;
  });
  dom.itemForm.addEventListener('submit', simpanForm);
  dom.formBatal.addEventListener('click', batalkanForm);

  dom.exportJson.addEventListener('click', eksporData);
  dom.importJson.addEventListener('click', () => dom.importFile.click());
  dom.importFile.addEventListener('change', () => {
    const file = dom.importFile.files?.[0];
    dom.importFile.value = ''; // izinkan mengimpor ulang file yang sama
    if (file) bacaImpor(file);
  });

  dom.resetData.addEventListener('click', bukaKonfirmasiReset);
  dom.confirmCancel.addEventListener('click', tutupKonfirmasi);
  dom.confirmOverlay.addEventListener('click', (event) => {
    if (event.target === dom.confirmOverlay) tutupKonfirmasi();
  });
  dom.confirmYes.addEventListener('click', jalankanKonfirmasi);

  document.addEventListener('keydown', (event) => {
    if (!dom.confirmOverlay.hidden) {
      if (event.key === 'Escape') tutupKonfirmasi();
      else if (event.key === 'Tab') jebakFokus(event, dom.confirmDialog);
      return;
    }
    if (!dom.managerOverlay.hidden) {
      pindahTabDenganPanah(event);
      if (event.key === 'Escape') {
        if (adaPerubahanBelumDisimpan()) {
          tampilkanToast(dom.toast, 'Simpan atau batalkan perubahan form terlebih dahulu.');
          return;
        }
        tutupManager();
      } else if (event.key === 'Tab') {
        jebakFokus(event, dom.managerDialog);
      }
    }
  });

  // Tab lain dengan origin sama: ambil data terbaru saat storage berubah.
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const hasil = loadMenu();
    state.items = hasil.items;
    state.storageOk = hasil.status !== 'unavailable';
    state.corrupt = hasil.status === 'corrupt';
    state.corruptError = hasil.error;
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
  state.corruptError = hasil.error;
  state.updatedAt = hasil.updatedAt;

  pasangIkon(document);
  pasangTautanWA(document);
  pasangDataProfil(document);
  renderLiveMusic(dom.schedule);
  renderFasilitas(dom.facilities);
  renderChips(dom.chips, state.kategori);
  renderGambarOptions(dom.itemForm.elements.namedItem('imageUrl'));
  isiFormItem(dom.itemForm, null);
  dom.formMode.textContent =
    'Mode tambah: item baru akan muncul di daftar menu & layanan publik setelah disimpan.';
  perbaruiBanner();
  renderSemua({ sertakanManager: false });
  bindEvents();
}

init();

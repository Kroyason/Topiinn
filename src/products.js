/**
 * Data contoh (fiktif) + konstanta konten + helper murni.
 * Modul ini tidak menyentuh DOM maupun localStorage.
 */

/** Nomor WhatsApp fiktif. Format internasional tanpa + / spasi / tanda hubung. */
export const WA_NUMBER = '6281200000000';

export const KATEGORI = Object.freeze([
  'Semua',
  'Makanan Lokal',
  'Vegan / Plant-Based',
  'Minuman & Koktail',
  'Kamar',
]);

export const PROFIL = Object.freeze({
  nama: 'Topi Inn & Restaurant',
  tagline: 'Restoran tepi pantai & penginapan di Padangbai',
  lokasi: 'Padangbai, Bali',
  jamBuka: '07.00–22.00 WITA',
});

export const LIVE_MUSIC = Object.freeze([
  Object.freeze({ hari: 'Jumat & Sabtu', jam: '19.00–21.30 WITA', jenis: 'Akustik lokal' }),
  Object.freeze({ hari: 'Minggu', jam: '18.30–20.30 WITA', jenis: 'DJ sunset set' }),
]);

export const DIVE_FERRY = Object.freeze([
  Object.freeze({ judul: 'Dive center mitra', detail: '5 menit jalan kaki' }),
  Object.freeze({ judul: 'Pelabuhan Padangbai', detail: '300 m dari restoran' }),
  Object.freeze({ judul: 'Ferry ke Gili & Lombok', detail: 'Tiket dibantu di resepsionis' }),
]);

/** Delapan item seed sesuai SPEC.md §4.3. Harga dan stok tetap berupa angka. */
const DATA_AWAL = [
  {
    id: 'nasi-campur-bali',
    nama: 'Nasi Campur Bali',
    kategori: 'Makanan Lokal',
    harga: 45000,
    stok: 12,
    deskripsi: 'Nasi putih, ayam betutu, sate lilit, lawar, dan sambal matah.',
    imageUrl: '/images/nasi-campur-bali.svg',
    unggulan: true,
  },
  {
    id: 'mie-goreng-seafood',
    nama: 'Mie Goreng Seafood',
    kategori: 'Makanan Lokal',
    harga: 40000,
    stok: 9,
    deskripsi: 'Mie goreng dengan udang, cumi, dan sayur segar.',
    imageUrl: '/images/mie-goreng-seafood.svg',
    unggulan: false,
  },
  {
    id: 'sate-lilit-tempe',
    nama: 'Sate Lilit Tempe',
    kategori: 'Vegan / Plant-Based',
    harga: 35000,
    stok: 10,
    deskripsi: 'Sate lilit berbahan tempe dan kelapa, tanpa bahan hewani.',
    imageUrl: '/images/sate-lilit-tempe.svg',
    unggulan: true,
  },
  {
    id: 'gado-gado-bali',
    nama: 'Gado-Gado Bali',
    kategori: 'Vegan / Plant-Based',
    harga: 32000,
    stok: 0,
    deskripsi: 'Sayur rebus, tahu, tempe, dan saus kacang, tanpa bahan hewani.',
    imageUrl: '/images/gado-gado-bali.svg',
    unggulan: false,
  },
  {
    id: 'es-kelapa-muda',
    nama: 'Es Kelapa Muda',
    kategori: 'Minuman & Koktail',
    harga: 25000,
    stok: 20,
    deskripsi: 'Kelapa muda utuh, disajikan dingin dengan jeruk nipis.',
    imageUrl: '/images/es-kelapa-muda.svg',
    unggulan: false,
  },
  {
    id: 'arak-madu-sunset',
    nama: 'Arak Madu Sunset',
    kategori: 'Minuman & Koktail',
    harga: 55000,
    stok: 2,
    deskripsi: 'Arak Bali, madu, dan jeruk nipis. Untuk tamu 21+.',
    imageUrl: '/images/arak-madu-sunset.svg',
    unggulan: true,
  },
  {
    id: 'kamar-fan-double',
    nama: 'Kamar Fan Double',
    kategori: 'Kamar',
    harga: 250000,
    stok: 4,
    deskripsi: 'Kamar double dengan kipas angin, kamar mandi dalam, dan teras bersama.',
    imageUrl: '/images/kamar-fan-double.svg',
    unggulan: false,
  },
  {
    id: 'kamar-ac-twin',
    nama: 'Kamar AC Twin + Sarapan',
    kategori: 'Kamar',
    harga: 450000,
    stok: 1,
    deskripsi: 'Kamar twin ber-AC, sarapan dua orang, air panas, dan WiFi.',
    imageUrl: '/images/kamar-ac-twin.svg',
    unggulan: false,
  },
];

export const SEED_ITEMS = Object.freeze(DATA_AWAL.map((item) => Object.freeze(item)));

/** Pilihan gambar lokal untuk form dashboard. Hanya path di bawah /images/ yang dipakai. */
export const GAMBAR_OPSI = Object.freeze([
  { value: '', label: 'Tanpa gambar' },
  { value: '/images/nasi-campur-bali.svg', label: 'Nasi Campur Bali' },
  { value: '/images/mie-goreng-seafood.svg', label: 'Mie Goreng Seafood' },
  { value: '/images/sate-lilit-tempe.svg', label: 'Sate Lilit Tempe' },
  { value: '/images/gado-gado-bali.svg', label: 'Gado-Gado Bali' },
  { value: '/images/es-kelapa-muda.svg', label: 'Es Kelapa Muda' },
  { value: '/images/arak-madu-sunset.svg', label: 'Arak Madu Sunset' },
  { value: '/images/kamar-fan-double.svg', label: 'Kamar Fan Double' },
  { value: '/images/kamar-ac-twin.svg', label: 'Kamar AC Twin' },
  { value: '/images/hero.svg', label: 'Ilustrasi pantai' },
  { value: '/images/placeholder.svg', label: 'Placeholder' },
]);

const formatRupiahIDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/** "Rp 45.000" — spasi biasa dipakai agar tidak bergantung pada locale ICU. */
export function formatRupiah(value) {
  return formatRupiahIDR.format(value).replace(/\u00a0/g, ' ');
}

/** 0 → Habis, 1–3 → Terbatas, > 3 → Tersedia. */
export function statusStok(stok) {
  if (stok === 0) return 'Habis';
  if (stok <= 3) return 'Terbatas';
  return 'Tersedia';
}

/** Ringkasan dihitung dari data aktif, bukan angka hardcoded. */
export function hitungRingkasan(items) {
  return {
    total: items.length,
    tersedia: items.filter((item) => item.stok > 0).length,
    habis: items.filter((item) => item.stok === 0).length,
    unggulan: items.filter((item) => item.unggulan).length,
  };
}

/** Ringkasan khusus dashboard: total item, ketersediaan, total stok, dan jumlah kategori aktif. */
export function hitungRingkasanDashboard(items) {
  return {
    total: items.length,
    tersedia: items.filter((item) => item.stok > 0).length,
    totalStok: items.reduce((jumlah, item) => jumlah + item.stok, 0),
    kategori: new Set(items.map((item) => item.kategori)).size,
  };
}

/** Pencocokan nama + deskripsi, case-insensitive, spasi tepi diabaikan. */
export function cari(items, query) {
  const q = String(query ?? '').trim().toLocaleLowerCase('id');
  if (!q) return items.slice();
  return items.filter((item) =>
    `${item.nama} ${item.deskripsi}`.toLocaleLowerCase('id').includes(q),
  );
}

export function filterKategori(items, kategori) {
  if (!kategori || kategori === 'Semua') return items.slice();
  return items.filter((item) => item.kategori === kategori);
}

function bandingNama(a, b) {
  return a.nama.localeCompare(b.nama, 'id');
}

/** Kamar dikelompokkan di akhir agar dua kartu kamar tampil berurutan, tidak tersebar di tengah grid. */
function bandingKamarTerakhir(a, b) {
  return Number(a.kategori === 'Kamar') - Number(b.kategori === 'Kamar');
}

/** Urutan diterapkan setelah pencarian dan filter. Array masukan tidak diubah. */
export function urutkan(items, mode) {
  const hasil = items.slice();
  switch (mode) {
    case 'nama':
      return hasil.sort(bandingNama);
    case 'harga-asc':
      return hasil.sort((a, b) => a.harga - b.harga || bandingNama(a, b));
    case 'harga-desc':
      return hasil.sort((a, b) => b.harga - a.harga || bandingNama(a, b));
    case 'stok':
      return hasil.sort((a, b) => b.stok - a.stok || bandingNama(a, b));
    case 'unggulan':
    default:
      return hasil.sort(
        (a, b) =>
          Number(b.unggulan) - Number(a.unggulan) ||
          bandingKamarTerakhir(a, b) ||
          bandingNama(a, b),
      );
  }
}

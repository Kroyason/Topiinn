# TASKS — Topi Inn & Restaurant

**Rencana kerja implementasi website profil + menu digital restoran tepi pantai & penginapan, Padangbai, Bali**

| Atribut | Nilai |
| --- | --- |
| Versi | 1.0 |
| Status | Rencana; **belum ada implementasi** |
| Acuan | `SPEC.md` v1.0 dan `UI-SPEC.md` v1.0 |
| Stack | Vite + JavaScript vanilla (ES modules), CSS biasa |
| Total timebox | ± 7 jam 5 menit + 25 menit buffer = **7 jam 30 menit** |
| Jumlah task | 39 task dalam 10 milestone |
| Target | 1 hari kerja, 1 pengembang |
| Strategi | Mobile-first; fitur Must dulu; testing manual berbasis AC |

> Dokumen ini **tidak mengubah kode**. Semua task di bawah adalah rencana.
> Jika ada konflik antara task, `SPEC.md` dan `UI-SPEC.md` adalah acuan yang menang.

---

## 0. Cara Menggunakan Dokumen Ini

1. Kerjakan milestone secara berurutan sesuai dependensi di Bagian 1.
2. Centang acceptance criteria (AC) hanya setelah diperiksa manual, bukan setelah kode "terlihat selesai".
3. `[ ]` = belum, `[x]` = lulus, `[~]` = diblokir/ditunda dengan catatan.
4. Setiap task mencantumkan **berkas yang mungkin berubah**. Daftar ini bersifat perkiraan; file kecil baru boleh ditambah selama struktur `SPEC.md` / `UI-SPEC.md` dipertahankan.
5. Jangan menambah fitur di luar milestone. Jika waktu habis, potong fitur **Could** (F-21–F-23), bukan AC Must.
6. Akhiri setiap milestone dengan aplikasi yang dapat dijalankan, bukan setengah jadi.

### 0.1 Legenda status

| Status | Arti |
| --- | --- |
| `[ ]` | Belum dikerjakan |
| `[x]` | Lulus pemeriksaan |
| `[~]` | Diblokir / ditunda, alasan dicatat di README |
| **Must** | Wajib untuk MVP |
| **Should/Could** | Hanya jika seluruh Must lulus |

### 0.2 Bukti yang dikumpulkan

- Hasil `npm run build` dan `npm run preview`.
- Screenshot 360 px dan 1440 px.
- Tab Console dan Network yang bersih.
- Isi `localStorage["topiinn.menu.v1"]` sebelum/sesudah edit.
- Tabel hasil AC di README atau `docs/TEST-PLAN.md`.
- URL deployment (jika tersedia) dan screenshot halaman produksi.

---

## 1. Ringkasan Milestone

| ID | Milestone | Hasil utama | Estimasi | Depends on | Fitur/AC utama |
| --- | --- | --- | ---: | --- | --- |
| M1 | Scaffold | Proyek Vite berjalan, struktur folder, token & font lokal | 35 m | — | Fondasi F-01–F-23 |
| M2 | Katalog | 8 kartu, ringkasan, live music, dive/ferry, footer, responsif | 70 m | M1 | F-01–F-05, F-12–F-14 |
| M3 | Interaksi pencarian/filter | Cari, filter, sort, empty state, count | 55 m | M2 | F-06–F-08, F-15 |
| M4 | WhatsApp | Deep link reservasi & tanya kamar | 25 m | M2 | F-09–F-11 |
| M5 | CRUD Dashboard | Dashboard demo, edit stok/harga/unggulan, validasi, reset | 70 m | M2 | F-16–F-17, F-19 |
| M6 | localStorage | Persistensi, skema, fallback, indikator simpan | 40 m | M5 | F-18, F-20, F-19 |
| M7 | Testing | Semua AC fungsional, responsif, a11y, edge case | 55 m | M3–M6 | AC-01–AC-39 |
| M8 | Security | Tanpa rahasia, rendering aman, audit dependensi & jaringan | 25 m | M7 | AC-41, AC-42 |
| M9 | Build | Optimasi aset, build produksi, preview smoke test | 25 m | M8 | AC-40 |
| M10 | Deployment | Publikasi statis, verifikasi produksi, dokumentasi URL | 25 m | M9 | Semua AC |
| — | Buffer | Perbaikan bug tak terduga / regresi | 25 m | — | — |

**Urutan kritis:** M1 → M2 → M3 → M5 → M6 → M7 → M8 → M9 → M10.
**Paralel yang aman:** M4 dapat dikerjakan setelah M2, bersamaan dengan M3.

### 1.1 Aturan pemotongan waktu

Jika waktu melewati batas:

1. Hentikan fitur **Could** (F-21 mode gelap, F-22 peta, F-23 cetak).
2. Sederhanakan animasi/estetika, bukan AC.
3. Jangan memotong: pencarian/filter/sort, WhatsApp, dashboard, validasi, localStorage fallback, aksesibilitas dasar, build.
4. Jika M6 melewati waktu, langsung ke M7 dan catat AC yang belum diuji.

---

## 2. Definition of Done (Global)

Sebuah task dianggap selesai hanya jika:

- [ ] Semua AC task lulus manual.
- [ ] `npm run dev` dan `npm run build` tidak menghasilkan error.
- [ ] Tidak ada error baru di Console browser.
- [ ] Tidak ada request eksternal selain navigasi sukarela ke WhatsApp.
- [ ] Tidak ada API key, token, kredensial, atau data pribadi.
- [ ] Tidak ada keranjang, checkout, pembayaran, login, atau login palsu.
- [ ] Tampilan berfungsi pada 360 px dan 1440 px; tidak ada scroll horizontal.
- [ ] Perubahan perilaku/konten tercatat di README.
- [ ] File yang dibuat/diubah sesuai daftar task; tidak ada file sampah di root.

---

## 3. Guardrails (Jangan Dilanggar)

1. **Satu halaman.** Tidak ada routing halaman admin/login.
2. **8 item tetap.** Dashboard hanya mengubah `stok`, `harga`, `unggulan`; tidak ada tambah/hapus item.
3. **Tanpa backend.** Tidak ada API, server, database, atau serverless function.
4. **Tanpa login.** Dashboard diberi label "Tanpa login · Data lokal".
5. **Tanpa transaksi.** CTA hanya membuka WhatsApp; tidak ada keranjang/checkout.
6. **Tanpa aset eksternal runtime.** Font, gambar, ikon, dan CSS disajikan lokal.
7. **Tanpa rahasia.** Nomor WhatsApp fiktif `6281200000000`; tidak ada nomor pribadi.
8. **Data contoh fiktif.** Tidak ada nama orang, alamat rumah, atau ulasan palsu.
9. **Mobile-first.** Layout dasar 360 px; desktop hanya memperluas.
10. **Kontras tinggi.** Lime/oranye tidak menjadi teks di atas krem; lihat UI-SPEC §2.2.

---

## 4. Milestone 1 — Scaffold (35 menit)

**Hasil:** proyek Vite bersih, struktur modul, token desain, dan font lokal siap.

**Exit criteria milestone:**

- [ ] Halaman kosong bertema krem/plum tampil tanpa error.
- [ ] Struktur folder sesuai `SPEC.md` §8 (dengan `src/format.js` opsional).
- [ ] Tidak ada aset dari CDN.

### M1-T1 — Inisialisasi proyek Vite

**Estimasi:** 15 m · **Depends:** —

**Langkah:**

1. Buat proyek Vite vanilla JS di root repo `Topii-lab`.
2. Bersihkan boilerplate (logo, counter, CSS contoh).
3. Set `lang="id"`, title, meta description, dan favicon lokal.
4. Pastikan script `dev`, `build`, `preview` tersedia.

**Acceptance criteria:**

- [ ] `npm install` selesai tanpa error.
- [ ] `npm run dev` menyajikan halaman di localhost; Console bersih.
- [ ] `npm run build` sukses pada scaffold awal (baseline).
- [ ] `index.html` memuat title "Topi Inn & Restaurant" dan `lang="id"`.
- [ ] Tidak ada teks/tombol login, keranjang, atau checkout.
- [ ] `package.json` memiliki script `dev`, `build`, `preview`.
- [ ] `README.md` memuat cara install, menjalankan dev, build, preview, dan catatan data fiktif.

**Berkas:** `package.json` (baru), `package-lock.json` (baru), `index.html` (baru), `vite.config.js` (baru), `src/main.js` (baru), `src/styles.css` (baru), `.gitignore` (baru), `README.md` (baru).

---

### M1-T2 — Struktur folder & modul

**Estimasi:** 10 m · **Depends:** M1-T1

**Langkah:**

1. Buat `src/data.js`, `src/store.js`, `src/filters.js`, `src/whatsapp.js`, `src/render.js`.
2. Buat `src/format.js` untuk format Rupiah, status stok, dan ringkasan (fungsi murni).
3. Buat folder `public/images/`, `public/fonts/`, `public/icons/`.
4. Tambahkan placeholder gambar lokal dan ikon SVG dasar bila belum ada.

**Acceptance criteria:**

- [ ] Semua modul dapat diimpor tanpa 404/error.
- [ ] Tidak ada impor melingkar yang membuat aplikasi gagal render.
- [ ] `src/format.js` hanya berisi fungsi murni (tanpa akses DOM).
- [ ] Folder aset lokal tersedia dan tidak kosong.
- [ ] Struktur file dapat dijelaskan dalam 1 menit oleh pengembang lain.

**Berkas:** `src/data.js`, `src/store.js`, `src/filters.js`, `src/whatsapp.js`, `src/render.js`, `src/format.js`, `src/main.js`, `public/images/placeholder.svg`, `public/icons/*` (baru).

---

### M1-T3 — Token desain & font lokal

**Estimasi:** 10 m · **Depends:** M1-T1

**Langkah:**

1. Terapkan token warna, spacing, radius, shadow, dan z-index dari UI-SPEC §2.
2. Tambahkan Fraunces + Inter WOFF2 ke `public/fonts/`, beserta lisensi OFL.
3. Definisikan `@font-face` dengan `font-display: swap` dan fallback Georgia/system-ui.
4. Terapkan latar krem, teks plum, dan tipe dasar.

**Acceptance criteria:**

- [ ] Warna utama persis: krem `#FAF8F5`, plum `#1D1426`, ungu `#5B2C8E`, lime `#78BE20`, oranye `#F36F21`.
- [ ] Tidak ada request ke Google Fonts/CDN saat halaman dimuat.
- [ ] Saat font lokal diblokir, layout tetap terbaca dengan fallback.
- [ ] Judul memakai Fraunces; teks body/UI memakai Inter.
- [ ] Tidak ada teks lime/oranye di atas krem pada elemen yang sudah dibuat.

**Berkas:** `src/styles.css`, `index.html`, `public/fonts/*.woff2` (baru), `public/fonts/OFL.txt` (baru).

---

## 5. Milestone 2 — Katalog (70 menit)

**Hasil:** halaman profil lengkap dengan 8 kartu, ringkasan, seksi malam, dive/ferry, footer, dan layout responsif.

**Exit criteria milestone:**

- [ ] 8 kartu tampil dengan data seed yang benar.
- [ ] Ringkasan 8/7/1/3 tampil.
- [ ] Layout 360/768/1440 px rapi.

### M2-T1 — Data seed & konten statis

**Estimasi:** 15 m · **Depends:** M1-T2

**Langkah:**

1. Tulis 8 item persis sesuai `SPEC.md` §4.3.
2. Tambahkan konstanta profil, jam buka, live music, dive/ferry, dan nomor WhatsApp fiktif.
3. Pastikan semua deskripsi 10–240 karakter dan bebas klaim kesehatan.

**Acceptance criteria:**

- [ ] Tepat 8 item, 4 kategori, dan 3 item `unggulan: true` (`nasi-campur-bali`, `sate-lilit-tempe`, `arak-madu-sunset`).
- [ ] Harga dan stok sama persis dengan tabel seed.
- [ ] Harga tetap `number` (bukan string berformat).
- [ ] Setiap `imageUrl` diawali `/images/`; tidak ada URL eksternal.
- [ ] `arak-madu-sunset` memuat penanda "21+" di deskripsi/meta.
- [ ] Tidak ada nama orang, nomor pribadi, atau alamat rumah nyata.
- [ ] Jadwal live music minimal 2 baris + catatan "dapat berubah".

**Berkas:** `src/data.js` (baru/ubah).

---

### M2-T2 — Helper format, status, ringkasan

**Estimasi:** 10 m · **Depends:** M2-T1

**Langkah:**

1. Buat `formatRupiah` dengan `Intl.NumberFormat('id-ID')`.
2. Buat `statusKetersediaan` dengan ambang 0 / 1–3 / >3.
3. Buat `hitungRingkasan` (total, tersedia, habis, unggulan).
4. Pastikan semua fungsi tidak mengubah data masukan.

**Acceptance criteria:**

- [ ] `0 → "Rp 0"`, `25000 → "Rp 25.000"`, `45000 → "Rp 45.000"`, `450000 → "Rp 450.000"`.
- [ ] `stok 0 → Habis`, `1/2/3 → Terbatas`, `4 → Tersedia`.
- [ ] Ringkasan seed menghasilkan total 8, tersedia 7, habis 1, unggulan 3.
- [ ] Fungsi dapat dipanggil berulang tanpa mengubah array/objek asli.
- [ ] Tidak ada `innerHTML` di helper ini.

**Berkas:** `src/format.js` (baru), `src/render.js`.

---

### M2-T3 — Render grid kartu & badge

**Estimasi:** 20 m · **Depends:** M2-T1, M2-T2

**Langkah:**

1. Render 8 kartu dari seed: gambar, nama, kategori, harga, deskripsi, status, stok.
2. Tambahkan badge Unggulan (3), Vegan (2), kategori, dan status.
3. Tambahkan satuan "/malam" untuk kategori Kamar.
4. Pasang fallback gambar ke `placeholder.svg` dan alt text.

**Acceptance criteria:**

- [ ] Tepat 8 kartu; tidak ada duplikat/hilang.
- [ ] Setiap kartu memiliki gambar/placeholder, nama, kategori, harga, status, deskripsi.
- [ ] Badge Unggulan muncul tepat 3 kali; badge Vegan tepat 2 kali.
- [ ] Status Terbatas terlihat pada `arak-madu-sunset` dan `kamar-ac-twin`.
- [ ] Status Habis terlihat pada `gado-gado-bali`; teks tetap terbaca.
- [ ] Kartu kamar menampilkan "/malam" dan tombol "Tanya Kamar" (perilaku link diuji di M4).
- [ ] Gambar yang gagal dimuat menampilkan placeholder tanpa merusak layout.
- [ ] Setiap gambar punya `alt`; gambar dekoratif `alt=""`.
- [ ] Tidak ada kartu yang seluruhnya dapat diklik (bukan tautan).
- [ ] Tidak ada tombol keranjang/checkout.

**Berkas:** `src/render.js`, `src/main.js`, `src/styles.css`, `index.html`, `public/images/*`.

---

### M2-T4 — Ringkasan, live music, dive/ferry, footer

**Estimasi:** 15 m · **Depends:** M2-T2, M2-T3

**Langkah:**

1. Render 4 kartu ringkasan dari data aktif.
2. Bangun seksi Live Music berlatar plum.
3. Bangun seksi Dive & Ferry Hub dengan 3 fakta + layanan pendukung.
4. Bangun footer plum dengan disclaimer data contoh.

**Acceptance criteria:**

- [ ] Ringkasan menampilkan 8 / 7 / 1 / 3 sesuai seed.
- [ ] Angka ringkasan dihitung dari data, bukan hardcoded (ubah stok seed sementara → angka berubah).
- [ ] Live music menampilkan ≥ 2 jadwal, hari, jam WITA, dan catatan "dapat berubah".
- [ ] Dive/ferry menyebut dive center, snorkeling, pelabuhan, Gili/Lombok, laundry/antar-jemput.
- [ ] Footer memuat alamat contoh, jam buka, WhatsApp fiktif, dan disclaimer.
- [ ] Semua teks di seksi plum berkontras tinggi (krem/lime/oranye sesuai aturan).
- [ ] Tidak ada tautan sosial, newsletter, atau badge pembayaran palsu.

**Berkas:** `src/render.js`, `src/data.js`, `index.html`, `src/styles.css`.

---

### M2-T5 — Navbar, hero, layout responsif

**Estimasi:** 10 m · **Depends:** M2-T3

**Langkah:**

1. Bangun navbar sticky + hero suasana pantai sesuai UI-SPEC §5.1–5.2.
2. Tambahkan anchor Menu, Kamar, Info, Kontak, dan tombol Mode Pengelola (fungsi dibuka di M5).
3. Terapkan grid 1/2/3 kolom, bottom bar mobile, dan skip link.

**Acceptance criteria:**

- [ ] Navbar sticky tidak menutupi judul saat anchor diklik (`scroll-margin-top`).
- [ ] Hero menampilkan nama, tagline, lokasi, jam buka, CTA Reservasi, dan "Lihat Menu".
- [ ] 360 px: 1 kolom, bottom bar tidak menutupi konten, tidak ada scroll horizontal.
- [ ] 768 px: 2 kolom kartu; 1440 px: 3 kolom dan container maksimal 1200 px.
- [ ] Skip link berfungsi dan fokus terlihat.
- [ ] Kontras teks utama minimal 4,5:1; teks di seksi malam minimal 7:1.
- [ ] Tidak ada teks di atas foto hero.

**Berkas:** `index.html`, `src/styles.css`, `src/main.js`, `src/render.js`.

---

## 6. Milestone 3 — Interaksi Pencarian/Filter (55 menit)

**Hasil:** pencarian, filter kategori, sorting, count, dan empty state berfungsi instan.

**Exit criteria milestone:**

- [ ] Semua kombinasi pencarian + filter + sort bekerja.
- [ ] Empty state dan reset filter bekerja.
- [ ] AC-06–AC-15 lulus.

### M3-T1 — Fungsi murni pencarian/filter/sort

**Estimasi:** 20 m · **Depends:** M2-T2

**Langkah:**

1. Implementasikan `cari(items, query)` pada nama + deskripsi, trim + case-insensitive.
2. Implementasikan `filterKategori(items, kategori)`.
3. Implementasikan `urutkan(items, mode)` untuk 5 mode.
4. Pastikan urutan default: unggulan dulu, lalu Nama A–Z.

**Acceptance criteria:**

- [ ] AC-06/AC-08: `nasi` menemukan Nasi Campur Bali; `NASI` memberi hasil sama.
- [ ] AC-07: `kelapa` menemukan minimal Es Kelapa Muda (nama/deskripsi).
- [ ] Query dengan spasi awal/akhir tidak mengubah hasil.
- [ ] AC-09: filter Kamar menghasilkan 2 item; Makanan Lokal 2 item.
- [ ] AC-11: harga termurah/termahal mengurutkan angka dengan benar.
- [ ] AC-12: mode Nama A–Z menempatkan "Arak Madu Sunset" sebelum "Es Kelapa Muda".
- [ ] AC-13: stok terbanyak menempatkan stok 20 di atas dan stok 0 di bawah.
- [ ] Default menempatkan 3 unggulan lebih dulu, lalu Nama A–Z.
- [ ] Fungsi tidak mengubah array asli.

**Berkas:** `src/filters.js` (baru), `src/format.js`.

---

### M3-T2 — Toolbar pencarian, chip, sorting

**Estimasi:** 15 m · **Depends:** M3-T1

**Langkah:**

1. Tambahkan input pencarian dengan ikon dan tombol hapus.
2. Tambahkan 5 chip kategori + state aktif.
3. Tambahkan select sorting berlabel "Urutkan".
4. Tambahkan teks count dengan `aria-live="polite"`.

**Acceptance criteria:**

- [ ] Input punya label/aria-label dan placeholder "Cari menu, minuman, atau kamar…".
- [ ] Hanya satu chip aktif; `aria-pressed` benar.
- [ ] Chip aktif terlihat jelas, bukan hanya warna.
- [ ] Select menampilkan 5 opsi dan default "Unggulan dulu".
- [ ] Count menampilkan "Menampilkan 8 dari 8 item" saat awal.
- [ ] Toolbar dapat digunakan pada 360 px tanpa scroll horizontal.
- [ ] Tombol hapus 44×44 px muncul hanya saat input terisi.

**Berkas:** `index.html`, `src/render.js`, `src/main.js`, `src/styles.css`.

---

### M3-T3 — Wiring interaksi & render ulang

**Estimasi:** 10 m · **Depends:** M3-T1, M3-T2

**Langkah:**

1. Simpan state UI `{ query, kategori, sort }` di memori.
2. Hubungkan event input/chip/select ke filter → render grid + count.
3. Tambahkan perilaku nav "Kamar": kosongkan pencarian, pilih filter Kamar, scroll ke `#menu`.

**Acceptance criteria:**

- [ ] Mengetik langsung memperbarui hasil tanpa tombol submit/reload.
- [ ] Filter + pencarian gabungan bekerja (Makanan Lokal + `mie` → 1 item).
- [ ] Count selalu sama dengan jumlah kartu yang terlihat.
- [ ] Sort diterapkan setelah pencarian + filter.
- [ ] Nav "Kamar" menghasilkan 2 kartu dan tidak menyisakan query lama.
- [ ] Tidak ada error Console saat berpindah kombinasi cepat.

**Berkas:** `src/main.js`, `src/filters.js`, `src/render.js`.

---

### M3-T4 — Empty state & reset filter

**Estimasi:** 5 m · **Depends:** M3-T3

**Langkah:**

1. Tampilkan empty state saat hasil 0.
2. Tambahkan tombol "Reset pencarian & filter".
3. Reset query, kategori ke Semua, sort ke default.

**Acceptance criteria:**

- [ ] Query `zzz` menampilkan pesan "Belum ada yang cocok" + tombol reset.
- [ ] Grid kosong, bukan halaman error; navbar/footer tetap ada.
- [ ] Klik reset mengembalikan 8 kartu dan count 8/8.
- [ ] Sort kembali "Unggulan dulu".
- [ ] Empty state tidak menghapus data localStorage.
- [ ] Fokus keyboard masuk ke tombol reset saat empty state muncul (opsional, disarankan).

**Berkas:** `src/render.js`, `src/main.js`, `src/styles.css`.

---

### M3-T5 — Aksesibilitas toolbar

**Estimasi:** 5 m · **Depends:** M3-T2

**Langkah:**

1. Pastikan chip dapat dioperasikan dengan Enter/Space.
2. Pastikan count diumumkan tanpa membaca ulang seluruh grid.
3. Periksa urutan Tab dan focus ring.

**Acceptance criteria:**

- [ ] Semua chip, input, tombol hapus, dan select dapat dijangkau Tab.
- [ ] Enter/Space mengaktifkan chip; fokus tetap terlihat.
- [ ] `aria-live` hanya pada count/status, bukan seluruh grid.
- [ ] Focus ring 3 px terlihat pada latar krem dan plum.
- [ ] Tidak ada perangkap fokus di toolbar.

**Berkas:** `index.html`, `src/main.js`, `src/styles.css`.

---

## 7. Milestone 4 — WhatsApp (25 menit)

**Hasil:** reservasi meja dan tanya kamar membuka WhatsApp dengan pesan terisi.

**Exit criteria milestone:**

- [ ] CTA reservasi dan kamar bekerja di mobile/desktop.
- [ ] Tidak ada API key, backend, atau pengiriman otomatis.
- [ ] AC-17–AC-19 lulus.

### M4-T1 — Helper deep link & template pesan

**Estimasi:** 10 m · **Depends:** M2-T1

**Langkah:**

1. Pusatkan nomor fiktif `6281200000000` di satu konstanta.
2. Buat helper `buatTautanWhatsApp(jenis, item?)`.
3. Susun template reservasi (jumlah orang, tanggal, jam) dan tanya kamar (nama kamar).
4. Encode pesan dengan `encodeURIComponent`.

**Acceptance criteria:**

- [ ] URL berawalan `https://wa.me/6281200000000?text=`.
- [ ] Spasi, baris baru, dan karakter khusus ter-encode benar.
- [ ] Template reservasi meminta jumlah orang/tanggal/jam dan dapat diedit di WhatsApp.
- [ ] Template kamar menyebut nama kamar yang dipilih.
- [ ] Tidak ada nomor pribadi atau API key di kode.
- [ ] Helper tidak melakukan request jaringan sendiri.

**Berkas:** `src/whatsapp.js` (baru), `src/data.js`.

---

### M4-T2 — Pasang CTA reservasi

**Estimasi:** 10 m · **Depends:** M4-T1

**Langkah:**

1. Pasang CTA di navbar, hero, live music, dan footer.
2. Gunakan `target="_blank"` + `rel="noopener noreferrer"`.
3. Pastikan label selalu terlihat dan ikon WhatsApp konsisten.

**Acceptance criteria:**

- [ ] Semua tombol "Reservasi Meja" membuka tab baru `wa.me` dengan template terisi.
- [ ] Nomor dan teks pesan benar; tidak ada data terkirim otomatis dari halaman.
- [ ] `rel="noopener noreferrer"` ada pada semua tautan eksternal.
- [ ] Tombol tetap dapat digunakan dengan keyboard.
- [ ] Tidak ada tombol keranjang/checkout/login di sekitar CTA.
- [ ] Console bersih setelah klik.

**Berkas:** `index.html`, `src/main.js`, `src/render.js`, `src/styles.css`.

---

### M4-T3 — Pasang CTA tanya kamar

**Estimasi:** 5 m · **Depends:** M4-T1, M2-T3

**Langkah:**

1. Tambahkan tombol "Tanya Kamar" pada setiap kartu kategori Kamar.
2. Kirim nama kamar + pertanyaan ketersediaan/tarif.
3. Pastikan kartu non-kamar tidak memiliki CTA pesan.

**Acceptance criteria:**

- [ ] `Kamar AC Twin + Sarapan` membuka pesan yang menyebut nama tersebut.
- [ ] `Kamar Fan Double` membuka pesan dengan nama yang benar.
- [ ] Kartu makanan/minuman tidak memiliki tombol tanya kamar.
- [ ] Tombol kamar tetap aktif saat stok 0 (Habis).
- [ ] CTA tidak memakai keranjang atau memilih jumlah.
- [ ] AC-18 dan AC-19 lulus.

**Berkas:** `src/render.js`, `src/whatsapp.js`, `src/styles.css`.

---

## 8. Milestone 5 — CRUD Dashboard (70 menit)

> **Catatan:** "CRUD" di sini berarti **Read + Update + Reset** untuk 8 item tetap. Create/Delete item tetap out-of-scope sesuai `SPEC.md`.

**Hasil:** dashboard demo tanpa login untuk mengubah stok, harga, dan unggulan, dengan validasi dan reset.

**Exit criteria milestone:**

- [ ] Dashboard dapat dibuka/ditutup dengan keyboard.
- [ ] Edit dan validasi bekerja; ringkasan ikut berubah.
- [ ] Reset berfungsi (persistensi penuh diuji di M6).

### M5-T1 — Shell dashboard & akses tanpa login

**Estimasi:** 15 m · **Depends:** M2-T5

**Langkah:**

1. Tambahkan pemicu "Mode Pengelola" di navbar dan menu mobile.
2. Bangun dialog overlay desktop / full-screen mobile.
3. Tambahkan header, badge "Tanpa login · Data lokal", banner info, dan 4 kartu ringkasan.
4. Implementasikan focus trap, Esc, dan pengembalian fokus.

**Acceptance criteria:**

- [ ] Klik "Mode Pengelola" membuka dashboard tanpa meminta kredensial.
- [ ] Label "Tanpa login · Data lokal" terlihat, bukan hanya di dokumentasi.
- [ ] Tidak ada field email/sandi/login.
- [ ] Dashboard menampilkan 8 item dan ringkasan 8/7/1/3.
- [ ] Esc menutup; fokus kembali ke tombol pemicu.
- [ ] Fokus tidak keluar dari dialog saat terbuka.
- [ ] Mobile: full-screen; tidak ada scroll horizontal.
- [ ] AC-20 dan AC-38 (bagian dashboard) lulus.

**Berkas:** `index.html`, `src/main.js`, `src/render.js`, `src/styles.css`.

---

### M5-T2 — Editor stok, harga, unggulan

**Estimasi:** 20 m · **Depends:** M5-T1

**Langkah:**

1. Desktop: tabel 8 baris dengan thumb, nama, harga, stok, switch, status, aksi.
2. Mobile: kartu bertumpuk; input Harga/Stok ditumpuk di bawah 400 px.
3. Tombol Simpan per baris, disabled sampai ada perubahan.
4. Tandai baris berubah dengan latar/border, bukan hanya warna.

**Acceptance criteria:**

- [ ] Setiap item memiliki input harga dan stok dengan label terlihat.
- [ ] Switch unggulan dapat dioperasikan keyboard dan area sentuh 44×44.
- [ ] Tombol Simpan disabled saat baris bersih; aktif saat ada perubahan.
- [ ] Perubahan baris terlihat jelas (latar + border kiri).
- [ ] Tidak ada tombol tambah/hapus item.
- [ ] Mobile menampilkan kartu, bukan tabel yang dipaksa scroll.
- [ ] AC-21 (UI), AC-23, AC-24 (UI) dapat diuji.

**Berkas:** `src/render.js`, `src/main.js`, `src/styles.css`.

---

### M5-T3 — Validasi input

**Estimasi:** 15 m · **Depends:** M5-T2

**Langkah:**

1. Validasi stok integer 0–999 dan harga integer 0–100.000.000.
2. Tampilkan error di bawah field; kaitkan dengan `aria-describedby`.
3. Tolak simpan; pertahankan nilai lama.
4. Terima batas 0 dan nilai maksimum.

**Acceptance criteria:**

- [ ] AC-25: stok `-1` ditolak dengan pesan jelas.
- [ ] AC-26: stok `2.5` ditolak sebagai bukan bilangan bulat.
- [ ] AC-27: harga `abc`, `-100`, dan `100000001` ditolak.
- [ ] Stok `0` dan `999` diterima; harga `0` dan `100000000` diterima.
- [ ] Saat validasi gagal, kartu/ringkasan tidak berubah.
- [ ] Error hanya muncul pada field yang bermasalah.
- [ ] Error dapat dibaca pembaca layar dan tidak hanya warna.
- [ ] AC-25–AC-27 lulus.

**Berkas:** `src/main.js`, `src/format.js`, `src/render.js`, `src/styles.css`.

---

### M5-T4 — Simpan perubahan & ringkasan

**Estimasi:** 10 m · **Depends:** M5-T2, M5-T3

**Langkah:**

1. Terapkan perubahan ke `state.items` di memori.
2. Render ulang kartu, status, badge, dan ringkasan.
3. Tampilkan toast/status "Perubahan diterapkan" (belum mengklaim tersimpan permanen; indikator persistensi ditambahkan di M6).
4. Pastikan perubahan tidak mengubah jumlah item.

**Acceptance criteria:**

- [ ] Nasi 12 → 2: status menjadi Terbatas; ringkasan Tersedia tetap 7.
- [ ] Nasi 2 → 0: status Habis; ringkasan Tersedia 6 dan Habis 2.
- [ ] Es Kelapa 25000 → 30000: kartu menampilkan "Rp 30.000".
- [ ] Matikan unggulan Sate: badge hilang; ringkasan Unggulan 2.
- [ ] Perubahan langsung terlihat tanpa reload.
- [ ] Status setelah simpan tidak mengklaim data tersimpan permanen sebelum M6.
- [ ] Jumlah item tetap 8; tidak ada item baru/hilang.
- [ ] Reload **belum** diharapkan mempertahankan perubahan sampai M6.

**Berkas:** `src/main.js`, `src/render.js`, `src/format.js`.

---

### M5-T5 — Dialog reset data

**Estimasi:** 10 m · **Depends:** M5-T4

**Langkah:**

1. Tambahkan tombol "Reset ke data awal" di footer dashboard.
2. Tampilkan dialog konfirmasi dengan fokus awal "Batal".
3. Reset item ke seed, ringkasan, dan state pencarian/filter/sort.
4. Tampilkan toast "Data contoh berhasil dimuat ulang."

**Acceptance criteria:**

- [ ] Dialog menjelaskan bahwa perubahan akan hilang.
- [ ] "Batal" tidak mengubah data.
- [ ] "Ya, reset" mengembalikan 8 seed: stok 12/9/10/0/20/2/4/1, harga seed, 3 unggulan.
- [ ] Pencarian/filter/sort kembali default setelah reset.
- [ ] Fokus awal di "Batal"; Esc menutup; fokus kembali ke tombol reset.
- [ ] AC-30 dan AC-31 lulus (persistensi penuh diverifikasi di M6).

**Berkas:** `src/main.js`, `src/render.js`, `src/store.js`, `src/styles.css`.

---

## 9. Milestone 6 — localStorage (40 menit)

**Hasil:** perubahan bertahan setelah reload, dengan skema berversi dan fallback aman.

**Exit criteria milestone:**

- [ ] Reload mempertahankan perubahan.
- [ ] Data rusak/storage diblokir tidak membuat aplikasi crash.
- [ ] AC-28–AC-34 lulus (kecuali AC-34 diuji ulang di M7).

### M6-T1 — Skema baca/tulis storage

**Estimasi:** 10 m · **Depends:** M5-T4

**Langkah:**

1. Gunakan key `topiinn.menu.v1`.
2. Simpan `{ version: 1, updatedAt, items: MenuItem[] }`.
3. Muat seed jika key tidak ada.
4. Jangan menyimpan query/filter/sort/status panel.

**Acceptance criteria:**

- [ ] Key yang digunakan persis `topiinn.menu.v1`.
- [ ] Isi storage sesuai skema dan selalu 8 item.
- [ ] `updatedAt` berupa ISO-8601 yang valid.
- [ ] Reload setelah edit harga/stok mempertahankan nilai.
- [ ] Setelah reload, pencarian/filter/sort kembali default.
- [ ] Key kosong → seed dimuat dan ditulis.
- [ ] AC-28 lulus.

**Berkas:** `src/store.js` (baru/ubah), `src/data.js`, `src/main.js`.

---

### M6-T2 — Fallback data rusak & storage tidak tersedia

**Estimasi:** 15 m · **Depends:** M6-T1

**Langkah:**

1. Validasi JSON, `version`, jumlah item, tipe field, dan enum kategori.
2. Jika tidak valid → seed + banner "Data lokal tidak terbaca…".
3. Deteksi kegagalan tulis/baca → mode in-memory + banner.
4. Jangan menampilkan error mentah/stack trace.

**Acceptance criteria:**

- [ ] Set `localStorage["topiinn.menu.v1"] = "{rusak"` lalu reload: 8 seed tampil + banner, tanpa crash.
- [ ] Version tidak dikenal, item < 8, atau harga string → fallback seed.
- [ ] Storage diblokir: halaman tetap berfungsi; banner "Perubahan hanya berlaku selama halaman terbuka."
- [ ] Edit stok tetap bekerja in-memory saat storage diblokir.
- [ ] Banner tidak menutupi navigasi dan dapat dibaca pembaca layar.
- [ ] AC-32 dan AC-33 lulus.

**Berkas:** `src/store.js`, `src/render.js`, `src/main.js`, `src/styles.css`.

---

### M6-T3 — Integrasi simpan & indikator

**Estimasi:** 10 m · **Depends:** M6-T1, M5-T4

**Langkah:**

1. Setelah Simpan baris, tulis state terbaru ke storage.
2. Perbarui indikator "Tersimpan di perangkat ini · HH.MM".
3. Tangani kegagalan tulis tanpa kehilangan state di layar.
4. Pastikan tab lain melihat data terbaru setelah reload.

**Acceptance criteria:**

- [ ] Setiap simpan yang valid memperbarui storage.
- [ ] Indikator waktu berubah setelah simpan.
- [ ] Reload menampilkan nilai terbaru.
- [ ] Buka tab kedua (origin sama) → data edit tampil; reload tab kedua menampilkan perubahan terbaru.
- [ ] Jika storage gagal, UI memberi tahu dan tidak menampilkan "Tersimpan" palsu.
- [ ] AC-29 dan F-20 lulus.

**Berkas:** `src/main.js`, `src/store.js`, `src/render.js`.

---

### M6-T4 — Reset & hardening storage

**Estimasi:** 5 m · **Depends:** M6-T3, M5-T5

**Langkah:**

1. Reset menulis seed ke storage (atau menghapus key lalu menulis seed).
2. Perbarui `updatedAt`.
3. Pastikan tidak ada data pribadi/rahasia yang tersimpan.
4. Uji reset → reload.

**Acceptance criteria:**

- [ ] Reset lalu reload tetap menampilkan seed.
- [ ] Storage kembali berisi 8 item, 3 unggulan, stok seed.
- [ ] Tidak ada field tambahan berisi query/filter/nomor pengunjung.
- [ ] Tidak ada API key/token di storage.
- [ ] AC-30 lulus penuh.

**Berkas:** `src/store.js`, `src/main.js`, `docs`/README.

---

## 10. Milestone 7 — Testing (55 menit)

**Hasil:** seluruh AC fungsional, responsif, dan aksesibilitas diperiksa manual serta dicatat.

**Exit criteria milestone:**

- [ ] AC-01–AC-39 lulus atau memiliki catatan blokir yang disetujui.
- [ ] Tidak ada bug Must yang terbuka.
- [ ] Hasil tercatat di `docs/TEST-PLAN.md` dan README.

### M7-T1 — Test plan & matriks pengujian

**Estimasi:** 10 m · **Depends:** M1–M6

**Langkah:**

1. Buat `docs/TEST-PLAN.md` berisi 42 AC, langkah, hasil, dan bukti.
2. Tambahkan matriks browser (Chrome/Edge + Firefox/Safari) dan viewport 320/360/768/1024/1440.
3. Tambahkan prosedur reset data sebelum pengujian.
4. Tambahkan kolom status `[ ]/[x]/[~]`.

**Acceptance criteria:**

- [ ] Semua AC-01–AC-42 ada di test plan, tidak ada yang hilang.
- [ ] Setiap AC memiliki langkah dan hasil yang diharapkan.
- [ ] Ada kolom bukti (screenshot/Console/Network/storage).
- [ ] Prosedur reset data dan reload dijelaskan.
- [ ] Test plan tidak mengubah kode aplikasi.

**Berkas:** `docs/TEST-PLAN.md` (baru), `README.md`.

---

### M7-T2 — Uji fungsional AC-01–AC-36

**Estimasi:** 20 m · **Depends:** M7-T1

**Langkah:**

1. Jalankan AC-01–AC-36 berurutan pada data seed.
2. Catat lulus/gagal + bukti.
3. Perbaiki bug Must; ulangi AC terkait.
4. Jangan menambah fitur saat menemukan ide baru.

**Acceptance criteria:**

- [ ] AC-01–AC-05 (profil, 8 kartu, unggulan, Rupiah, status) lulus.
- [ ] AC-06–AC-15 (cari/filter/sort/empty/reset) lulus.
- [ ] AC-16 (ringkasan 8/7/1/3) lulus.
- [ ] AC-17–AC-19 (WhatsApp, tanpa keranjang) lulus.
- [ ] AC-20–AC-27 (dashboard & validasi) lulus.
- [ ] AC-28–AC-36 (persistensi, reset, error storage, gambar, live music, dive/ferry) lulus.
- [ ] Setiap kegagalan memiliki catatan perbaikan.
- [ ] Tidak ada regresi pada AC yang sudah lulus.

**Berkas:** `docs/TEST-PLAN.md`, `README.md`, `src/*`, `src/styles.css`, `public/images/*` (hanya perbaikan bug).

---

### M7-T3 — Responsif, keyboard, dan aksesibilitas

**Estimasi:** 15 m · **Depends:** M7-T2

**Langkah:**

1. Uji 320, 360, 768, 1024, 1440 px.
2. Uji navigasi keyboard penuh dan focus trap dashboard/reset.
3. Periksa alt, label, kontras, target sentuh, dan reduced motion.
4. Uji zoom 200%.

**Acceptance criteria:**

- [ ] Tidak ada scroll horizontal pada 320–1440 px.
- [ ] Semua kontrol dapat dijangkau Tab; Enter/Space bekerja; Esc menutup dialog.
- [ ] Fokus terlihat pada latar terang dan plum.
- [ ] Semua gambar punya alt; input punya label; status punya teks.
- [ ] Kontras teks utama ≥ 4,5:1 dan teks malam ≥ 7:1.
- [ ] `prefers-reduced-motion` menonaktifkan transform/zoom.
- [ ] AC-37–AC-39 lulus.

**Berkas:** `src/styles.css`, `index.html`, `src/main.js`, `docs/TEST-PLAN.md`.

---

### M7-T4 — Edge case & lintas browser

**Estimasi:** 10 m · **Depends:** M7-T2

**Langkah:**

1. Uji data rusak, storage diblokir, gambar gagal, dua tab.
2. Uji WhatsApp di mobile/desktop.
3. Ulangi smoke test di minimal 2 browser.
4. Catat perbedaan perilaku (bukan sebagai fitur baru).

**Acceptance criteria:**

- [ ] Data localStorage rusak → seed + banner; tidak crash.
- [ ] Storage diblokir → mode in-memory + banner.
- [ ] Gambar gagal → placeholder; layout tidak bergeser parah.
- [ ] Dua tab → reload menampilkan data terbaru.
- [ ] Semua CTA WhatsApp membuka pesan yang benar di 2 browser.
- [ ] Tidak ada error Console di browser yang diuji.
- [ ] AC-29, AC-32, AC-33, AC-34 lulus.

**Berkas:** `src/store.js`, `src/render.js`, `docs/TEST-PLAN.md`, `README.md`.

---

## 11. Milestone 8 — Security (25 menit)

**Hasil:** tidak ada rahasia/data pribadi, rendering aman, dependensi dan request terkendali.

**Exit criteria milestone:**

- [ ] AC-41 lulus.
- [ ] AC-42 lulus untuk runtime.
- [ ] Tidak ada high/critical vulnerability yang tidak ditangani.

### M8-T1 — Audit rahasia & data pribadi

**Estimasi:** 5 m · **Depends:** M7

**Langkah:**

1. Cari pola `api_key`, `apikey`, `token`, `secret`, `password`, `bearer`, `BEGIN PRIVATE KEY`.
2. **Catatan:** kemunculan kata kunci tersebut di dokumentasi kebijakan (SPEC/TASKS/README) bukan rahasia; periksa nilai di sekitarnya, bukan hanya kata.
3. Periksa `.env`, file konfigurasi, dan riwayat teks di README.
4. Pastikan hanya nomor fiktif `6281200000000`.
5. Pastikan `.gitignore` mencakup `.env` dan file lokal.

**Acceptance criteria:**

- [ ] Tidak ada API key/token/kredensial di repo.
- [ ] Tidak ada nomor telepon pribadi; hanya nomor fiktif terdokumentasi.
- [ ] Tidak ada data pengunjung/tamu yang disimpan.
- [ ] `.env` tidak ada atau di-ignore.
- [ ] AC-41 lulus.

**Berkas:** `.gitignore`, `README.md`, `src/data.js`, seluruh repo (audit).

---

### M8-T2 — Rendering aman & validasi URL

**Estimasi:** 8 m · **Depends:** M7

**Langkah:**

1. Pastikan data dinamis dirender dengan `textContent`/node, bukan `innerHTML`.
2. Validasi `imageUrl` hanya path lokal `/images/` dengan ekstensi diizinkan.
3. Tolak `javascript:`, `data:`, dan URL eksternal.
4. Pastikan semua tautan eksternal memakai `noopener noreferrer`.

**Acceptance criteria:**

- [ ] Menaruh string berisi `<img onerror=...>` di data lokal tidak mengeksekusi script.
- [ ] `imageUrl` eksternal/`javascript:` tidak dimuat; fallback placeholder tampil.
- [ ] Tidak ada `innerHTML` untuk nama/deskripsi/harga.
- [ ] Semua tautan WhatsApp memakai `rel="noopener noreferrer"`.
- [ ] Tidak ada evaluasi `eval`/`new Function`.
- [ ] Console tetap bersih setelah uji injeksi.

**Berkas:** `src/render.js`, `src/store.js`, `src/main.js`, `src/whatsapp.js`.

---

### M8-T3 — Audit dependensi & request jaringan

**Estimasi:** 7 m · **Depends:** M7

**Langkah:**

1. Jalankan `npm audit` (dan `npm audit --omit=dev` jika relevan).
2. Periksa tab Network: hanya aset lokal, tanpa analytics/font CDN.
3. Pastikan tidak ada cookie, pixel, atau script pihak ketiga.
4. Catat hasil audit di README.

**Acceptance criteria:**

- [ ] Tidak ada vulnerability high/critical yang tidak diselesaikan/dicatat.
- [ ] Network saat load hanya berisi dokumen, CSS, JS, font, dan gambar lokal.
- [ ] Tidak ada request ke Google Fonts, analytics, atau CDN.
- [ ] Tidak ada cookie pelacak atau `document.cookie` yang ditulis.
- [ ] AC-42 lulus (di luar navigasi sukarela ke WhatsApp).

**Berkas:** `package.json`, `package-lock.json`, `index.html`, `src/styles.css`, `README.md`.

---

### M8-T4 — Privasi, header, dan batasan

**Estimasi:** 5 m · **Depends:** M8-T1–M8-T3

**Langkah:**

1. Dokumentasikan bahwa data hanya tersimpan per browser/perangkat.
2. Tambahkan disclaimer "data contoh untuk latihan" di footer/README.
3. Opsional: header CSP/keamanan statis jika host mendukung; uji tanpa merusak halaman.
4. Pastikan tidak ada form yang mengirim data ke server.

**Acceptance criteria:**

- [ ] README menjelaskan localStorage per origin dan tidak ada sinkronisasi.
- [ ] Footer memuat disclaimer data contoh.
- [ ] Tidak ada form kontak/login yang mengirim data.
- [ ] Jika header keamanan dipasang, halaman, font, gambar, dan WhatsApp tetap bekerja.
- [ ] Tidak ada klaim keamanan berlebihan ("terenkripsi", "aman sepenuhnya") di UI.

**Berkas:** `README.md`, `index.html`, `public/_headers` (opsional), `vite.config.js` (opsional).

---

## 12. Milestone 9 — Build (25 menit)

**Hasil:** build produksi ringan, bersih, dan berfungsi sama dengan dev.

**Exit criteria milestone:**

- [ ] `npm run build` sukses.
- [ ] `npm run preview` lulus smoke test.
- [ ] AC-40 lulus.

### M9-T1 — Optimasi aset

**Estimasi:** 8 m · **Depends:** M8

**Langkah:**

1. Konversi/kompres gambar ke WebP dengan dimensi wajar; hapus aset tak terpakai.
2. Pastikan `loading="lazy"` untuk gambar bawah fold dan `width`/`height` eksplisit.
3. Subset font; pastikan hanya 2 family yang dipakai.
4. Periksa ukuran JS/CSS hasil build.

**Acceptance criteria:**

- [ ] JS hasil build < 150 KB gzip; CSS < 40 KB gzip.
- [ ] Tidak ada gambar hotlink/eksternal.
- [ ] Hero tidak memakai lazy loading; gambar bawah fold memakai lazy.
- [ ] Tidak ada layout shift besar saat gambar dimuat.
- [ ] Font yang dimuat tidak lebih dari 2 family.

**Berkas:** `public/images/*`, `public/fonts/*`, `src/styles.css`, `src/render.js`, `vite.config.js`.

---

### M9-T2 — Build produksi

**Estimasi:** 7 m · **Depends:** M9-T1

**Langkah:**

1. Jalankan `npm run build`.
2. Periksa `dist/` berisi `index.html`, aset JS/CSS, font, gambar.
3. Pastikan tidak ada path localhost/absolut yang rusak.
4. Jika deploy ke subpath (GitHub Pages), set `base` dengan benar.

**Acceptance criteria:**

- [ ] Build selesai tanpa error.
- [ ] `dist/index.html` dapat dibuka lewat preview.
- [ ] Tidak ada referensi ke `localhost` di output produksi.
- [ ] Semua aset memiliki hash/cache yang sesuai.
- [ ] Tidak ada file `.env` atau kredensial di `dist/`; source map hanya disertakan jika disengaja.

**Berkas:** `vite.config.js`, `package.json`, `index.html`, `dist/*` (generated, tidak di-commit).

---

### M9-T3 — Preview smoke test

**Estimasi:** 10 m · **Depends:** M9-T2

**Langkah:**

1. Jalankan `npm run preview`.
2. Uji 8 kartu, cari/filter/sort, WhatsApp, dashboard edit, reload, reset.
3. Periksa Console, Network, dan localStorage.
4. Bandingkan hasil dengan dev.

**Acceptance criteria:**

- [ ] 8 kartu tampil; pencarian/filter/sort bekerja.
- [ ] CTA WhatsApp membuka pesan yang benar.
- [ ] Edit + reload mempertahankan data; reset mengembalikan seed.
- [ ] Console bersih; Network hanya aset lokal (kecuali klik WhatsApp).
- [ ] 360 px dan 1440 px tampil benar.
- [ ] AC-40 dan AC-42 lulus pada build produksi.

**Berkas:** `README.md`, `docs/TEST-PLAN.md`.

---

## 13. Milestone 10 — Deployment (25 menit)

**Hasil:** situs statis terpublikasi (atau build siap deploy) dengan verifikasi produksi.

**Exit criteria milestone:**

- [ ] `dist/` dapat di-host tanpa backend.
- [ ] URL publik berfungsi (jika akun host tersedia).
- [ ] Hasil verifikasi dicatat.

### M10-T1 — Pilihan host & konfigurasi

**Estimasi:** 8 m · **Depends:** M9

**Langkah:**

1. Pilih host statis: **Netlify Drop** (utama, tanpa API key) atau GitHub Pages/Vercel.
2. Tentukan publish directory `dist`, build command `npm run build`.
3. Jika subpath, set `base` di `vite.config.js`.
4. Jangan menyimpan token/deploy key di repo.

**Acceptance criteria:**

- [ ] Instruksi build & publish ada di README.
- [ ] Tidak ada token/secret di repo atau file konfigurasi.
- [ ] Base path benar untuk host yang dipilih.
- [ ] Tidak ada server/API yang dibutuhkan.
- [ ] Rencana rollback (deploy ulang versi sebelumnya) dicatat.

**Berkas:** `README.md`, `vite.config.js`, `netlify.toml` atau `.github/workflows/deploy.yml` (hanya yang dipilih), `.gitignore`.

---

### M10-T2 — Publikasi

**Estimasi:** 7 m · **Depends:** M10-T1

**Langkah:**

1. Build ulang dari commit bersih.
2. Unggah/deploy folder `dist` sesuai host.
3. Pastikan HTTPS aktif.
4. Catat URL dan waktu deploy di README.

**Acceptance criteria:**

- [ ] URL publik (HTTPS) dapat dibuka tanpa login.
- [ ] Tidak ada error 404 untuk aset utama.
- [ ] Halaman tidak membutuhkan backend.
- [ ] URL dicatat di README.
- [ ] Jika tidak ada akun host, `dist/` + `npm run preview` disimpan sebagai bukti dan status deployment `[~]` dengan alasan.

**Berkas:** `README.md`, `dist/*` (generated), konfigurasi host (jika ada).

---

### M10-T3 — Verifikasi pasca-deploy

**Estimasi:** 10 m · **Depends:** M10-T2

**Langkah:**

1. Buka URL di desktop dan mobile.
2. Uji 8 kartu, filter, WhatsApp, dashboard, reload, reset.
3. Periksa Console, Network, dan localStorage di origin baru.
4. Catat perbedaan (origin baru = seed baru).

**Acceptance criteria:**

- [ ] 8 kartu tampil di URL publik; tidak ada error Console.
- [ ] Pencarian/filter/sort dan empty state bekerja.
- [ ] WhatsApp membuka pesan yang benar.
- [ ] Dashboard terbuka tanpa login; edit + reload bertahan di origin tersebut.
- [ ] Reset mengembalikan seed.
- [ ] Tidak ada request eksternal saat load.
- [ ] 360 px dan 1440 px tampil benar.
- [ ] Catatan "localStorage terpisah per origin/domain" ada di README.
- [ ] Semua AC Must dinyatakan lulus di lingkungan produksi atau dicatat sebagai blocker.

**Berkas:** `README.md`, `docs/TEST-PLAN.md`.

---

## 14. Traceability — AC ke Task

| AC `SPEC.md` | Task penanggung jawab |
| --- | --- |
| AC-01 | M2-T2, M2-T5 |
| AC-02 | M2-T1, M2-T3 |
| AC-03 | M2-T1, M2-T3 |
| AC-04 | M2-T2, M2-T3 |
| AC-05 | M2-T2, M2-T3 |
| AC-06–AC-08 | M3-T1, M3-T3 |
| AC-09–AC-10 | M3-T1–M3-T3 |
| AC-11–AC-13 | M3-T1, M3-T3 |
| AC-14–AC-15 | M3-T4 |
| AC-16 | M2-T2, M2-T4 |
| AC-17 | M4-T1, M4-T2 |
| AC-18 | M4-T1, M4-T3 |
| AC-19 | M2-T3, M4-T2, M7-T2 |
| AC-20 | M5-T1 |
| AC-21–AC-22 | M5-T2–M5-T4 |
| AC-23–AC-24 | M5-T2–M5-T4 |
| AC-25–AC-27 | M5-T3 |
| AC-28 | M6-T1, M7-T2 |
| AC-29 | M6-T3, M7-T4 |
| AC-30–AC-31 | M5-T5, M6-T4 |
| AC-32–AC-33 | M6-T2, M7-T4 |
| AC-34 | M2-T3, M7-T4 |
| AC-35–AC-36 | M2-T4 |
| AC-37 | M2-T5, M7-T3 |
| AC-38 | M5-T1, M7-T3 |
| AC-39 | M7-T3 |
| AC-40 | M9-T2, M9-T3 |
| AC-41 | M8-T1 |
| AC-42 | M8-T3, M9-T3 |

---

## 15. Risiko Jadwal & Rencana Cadangan

| Risiko | Dampak | Rencana |
| --- | --- | --- |
| Font lokal belum tersedia | Estetika turun | Pakai fallback Georgia/system-ui; jangan pakai CDN. |
| Dashboard melebihi 70 menit | M6/M7 mundur | Sederhanakan tabel menjadi kartu di semua ukuran; pertahankan validasi. |
| localStorage sulit diuji | AC-28–33 gagal | Uji manual DevTools; tambahkan banner dan fallback in-memory lebih awal. |
| Deploy tidak punya akun | M10 terblokir | Simpan `dist/` + `npm run preview`; tandai `[~]`, jangan menambah backend. |
| Waktu habis | AC Must gagal | Potong F-21–F-23, animasi, dan polish; jangan potong validasi/persistensi. |
| Bug gambar/font | Layout shift | Placeholder SVG + `width`/`height` eksplisit. |

---

## 16. Sign-off Akhir

Rilis latihan dinyatakan selesai jika:

- [ ] M1–M9 selesai; M10 selesai atau terdokumentasi `[~]`.
- [ ] AC-01–AC-42 semuanya `[x]` atau memiliki catatan blocker yang disetujui.
- [ ] `npm run build` dan `npm run preview` sukses.
- [ ] Tidak ada error Console, rahasia, data pribadi, atau request eksternal.
- [ ] README memuat cara jalan, cara ganti nomor WhatsApp, hasil AC, dan URL deployment.
- [ ] Tidak ada keranjang, checkout, login, backend, atau API key yang ditambahkan.

**Akhir dokumen — belum ada kode aplikasi yang diubah.**

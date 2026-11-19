# SPEC — Topi Inn & Restaurant

**Website profil + menu digital restoran tepi pantai & penginapan, Padangbai, Bali**

| Atribut | Nilai |
| --- | --- |
| Versi dokumen | 1.0 |
| Status | Disetujui untuk latihan 1 hari |
| Tech stack | Vite + JavaScript vanilla (ES modules), CSS biasa |
| Backend | Tidak ada |
| Login | Tidak ada (termasuk tidak ada login palsu) |
| Target rilis | 1 hari kerja (± 7,5 jam efektif) |

> Dokumen ini adalah **spesifikasi**, bukan kode. Implementasi aplikasi belum dimulai.
> Seluruh data contoh (nama menu, harga, jadwal, nomor WhatsApp) bersifat **fiktif dan nonpribadi**, hanya untuk latihan.

---

## 1. Tujuan

### 1.1 Tujuan produk

Menyediakan **satu halaman web** yang memungkinkan wisatawan:

1. Melihat profil singkat Topi Inn & Restaurant beserta menu makanan, minuman, dan info kamar.
2. Mencari, memfilter, dan mengurutkan daftar menu/layanan dengan cepat.
3. Mengetahui ketersediaan (stok) secara jujur sebelum datang.
4. Menghubungi pengelola melalui **WhatsApp** untuk reservasi meja atau menanyakan kamar — tanpa keranjang, checkout, atau pembayaran online.

Dan memungkinkan **pengelola** di perangkat yang sama:

5. Memperbarui stok, harga, dan status unggulan item.
6. Melihat ringkasan total item dan ketersediaan.
7. Mengembalikan data ke kondisi awal (reset) saat latihan/demo.

### 1.2 Tujuan pembelajaran (latihan 1 hari)

1. Menerjemahkan kebutuhan bisnis sederhana menjadi data model + UI yang konsisten.
2. Membangun alur baca–ubah data dengan `localStorage` sebagai satu-satunya "database".
3. Menghubungkan website statis ke kanal komunikasi nyata (deep link WhatsApp) tanpa backend.
4. Menyelesaikan pekerjaan dengan kriteria penerimaan yang **dapat diperiksa manual**, tanpa menambah scope.

### 1.3 Indikator keberhasilan

- Seluruh Acceptance Criteria (Bagian 9) lulus pemeriksaan manual.
- `npm run build` sukses dan hasil build dapat dijalankan dengan `npm run preview`.
- Tidak ada error di Console browser saat memuat halaman dan saat menguji semua fitur MVP.
- Tidak ada API key, token, kredensial, atau data pribadi di dalam repositori.
- Semua fitur inti berfungsi pada lebar layar 360 px (mobile) dan 1440 px (desktop).

### 1.4 Non-goals (ringkas)

Bukan sistem pemesanan online: **tidak ada keranjang, checkout, pembayaran, pengiriman, atau manajemen pesanan**. Tidak ada backend, database server, akun pengguna, maupun login.

---

## 2. Pengguna & Kebutuhan

Konteks utama: **satu perangkat** (laptop/tablet) yang dipakai bergantian oleh wisatawan dan pengelola — misalnya tablet di meja resepsionis atau laptop saat demo kelas.

### 2.1 Persona 1 — Wisatawan / calon tamu (prioritas utama)

| Aspek | Deskripsi |
| --- | --- |
| Konteks | Baru turun ferry di Padangbai, mencari makan atau kamar, sering memakai ponsel dengan koneksi tidak stabil. |
| Tujuan | Tahu apa yang tersedia, berapa harganya, apakah masih ada, lalu menghubungi via WhatsApp. |
| Kebutuhan | Daftar ringkas; pencarian cepat; filter kategori; harga Rupiah jelas; penanda habis yang mencolok; tombol WhatsApp yang langsung membawa konteks (item yang ditanyakan). |
| Frustrasi | Harga tidak jelas, menu "habis" tanpa keterangan, harus mengetik ulang pertanyaan di WhatsApp. |

### 2.2 Persona 2 — Pengelola (peran sekunder, perangkat yang sama)

| Aspek | Deskripsi |
| --- | --- |
| Konteks | Staf/resepsionis yang mengelola ketersediaan harian; bukan pengguna teknis. |
| Tujuan | Menandai item habis, memperbarui harga, menandai unggulan, lalu kembali ke tampilan tamu. |
| Kebutuhan | Panel pengelola sederhana; input angka dengan validasi jelas; perubahan langsung terlihat; tombol reset. |
| Frustrasi | Form rumit, data hilang tanpa peringatan, tidak tahu perubahan tersimpan atau tidak. |

### 2.3 Kebutuhan lintas peran

- **Tanpa login.** Panel pengelola diberi label jelas: "Mode Pengelola — tanpa login, hanya untuk latihan di satu perangkat". Tidak ada halaman login, form sandi, atau sesi palsu.
- **Umpan balik jelas** setiap kali data disimpan (mis. pesan "Perubahan tersimpan di perangkat ini").
- **Bahasa Indonesia** untuk seluruh antarmuka; istilah kategori konsisten dengan Bagian 4.

---

## 3. Daftar Fitur

Prioritas memakai MoSCoW. Semua **Must** wajib selesai dalam 1 hari.

| ID | Fitur | Prioritas | Deskripsi & perilaku |
| --- | --- | --- | --- |
| F-01 | Halaman profil restoran | Must | Hero dengan nama "Topi Inn & Restaurant", tagline, lokasi Padangbai, Bali, jam buka, dan CTA utama "Reservasi Meja". |
| F-02 | Grid 8 menu/layanan contoh | Must | Menampilkan 8 item contoh (4 kategori) sebagai kartu: foto/placeholder lokal, nama, kategori, harga Rupiah, status ketersediaan, deskripsi singkat, serta badge "Unggulan" untuk 3 item yang ditandai. |
| F-03 | Foto/placeholder lokal | Must | Setiap kartu memakai gambar dari folder proyek (`public/images/`). Jika gambar gagal dimuat, tampil placeholder lokal (SVG) + teks alternatif. Tidak ada hotlink gambar eksternal. |
| F-04 | Harga Rupiah terformat | Must | Ditampilkan sebagai `Rp 45.000` memakai `Intl.NumberFormat('id-ID')`. Nilai tersimpan tetap angka (`45000`). |
| F-05 | Status ketersediaan/stok | Must | Aturan: `stok = 0` → **Habis**; `1–3` → **Terbatas**; `> 3` → **Tersedia**. Badge warna + teks (tidak hanya warna). Kartu Habis diredupkan namun tetap bisa dibuka/ditanyakan. |
| F-06 | Pencarian | Must | Input pencarian mencocokkan **nama** dan **deskripsi** (case-insensitive, spasi di awal/akhir diabaikan). Hasil diperbarui saat mengetik (tanpa tombol submit). |
| F-07 | Filter kategori | Must | Tombol/chip: **Semua**, **Makanan Lokal**, **Vegan / Plant-Based**, **Minuman & Koktail**, **Kamar**. Hanya satu filter aktif. Menampilkan jumlah hasil per filter (opsional, disarankan). |
| F-08 | Sorting | Must | Pilihan: **Unggulan dulu (default)**, **Nama A–Z**, **Harga termurah**, **Harga termahal**, **Stok terbanyak**. Diterapkan setelah pencarian + filter. |
| F-09 | CTA Reservasi Meja via WhatsApp | Must | Tombol membuka `https://wa.me/<nomor>?text=<pesan>` di tab baru. Pesan berisi template reservasi (jumlah orang, tanggal, jam) yang bisa diedit di WhatsApp. Nomor contoh fiktif. |
| F-10 | CTA Tanya Kamar via WhatsApp | Must | Tombol pada kartu kategori Kamar dan/atau seksi info kamar; pesan otomatis menyebut nama kamar yang dipilih. |
| F-11 | Tanpa keranjang / pesan-antar | Must | Tidak ada tombol "Tambah ke keranjang", checkout, ongkir, atau pembayaran. CTA hanya mengarah ke WhatsApp. |
| F-12 | Ringkasan live music | Must | Seksi statis: jadwal live music mingguan contoh (hari, jam WITA, jenis pertunjukan) + catatan "jadwal dapat berubah". |
| F-13 | Ringkasan fasilitas dive & ferry hub | Must | Seksi statis: info dive center/snorkeling, jarak ke pelabuhan ferry Padangbai, tujuan ferry (Gili/Lombok), layanan pendukung (laundry, antar-jemput). |
| F-14 | Ringkasan total item & ketersediaan | Must | Panel ringkasan **dihitung dari data aktif**: total item, jumlah tersedia (`stok > 0`), jumlah habis (`stok = 0`), jumlah unggulan. Ikut berubah setelah edit pengelola. |
| F-15 | Pencarian/filter tanpa hasil | Must | Empty state dengan pesan jelas + tombol "Reset pencarian & filter". |
| F-16 | Mode Pengelola (satu perangkat) | Must | Panel yang bisa dibuka/ditutup. Berisi daftar item dengan input **stok** dan **harga**, toggle **unggulan**, tombol **Simpan** per baris, dan tombol **Reset ke data awal** (dengan konfirmasi). Tanpa login. |
| F-17 | Validasi input pengelola | Must | Stok: bilangan bulat `0–999`. Harga: bilangan bulat `0–100.000.000`. Input tidak valid → pesan error di dekat field, data **tidak** tersimpan. |
| F-18 | Persistensi localStorage | Must | Perubahan pengelola tersimpan di `localStorage` dan tetap ada setelah reload. Data awal (seed) dipakai saat storage kosong/rusak. Versi skema disimpan. |
| F-19 | Reset data | Must | Mengembalikan seluruh item ke seed, menghapus state pencarian/filter/sort, dan menampilkan konfirmasi. |
| F-20 | Indikator penyimpanan | Should | Status kecil: "Tersimpan otomatis" / "Tersimpan di perangkat ini · <jam>" agar pengelola yakin. |
| F-21 | Mode gelap otomatis | Could | Mengikuti `prefers-color-scheme`. Tidak menghalangi MVP. |
| F-22 | Peta/lokasi | Could | Tautan ke Google Maps (hanya tautan keluar, tanpa embed/API key). Tidak menghalangi MVP. |
| F-23 | Cetak menu | Could | Stylesheet cetak sederhana. Ditunda jika waktu habis. |

**Catatan penting:** F-01–F-19 adalah batas MVP. Fitur **Should/Could** hanya dikerjakan jika seluruh AC Must sudah lulus.

---

## 4. Data Model

### 4.1 Entitas tunggal: `MenuItem`

Satu entitas dipakai untuk menu **dan** info kamar agar UI, pencarian, filter, stok, dan localStorage konsisten.

| Field | Tipe | Wajib | Aturan validasi | Contoh |
| --- | --- | --- | --- | --- |
| `id` | string | Ya | Unik, slug huruf kecil `a-z0-9-`, 3–48 karakter, tidak berubah setelah dibuat | `"nasi-campur-bali"` |
| `nama` | string | Ya | 3–60 karakter, tanpa spasi berlebih di ujung | `"Nasi Campur Bali"` |
| `kategori` | string (enum) | Ya | Salah satu: `"Makanan Lokal"`, `"Vegan / Plant-Based"`, `"Minuman & Koktail"`, `"Kamar"` | `"Makanan Lokal"` |
| `harga` | number (integer) | Ya | `>= 0`, `<= 100000000`; Rupiah tanpa desimal | `45000` |
| `stok` | number (integer) | Ya | `>= 0`, `<= 999`; untuk Kamar = jumlah kamar tersedia | `12` |
| `deskripsi` | string | Ya | 10–240 karakter; bahan/isi singkat, tanpa klaim kesehatan | `"Nasi putih, ayam betutu, sate lilit, lawar, sambal matah."` |
| `imageUrl` | string | Ya | Path lokal diawali `/images/`, ekstensi `.webp/.jpg/.png/.svg`; boleh kosong `""` → placeholder | `"/images/nasi-campur-bali.webp"` |
| `unggulan` | boolean | Ya | `true` / `false` | `true` |

**Aturan turunan (tidak disimpan sebagai field):**

- `statusKetersediaan`: `stok === 0` → `"Habis"`; `1 <= stok <= 3` → `"Terbatas"`; `stok > 3` → `"Tersedia"`.
- `hargaTampil`: `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` → `"Rp 45.000"`.
- Urutan default: `unggulan` desc, lalu `nama` asc (locale `id`).

### 4.2 Bentuk data persistensi (localStorage)

- **Key:** `topiinn.menu.v1`
- **Isi:** objek `{ version: 1, updatedAt: "<ISO-8601>", items: MenuItem[] }`
- **Jumlah item:** selalu 8 (MVP tidak menambah/menghapus item; hanya mengubah `stok`, `harga`, `unggulan`).
- **Bukan bagian dari storage:** kata kunci pencarian, filter, sorting, status panel pengelola. State UI kembali ke default setelah reload.
- **Penanganan storage:**
  - Key tidak ada → muat seed, tulis ke storage.
  - JSON rusak / `version` tidak dikenal / `items` bukan array 8 item valid → abaikan isi, muat seed, tampilkan banner netral "Data lokal tidak terbaca, data contoh dimuat ulang."
  - `localStorage` tidak tersedia (mode privat/kebijakan browser) → aplikasi tetap berjalan in-memory, tampilkan banner "Perubahan hanya berlaku selama halaman terbuka."
- **Privasi:** tidak ada data pribadi, token, API key, atau nomor telepon pengunjung yang disimpan.

### 4.3 Data seed (8 item contoh, fiktif)

| # | id | Nama | Kategori | Harga | Stok | Unggulan | imageUrl |
| --- | --- | --- | --- | ---: | ---: | :---: | --- |
| 1 | `nasi-campur-bali` | Nasi Campur Bali | Makanan Lokal | 45000 | 12 | Ya | `/images/nasi-campur-bali.webp` |
| 2 | `mie-goreng-seafood` | Mie Goreng Seafood | Makanan Lokal | 40000 | 9 | Tidak | `/images/mie-goreng-seafood.webp` |
| 3 | `sate-lilit-tempe` | Sate Lilit Tempe | Vegan / Plant-Based | 35000 | 10 | Ya | `/images/sate-lilit-tempe.webp` |
| 4 | `gado-gado-bali` | Gado-Gado Bali | Vegan / Plant-Based | 32000 | 0 | Tidak | `/images/gado-gado-bali.webp` |
| 5 | `es-kelapa-muda` | Es Kelapa Muda | Minuman & Koktail | 25000 | 20 | Tidak | `/images/es-kelapa-muda.webp` |
| 6 | `arak-madu-sunset` | Arak Madu Sunset | Minuman & Koktail | 55000 | 2 | Ya | `/images/arak-madu-sunset.webp` |
| 7 | `kamar-fan-double` | Kamar Fan Double | Kamar | 250000 | 4 | Tidak | `/images/kamar-fan-double.webp` |
| 8 | `kamar-ac-twin` | Kamar AC Twin + Sarapan | Kamar | 450000 | 1 | Tidak | `/images/kamar-ac-twin.webp` |

**Deskripsi seed (ringkas):**

1. "Nasi putih, ayam betutu, sate lilit, lawar, dan sambal matah."
2. "Mie goreng dengan udang, cumi, dan sayur segar."
3. "Sate lilit berbahan tempe dan kelapa, tanpa bahan hewani."
4. "Sayur rebus, tahu, tempe, dan saus kacang, tanpa bahan hewani."
5. "Kelapa muda utuh, disajikan dingin dengan jeruk nipis."
6. "Arak Bali, madu, dan jeruk nipis. Untuk tamu 21+."
7. "Kamar double dengan kipas angin, kamar mandi dalam, dan teras bersama."
8. "Kamar twin ber-AC, sarapan dua orang, air panas, dan WiFi."

**Catatan kategori Kamar:** `stok` = jumlah kamar tersedia, `harga` = tarif per malam. Kartu kamar menampilkan satuan "/malam" agar tidak ambigu. Tombol pada kartu kamar adalah **"Tanya Kamar"**, bukan "Reservasi Meja".

### 4.4 Konten statis pendukung (bukan bagian dari `MenuItem`)

Disimpan sebagai konstanta di kode (bukan localStorage):

- **Profil:** nama, tagline ("Restoran tepi pantai & penginapan di Padangbai"), jam buka (contoh: 07.00–22.00 WITA), alamat contoh (nonpribadi, tanpa nomor rumah nyata).
- **Live music:** contoh "Jumat & Sabtu, 19.00–21.30 WITA — akustik lokal"; "Minggu, 18.30–20.30 WITA — DJ sunset set". Disertai "Jadwal contoh, dapat berubah."
- **Dive & ferry hub:** "Dive center mitra: 5 menit jalan kaki", "Pelabuhan Padangbai: 300 m", "Ferry cepat ke Gili Trawangan & Lombok", "Antar-jemput bagasi dan laundry tersedia".
- **WhatsApp:** nomor contoh `6281200000000` (fiktif), dipusatkan di satu konstanta agar mudah diganti. Template pesan di-encode dengan `encodeURIComponent`.

---

## 5. Kebutuhan Non-Fungsional

### 5.1 Performa

- Waktu muat lokal (Lighthouse/DevTools, localhost) **< 2 detik** untuk First Contentful Paint pada perangkat kelas menengah.
- Ukuran aset JavaScript hasil build **< 150 KB** (gzip) dan CSS **< 40 KB** (gzip) — realistis untuk vanilla tanpa framework.
- Tidak ada request jaringan ke domain pihak ketiga saat halaman dimuat (font sistem, gambar lokal). Satu-satunya navigasi keluar adalah tautan WhatsApp.
- Interaksi pencarian/filter/sort terasa instan pada 8 item (tanpa debounce wajib; render < 50 ms).

### 5.2 Aksesibilitas

- Kontras teks minimal WCAG 2.1 AA (4.5:1 teks normal, 3:1 teks besar).
- Seluruh kontrol dapat dioperasikan dengan keyboard (Tab, Enter, Space, Escape untuk menutup panel).
- Setiap gambar memiliki `alt` bermakna; gambar dekoratif `alt=""`.
- Status ketersediaan tidak disampaikan hanya lewat warna (selalu ada teks).
- Input memiliki `<label>` terhubung; error validasi dikaitkan via `aria-describedby`.
- Jumlah hasil pencarian diumumkan melalui `aria-live="polite"`.
- Fokus terlihat jelas; urutan fokus logis; target sentuh minimal 44×44 px.

### 5.3 Responsif & kompatibilitas

- Layout berfungsi pada lebar **360 px–1440 px** tanpa scroll horizontal.
- Grid: 1 kolom (< 640 px), 2 kolom (640–1023 px), 3–4 kolom (≥ 1024 px).
- Browser: 2 versi terakhir Chrome, Edge, Firefox, Safari (desktop & Android/iOS).

### 5.4 Keamanan & privasi

- **Tidak ada** API key, token, secret, atau kredensial di repo, kode, maupun localStorage.
- Semua teks dari data ditulis dengan `textContent` / `createElement`; **tidak** memakai `innerHTML` untuk data yang dapat diedit.
- URL gambar hanya path lokal; validasi menolak `javascript:`, `data:`, dan URL eksternal.
- `imageUrl`/teks tidak pernah dievaluasi sebagai HTML.
- Tidak ada formulir yang mengirim data ke server; tidak ada cookie pelacak, analytics, atau third-party script.
- Panel pengelola adalah kontrol UI, **bukan** mekanisme keamanan; dokumen dan UI menyatakan batasan ini.

### 5.5 Kualitas & pemeliharaan

- Struktur modular: `src/data.js` (seed + konstanta), `src/store.js` (baca/tulis/validasi localStorage), `src/render.js` (render kartu & ringkasan), `src/filters.js` (search/filter/sort murni), `src/whatsapp.js` (penyusun deep link), `src/main.js` (wiring event). Nama file boleh disesuaikan selama pemisahan tanggung jawab dipertahankan.
- Fungsi filter/sort/format bersifat murni dan mudah diuji manual di Console.
- Tidak ada `console.log` sisa di build final (kecuali peringatan error yang disengaja).
- Komentar kode secukupnya, berbahasa Indonesia atau Inggris konsisten.
- README memuat cara menjalankan, cara mengganti nomor WhatsApp, dan daftar AC yang sudah diuji.

### 5.6 Konten & etika

- Data contoh **fiktif**, tidak memuat nama orang, nomor telepon pribadi, alamat rumah, atau ulasan palsu yang menyebut individu.
- Klaim menu vegan harus konsisten dengan deskripsi (tidak memuat bahan hewani).
- Minuman beralkohol diberi label "21+" dan tidak ditonjolkan sebagai target anak-anak.
- Tidak ada klaim medis/kesehatan pada deskripsi.

---

## 6. Risiko & Mitigasi

| # | Risiko | Dampak | Kemungkinan | Mitigasi |
| --- | --- | --- | --- | --- |
| R-01 | Scope creep (keranjang, login, dashboard) | Tinggi | Tinggi | Non-goals ditulis eksplisit; fitur baru hanya boleh setelah seluruh AC Must lulus; timebox per iterasi. |
| R-02 | `localStorage` hilang saat mode privat / ganti browser | Sedang | Sedang | Deteksi kegagalan tulis; fallback in-memory + banner; dokumentasikan bahwa data per-browser/per-perangkat. |
| R-03 | Data lokal rusak (JSON invalid, versi lama) | Sedang | Rendah | Validasi skema saat muat; fallback ke seed; tombol reset. |
| R-04 | Nomor WhatsApp contoh tidak sengaja dipakai nyata | Sedang | Rendah | Nomor fiktif `6281200000000`; konstanta tunggal + peringatan di README; tidak ada nomor pribadi. |
| R-05 | Pengelola mengira panel adalah login aman | Sedang | Sedang | Label "tanpa login, hanya untuk latihan"; banner di panel; catatan di README. |
| R-06 | Input harga/stok tidak valid merusak tampilan | Sedang | Sedang | Validasi integer + batas; tolak simpan; pertahankan nilai lama; pesan error spesifik. |
| R-07 | Format Rupiah salah (desimal, pemisah) | Rendah | Sedang | Gunakan `Intl.NumberFormat('id-ID')`; uji 0, 25000, 450000, 100000000. |
| R-08 | Gambar placeholder hilang / lambat | Rendah | Sedang | Aset lokal + fallback `onerror` ke SVG placeholder; `width`/`height` eksplisit untuk mencegah layout shift. |
| R-09 | Aksesibilitas terlewat karena waktu | Sedang | Sedang | Checklist a11y dijalankan di iterasi 5, bukan di akhir; uji keyboard + zoom 200%. |
| R-10 | Dua peran di satu perangkat membingungkan | Rendah | Sedang | Pemisahan visual jelas; tombol "Lihat sebagai Tamu" menutup panel; state pencarian direset saat keluar. |
| R-11 | Data berubah saat demo tanpa disadari | Rendah | Sedang | Indikator "Tersimpan"; tombol reset dengan konfirmasi; seed selalu dapat dipulihkan. |
| R-12 | Waktu 1 hari tidak cukup | Tinggi | Sedang | Prioritaskan F-01–F-19; fitur Could dipotong; buffer 45 menit di akhir. |

---

## 7. Out of Scope

Hal berikut **tidak** akan dikerjakan pada versi ini:

1. Keranjang belanja, checkout, kuantitas pesanan, ongkir, pesan-antar, dan riwayat pesanan.
2. Pembayaran online (kartu, QRIS, e-wallet) dan integrasi payment gateway.
3. Backend, API, database server, serverless function, atau sinkronisasi antarperangkat.
4. Login, registrasi, reset sandi, OAuth, peran pengguna di server, dan **login palsu**.
5. Dashboard admin terpisah, multi-cabang, manajemen meja, atau kalender reservasi.
6. CRUD penuh (tambah/hapus item) — MVP hanya mengubah `stok`, `harga`, `unggulan` pada 8 item tetap.
7. Upload foto dari perangkat; gambar hanya aset lokal yang disiapkan pengembang.
8. Pemrosesan pesan WhatsApp otomatis, WhatsApp Business API, atau chatbot.
9. Reservasi real-time, konfirmasi otomatis, dan ketersediaan kamar berbasis tanggal.
10. Multi-bahasa (hanya Bahasa Indonesia), mata uang selain IDR.
11. Analytics, iklan, cookie pelacak, newsletter, atau formulir kontak server-side.
12. PWA/offline penuh, push notification, dan aplikasi mobile native.
13. Ulasan pengguna, rating, dan komentar.
14. Hosting/deployment produksi dan domain kustom (cukup build + preview lokal).

---

## 8. Arsitektur & Struktur Berkas (rencana)

```
topi-inn/  (root repo)
├─ index.html
├─ package.json
├─ vite.config.js
├─ README.md
├─ SPEC.md
├─ public/
│  └─ images/
│     ├─ nasi-campur-bali.webp
│     ├─ mie-goreng-seafood.webp
│     ├─ sate-lilit-tempe.webp
│     ├─ gado-gado-bali.webp
│     ├─ es-kelapa-muda.webp
│     ├─ arak-madu-sunset.webp
│     ├─ kamar-fan-double.webp
│     ├─ kamar-ac-twin.webp
│     └─ placeholder.svg
└─ src/
   ├─ main.js
   ├─ data.js
   ├─ store.js
   ├─ filters.js
   ├─ whatsapp.js
   ├─ render.js
   └─ styles.css
```

**Alur data satu arah:**

`seed / localStorage` → `state.items` → `filters (search, kategori, sort)` → `render kartu + ringkasan` → aksi pengelola → `validasi` → `store.save()` → `state.items` → render ulang.

**State UI (in-memory):** `{ query, kategori, sort, panelPengelolaTerbuka }`. Tidak dipersistensi.

**Wireframe ringkas (urutan seksi):**

1. Header sticky: logo/nama + navigasi anchor (Menu, Kamar, Info, Kontak) + tombol "Mode Pengelola".
2. Hero: tagline, lokasi, jam buka, CTA "Reservasi Meja", CTA sekunder "Lihat Menu".
3. Ringkasan: 4 kartu angka (Total Item, Tersedia, Habis, Unggulan).
4. Panel pengelola (collapsible, tersembunyi secara default).
5. Toolbar: input pencarian, chip kategori, dropdown sorting, teks "Menampilkan X dari 8 item".
6. Grid kartu menu/layanan.
7. Seksi Live Music.
8. Seksi Dive & Ferry Hub + info kamar.
9. Footer: kontak WhatsApp, alamat contoh, catatan "Data contoh untuk latihan".

---

## 9. Acceptance Criteria (dapat diperiksa manual)

Prasyarat: `npm install && npm run dev` (atau `npm run build && npm run preview`). Buka di browser, Console bersih, lalu ikuti langkah di bawah. Setiap AC harus lulus sebelum dianggap selesai.

| ID | Skenario | Langkah pemeriksaan | Hasil yang diharapkan |
| --- | --- | --- | --- |
| AC-01 | Halaman memuat | Buka halaman utama. | Nama "Topi Inn & Restaurant", tagline, lokasi Padangbai, dan jam buka terlihat. Tidak ada error di Console. |
| AC-02 | Delapan item tampil | Hitung kartu di grid awal. | Tepat **8 kartu**, mencakup 4 kategori; setiap kartu punya gambar/placeholder, nama, kategori, harga, stok/status, deskripsi. |
| AC-03 | Tiga item unggulan | Periksa badge "Unggulan". | Tepat **3 kartu** berbadge Unggulan (`nasi-campur-bali`, `sate-lilit-tempe`, `arak-madu-sunset`) dan tampil lebih dulu pada sort default. |
| AC-04 | Format Rupiah | Baca harga tiap kartu. | Format `Rp 45.000`, `Rp 250.000`, dst.; tanpa desimal, titik ribuan benar. Harga `0` (jika diuji) tampil `Rp 0`. |
| AC-05 | Status stok | Amati `arak-madu-sunset` (stok 2), `gado-gado-bali` (stok 0), `nasi-campur-bali` (stok 12). | Berturut-turut **Terbatas**, **Habis**, **Tersedia**; teks status terbaca, bukan hanya warna. |
| AC-06 | Pencarian nama | Ketik `nasi` di kolom pencarian. | Hanya item yang namanya mengandung "nasi" yang tampil; penghitung hasil ikut berubah. |
| AC-07 | Pencarian deskripsi | Ketik `kelapa`. | Minimal `Es Kelapa Muda` tampil (cocok lewat nama/deskripsi). |
| AC-08 | Pencarian case-insensitive | Ketik `NASI` lalu `nasi`. | Jumlah dan isi hasil sama. |
| AC-09 | Filter kategori | Klik chip "Kamar". | Hanya 2 item kategori Kamar tampil; chip aktif terlihat jelas. Klik "Semua" mengembalikan 8 item. |
| AC-10 | Filter + pencarian gabungan | Pilih "Makanan Lokal", ketik `mie`. | Hanya `Mie Goreng Seafood` tampil (1 item). |
| AC-11 | Sorting harga | Pilih "Harga termurah", lalu "Harga termahal". | Urutan naik lalu turun berdasarkan `harga`; angka benar (25.000 → 450.000, dan sebaliknya). |
| AC-12 | Sorting nama | Pilih "Nama A–Z". | Nama terurut abjad Indonesia (mis. "Arak" sebelum "Es"). |
| AC-13 | Sorting stok | Pilih "Stok terbanyak". | Item stok 20 di atas, item stok 0 di bawah. |
| AC-14 | Empty state | Ketik `zzz` pada pencarian. | Muncul pesan "tidak ada hasil" + tombol "Reset pencarian & filter"; grid kosong, bukan halaman rusak. |
| AC-15 | Reset filter | Klik tombol pada empty state. | Pencarian kosong, kategori "Semua", sort default, 8 kartu tampil kembali. |
| AC-16 | Ringkasan awal | Baca panel ringkasan sebelum edit. | Total **8**, Tersedia **7** (`stok > 0`), Habis **1** (`gado-gado-bali`), Unggulan **3**. |
| AC-17 | CTA reservasi | Klik "Reservasi Meja". | Tab baru membuka `wa.me` dengan nomor contoh dan teks template reservasi terisi; tidak ada error dan tidak ada data terkirim otomatis. |
| AC-18 | CTA tanya kamar | Klik "Tanya Kamar" pada `Kamar AC Twin + Sarapan`. | Pesan WhatsApp menyebut nama kamar tersebut dan menanyakan ketersediaan/tarif. |
| AC-19 | Tanpa keranjang | Pindai seluruh halaman. | Tidak ada tombol keranjang, checkout, ongkir, atau pembayaran; tidak ada tautan login. |
| AC-20 | Buka panel pengelola | Klik "Mode Pengelola". | Panel terbuka tanpa meminta kredensial; label "tanpa login, hanya untuk latihan" terlihat; fokus keyboard masuk ke panel. |
| AC-21 | Ubah stok | Ubah stok `nasi-campur-bali` dari 12 menjadi 2, klik Simpan. | Kartu berubah ke **Terbatas**; ringkasan Tersedia tetap 7, tetapi status berubah; pesan "tersimpan" muncul. |
| AC-22 | Stok habis | Ubah stok `nasi-campur-bali` menjadi 0, simpan. | Kartu berubah **Habis**; ringkasan Habis menjadi 2, Tersedia menjadi 6. |
| AC-23 | Ubah harga | Ubah harga `es-kelapa-muda` menjadi 30000, simpan. | Kartu menampilkan `Rp 30.000`; setelah sorting harga termurah, posisinya berubah sesuai nilai baru. |
| AC-24 | Toggle unggulan | Matikan unggulan `sate-lilit-tempe`, simpan. | Badge hilang; ringkasan Unggulan menjadi 2; saat sort default item tersebut tidak lagi diprioritaskan. |
| AC-25 | Validasi stok negatif | Isi stok `-1`, klik Simpan. | Muncul pesan error; data tidak berubah; nilai lama tetap di kartu. |
| AC-26 | Validasi stok desimal | Isi stok `2.5`, klik Simpan. | Ditolak dengan pesan "harus bilangan bulat"; tidak ada perubahan. |
| AC-27 | Validasi harga | Isi harga `-100` atau `abc`, klik Simpan. | Ditolak; pesan error spesifik; tidak ada perubahan. |
| AC-28 | Persistensi reload | Setelah AC-23, reload halaman (F5). | Harga `Rp 30.000` dan perubahan stok tetap ada; pencarian/filter/sort kembali default. |
| AC-29 | Persistensi antar-tab | Buka halaman di tab kedua (origin sama). | Data hasil edit tampil; jika tab pertama mengubah lagi, reload tab kedua menampilkan nilai terbaru. |
| AC-30 | Reset data | Klik "Reset ke data awal" → konfirmasi. | Kembali ke 8 item seed: stok 12/9/10/0/20/2/4/1, harga seed, 3 unggulan; storage diperbarui; pesan konfirmasi tampil. |
| AC-31 | Batal reset | Klik Reset lalu Batalkan pada dialog. | Tidak ada perubahan data. |
| AC-32 | Data lokal rusak | Di DevTools, set `localStorage["topiinn.menu.v1"] = "{rusak"`, reload. | Aplikasi tetap tampil dengan 8 item seed dan banner "data lokal tidak terbaca"; tidak ada crash. |
| AC-33 | Storage tidak tersedia | Blokir localStorage (mode privat/kebijakan) lalu muat halaman. | Halaman tetap berfungsi; banner "perubahan hanya berlaku selama halaman terbuka"; edit bekerja in-memory. |
| AC-34 | Gambar gagal dimuat | Di DevTools, ubah `src` salah satu gambar menjadi path tidak ada, reload. | Placeholder lokal tampil; tata letak kartu tidak rusak; teks alt tetap ada. |
| AC-35 | Live music | Gulir ke seksi Live Music. | Menampilkan minimal 2 jadwal dengan hari + jam WITA dan catatan "jadwal dapat berubah". |
| AC-36 | Dive & ferry hub | Gulir ke seksi fasilitas. | Menyebut dive center, snorkeling, pelabuhan ferry, tujuan Gili/Lombok, dan layanan pendukung. |
| AC-37 | Responsif mobile | Atur lebar 360 px. | Satu kolom, tidak ada scroll horizontal, semua tombol dapat ditekan, teks tidak terpotong. |
| AC-38 | Keyboard & fokus | Navigasi seluruh kontrol dengan Tab/Enter/Space; tutup panel dengan Escape. | Semua kontrol dapat dioperasikan; fokus terlihat; panel menutup dan fokus kembali ke tombol pemicu. |
| AC-39 | Aksesibilitas dasar | Periksa alt gambar, label input, dan kontras. | Semua gambar punya alt; input punya label; kontras teks utama ≥ 4.5:1; status punya teks. |
| AC-40 | Build produksi | Jalankan `npm run build` lalu `npm run preview`. | Build sukses tanpa error; aplikasi berfungsi sama pada preview; Console bersih. |
| AC-41 | Tanpa rahasia | Cari di repo: `api_key`, `apikey`, `token`, `secret`, `password`, `wa.me/62` (cek nomor). | Tidak ada rahasia/kredensial; hanya nomor WhatsApp fiktif yang terdokumentasi. |
| AC-42 | Tanpa request eksternal | Buka tab Network, muat ulang. | Tidak ada request ke domain pihak ketiga; hanya aset lokal (kecuali navigasi sukarela ke WhatsApp). |

**Definisi Lulus:** seluruh AC-01…AC-42 berstatus LULUS pada satu sesi pemeriksaan, dicatat di README (kolom: ID, status, catatan). AC yang gagal harus diperbaiki atau secara eksplisit diturunkan scope-nya bersama pemilik produk.

---

## 10. Rencana Implementasi per Iterasi (1 Hari)

Asumsi: 1 pengembang, ± 7,5 jam efektif termasuk buffer. Setiap iterasi berakhir dengan aplikasi yang **dapat dijalankan**, bukan setengah jadi.

### Iterasi 0 — Persiapan & fondasi (00:00–00:45)

- Scaffold Vite + vanilla JS; bersihkan boilerplate.
- Buat struktur folder sesuai Bagian 8; siapkan 8 gambar placeholder lokal (boleh SVG/WebP sederhana) + `placeholder.svg`.
- Tulis `data.js` berisi seed 8 item + konstanta profil/jadwal/WhatsApp.
- README awal: cara install, jalankan, dan struktur.
- **DoD:** `npm run dev` menampilkan halaman kosong tanpa error; seed dapat diimpor dan dicetak ke Console (sementara).

### Iterasi 1 — Kerangka UI, profil, render kartu (00:45–02:00)

- Header, hero, ringkasan, grid kartu, footer dengan layout responsif dasar.
- Render 8 kartu dari seed: gambar + fallback, nama, kategori, harga terformat, status, deskripsi, badge unggulan.
- Implementasi `formatRupiah`, `statusKetersediaan`, `hitungRingkasan` sebagai fungsi murni.
- **DoD:** AC-01 s.d. AC-05, AC-16, AC-37 (dasar) lulus.

### Iterasi 2 — Pencarian, filter, sorting (02:00–03:15)

- Toolbar: input pencarian, chip kategori, dropdown sorting, penghitung hasil.
- Logika filter murni: search nama+deskripsi, kategori, urutan default/ nama/ harga/ stok.
- Empty state + tombol reset; `aria-live` untuk jumlah hasil.
- **DoD:** AC-06 s.d. AC-15 lulus; render < 50 ms.

### Iterasi 3 — WhatsApp & konten informasi (03:15–04:15)

- Helper `buatTautanWhatsApp(jenis, item?)` dengan template ter-encode.
- CTA hero "Reservasi Meja"; CTA "Tanya Kamar" pada kartu kategori Kamar (dan tombol generik pada seksi kamar).
- Seksi Live Music dan Dive & Ferry Hub; satuan "/malam" pada harga kamar.
- **DoD:** AC-17 s.d. AC-19, AC-35, AC-36 lulus.

### Iterasi 4 — Mode pengelola + localStorage (04:15–05:30)

- Panel collapsible dengan daftar 8 item: input stok, input harga, toggle unggulan, simpan, reset.
- Validasi integer & batas; pesan error per field; pertahankan nilai lama saat gagal.
- `store.js`: muat/validasi/tulis `topiinn.menu.v1`, fallback seed, deteksi storage tidak tersedia.
- Ringkasan dan kartu ikut diperbarui setelah simpan; indikator "tersimpan".
- Konfirmasi reset (dialog bawaan atau dialog kustom yang dapat diakses keyboard).
- **DoD:** AC-20 s.d. AC-34 lulus; tidak ada `innerHTML` untuk data editabel.

### Iterasi 5 — Aksesibilitas, responsif, polish (05:30–06:15)

- Audit keyboard, fokus, label, `aria-live`, kontras, target sentuh, zoom 200%.
- Rapikan breakpoint 360/640/1024/1440 px; cek tidak ada scroll horizontal.
- Perbaikan visual: hierarki tipografi, spacing, state hover/active/disabled, gambar `width`/`height`.
- Opsional bila waktu cukup: mode gelap otomatis (F-21).
- **DoD:** AC-37 s.d. AC-39 lulus; tidak ada pelanggaran kontras pada teks utama.

### Iterasi 6 — QA menyeluruh & build (06:15–07:00)

- Jalankan seluruh AC-01…AC-42, catat hasil di README.
- `npm run build` + `npm run preview`; uji ulang alur utama pada hasil build.
- Perbaiki bug; hapus `console.log`; cek tidak ada rahasia dan tidak ada request eksternal.
- Uji skenario data rusak dan storage diblokir.
- **DoD:** semua AC Must lulus; daftar bug tersisa (jika ada) terdokumentasi dan tidak berada di jalur Must.

### Iterasi 7 — Dokumentasi & demo (07:00–07:30)

- Lengkapi README: tujuan, cara jalan, cara ganti nomor WhatsApp, catatan data fiktif, tabel hasil AC.
- Siapkan skrip demo 3 menit: buka halaman → cari "kamar" → filter → ubah stok → reload → reset → klik WhatsApp.
- Tangkap 2–3 tangkapan layar (desktop + mobile).
- **DoD:** orang lain dapat menjalankan proyek dari README tanpa bertanya; demo berjalan < 3 menit.

### Buffer & aturan pemotongan

- **Buffer 30–45 menit** disisihkan; jika Iterasi 4 melewati 05:45, hentikan fitur tambahan dan langsung ke Iterasi 6.
- Urutan pemotongan jika waktu kurang: F-23 → F-22 → F-21 → F-20 → animasi/estetika → jumlah opsi sorting (minimal: default, harga termurah, nama A–Z).
- Yang **tidak boleh** dipotong: F-01–F-19, validasi, fallback storage, dan AC Must terkait.

---

## 11. Pertanyaan Terbuka (perlu keputusan sebelum coding)

1. Nomor WhatsApp final: tetap memakai contoh fiktif `6281200000000`, atau nomor bisnis yang disediakan pemilik? (Jangan gunakan nomor pribadi.)
2. Apakah harga kamar ditampilkan per malam termasuk sarapan untuk semua tipe, atau hanya tipe tertentu?
3. Apakah "Terbatas" (stok 1–3) dipertahankan, atau cukup biner Tersedia/Habis?
4. Apakah panel pengelola perlu disembunyikan di balik tombol kecil agar tidak terlihat oleh tamu, atau tetap terlihat dengan label jelas?

Keputusan default jika tidak ada jawaban: nomor fiktif, harga per malam, tiga tingkat status, panel terlihat dengan label jelas.

---

**Akhir dokumen — implementasi belum dimulai.**

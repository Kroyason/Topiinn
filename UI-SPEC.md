# UI-SPEC — Topi Inn & Restaurant

**Spesifikasi antarmuka untuk website profil + menu digital restoran tepi pantai & penginapan, Padangbai, Bali**

| Atribut | Nilai |
| --- | --- |
| Versi | 1.0 |
| Status | Siap untuk implementasi setelah SPEC disetujui |
| Dokumen acuan | `SPEC.md` v1.0 (fitur, data model, AC) |
| Tech stack | Vite + JavaScript vanilla + CSS |
| Pendekatan | Mobile-first, tanpa framework UI, tanpa backend |
| Bahasa antarmuka | Bahasa Indonesia |
| Prinsip | Editorial, hangat, kontras tinggi, jujur soal ketersediaan |

> Dokumen ini **tidak mengubah scope** di `SPEC.md`. Jika ada konflik, `SPEC.md` menang.
> Tidak ada kode aplikasi di dokumen ini; hanya token, aturan visual, anatomi komponen, dan wireframe teks.

---

## 1. Ringkasan & Prinsip Desain

### 1.1 Narasi visual: siang ke malam

Halaman mengikuti alur satu hari di Padangbai:

1. **Pagi–sore (krem hangat):** navbar, hero, ringkasan, menu, fasilitas. Terang, berpasir, lapang.
2. **Malam (plum):** seksi Live Music dan footer. Hangat, intim, dengan aksen lime dan oranye.
3. **Mode pengelola:** permukaan terang dan netral agar input mudah dibaca; tidak terasa seperti "admin panel" terpisah.

### 1.2 Prinsip

1. **Mobile-first, bukan mobile-only.** Semua keputusan dimulai dari 360–390 px, lalu diperluas.
2. **Kontras adalah fitur.** Teks selalu memenuhi WCAG AA; lime dan oranye dipakai sebagai isian/aksen, bukan teks di atas krem.
3. **Editorial, bukan dekoratif berlebihan.** Serif untuk judul dan angka editorial; sans-serif untuk teks fungsional dan harga.
4. **Status jujur.** "Habis" dan "Terbatas" terlihat jelas, tetap bisa dibaca, dan tidak hanya dibedakan lewat warna.
5. **Satu aksi utama per konteks.** Reservasi meja (ungu) dan tanya kamar (oranye) tidak bersaing dengan aksi lain.
6. **Tanpa jebakan.** Tidak ada keranjang, checkout, login, atau modal promosi yang menghalangi konten (dashboard pengelola hanya terbuka atas permintaan).

### 1.3 Komposisi warna

| Porsi | Peran | Warna |
| --- | --- | --- |
| ± 60% | Latar dasar, ruang napas | Krem `#FAF8F5` + putih untuk kartu |
| ± 25% | Teks, struktur, malam | Plum `#1D1426` + ungu `#5B2C8E` |
| ± 10% | Aksen brand, CTA sekunder | Oranye `#F36F21` |
| ± 5% | Status tersedia, vegan, highlight | Lime `#78BE20` |

Lime dan oranye **tidak boleh** digunakan sebagai warna teks di atas krem (kontras 2,2:1 dan 2,8:1). Keduanya hanya boleh menjadi latar dengan teks plum, atau teks di atas plum.

---

## 2. Design Tokens

### 2.1 Palet warna

| Token | Hex | Peran | Contoh pemakaian |
| --- | --- | --- | --- |
| `cream` | `#FAF8F5` | Latar dasar halaman | Body, hero, seksi terang |
| `surface` | `#FFFFFF` | Permukaan kartu/input | Kartu menu, input, dialog |
| `surface-alt` | `#F3EEE6` | Permukaan sekunder | Placeholder gambar, baris tabel |
| `plum` | `#1D1426` | Teks utama; latar malam | Judul, body, seksi Live Music, footer |
| `plum-soft` | `#2A1B36` | Permukaan di atas plum | Kartu jadwal live music, dialog di seksi gelap |
| `purple` | `#5B2C8E` | Brand utama, CTA primer, link, fokus | Tombol "Reservasi Meja", judul aksen |
| `purple-dark` | `#47216F` | Hover/pressed CTA primer | Tombol saat hover |
| `purple-tint` | `#F1E9F7` | Latar badge/link lembut | Baris tabel yang berubah, chip aktif lembut |
| `lime` | `#78BE20` | Status tersedia, vegan, aksen | Badge "Tersedia", badge "Vegan", garis aksen |
| `lime-dark` | `#5E9818` | Hover elemen lime | Tombol lime saat hover |
| `orange` | `#F36F21` | CTA sekunder, aksen senja | Tombol "Tanya Kamar", garis aksen, ilustrasi |
| `orange-dark` | `#D95A0F` | Hover CTA sekunder | Tombol oranye saat hover |
| `orange-deep` | `#A84300` | Teks peringatan di latar terang | Pesan error, status "Terbatas" |
| `orange-tint` | `#FDE7D8` | Latar badge peringatan | Badge "Terbatas", catatan jadwal |
| `status-habis` | `#EDE8EF` | Latar badge Habis | Badge "Habis" |
| `text-muted` | `#5C5265` | Teks sekunder | Deskripsi kartu, caption, meta |
| `border` | `#E8DFD3` | Garis dekoratif | Border kartu, divider, input |
| `border-strong` | `#8C7F73` | Batas kontrol (≥ 3:1) | Border input, select, outline tombol |
| `lavender-text` | `#D9C9E8` | Teks sekunder di latar plum | Jam, keterangan jadwal |
| `danger-surface` | `#FBE9E4` | Latar dialog destruktif | Konfirmasi reset (opsional) |

### 2.2 Aturan & rasio kontras (diverifikasi manual)

| Kombinasi | Rasio | Status | Boleh untuk |
| --- | ---: | --- | --- |
| Plum `#1D1426` di Krem `#FAF8F5` | ≈ 16,8:1 | AAA | Semua teks |
| Ungu `#5B2C8E` di Krem | ≈ 9,0:1 | AAA | Semua teks, link |
| Putih di Ungu `#5B2C8E` | ≈ 9,6:1 | AAA | Teks tombol primer |
| Krem di Plum `#1D1426` | ≈ 16,8:1 | AAA | Semua teks di seksi malam |
| Lime `#78BE20` di Plum | ≈ 7,8:1 | AAA | Teks aksen di seksi malam |
| Plum di Lime | ≈ 7,8:1 | AAA | Teks badge "Tersedia"/"Vegan" |
| Oranye `#F36F21` di Plum | ≈ 6,0:1 | AA | Teks aksen di seksi malam |
| Plum di Oranye | ≈ 6,0:1 | AA | Teks tombol "Tanya Kamar" |
| Oranye-deep `#A84300` di Krem | ≈ 5,7:1 | AA | Teks error/peringatan |
| Oranye-deep di Oranye-tint | ≈ 5,1:1 | AA | Badge "Terbatas" |
| Text-muted `#5C5265` di Krem/Putih | ≈ 7,0:1 | AAA | Deskripsi, caption |
| Lavender `#D9C9E8` di Plum | ≈ 11,4:1 | AAA | Meta di seksi malam |
| Oranye di Krem | ≈ 2,8:1 | **Gagal** | **Hanya dekorasi**, bukan teks/ikon fungsional |
| Lime di Krem | ≈ 2,2:1 | **Gagal** | **Hanya dekorasi**, bukan teks/ikon fungsional |
| Putih di Oranye | ≈ 3,0:1 | **Gagal** | Tidak dipakai untuk teks |
| Border `#E8DFD3` di Krem | ≈ 1,2:1 | Dekoratif | Garis pemisah saja; bukan satu-satunya penanda kontrol |
| Border-strong `#8C7F73` di Krem/putih | ≈ 3,7–3,9:1 | AA (non-teks) | Batas input, select, outline kontrol |
| Putih di Oranye-deep `#A84300` | ≈ 6,1:1 | AA | Teks tombol konfirmasi reset |

**Aturan keras:**

- Tidak ada teks lime/oranye di atas krem atau putih.
- Tidak ada teks putih di atas lime/oranye.
- Ikon fungsional mengikuti warna teks di sekitarnya (plum atau krem), bukan warna aksen murni.
- Status selalu disertai teks; warna hanya penguat.
- Fokus memakai ungu di latar terang dan lime di latar plum (keduanya ≥ 3:1 terhadap latar).

### 2.3 Tipografi

**Pasangan font (self-hosted, tanpa CDN):**

| Peran | Font | Lisensi | Fallback |
| --- | --- | --- | --- |
| Judul/editorial | **Fraunces** (variable, optical size) | SIL OFL 1.1 | `Georgia, 'Times New Roman', serif` |
| Teks/UI | **Inter** | SIL OFL 1.1 | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

- Berkas WOFF2 disimpan di `public/fonts/`, disertakan lisensi, subset Latin + Latin Extended.
- Hanya 2 berkas variable font (Fraunces, Inter) agar build tetap ringan; `font-display: swap`.
- Preload hanya Fraunces untuk judul hero.
- Tidak memakai Google Fonts/CDN (memenuhi AC-42: tanpa request eksternal).

**Skala tipe (mobile → desktop):**

| Token | Ukuran/line-height | Desktop | Berat | Pemakaian |
| --- | --- | --- | --- | --- |
| `display` | 40/44 | 64/68 | Fraunces 600 | H1 hero |
| `h1` | 32/38 | 52/58 | Fraunces 600 | Judul seksi utama |
| `h2` | 28/34 | 40/46 | Fraunces 600 | Subjudul seksi |
| `h3` | 20/26 | 24/30 | Inter 600 | Nama item |
| `body-lg` | 18/30 | 20/32 | Inter 400 | Intro hero, paragraf pembuka |
| `body` | 16/26 | 16/26 | Inter 400 | Teks umum |
| `small` | 14/22 | 14/22 | Inter 400/500 | Deskripsi kartu, meta |
| `caption` | 12/18 | 12/18 | Inter 500 | Label, legal, catatan |
| `eyebrow` | 12/16 | 12/16 | Inter 600, uppercase, tracking 0.12em | Label seksi |
| `price` | 20/24 | 22/28 | Inter 600, tabular | Harga |

**Aturan:**

- Judul memakai sentence case, bukan Title Case paksa atau ALL CAPS (kecuali eyebrow).
- Italic Fraunces hanya untuk 1–3 kata aksen di hero, mis. *malam*.
- Lebar baris teks 60–70 karakter; paragraf maksimal 68ch.
- Angka harga memakai `font-variant-numeric: tabular-nums`.
- Tidak memakai letter-spacing negatif lebih dari `-0.02em`.

### 2.4 Spacing, grid, radius, elevasi

| Kategori | Nilai |
| --- | --- |
| Basis spacing | 4 px |
| Skala | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| Container | `max-width: 1200px`, gutter 20 px (mobile), 32 px (≥768), 48 px (≥1200) |
| Grid | 4 kolom (mobile), 8 (tablet), 12 (desktop), gap 16/24/32 |
| Section padding | 48 px atas-bawah (mobile), 72 px (tablet), 96 px (desktop) |
| Radius | 8 (badge kecil), 12 (input/tombol), 16 (kartu), 24 (media hero), 999 (pill) |
| Border | 1 px `border`; 2 px untuk keadaan aktif/fokus |
| Shadow 1 | `0 1px 2px rgba(29,20,38,.06)` — kartu diam |
| Shadow 2 | `0 12px 32px rgba(29,20,38,.10)` — hover, dialog |
| Shadow malam | `0 16px 48px rgba(0,0,0,.35)` — kartu di seksi plum |
| Motion | 180 ms `ease-out`; hover 120 ms; tidak ada animasi > 300 ms |
| Z-index | nav 100, bottom bar 90, overlay 200, dialog 210, toast 300 |

### 2.5 Ikonografi

- Gaya: garis 1,75 px, ujung membulat, kotak 24×24, optical alignment 20 px.
- Ikon inti: cari, hapus (×), chevron, WhatsApp, daun (vegan), bintang (unggulan), pisau-garpu, gelas, tempat tidur, kapal/ferry, ombak, musik, bulan, sliders, peringatan, centang, tutup.
- Semua ikon berupa SVG lokal (inline atau sprite di `public/icons/`), `aria-hidden="true"` bila berdampingan dengan teks.
- Ikon WhatsApp memakai glyph monokrom sederhana, bukan logo berwarna, agar konsisten dengan warna tombol.
- Tidak memakai emoji sebagai ikon antarmuka (kecuali di konten contoh jika disengaja; hindari).

### 2.6 Fotografi & ilustrasi

| Aset | Rasio | Perlakuan |
| --- | --- | --- |
| Hero | 4:5 (desktop), 4:3 (mobile) | Foto laut/teras; sudut 24 px; tanpa teks di atas foto |
| Kartu menu | 4:3 | `object-fit: cover`; overlay gradien plum 0–35% hanya di bagian bawah untuk badge |
| Kamar | 4:3 | Sama; tone hangat |
| Live music | 16:9 (opsional) | Foto suasana malam dengan overlay plum 70% |
| Placeholder | 4:3 | SVG lokal: latar `surface-alt`, garis ombak, ikon kategori |

- Semua gambar lokal di `public/images/`, format WebP (fallback JPG bila perlu), `width`/`height` eksplisit.
- `loading="lazy"` untuk gambar di bawah fold; hero `fetchpriority="high"`.
- Alt text deskriptif, bukan nama file. Contoh: "Teras restoran beratap jerami menghadap laut Padangbai saat sore."
- Gambar dekoratif (ombak, bintang) memakai `alt=""`.
- Tidak ada foto orang yang dapat diidentifikasi; tidak ada stok foto dengan wajah jelas.

---

## 3. Layout & Perilaku Responsif

### 3.1 Breakpoint

| Nama | Lebar | Perubahan utama |
| --- | --- | --- |
| Mobile S | 320–479 | 1 kolom; grid ringkasan 2×2; nav ringkas; bottom bar |
| Mobile L | 480–639 | 1 kolom; hero lebih lapang; chip tetap scroll |
| Tablet | 640–1023 | 2 kolom kartu; nav desktop mulai 900; hero 2 kolom |
| Desktop | 1024–1279 | 3 kolom kartu; toolbar 1 baris; container 1200 |
| Desktop L | 1280–1440+ | 3 kolom lebih lebar; hero 64/68; maksimum konten 1200 |

### 3.2 Aturan mobile-first

- Layout dasar ditulis untuk 360 px; media query hanya menambah, tidak menimpa struktur secara besar.
- Target minimum sentuh 44×44 px dengan jarak antar-target minimal 8 px.
- Tidak ada scroll horizontal pada 320–1440 px.
- Bottom action bar hanya di < 900 px; tinggi 64 px + `safe-area-inset-bottom`; konten mendapat padding bawah 80 px.
- Tabel dashboard berubah menjadi kartu bertumpuk di < 768 px.
- Teks tidak lebih kecil dari 12 px; body minimal 16 px.

### 3.3 Urutan seksi (DOM = visual)

1. Skip link
2. Header/navbar (sticky)
3. `main`
   - Hero
   - Ringkasan
   - Menu & Layanan
   - Live Music (plum)
   - Dive & Ferry Hub
   - Info kamar singkat (jika tidak tercakup di grid)
4. Footer (plum)
5. Bottom action bar (mobile)
6. Dialog dashboard pengelola (tersembunyi)
7. Toast/status live region

---

## 4. Information Architecture & Navigasi

### 4.1 Label navigasi

| Label | Anchor | Catatan |
| --- | --- | --- |
| Menu | `#menu` | Default fokus setelah "Lihat Menu" |
| Kamar | `#menu` + filter | Mengosongkan pencarian, menerapkan filter **Kamar**, lalu menggulir ke grid; bukan seksi terpisah |
| Info | `#info` | Live music + dive/ferry |
| Kontak | `#kontak` | Footer/WhatsApp |
| Mode Pengelola | — | Membuka dashboard demo; bukan link halaman baru |
| Reservasi Meja | — (deep link WhatsApp) | Di navbar desktop dan hero |

**Keputusan:** "Reservasi Meja" di navbar dan hero langsung membuka WhatsApp (sesuai SPEC F-09). Tidak ada halaman/form reservasi perantara.

### 4.2 Perilaku navbar

- Sticky di atas, tinggi 64 px (mobile) / 72 px (desktop).
- Latar krem 92% + `backdrop-filter: blur(8px)`; border bawah 1 px.
- Logo: kata "Topi Inn" Fraunces 600 ungu + baris kecil "& RESTAURANT" Inter 600 12 px tracking 0.16em plum.
- Link aktif: teks plum + garis bawah ungu 2 px; bukan hanya warna.
- Tombol "Mode Pengelola": ghost, ikon sliders + label di desktop; ikon saja di mobile dengan `aria-label`.
- Tombol "Reservasi Meja": pill ungu, tinggi 44 px, ikon WhatsApp.
- Mobile: hamburger membuka sheet setinggi layar; fokus terkunci; Esc menutup; tautan besar 48 px.
- Navbar tidak boleh menutupi anchor; `scroll-margin-top: 88px` pada setiap seksi.

---

## 5. Komponen

### 5.1 Hero

**Tujuan:** menyampaikan suasana, lokasi, dan aksi utama dalam < 5 detik.

**Anatomi:**

1. Eyebrow: `PADANGBAI · BALI` + titik lime.
2. H1: "Rasa pantai, cerita *malam*." (kata "malam" italic ungu).
3. Subjudul 1–2 baris: "Menu lokal, kopi, koktail, dan kamar sederhana 300 meter dari pelabuhan ferry."
4. CTA: "Reservasi Meja" (primer) + "Lihat Menu" (ghost).
5. Meta: titik lime + "Buka setiap hari · 07.00–22.00 WITA".
6. Media: foto hero, bingkai radius 24 px, lingkaran oranye dekoratif di belakang, strip lime tipis.
7. Dekorasi: garis ombak SVG di bawah, `alt=""`.

**Aturan:**

- Teks tidak diletakkan di atas foto (menghindari masalah kontras).
- Mobile: teks dulu, foto setelahnya.
- Desktop: teks 6 kolom kiri, media 6 kolom kanan; tinggi minimum 560 px.
- Tidak ada carousel/slider. Tidak ada autoplay video.

### 5.2 Ringkasan ketersediaan

Empat kartu statis (bukan CTA):

| Kartu | Nilai | Aksen | Label |
| --- | --- | --- | --- |
| Total item | `8` | ungu | "Total item" |
| Tersedia | `7` | titik lime | "Tersedia" |
| Habis | `1` | titik plum pudar | "Habis" |
| Unggulan | `3` | titik oranye | "Unggulan" |

- Angka 32/40 px Fraunces 600; label caption Inter.
- Kartu putih, border 1 px, radius 16 px, tanpa shadow berlebihan.
- Mobile 2×2; desktop 4 sejajar.
- Angka diperbarui setelah simpan di dashboard; tidak ada animasi angka.
- Kartu bukan tombol; tidak ada hover lift.

### 5.3 Toolbar pencarian, filter, sorting

**Susunan mobile (bertumpuk):**

1. Input pencarian (full width, 48 px).
2. Chip kategori (scroll horizontal, satu baris).
3. Baris "Urutkan" (select) + jumlah hasil.
4. Garis hasil: "Menampilkan **8** dari **8** item".

**Susunan desktop (dua baris):**

- Baris 1: pencarian 360 px + chip kategori (fleksibel) + select sort 220 px.
- Baris 2: jumlah hasil + tombol "Reset" (muncul hanya jika filter/pencarian aktif).

**Input pencarian:**

- Placeholder: "Cari menu, minuman, atau kamar…"
- Ikon cari di kiri; tombol hapus (×) 44 px muncul saat terisi.
- Border 1 px `border-strong`; fokus: ring ungu 3 px + offset 2 px.
- Tidak ada tombol submit; hasil berubah saat mengetik.
- `aria-describedby` menunjuk ke teks jumlah hasil.

**Chip kategori:**

- Urutan: Semua, Makanan Lokal, Vegan / Plant-Based, Minuman & Koktail, Kamar.
- Tidak aktif: putih, border, teks plum, titik warna kategori.
- Aktif: ungu solid, teks putih, ikon centang kecil (jika muat), `aria-pressed="true"`.
- Hover: ungu-tint, border ungu.
- Fokus: ring ungu.
- Di mobile, chip dapat digulir horizontal dengan indikator tepi (gradien krem) dan `scroll-snap`; tidak boleh terpotong tanpa petunjuk.

**Sorting (select native yang dipercantik):**

- Label terlihat: "Urutkan".
- Opsi: "Unggulan dulu", "Nama A–Z", "Harga termurah", "Harga termahal", "Stok terbanyak".
- Default "Unggulan dulu": unggulan lebih dulu, lalu Nama A–Z di dalam setiap kelompok.
- Ikon chevron di kanan; tinggi 48 px; teks plum.

**Jumlah hasil:**

- "Menampilkan 8 dari 8 item" — angka tebal.
- `aria-live="polite"`; saat kosong: "Tidak ada item yang cocok".

### 5.4 Kartu menu/layanan

**Anatomi (atas ke bawah):**

1. Media 4:3, radius atas 16 px.
   - Badge "Unggulan" (kiri atas): ungu solid, teks krem, ikon bintang.
   - Badge "Vegan" (kanan atas, hanya item kategori Vegan): lime solid, teks plum, ikon daun.
2. Konten padding 20 px:
   - Baris meta: chip kategori (titik + label) dan harga di kanan.
   - Harga: `Rp 45.000`; untuk kamar tambahkan "/malam" kecil.
   - Nama: H3 Inter 600, maksimal 2 baris.
   - Deskripsi: small, muted, maksimal 2 baris (line-clamp), lalu ellipsis.
3. Footer kartu:
   - Status badge: Tersedia (lime), Terbatas (oranye-tint + oranye-deep), Habis (abu-plum).
   - Stok: "Stok 12" / "4 kamar" / "Stok 0".
   - Item yang mengandung alkohol menampilkan penanda "21+" pada baris meta atau akhir deskripsi; tidak menambah badge baru.
- Khusus kategori Kamar: tombol "Tanya Kamar" full width, oranye, teks plum, ikon WhatsApp.

**Aturan:**

- Tinggi kartu tidak dipaksa sama; grid memakai `align-items: start`, tetapi baris tetap rapi.
- Kartu Habis: gambar `filter: grayscale(35%)`; **teks tetap kontras penuh**; badge Habis menonjol; kartu **tetap** dapat dibaca dan tombol kamar tetap aktif.
- Hover (desktop): border menjadi `border-strong`; **tanpa** lift/zoom karena kartu bukan tautan. Tombol di dalam kartu memiliki hover sendiri. Hormati `prefers-reduced-motion`.
- Fokus di dalam kartu: ring ungu pada elemen yang difokuskan, bukan seluruh kartu.
- Tanpa tombol keranjang/checkout di mana pun.
- Klik judul/kartu bukan tautan (tidak ada halaman detail); hanya CTA yang interaktif.

**Varian kamar:**

- Nama + harga per malam.
- Meta stok: "4 kamar tersedia".
- Tombol "Tanya Kamar" mengirim pesan yang menyebut nama kamar.
- Badge kategori "Kamar" memakai titik plum.

### 5.5 Badge & status

| Badge | Bentuk | Warna | Ikon | Teks |
| --- | --- | --- | --- | --- |
| Unggulan | Pill di atas foto | Ungu + krem | Bintang | "Unggulan" |
| Vegan | Pill di atas foto | Lime + plum | Daun | "Vegan" |
| Kategori | Pill outline | Putih + border, teks plum | Titik 8 px | Nama kategori |
| Tersedia | Pill | Lime + plum | Titik/centang | "Tersedia" |
| Terbatas | Pill | Oranye-tint + oranye-deep | Segitiga | "Terbatas" |
| Habis | Pill | `#EDE8EF` + muted | Garis miring | "Habis" |

- Semua badge tinggi minimal 24 px, padding 6×10 px, radius 999.
- Tidak ada badge yang hanya berupa warna tanpa teks.
- "Vegan" diturunkan dari kategori `Vegan / Plant-Based`; tidak menambah field data baru.

### 5.6 Empty state

- Kartu dashed border 2 px `border-strong`, radius 16 px, padding 48 px, latar `surface`.
- Ilustrasi garis: mangkuk + ombak (SVG lokal, 96 px).
- Judul: "Belum ada yang cocok."
- Deskripsi: "Coba kata kunci lain atau reset pencarian dan filter."
- Tombol: "Reset pencarian & filter" (ungu).
- Tidak menampilkan kartu palsu atau pesan error teknis.

### 5.7 Seksi Live Music (plum)

**Latar:** plum `#1D1426` full-bleed; opsional gradien radial ungu 12% di kanan atas.

**Anatomi:**

1. Eyebrow: "SETELAH MATAHARI TENGGELAM" + titik lime.
2. H2 krem: "Malam di Padangbai."
3. Paragraf lavender: "Live music akustik, koktail senja, dan angin laut. Datang lebih awal untuk tempat duduk di teras."
4. Daftar jadwal 2 baris:
   - "Jumat & Sabtu" · "19.00–21.30 WITA" · "Akustik lokal"
   - "Minggu" · "18.30–20.30 WITA" · "DJ sunset set"
5. Catatan caption: "Jadwal contoh, dapat berubah. Konfirmasi via WhatsApp."
6. CTA: "Reservasi untuk Live Music" — oranye solid, teks plum, ikon WhatsApp.
7. Dekorasi: bulan sabit garis + bintang kecil (SVG), tanpa animasi berkedip.

**Aturan:**

- Baris jadwal dipisah divider `rgba(250,248,245,.16)`.
- Hari memakai teks lime (kontras 7,8:1) atau pill outline krem; jam memakai krem.
- Semua teks minimal 14 px; jangan memakai abu-abu rendah kontras.
- Tidak ada parallax; tidak ada video background.

### 5.8 Dive & Ferry Hub

**Latar:** krem; transisi dari plum memakai wave divider SVG (krem di atas plum).

**Anatomi:**

- Eyebrow "UNTUK PENYELAM & PELANCONG".
- H2: "Dari teras ke laut, lalu ke pulau."
- Intro 2 baris.
- 3 kartu fasilitas:
  1. **Dive center mitra** — "5 menit jalan kaki" — ikon masker/snorkel.
  2. **Pelabuhan Padangbai** — "300 m dari restoran" — ikon ferry.
  3. **Ferry ke Gili & Lombok** — "Tiket dibantu di resepsionis" — ikon pulau/ombak.
- Baris layanan tambahan: "Laundry · Antar-jemput bagasi · Info snorkeling".
- CTA teks: "Tanya kamar untuk menginap" → menerapkan filter Kamar dan menggulir ke `#menu`, atau membuka WhatsApp.

**Aturan:**

- Ikon dalam lingkaran `purple-tint`, ikon ungu.
- Angka jarak memakai Fraunces 600 28 px (editorial), label sans 14 px.
- Kartu tidak berupa tautan eksternal; tidak ada peta embed/API key.

### 5.9 Tombol WhatsApp

| Varian | Latar | Teks | Ikon | Kontras | Pemakaian |
| --- | --- | --- | --- | ---: | --- |
| Primer | Ungu `#5B2C8E` | Putih | WhatsApp putih | 9,6:1 | "Reservasi Meja", CTA hero, navbar |
| Sekunder | Oranye `#F36F21` | Plum | WhatsApp plum | 6,0:1 | "Tanya Kamar", CTA live music |
| Ghost terang | Transparan, border ungu | Ungu | Ungu | 9,0:1 | "Lihat Menu", "Reset" |
| Ghost gelap | Transparan, border krem | Krem | Krem | 16,8:1 | Aksi sekunder di seksi plum |

- Tinggi 44 px (mobile) / 48 px (desktop); padding 12×20 px; radius 999.
- Label selalu terlihat; tidak ada tombol ikon-saja untuk WhatsApp.
- Ikon 20 px, jarak 8 px dari teks.
- Hover: `purple-dark` / `orange-dark`; pressed: turun 1 px; fokus: ring 3 px + offset 2 px.
- Saat membuka WhatsApp: `target="_blank"` + `rel="noopener noreferrer"`; teks tombol tidak berubah menjadi "loading".
- Pesan template sudah terisi; pengguna tetap bisa mengedit di WhatsApp.
- Tidak ada nomor pribadi di UI; nomor fiktif dipusatkan di satu konstanta.

### 5.10 Dashboard Demo Pengelola

**Konsep:** overlay "workspace" di halaman yang sama, bukan halaman admin dan bukan login. Mengimplementasikan SPEC F-16, F-17, F-19 tanpa menambah CRUD item.

**Pemicu:** "Mode Pengelola" di navbar dan di menu mobile.

**Ukuran:**

- Desktop: dialog `max-width: 1040px`, `max-height: 90vh`, radius 20 px, shadow 2, header & footer sticky di dalam dialog.
- Mobile (< 768): full-screen sheet, radius 0, header 64 px, footer sticky dengan tombol "Selesai".
- Latar belakang: overlay plum 60% + blur 2 px; klik overlay tidak menutup jika ada perubahan belum disimpan (muncul konfirmasi).

**Header:**

- Eyebrow "MODE PENGELOLA".
- H2 "Dashboard Demo".
- Badge outline: "Tanpa login · Data lokal".
- Tombol tutup (×) 44 px, `aria-label="Tutup dashboard"`.

**Banner info (selalu terlihat):**

- Ikon info ungu.
- Teks: "Ini panel demo untuk satu perangkat. Perubahan stok, harga, dan unggulan tersimpan di browser ini saja."
- Latar `purple-tint`, teks plum, radius 12 px.

**Ringkasan (4 kartu):**

- Total item, Tersedia, Habis, Unggulan — sama seperti halaman publik, versi lebih padat.
- Angka 24/28 px Inter 600 tabular; label 12 px.
- Mobile 2×2; desktop 4 sejajar.

**Editor desktop — tabel:**

| Kolom | Isi | Kontrol |
| --- | --- | --- |
| Item | Thumb 40×40 + nama + kategori | Teks statis |
| Harga | `Rp` + input angka | Input 120 px, tabular |
| Stok | Input angka + satuan ("kamar" untuk kategori Kamar) | Input 88 px |
| Unggulan | Status unggulan | Switch 44×24; area sentuh 44×44 dengan label |
| Status | Dihitung dari stok saat ini | Badge read-only |
| Aksi | Simpan baris | Tombol "Simpan", disabled jika belum berubah |

- Baris yang berubah diberi latar `purple-tint` tipis + border kiri ungu 3 px.
- Input fokus: ring ungu; error: border oranye-deep 2 px + pesan di bawah input.
- Enter menyimpan baris; Esc membatalkan perubahan baris (dengan konfirmasi jika sudah ada input).
- Tombol simpan menampilkan status "Tersimpan" + ikon centang plum di lingkaran lime selama 2 detik.
- Tidak ada tombol tambah/hapus item.

**Editor mobile — kartu:**

- Satu kartu per item: thumb + nama + kategori; dua input berdampingan (Harga, Stok); switch unggulan; badge status; tombol "Simpan" full width.
- Di bawah 400 px, input Harga dan Stok ditumpuk vertikal agar label dan pesan error tidak terpotong.
- Input memiliki label terlihat di atasnya, bukan hanya placeholder.
- Error muncul tepat di bawah input yang bermasalah.
- Tidak ada tabel yang dipaksa scroll horizontal.

**Footer dashboard:**

- Kiri: "Reset ke data awal" — ghost dengan border oranye-deep dan teks oranye-deep (kontras 5,7:1), ikon peringatan.
- Kanan: "Selesai" — ungu solid.
- Indikator penyimpanan: "Tersimpan di perangkat ini · 14.32" (caption, muted) di atas footer atau di header.
- Jika storage gagal: banner oranye-tint "Penyimpanan lokal tidak tersedia. Perubahan hanya berlaku selama halaman ini terbuka."

**Dialog konfirmasi reset:**

- Judul: "Kembalikan ke data contoh?"
- Isi: "Semua perubahan stok, harga, dan unggulan di perangkat ini akan hilang. Tindakan ini tidak bisa dibatalkan."
- Tombol: "Ya, reset" (oranye-deep solid, teks putih, kontras 6,0:1) dan "Batal" (ghost).
- Fokus awal pada "Batal"; Esc menutup; focus trap; setelah reset, fokus kembali ke tombol pemicu reset.
- Setelah reset, pencarian/filter/sort juga kembali ke default (Semua, Unggulan dulu, pencarian kosong).
- Toast: "Data contoh berhasil dimuat ulang."

**Aturan keamanan UI:**

- Tidak ada form sandi, email, atau "login" apa pun.
- Label "Tanpa login" terlihat di header, bukan hanya di dokumentasi.
- Dashboard tidak bisa diakses lewat URL terpisah (tetap satu halaman).

### 5.11 Toast, banner, dialog

| Komponen | Posisi | Durasi | Aksesibilitas |
| --- | --- | --- | --- |
| Toast sukses | Kanan bawah (desktop), atas konten (mobile) | 3 detik | `role="status"`, `aria-live="polite"`, dapat ditutup |
| Banner storage | Di bawah navbar, full width | Persisten selama sesi | `role="status"` |
| Banner data rusak | Di atas grid menu | Persisten sampai reset/reload | `role="status"`, ikon info |
| Dialog reset | Tengah | Sampai aksi | `role="dialog"`, `aria-modal="true"`, focus trap |
| Dialog dashboard | Tengah/full-screen | Sampai ditutup | `role="dialog"`, `aria-modal="true"`, focus trap |

Toast tidak boleh menutupi tombol bottom bar; beri offset 80 px di mobile.

### 5.12 Footer (plum)

- Latar plum; teks krem.
- Kolom 1: wordmark "Topi Inn" + "& Restaurant", tagline 1 baris.
- Kolom 2: navigasi (Menu, Kamar, Info, Kontak).
- Kolom 3: "Padangbai, Bali" (alamat contoh nonpribadi), "07.00–22.00 WITA", "WhatsApp: +62 812-0000-0000" (fiktif).
- Kolom 4: CTA "Reservasi Meja" (oranye) + "Tanya Kamar" (ghost krem).
- Baris bawah: "Data contoh untuk latihan · Tidak ada pemesanan online" + "Dibuat dengan Vite + JavaScript".
- Tidak ada tautan sosial palsu, newsletter, atau badge pembayaran.
- Kontras semua teks ≥ 7,8:1.

---

## 6. Wireframe Teks

### 6.1 Mobile — 390 px (alur penuh)

```
┌────────────────────────────────────────────┐
│ Topi Inn          [⚙]              [☰]     │ ← navbar 64
│ & RESTAURANT                               │
├────────────────────────────────────────────┤
│ ● PADANGBAI · BALI                         │
│                                            │
│ Rasa pantai,                               │
│ cerita malam.                              │
│                                            │
│ Menu lokal, kopi, koktail, dan kamar       │
│ sederhana 300 m dari pelabuhan ferry.      │
│                                            │
│ [ Reservasi Meja  ▸ ]  [ Lihat Menu ]      │
│ ● Buka setiap hari · 07.00–22.00 WITA      │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │                                        │ │
│ │          FOTO HERO (4:3)               │ │
│ │      teras + laut Padangbai            │ │
│ │                                   ●    │ │
│ └────────────────────────────────────────┘ │
│   ～～～ garis ombak dekoratif ～～～       │
├────────────────────────────────────────────┤
│ Ringkasan hari ini                         │
│ ┌──────────────────┐ ┌──────────────────┐  │
│ │ 8                │ │ 7                │  │
│ │ Total item       │ │ ● Tersedia       │  │
│ └──────────────────┘ └──────────────────┘  │
│ ┌──────────────────┐ ┌──────────────────┐  │
│ │ 1                │ │ 3                │  │
│ │ Habis            │ │ ● Unggulan       │  │
│ └──────────────────┘ └──────────────────┘  │
├────────────────────────────────────────────┤
│ MENU & LAYANAN                             │
│ Dari dapur pantai ke kamar malam.          │
│                                            │
│ [ 🔍 Cari menu, minuman, atau kamar…   × ] │
│                                            │
│ (Semua) (Makanan Lokal) (Vegan) (Minuman)  │
│ (Kamar)                            →       │
│                                            │
│ Urutkan [ Unggulan dulu        ▾ ]         │
│ Menampilkan 8 dari 8 item                  │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ [Unggulan]                             │ │
│ │              FOTO 4:3                  │ │
│ │                                        │ │
│ │ ● Makanan Lokal          Rp 45.000     │ │
│ │ Nasi Campur Bali                       │ │
│ │ Nasi putih, ayam betutu, sate lilit,   │ │
│ │ lawar, dan sambal matah.               │ │
│ │ ─────────────────────────────────────  │ │
│ │ [Tersedia]                    Stok 12  │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ [Unggulan]                    [Vegan]  │ │
│ │              FOTO 4:3                  │ │
│ │ ● Vegan / Plant-Based    Rp 35.000     │ │
│ │ Sate Lilit Tempe                       │ │
│ │ Sate lilit tempe dan kelapa, tanpa     │ │
│ │ bahan hewani.                          │ │
│ │ ─────────────────────────────────────  │ │
│ │ [Tersedia]                    Stok 10  │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │               FOTO 4:3                 │ │
│ │ ● Kamar                  Rp 450.000    │ │
│ │                        per malam       │ │
│ │ Kamar AC Twin + Sarapan                │ │
│ │ Kamar twin ber-AC, sarapan dua orang,  │ │
│ │ air panas, dan WiFi.                   │ │
│ │ ─────────────────────────────────────  │ │
│ │ [Terbatas]              1 kamar        │ │
│ │ [ Tanya Kamar  ▸ WhatsApp ]            │ │
│ └────────────────────────────────────────┘ │
│              … 5 kartu lainnya …           │
├────────────────────────────────────────────┤
│ ▓▓▓▓▓▓▓▓ PLUM ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ● SETELAH MATAHARI TENGGELAM               │
│                                            │
│ Malam di Padangbai.                        │
│ Live music akustik, koktail senja, dan     │
│ angin laut. Datang lebih awal untuk        │
│ tempat duduk di teras.                     │
│                                            │
│ Jumat & Sabtu        19.00–21.30 WITA      │
│ Akustik lokal                              │
│ ─────────────────────────────────────────  │
│ Minggu               18.30–20.30 WITA      │
│ DJ sunset set                              │
│                                            │
│ Jadwal contoh, dapat berubah.              │
│ [ Reservasi untuk Live Music ]             │
├────────────────────────────────────────────┤
│ UNTUK PENYELAM & PELANCONG                   │
│ Dari teras ke laut, lalu ke pulau.         │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ ◇ Dive center mitra                    │ │
│ │   5 menit jalan kaki                   │ │
│ ├────────────────────────────────────────┤ │
│ │ ⛴ Pelabuhan Padangbai                 │ │
│ │   300 m dari restoran                  │ │
│ ├────────────────────────────────────────┤ │
│ │ ✦ Ferry ke Gili & Lombok               │ │
│ │   Tiket dibantu di resepsionis         │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ Laundry · Antar-jemput bagasi · Snorkeling │
│ → Tanya kamar untuk menginap               │
├────────────────────────────────────────────┤
│ ▓▓ FOOTER PLUM ▓▓                          │
│ Topi Inn & Restaurant                      │
│ Padangbai, Bali · 07.00–22.00 WITA         │
│ WhatsApp +62 812-0000-0000                 │
│ Menu · Kamar · Info · Kontak               │
│ [ Reservasi Meja ]  [ Tanya Kamar ]        │
│ Data contoh untuk latihan.                 │
├────────────────────────────────────────────┤
│ [ Reservasi Meja ]  [ Tanya Kamar ]        │ ← sticky 64
└────────────────────────────────────────────┘
```

**Catatan mobile:**

- [⚙] = Mode Pengelola (ikon sliders, label aksesibel).
- [☰] membuka sheet navigasi; di dalamnya juga ada "Mode Pengelola".
- Bottom bar muncul setelah hero; konten footer diberi padding bawah.
- Chip kategori digulir horizontal; "Kamar" dapat dijangkau tanpa scroll halaman.
- Kartu kamar adalah satu-satunya kartu dengan CTA di dalam kartu.

### 6.2 Desktop — 1440 px

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Topi Inn & Restaurant      Menu   Kamar   Info   Kontak    [⚙ Mode Pengelola] │
│                                                          [ Reservasi Meja ]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ● PADANGBAI · BALI                              ┌─────────────────────────┐  │
│                                                  │                         │  │
│  Rasa pantai,                                    │                         │  │
│  cerita malam.                                   │      FOTO HERO 4:5      │  │
│                                                  │   teras, laut, sore     │  │
│  Menu lokal, kopi, koktail, dan kamar            │                         │  │
│  sederhana 300 meter dari pelabuhan ferry.       │     ● Buka setiap hari  │  │
│                                                  └─────────────────────────┘  │
│  [ Reservasi Meja ]   [ Lihat Menu ]                     ○ lingkaran oranye  │
│  ● Buka setiap hari · 07.00–22.00 WITA                                       │
│                                                                              │
│  ～～～～～～～～～～～～ ombak SVG ～～～～～～～～～～～～～～～～～～～～  │
├──────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ 8            │ │ 7            │ │ 1            │ │ 3            │         │
│  │ Total item   │ │ ● Tersedia   │ │ Habis        │ │ ● Unggulan   │         │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘         │
├──────────────────────────────────────────────────────────────────────────────┤
│  MENU & LAYANAN                                                              │
│  Dari dapur pantai ke kamar malam.                                           │
│                                                                              │
│  [ 🔍 Cari menu, minuman, atau kamar…  × ]  (Semua)(Makanan)(Vegan)(Minuman) │
│                                             (Kamar)      Urutkan [Unggulan ▾]│
│  Menampilkan 8 dari 8 item                                     [Reset filter]│
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐        │
│  │ [Unggulan]         │ │                    │ │ [Unggulan] [Vegan]│        │
│  │      FOTO 4:3      │ │      FOTO 4:3      │ │      FOTO 4:3     │        │
│  │                    │ │                    │ │                   │        │
│  │ ● Lokal  Rp 45.000 │ │ ● Lokal  Rp 40.000 │ │ ● Vegan  Rp 35.000│        │
│  │ Nasi Campur Bali   │ │ Mie Goreng Seafood │ │ Sate Lilit Tempe  │        │
│  │ Deskripsi 2 baris… │ │ Deskripsi 2 baris… │ │ Deskripsi 2 baris…│        │
│  │ ─────────────────  │ │ ─────────────────  │ │ ───────────────── │        │
│  │ [Tersedia] Stok 12 │ │ [Tersedia] Stok 9  │ │ [Tersedia] Stok 10│        │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘        │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐        │
│  │      FOTO 4:3      │ │      FOTO 4:3      │ │      FOTO 4:3     │        │
│  │ ● Vegan  Rp 32.000 │ │ ● Minuman Rp 25.000│ │ ● Minuman Rp 55.000│       │
│  │ Gado-Gado Bali     │ │ Es Kelapa Muda     │ │ Arak Madu Sunset  │        │
│  │ [Habis] Stok 0     │ │ [Tersedia] Stok 20 │ │ [Terbatas] Stok 2 │        │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘        │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐                               │
│  │      FOTO 4:3      │ │      FOTO 4:3      │                               │
│  │ ● Kamar Rp 250.000 │ │ ● Kamar Rp 450.000 │                               │
│  │ Kamar Fan Double   │ │ Kamar AC Twin      │                               │
│  │ [Tersedia] 4 kamar │ │ [Terbatas] 1 kamar │                               │
│  │ [ Tanya Kamar ]    │ │ [ Tanya Kamar ]    │                               │
│  └────────────────────┘ └────────────────────┘                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ PLUM ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                                                              │
│  ● SETELAH MATAHARI TENGGELAM                          ☾  ·  ✦             │
│  Malam di Padangbai.                                                         │
│  Live music akustik, koktail senja, dan angin laut.                          │
│                                                                              │
│  Jumat & Sabtu     19.00–21.30 WITA     Akustik lokal        [ Reservasi ]   │
│  ───────────────────────────────────────────────────────────────────────     │
│  Minggu            18.30–20.30 WITA     DJ sunset set                        │
│                                                                              │
│  Jadwal contoh, dapat berubah.                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  UNTUK PENYELAM & PELANCONG                                                  │
│  Dari teras ke laut, lalu ke pulau.                                          │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐        │
│  │ ◇ Dive center      │ │ ⛴ Pelabuhan       │ │ ✦ Ferry ke pulau   │        │
│  │ 5 menit jalan kaki │ │ 300 m             │ │ Gili & Lombok      │        │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘        │
│  Laundry · Antar-jemput bagasi · Info snorkeling                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ ▓▓ FOOTER PLUM ▓▓                                                            │
│  Topi Inn & Restaurant     Menu Kamar Info    Padangbai, Bali                │
│  & Restaurant              Kontak            07.00–22.00 WITA                │
│  [Reservasi Meja]  [Tanya Kamar]             Data contoh untuk latihan.      │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Catatan desktop:**

- Container 1200 px; grid kartu 3 kolom (gap 24 px), bukan 4, agar foto dan teks tetap editorial.
- Baris terakhir berisi 2 kartu; rata kiri, tidak dipaksa melebar.
- Toolbar dapat membungkus ke dua baris pada 1024–1199 px tanpa merusak grid.
- Bottom bar tidak muncul; CTA tersedia di navbar, hero, kartu kamar, dan footer.
- Badge pada wireframe disederhanakan: data seed tetap menghasilkan **3 Unggulan** dan **2 Vegan**. Arak Madu Sunset tetap berbadge Unggulan dan menampilkan penanda "21+" di UI meski tidak digambar.

### 6.3 Dashboard Demo — Mobile 390 px

```
┌────────────────────────────────────────────┐
│ MODE PENGELOLA                      [×]    │ ← sticky 64
│ Dashboard Demo                             │
│ [Tanpa login · Data lokal]                 │
├────────────────────────────────────────────┤
│ ℹ Panel demo untuk satu perangkat.         │
│   Perubahan tersimpan di browser ini.      │
├────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐          │
│ │ 8 Total      │ │ 7 Tersedia   │          │
│ └──────────────┘ └──────────────┘          │
│ ┌──────────────┐ ┌──────────────┐          │
│ │ 1 Habis      │ │ 3 Unggulan   │          │
│ └──────────────┘ └──────────────┘          │
├────────────────────────────────────────────┤
│ ┌────────────────────────────────────────┐ │
│ │ [img] Nasi Campur Bali                 │ │
│ │       ● Makanan Lokal                  │ │
│ │                                        │ │
│ │ Harga (Rp)              Stok           │ │
│ │ [ 45000        ]        [ 12    ]      │ │
│ │                                        │ │
│ │ Unggulan  [ ●——]        [Tersedia]     │ │
│ │                                        │ │
│ │ [            Simpan            ]       │ │
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ [img] Kamar AC Twin + Sarapan          │ │
│ │       ● Kamar                          │ │
│ │ Harga (Rp)              Stok (kamar)   │ │
│ │ [ 450000       ]        [ 1     ]      │ │
│ │ Unggulan  [ ——○]        [Terbatas]     │ │
│ │ [            Simpan            ]       │ │
│ └────────────────────────────────────────┘ │
│                 … 6 item lainnya …          │
├────────────────────────────────────────────┤
│ Tersimpan di perangkat ini · 14.32         │
│ [ ⚠ Reset ke data awal ]                   │
│ [              Selesai              ]      │ ← sticky footer
└────────────────────────────────────────────┘
```

### 6.4 Dashboard Demo — Desktop 1440 px

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ MODE PENGELOLA · Dashboard Demo                    [Tanpa login]        [×]  │
│ Perubahan stok, harga, dan unggulan tersimpan di browser ini.                │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ 8 Total  │ │ 7 Tersedia│ │ 1 Habis  │ │ 3 Unggulan│                        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Item                          Harga (Rp)      Stok        Unggulan   Status  │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [img] Nasi Campur Bali       [ 45000 ]       [ 12 ]       [●——]     Tersedia│
│       ● Makanan Lokal                                                        │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [img] Mie Goreng Seafood     [ 40000 ]       [  9 ]       [——○]     Tersedia│
│       ● Makanan Lokal                                                        │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [img] Sate Lilit Tempe       [ 35000 ]       [ 10 ]       [●——]     Tersedia│
│       ● Vegan / Plant-Based                                                  │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [img] Gado-Gado Bali         [ 32000 ]       [  0 ]       [——○]     Habis   │
│       ● Vegan / Plant-Based        ✕ Stok harus bilangan bulat 0–999.         │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [img] Kamar AC Twin          [450000 ]       [  1 ]       [——○]     Terbatas│
│       ● Kamar                       kamar                                   │
│ ─────────────────────────────────────────────────────────────────────────── │
│                                          [ Tersimpan di perangkat · 14.32 ]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ [ ⚠ Reset ke data awal ]                                     [   Selesai  ]   │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Catatan dashboard:**

- Baris yang diubah diberi latar `purple-tint` dan garis kiri ungu.
- Tombol "Simpan" per baris muncul di kolom Aksi saat baris berubah; wireframe disederhanakan.
- Error hanya muncul pada baris yang gagal; baris lain tetap dapat disimpan.
- Angka stok kamar memakai satuan "kamar" agar tidak ambigu.

---

## 7. Matriks State Komponen

| Komponen | Default | Hover | Fokus | Aktif/Pressed | Error/Disabled | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| Tombol primer | Ungu, putih | Ungu gelap | Ring ungu 3 px | Turun 1 px | Disabled 45% + kursor normal | Jangan disabled tanpa alasan |
| Tombol sekunder | Oranye, plum | Oranye gelap | Ring ungu | Turun 1 px | Disabled 45% | Teks selalu plum |
| Tombol ghost | Border ungu | Ungu-tint | Ring ungu | Ungu-tint pekat | Disabled 45% | Di plum: border krem |
| Input | Border 1 px | Border kuat | Ring ungu | — | Border oranye-deep + pesan | Label selalu ada |
| Chip filter | Putih | Ungu-tint | Ring ungu | Ungu solid, `aria-pressed` | — | Bukan radio visual saja |
| Kartu | Putih, border | Border kuat | Ring pada elemen | — | Habis: gambar grayscale, teks penuh | Tanpa klik/lift kartu |
| Search | Placeholder muted | Border kuat | Ring ungu | Tombol × muncul | — | Live filtering |
| Switch unggulan | Track abu, knob putih | — | Ring ungu | Track lime, knob plum | Disabled 45% | Label teks di samping |
| Select sort | Putih | Border kuat | Ring ungu | — | — | Label terlihat |
| Toast | Plum, teks krem | — | — | — | — | Auto-dismiss 3 dtk |
| Dialog | Putih | — | Focus trap | — | — | Esc menutup |
| Gambar | WebP | Zoom 1,03 | — | — | Fallback SVG | `alt` tetap |

---

## 8. Aksesibilitas

### 8.1 Struktur & keyboard

- Landmark: `header`, `nav`, `main`, `footer`; setiap seksi memakai `aria-labelledby`.
- Skip link "Lewati ke menu" menjadi elemen fokus pertama.
- Urutan Tab: skip link → logo → nav → Mode Pengelola → Reservasi → hero CTA → pencarian → chip → sort → kartu (hanya kontrol) → CTA kamar → live music → footer → bottom bar.
- `Esc` menutup sheet navigasi, dashboard, dan dialog reset.
- Focus trap hanya di dialog/sheet; setelah ditutup, fokus kembali ke pemicu.
- Anchor scroll memberi `scroll-margin-top` 88 px agar judul tidak tertutup navbar.

### 8.2 Semantik & ARIA

- Navbar mobile: tombol `aria-expanded`, `aria-controls`; sheet `role="dialog"` + label.
- Chip: `role="group"` + tombol `aria-pressed`; jangan memakai `role="tab"` karena bukan panel.
- Hasil pencarian: `aria-live="polite"` pada teks jumlah, bukan pada seluruh grid (mencegah pembacaan berulang).
- Toast: `role="status"`, `aria-live="polite"`, `aria-atomic="true"`.
- Dashboard: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` judul; tombol tutup punya label.
- Ikon dekoratif `aria-hidden="true"`; ikon berdiri sendiri punya `aria-label`.
- Harga: tampilan "Rp 45.000" dengan teks aksesibel "45.000 rupiah" jika dibutuhkan; jangan mengeja titik sebagai "titik".
- Status stok dibaca sebagai "Status: Tersedia. Stok 12." melalui teks yang terlihat, bukan `title`.

### 8.3 Kontras & warna

- Semua teks memenuhi 4,5:1; target utama 7:1.
- Lime/oranye tidak menjadi teks di latar terang (lihat §2.2).
- Fokus tidak boleh mengandalkan perubahan warna saja: ring 3 px + offset 2 px.
- Status memakai teks + ikon/titik; tidak hanya warna.
- Batas pill status bersifat dekoratif karena makna dibawa oleh teks status; kontras 3:1 tidak diwajibkan untuk batas tersebut.
- Batas input/select wajib memakai `border-strong` (≥ 3:1) karena tidak selalu ada label visual lain yang menandai area kontrol.
- Grafik/ilustrasi dekoratif tidak menyampaikan informasi penting.

### 8.4 Gerak, zoom, dan target

- `prefers-reduced-motion`: matikan transform hover pada tombol, zoom gambar, dan animasi bintang; pertahankan perubahan warna.
- Zoom 200%: tidak ada konten terpotong; navigasi tetap dapat dipakai; tidak ada scroll horizontal.
- Reflow pada 320 px CSS: konten tetap terbaca (target SPEC 360 px, diuji hingga 320 px).
- Target sentuh minimal 44×44 px, termasuk tombol ×; switch memakai label di sampingnya sebagai area sentuh 44×44.
- Tidak ada teks dalam gambar; semua teks nyata.

### 8.5 Alt text (contoh)

| Gambar | Alt |
| --- | --- |
| Hero | "Teras restoran beratap jerami menghadap laut Padangbai saat sore." |
| Nasi Campur Bali | "Nasi campur Bali dengan lawar, sate lilit, dan sambal matah di piring anyaman." |
| Sate Lilit Tempe | "Tiga tusuk sate lilit tempe dengan irisan jeruk nipis di atas piring." |
| Es Kelapa Muda | "Es kelapa muda dalam gelas tinggi dengan sedotan dan irisan jeruk." |
| Kamar AC Twin | "Kamar twin sederhana dengan dua tempat tidur, AC, dan jendela menghadap teras." |
| Placeholder | "Foto contoh belum tersedia untuk item ini." |

---

## 9. Microcopy (Bahasa Indonesia)

| Konteks | Teks |
| --- | --- |
| Hero eyebrow | "Padangbai · Bali" (uppercase via style) |
| Hero H1 | "Rasa pantai, cerita malam." |
| Hero sub | "Menu lokal, kopi, koktail, dan kamar sederhana 300 meter dari pelabuhan ferry." |
| Jam buka | "Buka setiap hari · 07.00–22.00 WITA" |
| CTA primer | "Reservasi Meja" |
| CTA sekunder | "Tanya Kamar" |
| CTA live music | "Reservasi untuk Live Music" |
| Cari | "Cari menu, minuman, atau kamar…" |
| Jumlah hasil | "Menampilkan 8 dari 8 item" |
| Kosong | "Belum ada yang cocok. Coba kata kunci lain atau reset pencarian dan filter." |
| Reset filter | "Reset pencarian & filter" |
| Status | "Tersedia" · "Terbatas" · "Habis" |
| Stok | "Stok 12" · "4 kamar tersedia" · "Stok 0" |
| Harga kamar | "Rp 450.000 / malam" |
| Catatan malam | "Jadwal contoh, dapat berubah. Konfirmasi via WhatsApp." |
| Dashboard judul | "Dashboard Demo" |
| Dashboard badge | "Tanpa login · Data lokal" |
| Banner dashboard | "Ini panel demo untuk satu perangkat. Perubahan stok, harga, dan unggulan tersimpan di browser ini saja." |
| Simpan | "Simpan" |
| Tersimpan | "Tersimpan di perangkat ini · 14.32" |
| Validasi stok | "Stok harus bilangan bulat 0–999." |
| Validasi harga | "Harga harus bilangan bulat 0–100.000.000." |
| Reset judul | "Kembalikan ke data contoh?" |
| Reset isi | "Semua perubahan stok, harga, dan unggulan di perangkat ini akan hilang. Tindakan ini tidak bisa dibatalkan." |
| Reset tombol | "Ya, reset" · "Batal" |
| Reset sukses | "Data contoh berhasil dimuat ulang." |
| Storage gagal | "Penyimpanan lokal tidak tersedia. Perubahan hanya berlaku selama halaman ini terbuka." |
| Data rusak | "Data lokal tidak terbaca. Data contoh telah dimuat ulang." |
| Footer disclaimer | "Data contoh untuk latihan · Tidak ada pemesanan online." |

**Nada:** hangat, ringkas, tidak lebay. Hindari "Silakan" berulang, tanda seru, dan istilah teknis seperti "localStorage" di UI publik (kecuali dashboard sebagai penjelasan).

---

## 10. Handoff & QA Visual

### 10.1 Urutan implementasi UI yang disarankan

1. Token warna/tipe/spacing + font self-hosted.
2. Navbar, hero, ringkasan (mobile lalu desktop).
3. Grid kartu + badge + status (data seed statis).
4. Toolbar pencarian/filter/sort + empty state.
5. Seksi live music + dive/ferry + footer.
6. CTA WhatsApp + bottom bar.
7. Dashboard demo + dialog reset + toast.
8. Audit aksesibilitas, responsif, dan state.

### 10.2 Checklist QA visual (manual)

- [ ] Warna hanya dari palet; tidak ada lime/oranye sebagai teks di krem.
- [ ] Semua teks lulus kontras (cek 3–5 kombinasi utama dengan DevTools).
- [ ] Fraunces hanya untuk judul/angka editorial; Inter untuk teks fungsional.
- [ ] Hero tidak menaruh teks di atas foto.
- [ ] Navbar sticky tidak menutupi judul seksi saat anchor diklik.
- [ ] 3 badge bekerja: Unggulan (ungu), Vegan (lime), kategori (outline + titik).
- [ ] Status Habis/Terbatas/Tersedia terbaca tanpa warna.
- [ ] Pencarian, chip, sort, dan empty state bekerja pada 360 px.
- [ ] Kartu kamar menampilkan "/malam" dan CTA "Tanya Kamar".
- [ ] Tidak ada keranjang/checkout/login di layar mana pun.
- [ ] Seksi plum dan footer memakai teks krem; aksen lime/oranye tetap kontras.
- [ ] Dashboard dapat dibuka tanpa kredensial dan label "Tanpa login" terlihat.
- [ ] Error validasi muncul di dekat input; nilai lama tidak berubah.
- [ ] Baris dashboard yang berubah terlihat jelas (bukan hanya warna).
- [ ] Dialog reset: fokus awal "Batal", Esc menutup, fokus kembali.
- [ ] Bottom bar mobile tidak menutupi konten/footer.
- [ ] `prefers-reduced-motion` menonaktifkan transform/zoom.
- [ ] Tidak ada horizontal scroll pada 320, 360, 768, 1024, 1440 px.
- [ ] Semua gambar punya alt; placeholder tampil saat gagal.
- [ ] Tidak ada request eksternal saat halaman dimuat.

### 10.3 Pemetaan ke Acceptance Criteria SPEC

| AC SPEC | Bukti UI |
| --- | --- |
| AC-01–AC-05 | Hero, ringkasan, kartu + badge + status |
| AC-06–AC-15 | Toolbar, chip, sort, count, empty state |
| AC-16 | Empat kartu ringkasan |
| AC-17–AC-19 | CTA WhatsApp, tanpa keranjang |
| AC-20–AC-27 | Dashboard demo, input, validasi |
| AC-28–AC-33 | Indikator simpan, banner storage/rusak |
| AC-34 | Fallback gambar + alt |
| AC-35–AC-36 | Seksi live music & dive/ferry |
| AC-37–AC-39 | Layout responsif, keyboard, kontras |
| AC-40–AC-42 | Build, tanpa rahasia, tanpa request eksternal |

---

## 11. Out of Scope (UI)

1. Halaman login/registrasi, termasuk mock login.
2. Halaman admin terpisah atau routing dashboard.
3. Keranjang, drawer pesanan, checkout, pembayaran, dan badge pembayaran.
4. Modal detail item dengan galeri foto.
5. Carousel/slider otomatis, video background, parallax, dan animasi scroll kompleks.
6. Dark mode toggle manual (hanya seksi malam statis; F-21 opsional).
7. Peta embed, Google Maps API, atau API key apa pun.
8. Chatbot/chat widget, WhatsApp Business API, dan notifikasi push.
9. Ulasan, rating bintang pengguna, dan komentar.
10. Multi-bahasa dan pengalih bahasa.
11. Upload foto dari dashboard.
12. Cetak menu (F-23, ditunda).
13. Ilustrasi/foto yang memuat wajah atau data pribadi.

---

## 12. Pertanyaan Terbuka (UI)

1. Apakah foto asli Padangbai tersedia, atau seluruhnya memakai placeholder ilustratif untuk latihan?
2. Apakah font Fraunces + Inter dapat diunduh dan disimpan lokal pada hari implementasi? Jika tidak, fallback Georgia/system-ui tetap memenuhi struktur.
3. Apakah bottom action bar mobile dipertahankan, atau CTA hanya di hero dan kartu?
4. Apakah dashboard demo berupa overlay (rekomendasi) atau seksi inline di bawah menu?

**Default jika tidak ada jawaban:** placeholder lokal, font self-hosted dengan fallback, bottom bar dipertahankan, dashboard overlay.

---

**Akhir dokumen — belum ada kode aplikasi yang ditulis.**

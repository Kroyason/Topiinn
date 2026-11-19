# Topi Inn & Restaurant

Website profil + menu digital (fiktif) untuk restoran tepi pantai dan penginapan di Padangbai, Bali.
Dibuat dengan Vite + JavaScript vanilla (ES modules) dan CSS biasa — tanpa backend, tanpa login, tanpa keranjang.

> Seluruh nama menu, harga, jadwal, dan nomor WhatsApp di proyek ini **fiktif dan nonpribadi**, hanya untuk latihan.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan
npm run build    # hasil produksi ke folder dist/
npm run preview  # menyajikan hasil build
```

Vite adalah satu-satunya dependensi (devDependency). Tidak ada paket pihak ketiga lain.

## Struktur

```
index.html            Kerangka satu halaman + titik mount untuk konten dinamis
vite.config.js        Konfigurasi minimal Vite (base relatif)
src/main.js           State UI, wiring event, inisialisasi
src/products.js       Seed 8 item, konstanta konten, helper murni (format/filter/sort)
src/store.js          Baca/tulis/validasi array produk di localStorage Topiinn:products:v1 + ekspor/impor/reset
src/ui.js             Render DOM aman (textContent/createElement), badge, dialog, WhatsApp
src/style.css         Design token, layout mobile-first, responsif 360–1440 px
public/images/        Gambar/ilustrasi lokal (SVG)
public/favicon.svg    Favicon lokal
.gitignore            Mengabaikan node_modules/, dist/, dan .env
```

## Mengganti nomor WhatsApp

Nomor contoh `6281200000000` didefinisikan sekali sebagai `WA_NUMBER` di `src/products.js`.
Ubah konstanta itu (format internasional tanpa `+`, spasi, atau tanda hubung). Jangan memakai nomor pribadi.

## Dashboard Demo (Mode Pengelola)

Tombol **Dashboard Demo** di header membuka panel kerja di halaman yang sama (tanpa login, password, atau sesi). Panel memuat:

- Ringkasan: total menu & layanan, ketersediaan, total stok, dan jumlah kategori.
- Tab **Daftar Menu & Layanan**: tabel semua item + filter kategori berisi jumlah item, dengan aksi **Edit** dan **Hapus**.
- Tab **Form Tambah / Edit**: field nama (wajib), kategori (wajib, salah satu dari 4 kategori yang didukung), harga (angka ≥ 0), stok/ketersediaan (bilangan bulat ≥ 0), deskripsi, gambar ilustrasi lokal, dan penanda unggulan.
- Konfirmasi sebelum menghapus item dan sebelum reset ke data awal.

Setiap tambah/edit/hapus langsung menulis `localStorage` dan memperbarui kartu serta ringkasan di daftar menu & layanan publik. Validasi ditolak bila nama kosong, harga/stok bukan angka ≥ 0, atau kategori tidak dikenal.

### Ekspor, impor, dan reset demo

Tombol di bagian bawah panel dashboard:

- **Ekspor JSON** — mengunduh seluruh produk sebagai array JSON terformat (`topiinn-products-<tanggal>.json`).
- **Impor JSON** — memilih file `.json`, lalu mem-`JSON.parse`-nya di dalam `try/catch` dan memvalidasi struktur array serta tipe/batas tiap field (`id`, `nama`, `kategori`, `harga`, `stok`, `deskripsi`, `imageUrl`, `unggulan`). File yang tidak valid ditolak dengan pesan spesifik dan data lama tetap utuh. File yang valid menampilkan konfirmasi sebelum menimpa data.
- **Reset Demo** — mengembalikan seluruh produk ke data contoh awal setelah konfirmasi, sekaligus mengosongkan pencarian/filter/sort.

## Catatan data

- Perubahan pengelola (tambah, edit, hapus, stok, harga, unggulan, impor, reset) disimpan sebagai **array produk** di `localStorage["Topiinn:products:v1"]` pada browser/perangkat yang dipakai saja. Kunci ini menggantikan `topiinn.menu.v1` yang tercantum di `SPEC.md`/`TASKS.md` awal. Tidak ada sinkronisasi antarperangkat dan tidak ada data pengunjung yang dikirim ke server.
- Saat muat, isi storage di-`JSON.parse` dalam `try/catch`, lalu struktur dan tipe tiap field divalidasi. Bila rusak, aplikasi menampilkan pemberitahuan, menulis ulang data contoh ke storage, dan tetap berjalan tanpa crash.
- Jika `localStorage` tidak tersedia, aplikasi memakai data contoh dan menampilkan banner; perubahan tetap bekerja di memori selama halaman terbuka.
- Panel **Dashboard Demo** bukan mekanisme keamanan: tanpa login, hanya untuk latihan di satu perangkat.
- `SPEC.md` dan `TASKS.md` dengan sengaja mendokumentasikan MVP awal (8 item tetap, tanpa CRUD). Dashboard CRUD di atas adalah pengembangan lanjutan yang menggantikan batasan tersebut.
- Urutan default ("Unggulan dulu"): 3 item unggulan lebih dulu (A–Z), lalu item biasa A–Z, lalu kartu **Kamar di akhir** (AC Twin, lalu Fan Double). Dengan begitu kedua kartu kamar tampil berurutan dan Mie Goreng berada tepat di kanan Gado-Gado pada grid 2–3 kolom. Mode sort opsi lainnya tidak berubah.
- Font memakai fallback sistem (`Georgia`/`system-ui`) agar tidak ada request ke CDN; tidak ada aset eksternal saat halaman dimuat.

## Pemeriksaan acceptability

Lihat `SPEC.md` (AC-01–AC-42), `UI-SPEC.md`, dan `TASKS.md` untuk rencana pengujian manual. Tabel hasil AC belum diisi karena implementasi baru pada tahap inisialisasi.

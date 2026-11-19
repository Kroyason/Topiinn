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
src/store.js          Baca/tulis/validasi localStorage topiinn.menu.v1 + fallback
src/ui.js             Render DOM aman (textContent/createElement), badge, dialog, WhatsApp
src/style.css         Design token, layout mobile-first, responsif 360–1440 px
public/images/        Gambar/ilustrasi lokal (SVG)
public/favicon.svg    Favicon lokal
.gitignore            Mengabaikan node_modules/, dist/, dan .env
```

## Mengganti nomor WhatsApp

Nomor contoh `6281200000000` didefinisikan sekali sebagai `WA_NUMBER` di `src/products.js`.
Ubah konstanta itu (format internasional tanpa `+`, spasi, atau tanda hubung). Jangan memakai nomor pribadi.

## Catatan data

- Perubahan pengelola (stok, harga, unggulan) disimpan di `localStorage["topiinn.menu.v1"]` pada browser/perangkat yang dipakai saja. Tidak ada sinkronisasi antarperangkat dan tidak ada data pengunjung yang dikirim ke server.
- Jika `localStorage` tidak tersedia atau data rusak, aplikasi memakai data contoh dan menampilkan banner; perubahan tetap bekerja di memori selama halaman terbuka.
- Panel **Mode Pengelola** bukan mekanisme keamanan: tanpa login, hanya untuk latihan di satu perangkat.
- Urutan default ("Unggulan dulu"): 3 item unggulan lebih dulu (A–Z), lalu item biasa A–Z, lalu kartu **Kamar di akhir** (AC Twin, lalu Fan Double). Dengan begitu kedua kartu kamar tampil berurutan dan Mie Goreng berada tepat di kanan Gado-Gado pada grid 2–3 kolom. Mode sort opsi lainnya tidak berubah.
- Font memakai fallback sistem (`Georgia`/`system-ui`) agar tidak ada request ke CDN; tidak ada aset eksternal saat halaman dimuat.

## Pemeriksaan acceptability

Lihat `SPEC.md` (AC-01–AC-42), `UI-SPEC.md`, dan `TASKS.md` untuk rencana pengujian manual. Tabel hasil AC belum diisi karena implementasi baru pada tahap inisialisasi.

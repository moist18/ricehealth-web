# RiceHealth Web App

RiceHealth adalah platform aplikasi berbasis web untuk monitoring kesehatan lahan sawah dan pengolahan citra udara (drone). Aplikasi ini membantu dalam memantau kondisi lahan pertanian dengan memanfaatkan teknologi pemrosesan gambar, seperti analisis NDVI dan segmentasi objek.

## 🚀 Fitur Utama

- **Beranda (Dashboard):** Ringkasan informasi dan statistik kondisi lahan.
- **Analisis NDVI:** Pemrosesan gambar untuk menganalisis indeks vegetasi (*Normalized Difference Vegetation Index*) guna mengetahui tingkat kesehatan tanaman padi.
- **Segmentasi:** Identifikasi dan segmentasi area menggunakan model *computer vision*.
- **Perbandingan Wilayah:** Membandingkan kondisi tanaman antar petak sawah yang berbeda.
- **Manajemen Dataset:** Mengelola dataset gambar untuk keperluan analisis.
- **Autentikasi (Login):** Sistem keamanan akses dashboard.

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** [React.js](https://reactjs.org/) (v18)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Computer Vision API:** Integrasi dengan API [Roboflow](https://roboflow.com/)

## ⚙️ Cara Menjalankan Proyek Secara Lokal

1. **Clone repository ini**
   ```bash
   git clone https://github.com/moist18/ricehealth-web.git
   cd ricehealth-app
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Jalankan front end pengembangan**
   ```bash
   npm run dev
   ```
3. **Jalankan backend pengembangan**
   ```bash
   cd backend
   npm run dev

4. Buka browser dan akses tautan yang muncul di terminal (biasanya `http://localhost:5173`).

## 📦 Build untuk Produksi

Untuk menghasilkan versi rilis, jalankan:

```bash
npm run build
```
Hasil build akan berada di dalam folder `dist/`.


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

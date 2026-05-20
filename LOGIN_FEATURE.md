# Fitur Login RiceHealth App

## Deskripsi
Aplikasi RiceHealth sekarang dilengkapi dengan sistem autentikasi yang membedakan akses antara Admin dan User.

## Kredensial Login

### Admin
- Username: `admin`
- Password: `admin123`
- Akses: Full access ke semua fitur

### User
- Username: `user`
- Password: `user123`
- Akses: Akses standar ke fitur monitoring

## Fitur yang Ditambahkan

1. **Halaman Login** (`/login`)
   - Form login dengan validasi
   - Pesan error untuk kredensial yang salah
   - Tampilan kredensial demo

2. **AuthContext**
   - Manajemen state autentikasi global
   - Fungsi login dan logout
   - Penyimpanan session di localStorage

3. **Protected Routes**
   - Semua halaman utama dilindungi autentikasi
   - Redirect otomatis ke login jika belum login
   - Support untuk admin-only routes (siap untuk ekspansi)

4. **Sidebar Update**
   - Menampilkan role dan username user yang login
   - Tombol logout yang berfungsi
   - Navigasi menggunakan React Router

## Cara Menggunakan

1. Jalankan aplikasi: `npm run dev`
2. Buka browser dan akses aplikasi
3. Akan otomatis redirect ke halaman login
4. Masukkan kredensial (admin/admin123 atau user/user123)
5. Setelah login berhasil, akan masuk ke dashboard
6. Klik tombol Logout di sidebar untuk keluar

## Struktur File Baru

```
src/
├── context/
│   └── AuthContext.jsx       # Context untuk autentikasi
├── components/
│   ├── Layout.jsx            # Layout wrapper dengan Sidebar
│   ├── ProtectedRoute.jsx    # HOC untuk protected routes
│   └── Sidebar.jsx           # Updated dengan router & logout
└── pages/
    └── Login.jsx             # Halaman login
```

## Teknologi yang Digunakan

- React Router DOM v6 - Routing
- React Context API - State management
- LocalStorage - Session persistence
- Tailwind CSS - Styling

## Catatan Keamanan

⚠️ **PENTING**: Implementasi ini menggunakan hardcoded credentials untuk demo. 
Untuk production, gunakan:
- Backend API untuk autentikasi
- Password hashing (bcrypt)
- JWT tokens
- HTTPS
- Rate limiting

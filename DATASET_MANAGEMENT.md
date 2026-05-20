# Dataset Management - Role-Based Access

## Fitur Utama

Halaman **Dataset Management** untuk mengelola dataset Roboflow dengan privilege berbeda untuk Admin dan User.

## Perbedaan Privilege

### 👨‍💼 ADMIN (Full CRUD)
✅ **Create** - Tambah dataset baru
✅ **Read** - Lihat semua dataset
✅ **Update** - Edit dataset yang ada
✅ **Delete** - Hapus dataset

**Fitur Admin:**
- Tombol "Tambah Dataset"
- Kolom "Actions" dengan tombol Edit & Delete
- Modal form untuk Create/Update
- Konfirmasi sebelum delete

### 👤 USER (Read Only)
✅ **Read** - Lihat semua dataset
❌ Tidak ada tombol tambah
❌ Tidak ada kolom actions
❌ Tidak bisa edit/hapus

## Struktur Data

```javascript
{
  id: number,
  name: string,          // Nama dataset
  version: string,       // Versi (v1, v2, dst)
  images: number,        // Jumlah gambar
  classes: number,       // Jumlah kelas
  status: string,        // 'active' atau 'inactive'
  createdAt: string      // Tanggal dibuat
}
```

## Cara Menggunakan

### Sebagai Admin:

1. **Tambah Dataset:**
   - Klik tombol "Tambah Dataset"
   - Isi form (name, version, images, classes, status)
   - Klik "Simpan"

2. **Edit Dataset:**
   - Klik icon edit (✏️) pada dataset
   - Ubah data yang diperlukan
   - Klik "Update"

3. **Hapus Dataset:**
   - Klik icon delete (🗑️) pada dataset
   - Konfirmasi penghapusan
   - Dataset akan terhapus

### Sebagai User:

1. **Lihat Dataset:**
   - Buka halaman Dataset
   - Lihat tabel dataset (read-only)
   - Tidak ada aksi yang bisa dilakukan

## Data Storage

- Data disimpan di **localStorage** (simulasi)
- Key: `roboflow_datasets`
- Persistent antar session
- Data dummy awal sudah tersedia

## Integrasi Roboflow (Future)

Untuk integrasi dengan Roboflow API yang sebenarnya:

```javascript
// Ganti localStorage dengan API call
const fetchDatasets = async () => {
  const response = await fetch('https://api.roboflow.com/datasets', {
    headers: {
      'Authorization': `Bearer ${ROBOFLOW_API_KEY}`
    }
  });
  return response.json();
};
```

## UI Components

- **Badge Role** - Menampilkan mode (Admin/User)
- **Table** - Menampilkan dataset dengan kolom dinamis
- **Modal Form** - Form Create/Update (admin only)
- **Action Buttons** - Edit & Delete (admin only)
- **Status Badge** - Active (hijau) / Inactive (abu)

## File yang Dimodifikasi

```
src/
├── pages/
│   └── DatasetManagement.jsx    # Halaman baru
├── components/
│   └── Sidebar.jsx              # Tambah menu Dataset
└── App.jsx                      # Tambah route /dataset
```

## Testing

1. Login sebagai **admin** (admin/admin123)
   - Cek tombol "Tambah Dataset" muncul
   - Coba tambah dataset baru
   - Coba edit dataset
   - Coba hapus dataset

2. Logout, login sebagai **user** (user/user123)
   - Cek tombol "Tambah Dataset" TIDAK muncul
   - Cek kolom "Actions" TIDAK ada
   - Hanya bisa lihat data

## Screenshot Fitur

**Admin View:**
- ✅ Tombol "Tambah Dataset"
- ✅ Kolom Actions (Edit/Delete)
- ✅ Badge "Mode: Admin (CRUD)"

**User View:**
- ❌ Tidak ada tombol tambah
- ❌ Tidak ada kolom actions
- ✅ Badge "Mode: User (Read Only)"

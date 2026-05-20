import { useState } from 'react';

const WILAYAH_NDVI = {
  Gresik: {
    gambarRGB: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    stats: { rata: 0.71, max: 0.89, min: 0.18, std: 0.11 },
    sehat: 66.2, kurangSehat: 24.1, tidakSehat: 9.7,
    status: 'Sehat',
    statusColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-800',
  },
  Kediri: {
    gambarRGB: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    stats: { rata: 0.63, max: 0.82, min: 0.14, std: 0.14 },
    sehat: 55.8, kurangSehat: 31.4, tidakSehat: 12.8,
    status: 'Cukup Sehat',
    statusColor: 'text-yellow-600',
    badgeColor: 'bg-yellow-100 text-yellow-800',
  },
  Yogyakarta: {
    gambarRGB: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
    stats: { rata: 0.57, max: 0.78, min: 0.09, std: 0.17 },
    sehat: 43.5, kurangSehat: 38.2, tidakSehat: 18.3,
    status: 'Perlu Perhatian',
    statusColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-800',
  },
};

export default function AnalisisNDVI() {
  const [wilayah, setWilayah] = useState('Gresik');
  const [activeView, setActiveView] = useState('RGB');
  const d = WILAYAH_NDVI[wilayah];

  return (
    <main className="ml-[280px] flex-1 min-h-screen p-margin-desktop">
      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-display-lg font-display-lg text-primary mb-2">Analisis NDVI</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Visualisasi dan perbandingan citra RGB vs NDVI untuk mengetahui kondisi kesehatan tanaman padi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Selector Wilayah */}
          <div className="relative">
            <select
              value={wilayah}
              onChange={e => setWilayah(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-4 pr-10 text-body-md font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              {Object.keys(WILAYAH_NDVI).map(w => (
                <option key={w}>{w}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
          <button className="bg-primary-container text-on-primary rounded-lg px-6 py-2.5 text-title-md font-title-md hover:bg-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">refresh</span>
            Proses NDVI
          </button>
        </div>
      </header>

      {/* Status Badge */}
      <div className="mb-6 flex items-center gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${d.badgeColor}`}>
          <span className="material-symbols-outlined text-base">eco</span>
          {wilayah} — {d.status}
        </span>
        <span className={`text-sm font-bold ${d.statusColor}`}>NDVI Rata-rata: {d.stats.rata.toFixed(2)}</span>
      </div>

      <div className="grid grid-cols-12 gap-card-gap">
        {/* Gambar RGB & NDVI side-by-side */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Toggle */}
          <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant w-fit">
            {['RGB', 'NDVI'].map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeView === v
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {v === 'RGB' ? '📷 Citra RGB' : '🌿 Citra NDVI'}
              </button>
            ))}
          </div>

          {/* Gambar Utama */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface">
              <h3 className="text-title-md font-title-md text-on-surface">
                {activeView === 'RGB' ? 'Citra Asli (RGB)' : 'Hasil Analisis NDVI'} — {wilayah}
              </h3>
              <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                {activeView === 'NDVI' ? 'Pseudocolor Map' : 'True Color'}
              </span>
            </div>
            <div className="relative h-80 bg-surface-variant">
              <img
                key={`${wilayah}-${activeView}`}
                alt={`${activeView} sawah ${wilayah}`}
                className="w-full h-full object-cover"
                src={activeView === 'RGB' ? d.gambarRGB : d.gambarNDVI}
              />
              {activeView === 'NDVI' && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                    <span>Sehat (≥ 0.6)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-sm bg-yellow-400"></div>
                    <span>Cukup (0.3–0.6)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                    <span>Stres (&lt; 0.3)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Perbandingan thumbnail RGB vs NDVI */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '📷 RGB', src: d.gambarRGB, view: 'RGB' },
              { label: '🌿 NDVI', src: d.gambarNDVI, view: 'NDVI' },
            ].map(item => (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${
                  activeView === item.view ? 'border-primary shadow-md' : 'border-outline-variant'
                }`}
              >
                <div className="relative h-28">
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center font-medium">
                    {item.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats & Klasifikasi */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-card-gap">
          {/* Statistik NDVI */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
            <h3 className="text-title-md font-title-md text-on-surface mb-4">Statistik NDVI</h3>
            <div className="space-y-3">
              {[
                { label: 'NDVI Rata-rata', value: d.stats.rata.toFixed(2) },
                { label: 'NDVI Maksimum', value: d.stats.max.toFixed(2) },
                { label: 'NDVI Minimum', value: d.stats.min.toFixed(2) },
                { label: 'Standar Deviasi', value: d.stats.std.toFixed(2) },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
                  <span className="text-body-md font-body-md text-on-surface-variant">{item.label}</span>
                  <span className="text-title-md font-title-md text-on-surface">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Klasifikasi Kesehatan */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex-1">
            <h3 className="text-title-md font-title-md text-on-surface mb-4">Klasifikasi Kesehatan</h3>
            <div className="space-y-5">
              {[
                { label: 'Sehat (NDVI ≥ 0.6)', value: d.sehat, color: 'bg-green-500' },
                { label: 'Kurang Sehat (0.3–0.6)', value: d.kurangSehat, color: 'bg-yellow-500' },
                { label: 'Tidak Sehat (< 0.3)', value: d.tidakSehat, color: 'bg-red-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-body-md font-body-md text-on-surface text-sm">{item.label}</span>
                    </div>
                    <span className="text-title-md font-title-md text-on-surface">{item.value}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="col-span-12 mt-2 bg-tertiary-fixed border border-tertiary-fixed-dim rounded-lg p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary-container mt-0.5">info</span>
          <p className="text-body-md font-body-md text-tertiary-container">
            Nilai NDVI dihitung dari band Near-Infrared (NIR) dan Red menggunakan formula: <strong>(NIR − Red) / (NIR + Red)</strong>. 
            Nilai mendekati 1.0 menunjukkan vegetasi sangat sehat. Area berwarna merah pada peta NDVI memerlukan pemeriksaan lapangan segera.
          </p>
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';

const WILAYAH_DATA = {
  Gresik: {
    ndvi: 0.71,
    sehat: 66.2,
    kurangSehat: 24.1,
    tidakSehat: 9.7,
    warna: '#1b4332',
    gambarRGB: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    status: 'Sehat',
    statusColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-800',
    keterangan: 'Kondisi vegetasi padi di Gresik tergolong baik. Mayoritas area menunjukkan nilai NDVI tinggi yang mengindikasikan tanaman sehat dan pertumbuhan optimal.',
  },
  Kediri: {
    ndvi: 0.63,
    sehat: 55.8,
    kurangSehat: 31.4,
    tidakSehat: 12.8,
    warna: '#5d8a1e',
    gambarRGB: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    status: 'Cukup Sehat',
    statusColor: 'text-yellow-600',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    keterangan: 'Kondisi vegetasi padi di Kediri cukup baik namun terdapat beberapa area yang perlu perhatian. Sekitar 31% area menunjukkan tanda-tanda stres tanaman ringan.',
  },
  Yogyakarta: {
    ndvi: 0.57,
    sehat: 43.5,
    kurangSehat: 38.2,
    tidakSehat: 18.3,
    warna: '#e65100',
    gambarRGB: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80',
    gambarNDVI: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80',
    status: 'Perlu Perhatian',
    statusColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-800',
    keterangan: 'Kondisi vegetasi padi di Yogyakarta memerlukan perhatian lebih. Lebih dari 56% area menunjukkan nilai NDVI di bawah optimal, kemungkinan akibat kekeringan atau serangan hama.',
  },
};

export default function PerbandinganWilayah() {
  const [selectedDate, setSelectedDate] = useState('Mei 2025');
  const [activeView, setActiveView] = useState('RGB'); // 'RGB' | 'NDVI'

  const wilayahList = Object.keys(WILAYAH_DATA);
  const maxNDVI = Math.max(...wilayahList.map(w => WILAYAH_DATA[w].ndvi));

  return (
    <main className="flex-1 ml-[280px] min-h-screen bg-surface p-margin-desktop">
      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-on-background mb-2">Perbandingan Wilayah</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Perbandingan kondisi vegetasi padi berdasarkan hasil NDVI antar wilayah: Gresik, Kediri, dan Yogyakarta.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle RGB / NDVI */}
          <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant">
            {['RGB', 'NDVI'].map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeView === v
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="relative">
            <select
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 pr-10 text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option>Mei 2025</option>
              <option>April 2025</option>
              <option>Maret 2025</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">calendar_month</span>
          </div>
        </div>
      </header>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap mb-8">
        {wilayahList.map(nama => {
          const d = WILAYAH_DATA[nama];
          return (
            <div key={nama} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col shadow-sm">
              {/* Header */}
              <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <h3 className="text-title-md font-title-md text-on-surface">{nama}</h3>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${d.badgeColor}`}>
                  {d.status}
                </span>
              </div>

              {/* Gambar RGB / NDVI */}
              <div className="h-48 relative bg-surface-container-low overflow-hidden">
                <img
                  alt={`${activeView} sawah ${nama}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  src={activeView === 'RGB' ? d.gambarRGB : d.gambarNDVI}
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-mono">
                  {activeView === 'NDVI' ? '🌿 NDVI Map' : '📷 RGB'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Stats */}
              <div className="p-5 flex-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
                    <span className="text-label-sm font-label-sm text-on-surface-variant">NDVI Rata-rata</span>
                    <span className={`text-title-md font-title-md ${d.statusColor}`}>{d.ndvi.toFixed(2)}</span>
                  </div>
                  {/* Progress bars */}
                  {[
                    { label: 'Sehat', value: d.sehat, color: 'bg-green-500' },
                    { label: 'Kurang Sehat', value: d.kurangSehat, color: 'bg-yellow-500' },
                    { label: 'Tidak Sehat', value: d.tidakSehat, color: 'bg-red-500' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-on-surface-variant">{item.label}</span>
                        <span className="font-semibold text-on-surface">{item.value}%</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-1.5">
                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Keterangan */}
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3">
                  {d.keterangan}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar Chart */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-title-md font-title-md text-on-surface">Grafik Perbandingan NDVI Rata-rata</h3>
          <span className="text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">{selectedDate}</span>
        </div>

        {/* Chart */}
        <div className="relative h-64">
          {/* Y-axis grid lines */}
          {[1.0, 0.75, 0.5, 0.25, 0].map((val, i) => (
            <div
              key={val}
              className="absolute left-10 right-0 border-t border-outline-variant/30 flex items-center"
              style={{ top: `${(1 - val) * 100}%` }}
            >
              <span className="absolute -left-10 text-xs text-on-surface-variant w-8 text-right">{val.toFixed(2)}</span>
            </div>
          ))}

          {/* Bars */}
          <div className="absolute left-10 right-0 bottom-0 top-0 flex items-end justify-around pb-0">
            {wilayahList.map(nama => {
              const d = WILAYAH_DATA[nama];
              const heightPct = (d.ndvi / 1.0) * 100;
              return (
                <div key={nama} className="flex flex-col items-center gap-2 w-28">
                  <span className="text-sm font-bold text-on-surface">{d.ndvi.toFixed(2)}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 relative group cursor-pointer"
                    style={{ height: `${heightPct * 2}px`, backgroundColor: d.warna }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {nama}: NDVI {d.ndvi.toFixed(2)}<br/>
                      Sehat: {d.sehat}%
                    </div>
                  </div>
                  <span className="text-sm text-on-surface font-medium">{nama}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center border-t border-outline-variant/30 pt-4">
          {[
            { label: 'Sehat (NDVI ≥ 0.6)', color: 'bg-green-500' },
            { label: 'Cukup Sehat (0.5–0.6)', color: 'bg-yellow-500' },
            { label: 'Perlu Perhatian (< 0.5)', color: 'bg-red-500' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-xs text-on-surface-variant">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function Beranda() {
  return (
    <main className="ml-[280px] w-[calc(100%-280px)] min-h-screen flex flex-col bg-surface">
      {/* TopNavBar */}
      <header className="w-full h-16 bg-surface border-b border-outline-variant flex justify-end items-center px-gutter shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="location_on">location_on</span>
            <span className="text-label-sm font-label-sm text-on-surface">Pilih Wilayah</span>
            <span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="arrow_drop_down">arrow_drop_down</span>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded-full p-1">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded-full p-1">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <span className="material-symbols-outlined text-sm" data-icon="person">person</span>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 p-margin-desktop overflow-y-auto space-y-8">
        {/* Hero Section */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row shadow-sm">
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-headline-lg font-headline-lg text-primary mb-2">Selamat Datang!</h2>
            <h3 className="text-title-md font-title-md text-on-surface mb-4">Sistem Monitoring Kesehatan Tanaman Padi</h3>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Platform ini digunakan untuk memantau kondisi tanaman padi menggunakan citra UAV, segmentasi YOLOv11, dan analisis NDVI.
            </p>
          </div>
          <div className="md:w-1/2 h-48 md:h-auto bg-surface-container-high relative">
            <img 
              alt="Lush green rice terrace fields viewed from a high angle, representing agricultural monitoring." 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Vhf3B4RDQFDQNwTi2EFkJCzPAGAdo9gL2FjcBXOacRBdb1kchiVhPkd_XCk_tUREapnCIVseuwXmkUNFaccmO2AEyAFww9Cq7JKNJ4ZkNk0Pqzr75yB0FTh-7-WTNeQJ4dIcCGKNS9QW5HCxe3mgUFOj2d5SCAn9A7aIGAZ-6DWAa66gaSGKP1wUQ8BAu_5WI_XVWp4SbDH7ccd34hCOl9Ym8Hufzu-5AIartrdW2UTfCjlTVj8DFG60_46bgiJdoN2ydYUznWA"
            />
          </div>
        </section>

        {/* Monitoring Summary */}
        <section>
          <h3 className="text-title-md font-title-md text-on-surface mb-4">Ringkasan Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:border-secondary transition-colors group flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" data-icon="flight">flight</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Citra Latih</p>
                <p className="text-headline-lg font-headline-lg text-on-surface mb-1">37</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Total Citra</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:border-secondary transition-colors group flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" data-icon="grass">grass</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Area Persawahan</p>
                <p className="text-headline-lg font-headline-lg text-on-surface mb-1">25</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Area Tersegmentasi</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:border-secondary transition-colors group flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" data-icon="signal_cellular_alt">signal_cellular_alt</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">NDVI Rata-rata</p>
                <p className="text-headline-lg font-headline-lg text-on-surface mb-1">0.68</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Nilai NDVI</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:border-secondary transition-colors group flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary" data-icon="check_circle">check_circle</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Kondisi Kesehatan</p>
                <p className="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-1">Sehat</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Kategori</p>
              </div>
            </div>
          </div>
        </section>

        {/* Observation Regions */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-title-md font-title-md text-on-surface">Wilayah Pengamatan</h3>
            <button className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1">
              Lihat Semua <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
            {/* Region 1: Gresik */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden relative">
                <img 
                  alt="Sawah Gresik dari udara." 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-label-sm font-label-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">map</span> Lihat Detail Peta</span>
                </div>
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Sehat</div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">location_on</span>
                  <span className="text-body-md font-body-md text-on-surface font-medium">Gresik</span>
                </div>
                <span className="text-xs text-green-600 font-semibold">NDVI: 0.71</span>
              </div>
            </div>

            {/* Region 2: Kediri */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden relative">
                <img 
                  alt="Sawah Kediri dari udara." 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-label-sm font-label-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">map</span> Lihat Detail Peta</span>
                </div>
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Cukup Sehat</div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">location_on</span>
                  <span className="text-body-md font-body-md text-on-surface font-medium">Kediri</span>
                </div>
                <span className="text-xs text-yellow-600 font-semibold">NDVI: 0.63</span>
              </div>
            </div>

            {/* Region 3: Yogyakarta */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden relative">
                <img 
                  alt="Sawah Yogyakarta dari udara." 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-label-sm font-label-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">map</span> Lihat Detail Peta</span>
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Perlu Perhatian</div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">location_on</span>
                  <span className="text-body-md font-body-md text-on-surface font-medium">Yogyakarta</span>
                </div>
                <span className="text-xs text-red-600 font-semibold">NDVI: 0.57</span>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

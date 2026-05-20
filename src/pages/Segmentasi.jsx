import { useState, useRef, useEffect } from 'react';
import { inferImage } from '../services/roboflowService';

export default function Segmentasi() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleInfer = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    try {
      const data = await inferImage(imageFile);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gambar bounding box / segmentasi di canvas setelah result ada
  useEffect(() => {
    if (!result || !canvasRef.current || !imgRef.current) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;

    const draw = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const predictions = result.predictions || [];
      predictions.forEach((pred) => {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = Math.max(2, canvas.width / 300);
        ctx.font = `${Math.max(14, canvas.width / 50)}px sans-serif`;
        ctx.fillStyle = 'rgba(34,197,94,0.15)';

        // Instance segmentation (points)
        if (pred.points && pred.points.length > 0) {
          ctx.beginPath();
          pred.points.forEach((p, i) =>
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          );
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          // Object detection (bounding box)
          const x = pred.x - pred.width / 2;
          const y = pred.y - pred.height / 2;
          ctx.fillRect(x, y, pred.width, pred.height);
          ctx.strokeRect(x, y, pred.width, pred.height);
        }

        // Label
        const label = `${pred.class} ${(pred.confidence * 100).toFixed(0)}%`;
        const lx = pred.points ? pred.points[0]?.x ?? pred.x : pred.x - pred.width / 2;
        const ly = pred.points ? pred.points[0]?.y ?? pred.y : pred.y - pred.height / 2;
        ctx.fillStyle = '#16a34a';
        ctx.fillText(label, lx, ly - 4);
      });
    };

    if (img.complete) draw();
    else img.onload = draw;
  }, [result]);

  const predictions = result?.predictions || [];
  const totalDeteksi = predictions.length;
  const avgConf = totalDeteksi > 0
    ? (predictions.reduce((s, p) => s + p.confidence, 0) / totalDeteksi * 100).toFixed(1)
    : null;

  return (
    <main className="ml-[280px] flex-1 min-h-screen p-gutter flex flex-col">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary-container mb-2">Segmentasi Area Persawahan</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Deteksi area persawahan menggunakan model Roboflow <span className="font-mono bg-surface-container px-1 rounded">kediri/2</span>
          </p>
        </div>

        {/* Upload + Proses */}
        <div className="flex items-center gap-3">
          <label className="bg-surface-container-lowest border border-outline-variant hover:border-primary rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">upload</span>
            {imageFile ? imageFile.name : 'Pilih Gambar'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            onClick={handleInfer}
            disabled={!imageFile || loading}
            className="bg-primary text-on-primary px-5 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {loading
              ? <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Memproses...</>
              : <><span className="material-symbols-outlined text-[18px]">play_arrow</span> Jalankan Model</>
            }
          </button>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Konten */}
      {!imageURL ? (
        // Empty state
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl text-center p-12">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">add_photo_alternate</span>
          <p className="text-title-md font-title-md text-on-surface mb-2">Upload gambar sawah</p>
          <p className="text-body-md text-on-surface-variant">Format: JPG, PNG — hasil foto drone DJI</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-card-gap flex-1">
          {/* Gambar + Canvas hasil */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            {/* Gambar asli (sebelum proses) */}
            {!result && (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="p-4 border-b border-outline-variant bg-surface">
                  <h3 className="text-title-md font-title-md text-on-surface">Citra Asli (RGB)</h3>
                </div>
                <img src={imageURL} alt="Input" className="w-full object-contain max-h-[500px]" />
              </div>
            )}

            {/* Canvas hasil segmentasi */}
            {result && (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="p-4 border-b border-outline-variant bg-surface flex items-center justify-between">
                  <h3 className="text-title-md font-title-md text-on-surface">Hasil Deteksi — kediri/2</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    {totalDeteksi} objek terdeteksi
                  </span>
                </div>
                <div className="relative">
                  {/* Gambar asli tersembunyi untuk referensi canvas */}
                  <img ref={imgRef} src={imageURL} alt="ref" className="hidden" />
                  <canvas ref={canvasRef} className="w-full object-contain max-h-[500px]" />
                </div>
              </div>
            )}
          </div>

          {/* Panel Info */}
          <div className="flex flex-col gap-4">
            {/* Statistik */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
              <h3 className="text-title-md font-title-md text-on-surface mb-4">Informasi Model</h3>
              <div className="space-y-3">
                {[
                  { label: 'Model', value: 'kediri/2' },
                  { label: 'Inference Time', value: result ? `${result.time?.toFixed(3) ?? '-'} s` : '-' },
                  { label: 'Total Deteksi', value: result ? totalDeteksi : '-' },
                  { label: 'Rata-rata Confidence', value: avgConf ? `${avgConf}%` : '-' },
                  { label: 'Resolusi', value: result ? `${result.image?.width ?? '-'} × ${result.image?.height ?? '-'}` : '-' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
                    <span className="text-sm text-on-surface-variant">{item.label}</span>
                    <span className="text-sm font-semibold text-on-surface font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daftar prediksi */}
            {result && predictions.length > 0 && (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex-1 overflow-auto">
                <h3 className="text-title-md font-title-md text-on-surface mb-4">Daftar Prediksi</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {predictions.map((pred, i) => (
                    <div key={i} className="flex items-center justify-between bg-surface-container rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-on-surface">{pred.class}</span>
                      </div>
                      <span className="text-xs font-mono text-on-surface-variant">
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && predictions.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                <span className="material-symbols-outlined text-base align-middle mr-1">warning</span>
                Tidak ada objek terdeteksi. Coba gambar dengan area sawah yang lebih jelas.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

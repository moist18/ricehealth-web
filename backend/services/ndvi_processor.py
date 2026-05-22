import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import cv2
import os
from PIL import Image

try:
    import rasterio
    HAS_RASTERIO = True
except ImportError:
    HAS_RASTERIO = False

class NDVIProcessor:
    def __init__(self):
        self.result_folder = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'ndvi')
        os.makedirs(self.result_folder, exist_ok=True)
    
    def process_multispectral(self, nir_path, red_path, image_id, wilayah='Unknown'):
        """Proses NDVI dari NIR dan Red bands (support .tif, .png, .jpg)"""
        
        # Cek apakah file TIFF
        is_tiff = nir_path.lower().endswith('.tif') or nir_path.lower().endswith('.tiff')
        
        if is_tiff and HAS_RASTERIO:
            # Gunakan rasterio untuk TIFF multispectral
            with rasterio.open(nir_path) as src:
                nir = src.read(1).astype(np.float32)
            with rasterio.open(red_path) as src:
                red = src.read(1).astype(np.float32)
        else:
            # Gunakan PIL untuk format lain
            try:
                nir_img = Image.open(nir_path).convert('L')
                red_img = Image.open(red_path).convert('L')
                
                nir = np.array(nir_img, dtype=np.float32)
                red = np.array(red_img, dtype=np.float32)
                
                # Normalize jika nilai > 1
                if nir.max() > 1:
                    nir = nir / 255.0
                if red.max() > 1:
                    red = red / 255.0
                    
            except Exception as e:
                raise Exception(f"Error membaca file: {str(e)}")
        
        # Hitung NDVI
        ndvi = (nir - red) / (nir + red + 1e-6)
        ndvi = np.nan_to_num(ndvi)
        ndvi = np.clip(ndvi, -1, 1)  # NDVI range -1 to 1
        
        # Statistik
        stats = self._calculate_stats(ndvi)
        
        # Generate visualisasi
        ndvi_path = self._generate_ndvi_image(ndvi, image_id, wilayah)
        
        # Klasifikasi kesehatan
        health = self._classify_health(ndvi)
        
        return {
            'ndvi_url': f'/ndvi/{image_id}_ndvi.png',
            'stats': stats,
            'health': health,
            'wilayah': wilayah
        }
    
    def _calculate_stats(self, ndvi):
        """Hitung statistik NDVI"""
        # Filter hanya nilai valid (> 0)
        valid_ndvi = ndvi[ndvi > 0]
        
        if len(valid_ndvi) == 0:
            return {
                'mean': 0.0,
                'max': 0.0,
                'min': 0.0,
                'std': 0.0
            }
        
        return {
            'mean': float(np.mean(valid_ndvi)),
            'max': float(np.max(valid_ndvi)),
            'min': float(np.min(valid_ndvi)),
            'std': float(np.std(valid_ndvi))
        }
    
    def _classify_health(self, ndvi):
        """Klasifikasi kesehatan tanaman"""
        valid_ndvi = ndvi[ndvi > 0]
        
        if len(valid_ndvi) == 0:
            return {
                'sehat': 0.0,
                'kurangSehat': 0.0,
                'tidakSehat': 0.0
            }
        
        total = len(valid_ndvi)
        
        sehat = np.sum(valid_ndvi >= 0.6) / total * 100
        cukup = np.sum((valid_ndvi >= 0.3) & (valid_ndvi < 0.6)) / total * 100
        stres = np.sum(valid_ndvi < 0.3) / total * 100
        
        return {
            'sehat': round(float(sehat), 1),
            'kurangSehat': round(float(cukup), 1),
            'tidakSehat': round(float(stres), 1)
        }
    
    def _generate_ndvi_image(self, ndvi, image_id, wilayah):
        """Generate visualisasi NDVI dengan colormap"""
        # Mask background
        mask = ndvi <= 0
        ndvi_masked = np.ma.masked_where(mask, ndvi)
        
        # Plot
        plt.figure(figsize=(10, 8))
        plt.imshow(ndvi_masked, cmap='RdYlGn', vmin=0, vmax=1)
        
        cbar = plt.colorbar()
        cbar.set_label('NDVI', fontsize=12)
        
        plt.title(f'NDVI Analysis - {wilayah}', fontsize=14, fontweight='bold')
        plt.axis('off')
        
        # Save
        output_path = os.path.join(self.result_folder, f'{image_id}_ndvi.png')
        plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()
        
        return output_path

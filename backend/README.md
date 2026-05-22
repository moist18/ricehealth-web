# Backend NDVI Processor

Backend Flask untuk proses NDVI dari citra multispektral.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Jalankan server
python app.py
```

Server akan berjalan di `http://localhost:5000`

## API Endpoints

### 1. Upload Multispectral
```
POST /api/upload-multispectral
Content-Type: multipart/form-data

Body:
- nir: File (NIR band .tif)
- red: File (Red band .tif)

Response:
{
  "id": "20260520_220000",
  "nir_path": "uploads/20260520_220000_nir.tif",
  "red_path": "uploads/20260520_220000_red.tif"
}
```

### 2. Process NDVI
```
POST /api/process-ndvi
Content-Type: application/json

Body:
{
  "id": "20260520_220000"
}

Response:
{
  "ndvi_url": "/ndvi/20260520_220000_ndvi.png",
  "stats": {
    "mean": 0.57,
    "max": 0.78,
    "min": 0.09,
    "std": 0.17
  },
  "health": {
    "sehat": 43.5,
    "kurangSehat": 38.2,
    "tidakSehat": 18.3
  }
}
```

## Folder Structure

```
backend/
├── app.py                  # Flask API
├── services/
│   └── ndvi_processor.py   # NDVI processing logic
├── uploads/                # Temporary file storage
└── requirements.txt        # Python dependencies
```

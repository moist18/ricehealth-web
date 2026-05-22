from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Setup folders
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
RESULT_FOLDER = os.path.join(BASE_DIR, '..', 'public', 'ndvi')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# Import processor
try:
    from services.ndvi_processor import NDVIProcessor
    processor = NDVIProcessor()
    PROCESSOR_OK = True
except Exception as e:
    print(f"Warning: {e}")
    PROCESSOR_OK = False

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'processor': PROCESSOR_OK})

@app.route('/api/upload-multispectral', methods=['POST'])
def upload_multispectral():
    """Upload NIR dan Red bands (support .tif, .png, .jpg)"""
    try:
        if 'nir' not in request.files or 'red' not in request.files:
            return jsonify({'error': 'NIR dan Red bands harus diupload'}), 400
        
        nir_file = request.files['nir']
        red_file = request.files['red']
        wilayah = request.form.get('wilayah', 'Unknown')
        
        if not nir_file.filename or not red_file.filename:
            return jsonify({'error': 'File tidak boleh kosong'}), 400
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # Get extensions
        nir_ext = os.path.splitext(nir_file.filename)[1]
        red_ext = os.path.splitext(red_file.filename)[1]
        
        # Save files
        nir_path = os.path.join(UPLOAD_FOLDER, f'{timestamp}_nir{nir_ext}')
        red_path = os.path.join(UPLOAD_FOLDER, f'{timestamp}_red{red_ext}')
        
        nir_file.save(nir_path)
        red_file.save(red_path)
        
        return jsonify({
            'id': timestamp,
            'wilayah': wilayah
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-ndvi', methods=['POST'])
def process_ndvi():
    """Proses NDVI dari NIR + Red"""
    try:
        if not PROCESSOR_OK:
            return jsonify({'error': 'Processor tidak tersedia'}), 500
        
        data = request.json
        image_id = data.get('id')
        wilayah = data.get('wilayah', 'Unknown')
        
        # Find files dengan extension apapun
        nir_path = None
        red_path = None
        
        for ext in ['.tif', '.png', '.jpg', '.jpeg']:
            nir_test = os.path.join(UPLOAD_FOLDER, f'{image_id}_nir{ext}')
            red_test = os.path.join(UPLOAD_FOLDER, f'{image_id}_red{ext}')
            
            if os.path.exists(nir_test):
                nir_path = nir_test
            if os.path.exists(red_test):
                red_path = red_test
        
        if not nir_path or not red_path:
            return jsonify({'error': 'File tidak ditemukan'}), 404
        
        # Proses NDVI
        result = processor.process_multispectral(nir_path, red_path, image_id, wilayah)
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ndvi/<path:filename>')
def serve_ndvi(filename):
    """Serve NDVI images"""
    try:
        return send_from_directory(RESULT_FOLDER, filename)
    except:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    print(f"Upload: {UPLOAD_FOLDER}")
    print(f"Result: {RESULT_FOLDER}")
    app.run(debug=True, port=5000, host='0.0.0.0')

const API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
const MODEL_ID = import.meta.env.VITE_ROBOFLOW_MODEL_ID;

/**
 * Kirim gambar ke Roboflow Inference API
 * @param {File} imageFile - File gambar dari input
 * @returns {Promise<object>} - Response dari Roboflow
 */
export async function inferImage(imageFile) {
  // Convert file ke base64
  const base64 = await fileToBase64(imageFile);
  const base64Data = base64.split(',')[1]; // hapus prefix "data:image/...;base64,"

  const url = `https://serverless.roboflow.com/${MODEL_ID}?api_key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: base64Data,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Roboflow API error: ${response.status} — ${err}`);
  }

  return response.json();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

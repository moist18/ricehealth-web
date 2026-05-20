import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function DatasetManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [datasets, setDatasets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    images: '',
    classes: '',
    status: 'active'
  });

  // Load data dari localStorage (simulasi Roboflow API)
  useEffect(() => {
    const saved = localStorage.getItem('roboflow_datasets');
    if (saved) {
      setDatasets(JSON.parse(saved));
    } else {
      // Data dummy awal
      const initial = [
        { id: 1, name: 'Rice Disease Detection', version: 'v1', images: 1250, classes: 5, status: 'active', createdAt: '2024-01-15' },
        { id: 2, name: 'Rice Health Segmentation', version: 'v2', images: 890, classes: 3, status: 'active', createdAt: '2024-02-20' },
        { id: 3, name: 'NDVI Analysis Dataset', version: 'v1', images: 650, classes: 4, status: 'inactive', createdAt: '2024-03-10' }
      ];
      setDatasets(initial);
      localStorage.setItem('roboflow_datasets', JSON.stringify(initial));
    }
  }, []);

  const saveDatasets = (data) => {
    setDatasets(data);
    localStorage.setItem('roboflow_datasets', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      const updated = datasets.map(d => 
        d.id === editingId ? { ...formData, id: editingId } : d
      );
      saveDatasets(updated);
    } else {
      // Create
      const newDataset = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveDatasets([...datasets, newDataset]);
    }
    resetForm();
  };

  const handleEdit = (dataset) => {
    setFormData(dataset);
    setEditingId(dataset.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus dataset ini?')) {
      saveDatasets(datasets.filter(d => d.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', version: '', images: '', classes: '', status: 'active' });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <main className="ml-[280px] flex-1 min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-on-background">Dataset Management</h1>
            <p className="text-on-surface-variant mt-1">Kelola dataset Roboflow untuk analisis</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Tambah Dataset
            </button>
          )}
        </div>

        {/* Role Badge */}
        <div className="mb-4 inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-sm">
            {isAdmin ? 'admin_panel_settings' : 'person'}
          </span>
          <span className="text-sm font-medium">
            Mode: {isAdmin ? 'Admin (CRUD)' : 'User (Read Only)'}
          </span>
        </div>

        {/* Dataset Table */}
        <div className="bg-surface rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-container">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Dataset Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Version</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Images</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Classes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                {isAdmin && <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {datasets.map((dataset) => (
                <tr key={dataset.id} className="hover:bg-surface-container/50">
                  <td className="px-6 py-4 font-medium">{dataset.name}</td>
                  <td className="px-6 py-4">{dataset.version}</td>
                  <td className="px-6 py-4">{dataset.images}</td>
                  <td className="px-6 py-4">{dataset.classes}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      dataset.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {dataset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{dataset.createdAt}</td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(dataset)}
                          className="text-primary hover:text-primary/80"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(dataset.id)}
                          className="text-error hover:text-error/80"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form (Admin Only) */}
        {isAdmin && showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingId ? 'Edit Dataset' : 'Tambah Dataset'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Dataset Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Version</label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Images</label>
                    <input
                      type="number"
                      value={formData.images}
                      onChange={(e) => setFormData({...formData, images: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Classes</label>
                    <input
                      type="number"
                      value={formData.classes}
                      onChange={(e) => setFormData({...formData, classes: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-on-primary py-2 rounded-lg hover:bg-primary/90"
                  >
                    {editingId ? 'Update' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-surface-container py-2 rounded-lg hover:bg-surface-container/80"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import PerbandinganWilayah from './pages/PerbandinganWilayah';
import AnalisisNDVI from './pages/AnalisisNDVI';
import Segmentasi from './pages/Segmentasi';
import DatasetManagement from './pages/DatasetManagement';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Beranda />} />
            <Route path="segmentasi" element={<Segmentasi />} />
            <Route path="ndvi" element={<AnalisisNDVI />} />
            <Route path="perbandingan" element={<PerbandinganWilayah />} />
            <Route path="dataset" element={<DatasetManagement />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

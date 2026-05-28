import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QueueList from './pages/QueueList';
import QueueDetail from './pages/QueueDetail';
import './App.css';

// Komponen untuk memproteksi rute agar hanya bisa diakses kalau sudah "login"
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rute yang dibungkus Layout dan ProtectedRoute */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="queue" element={<QueueList />} />
          <Route path="queue/:id" element={<QueueDetail />} />
          <Route path="stock" element={<div className="p-6 text-center text-brand-black font-bold glass-panel">Halaman Stok Bahan Belum Tersedia</div>} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;

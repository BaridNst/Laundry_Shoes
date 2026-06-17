import { useState } from 'react';
import axios from 'axios';

export function useAuthController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ganti URL ini sesuai dengan URL server Laravel temanmu
  const API_URL = 'http://localhost:8000/api';

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      // Simpan token dari Laravel ke localStorage biar gak logout saat di-refresh
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      setLoading(false);
      return { success: true, user: response.data.user };
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login gagal, periksa koneksi internet Anda.');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return { login, logout, loading, error };
}
import { useState } from 'react';

export function useQueueController() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const API_URL = 'http://localhost:8000/api/antrean';

  // 1. Fungsi Ambil Data Antrean
  const fetchQueues = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setQueues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // 2. Fungsi Tambah Antrean Baru
  const addQueue = async (formData) => {
    setFormLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setFormLoading(false);
      return { success: true, data };
    } catch (err) {
      console.error(err);
      setFormLoading(false);
      return { success: false, error: err };
    }
  };

  return {
    queues,
    loading,
    formLoading,
    fetchQueues,
    addQueue,
  };
}
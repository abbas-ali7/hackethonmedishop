import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
};

// Medicines API
export const medicinesAPI = {
  getAll: (params) => apiClient.get('/medicines', { params }),
  getById: (id) => apiClient.get(`/medicines/${id}`),
  create: (data) => apiClient.post('/medicines', data),
  update: (id, data) => apiClient.put(`/medicines/${id}`, data),
  delete: (id) => apiClient.delete(`/medicines/${id}`),
  getCategories: () => apiClient.get('/medicines/categories/all'),
};

// Orders API
export const ordersAPI = {
  create: (data) => apiClient.post('/orders', data),
  getAll: () => apiClient.get('/orders'),
  getById: (id) => apiClient.get(`/orders/${id}`),
  getAllAdmin: () => apiClient.get('/orders/admin/all'),
  updateStatus: (id, data) => apiClient.put(`/orders/${id}`, data),
};

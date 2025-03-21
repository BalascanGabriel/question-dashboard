
import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'sonner';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with an error
      const status = error.response.status;

      if (status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action');
      } else if (status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else {
        const data = error.response.data as any;
        toast.error(data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  requestPasswordReset: async (email: string) => {
    const response = await api.post('/auth/password-reset', { email });
    return response.data;
  },
  
  resetPassword: async (token: string, password: string) => {
    const response = await api.post(`/auth/password-reset/${token}`, { password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Questions API
export const questionsAPI = {
  askQuestion: async (question: string) => {
    const response = await api.post('/questions', { question });
    return response.data;
  },
  
  getHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`/questions/history?page=${page}&limit=${limit}`);
    return response.data;
  }
};

// Subscription API
export const subscriptionAPI = {
  getSubscriptionPlans: async () => {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  },
  
  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },
  
  createCheckoutSession: async (planId: string) => {
    const response = await api.post('/subscriptions/checkout', { planId });
    return response.data;
  }
};

// Admin API
export const adminAPI = {
  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  
  banUser: async (userId: string) => {
    const response = await api.post(`/admin/users/${userId}/ban`);
    return response.data;
  },
  
  getLogs: async (page = 1, limit = 10) => {
    const response = await api.get(`/admin/logs?page=${page}&limit=${limit}`);
    return response.data;
  }
};

export default api;

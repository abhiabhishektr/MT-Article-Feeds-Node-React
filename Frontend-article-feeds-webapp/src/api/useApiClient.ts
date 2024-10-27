// src/api/useApiClient.ts
import { useAuth } from '@/context/AuthContext';
import api from './clientApi';
import { getToken } from '@/services/authService';

export const useApiClient = () => {
  const { logout } = useAuth();

  // Set up interceptors only once
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout(); // Clear token and reset auth state
        // Optionally redirect to login
      }
      return Promise.reject(error);
    }
  );

  return api;
};

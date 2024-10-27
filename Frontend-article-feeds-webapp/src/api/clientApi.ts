// Frontend-article-feeds-webapp/src/api/clientApi.ts
import { BASE_URL } from '@/config';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  // Adjust the base URL according to your backend server
  timeout: 5000, 
  // You can set a timeout for the requests
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);                                                                                                                                                                                                                      

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., token expired)
      console.error('Unauthorized access - maybe redirect to login.');
    }
    return Promise.reject(error);
  }
);

export default api;

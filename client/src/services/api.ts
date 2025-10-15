import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { storage } from '../utils/storage';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.API_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: true, // Important for cookies (refresh token)
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't retried yet, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to get new access token using refresh token (in cookie)
        const response = await axios.get(`${API_CONFIG.API_URL}/auth/access-token`, {
          withCredentials: true,
        });

        if (response.data.success && response.data.data.accessToken) {
          const newToken = response.data.data.accessToken;
          storage.setToken(newToken);

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = newToken;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, clear storage and redirect to login
        storage.clearAll();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

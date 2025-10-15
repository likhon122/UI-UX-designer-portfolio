import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, AuthResponse, LoginCredentials, SignupData } from '../types';
import apiClient from './api';

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  // Signup
  signup: async (data: SignupData): Promise<ApiResponse<{ token?: string }>> => {
    const response = await apiClient.post<ApiResponse<{ token?: string }>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data
    );
    return response.data;
  },

  // Register User (email verification)
  registerUser: async (token: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER_USER,
      { token }
    );
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse<{}>> => {
    const response = await apiClient.post<ApiResponse<{}>>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email: string): Promise<ApiResponse<{ token?: string }>> => {
    const response = await apiClient.post<ApiResponse<{ token?: string }>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.data;
  },

  // Reset Password
  resetPassword: async (changedPassword: string, token: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.post<ApiResponse<{}>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { changedPassword },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  // Change Password
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.patch<ApiResponse<{}>>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      { currentPassword, newPassword }
    );
    return response.data;
  },

  // Get Access Token (refresh)
  getAccessToken: async (): Promise<ApiResponse<{ accessToken: string }>> => {
    const response = await apiClient.get<ApiResponse<{ accessToken: string }>>(
      API_ENDPOINTS.AUTH.ACCESS_TOKEN
    );
    return response.data;
  },
};

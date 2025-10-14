import apiClient from './axios';
import { API_ROUTES } from '../config';
import { AuthResponse, LoginCredentials, SignupData, ApiResponse } from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ROUTES.auth.login, credentials);
    return response.data;
  },

  signup: async (data: SignupData): Promise<ApiResponse<{ token?: string }>> => {
    const response = await apiClient.post(API_ROUTES.auth.signup, data);
    return response.data;
  },

  registerUser: async (token: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ROUTES.auth.register, { token });
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post(API_ROUTES.auth.logout);
    return response.data;
  },

  forgetPassword: async (email: string): Promise<ApiResponse<{ token?: string }>> => {
    const response = await apiClient.post(API_ROUTES.auth.forgetPassword, { email });
    return response.data;
  },

  resetPassword: async (token: string, changedPassword: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.post(
      API_ROUTES.auth.resetPassword,
      { changedPassword },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> => {
    const response = await apiClient.patch(API_ROUTES.auth.changePassword, {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getAccessToken: async (): Promise<ApiResponse<{ accessToken: string }>> => {
    const response = await apiClient.get(API_ROUTES.auth.getAccessToken);
    return response.data;
  },
};

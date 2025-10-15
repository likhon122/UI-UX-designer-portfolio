import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, User, PaginatedResponse } from '../types';
import apiClient from './api';

export const userService = {
  // Get current user profile
  getMyProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.ME
    );
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (page = 1, limit = 10, role?: string): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const response = await apiClient.get<ApiResponse<{ users: User[], pagination: any }>>(
      API_ENDPOINTS.USERS.ALL,
      {
        params: { page, limit, role },
      }
    );
    return {
      ...response.data,
      data: {
        items: response.data.data.users,
        pagination: response.data.data.pagination,
      },
    };
  },

  // Get single user (admin only)
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BY_ID(id)
    );
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>(
      API_ENDPOINTS.USERS.UPDATE(id),
      data
    );
    return response.data;
  },
};

import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Category } from '../types';
import apiClient from './api';

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiClient.get<ApiResponse<Category[]>>(
      API_ENDPOINTS.CATEGORIES.ALL
    );
    return response.data;
  },

  // Get single category
  getCategoryById: async (id: string): Promise<ApiResponse<Category>> => {
    const response = await apiClient.get<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
    return response.data;
  },

  // Create category (admin only)
  createCategory: async (data: { name: string; description?: string }): Promise<ApiResponse<Category>> => {
    const response = await apiClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.CREATE,
      data
    );
    return response.data;
  },

  // Update category (admin only)
  updateCategory: async (id: string, data: { name?: string; description?: string }): Promise<ApiResponse<Category>> => {
    const response = await apiClient.patch<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.UPDATE(id),
      data
    );
    return response.data;
  },
};

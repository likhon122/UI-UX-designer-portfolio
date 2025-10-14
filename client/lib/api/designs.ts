import apiClient from './axios';
import { API_ROUTES } from '../config';
import { Design, ApiResponse, PaginatedResponse, CreateDesignData } from '@/types';

export const designsApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Design>> => {
    const response = await apiClient.get(API_ROUTES.designs.getAll, {
      params: { page, limit },
    });
    return response.data;
  },

  getSingle: async (id: string): Promise<ApiResponse<Design>> => {
    const response = await apiClient.get(API_ROUTES.designs.getSingle(id));
    return response.data;
  },

  create: async (data: CreateDesignData): Promise<ApiResponse<Design>> => {
    const response = await apiClient.post(API_ROUTES.designs.create, data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateDesignData>): Promise<ApiResponse<Design>> => {
    const response = await apiClient.patch(API_ROUTES.designs.update(id), data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(API_ROUTES.designs.delete(id));
    return response.data;
  },
};

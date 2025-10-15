import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Design, CreateDesignData, PaginatedResponse } from '../types';
import apiClient from './api';

export const designService = {
  // Get all designs
  getAllDesigns: async (page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Design>>> => {
    const response = await apiClient.get<ApiResponse<{ designs: Design[], pagination: any }>>(
      API_ENDPOINTS.DESIGNS.ALL,
      {
        params: { page, limit },
      }
    );
    return {
      ...response.data,
      data: {
        items: response.data.data.designs,
        pagination: response.data.data.pagination,
      },
    };
  },

  // Get single design
  getDesignById: async (id: string): Promise<ApiResponse<Design>> => {
    const response = await apiClient.get<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGNS.BY_ID(id)
    );
    return response.data;
  },

  // Create design (admin only)
  createDesign: async (data: CreateDesignData): Promise<ApiResponse<Design>> => {
    const response = await apiClient.post<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGNS.CREATE,
      data
    );
    return response.data;
  },

  // Update design (admin only)
  updateDesign: async (id: string, data: Partial<CreateDesignData>): Promise<ApiResponse<Design>> => {
    const response = await apiClient.patch<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGNS.UPDATE(id),
      data
    );
    return response.data;
  },

  // Delete design (admin only)
  deleteDesign: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<ApiResponse<{}>>(
      API_ENDPOINTS.DESIGNS.DELETE(id)
    );
    return response.data;
  },
};

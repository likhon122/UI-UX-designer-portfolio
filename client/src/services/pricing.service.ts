import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, PricingPlan } from '../types';
import apiClient from './api';

export const pricingService = {
  // Get all pricing plans
  getAllPlans: async (): Promise<ApiResponse<PricingPlan[]>> => {
    const response = await apiClient.get<ApiResponse<PricingPlan[]>>(
      API_ENDPOINTS.PRICING_PLANS.ALL
    );
    return response.data;
  },

  // Get single pricing plan
  getPlanById: async (id: string): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.get<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLANS.BY_ID(id)
    );
    return response.data;
  },

  // Create pricing plan (admin only)
  createPlan: async (data: Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.post<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLANS.CREATE,
      data
    );
    return response.data;
  },

  // Update pricing plan (admin only)
  updatePlan: async (id: string, data: Partial<Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.patch<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLANS.UPDATE(id),
      data
    );
    return response.data;
  },
};

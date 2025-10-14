import apiClient from './axios';
import { API_ROUTES } from '../config';
import { PricingPlan, ApiResponse } from '@/types';

export const pricingApi = {
  getAll: async (): Promise<ApiResponse<PricingPlan[]>> => {
    const response = await apiClient.get(API_ROUTES.pricingPlans.getAll);
    return response.data;
  },

  getSingle: async (id: string): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.get(API_ROUTES.pricingPlans.getSingle(id));
    return response.data;
  },

  create: async (data: Omit<PricingPlan, 'id' | 'createdAt'>): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.post(API_ROUTES.pricingPlans.create, data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<PricingPlan, 'id' | 'createdAt'>>
  ): Promise<ApiResponse<PricingPlan>> => {
    const response = await apiClient.patch(API_ROUTES.pricingPlans.update(id), data);
    return response.data;
  },
};

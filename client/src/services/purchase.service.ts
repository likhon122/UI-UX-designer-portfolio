import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Purchase, CreatePurchaseData, PaginatedResponse, PaymentStatus } from '../types';
import apiClient from './api';

export const purchaseService = {
  // Create purchase (customer only)
  createPurchase: async (data: CreatePurchaseData): Promise<ApiResponse<Purchase>> => {
    const response = await apiClient.post<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASES.CREATE,
      data
    );
    return response.data;
  },

  // Get all my purchases (customer only)
  getMyPurchases: async (): Promise<ApiResponse<Purchase[]>> => {
    const response = await apiClient.get<ApiResponse<Purchase[]>>(
      API_ENDPOINTS.PURCHASES.MY_PURCHASES
    );
    return response.data;
  },

  // Get all purchases (admin only)
  getAllPurchases: async (page = 1, limit = 10, paymentStatus?: PaymentStatus): Promise<ApiResponse<PaginatedResponse<Purchase>>> => {
    const response = await apiClient.get<ApiResponse<{ purchases: Purchase[], pagination: any }>>(
      API_ENDPOINTS.PURCHASES.ALL,
      {
        params: { page, limit, paymentStatus },
      }
    );
    return {
      ...response.data,
      data: {
        items: response.data.data.purchases,
        pagination: response.data.data.pagination,
      },
    };
  },

  // Get single purchase
  getPurchaseById: async (id: string): Promise<ApiResponse<Purchase>> => {
    const response = await apiClient.get<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASES.BY_ID(id)
    );
    return response.data;
  },

  // Update purchase (admin only)
  updatePurchase: async (id: string, data: { paymentStatus: PaymentStatus }): Promise<ApiResponse<Purchase>> => {
    const response = await apiClient.patch<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASES.UPDATE(id),
      data
    );
    return response.data;
  },

  // Get revenue (admin only)
  getRevenue: async (): Promise<ApiResponse<{
    totalRevenue: number;
    paidPurchases: number;
    pendingPurchases: number;
    cancelledPurchases: number;
  }>> => {
    const response = await apiClient.get(API_ENDPOINTS.PURCHASES.REVENUE);
    return response.data;
  },
};

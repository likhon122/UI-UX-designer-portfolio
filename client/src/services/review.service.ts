import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Review, CreateReviewData } from '../types';
import apiClient from './api';

export const reviewService = {
  // Create review (customer only)
  createReview: async (data: CreateReviewData): Promise<ApiResponse<Review>> => {
    const response = await apiClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEWS.CREATE,
      data
    );
    return response.data;
  },

  // Get reviews for a design
  getReviewsByDesign: async (designId: string): Promise<ApiResponse<Review[]>> => {
    const response = await apiClient.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.REVIEWS.BY_DESIGN(designId)
    );
    return response.data;
  },

  // Get single review
  getReviewById: async (id: string): Promise<ApiResponse<Review>> => {
    const response = await apiClient.get<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEWS.BY_ID(id)
    );
    return response.data;
  },

  // Delete review (admin only)
  deleteReview: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<ApiResponse<{}>>(
      API_ENDPOINTS.REVIEWS.DELETE(id)
    );
    return response.data;
  },
};

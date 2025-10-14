// User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'superAdmin';
  phone?: string;
  address?: string;
  profileImage?: string;
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

// Design Types
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Design {
  id: string;
  title: string;
  category: Category | string;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects?: string[];
  price: number;
  process: string;
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  tags?: string[];
  status: 'Active' | 'Draft' | 'Archived';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDesignData {
  title: string;
  category: string;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects?: string[];
  price: number;
  process: string;
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  tags?: string[];
  status?: 'Active' | 'Draft' | 'Archived';
}

// Pricing Plan Types
export interface PricingPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  features: string[];
  duration: number;
  createdAt: string;
}

// Purchase Types
export interface Purchase {
  id: string;
  customer: string | User;
  design: string | Design;
  pricingPlan: string | PricingPlan;
  paymentStatus: 'Pending' | 'Paid' | 'Cancelled';
  purchaseDate: string;
  createdAt: string;
}

export interface CreatePurchaseData {
  design: string;
  pricingPlan: string;
}

// Review Types
export interface Review {
  id: string;
  reviewer: string | User;
  design: string | Design;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewData {
  design: string;
  rating: number;
  comment?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    [key: string]: T[] | PaginationMeta;
    pagination: PaginationMeta;
  };
}

// Admin Types
export interface Admin {
  id: string;
  name: string;
  email: string;
  position?: 'Administrator' | 'Manager';
  role: 'admin';
  profileImage?: string;
  phone?: string;
  address?: string;
}

export interface CreateAdminData {
  name: string;
  email: string;
  password: string;
  position?: 'Administrator' | 'Manager';
  profileImage?: string;
  phone?: string;
  address?: string;
}

// Revenue Types
export interface RevenueData {
  totalRevenue: number;
  paidPurchases: number;
  pendingPurchases: number;
  cancelledPurchases: number;
}

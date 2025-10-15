// User and Authentication Types
export type UserRole = 'customer' | 'admin' | 'superAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  profileImage?: string;
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
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

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Design Types
export type ComplexityLevel = 'Basic' | 'Intermediate' | 'Advanced';
export type DesignStatus = 'Active' | 'Draft' | 'Archived';

export interface Design {
  id: string;
  title: string;
  category: Category | string;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects: string[];
  price: number;
  process: string;
  complexityLevel: ComplexityLevel;
  tags: string[];
  status: DesignStatus;
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
  effects: string[];
  price: number;
  process: string;
  complexityLevel: ComplexityLevel;
  tags: string[];
  status?: DesignStatus;
}

// Pricing Plan Types
export type PlanName = 'Basic' | 'Standard' | 'Premium';

export interface PricingPlan {
  id: string;
  name: PlanName;
  price: number;
  features: string[];
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

// Purchase Types
export type PaymentStatus = 'Pending' | 'Paid' | 'Cancelled';

export interface Purchase {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  } | string;
  design: {
    id: string;
    title: string;
    previewImageUrl: string;
  } | string;
  pricingPlan: {
    id: string;
    name: string;
    price: number;
  } | string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePurchaseData {
  design: string;
  pricingPlan: string;
}

// Review Types
export interface Review {
  id: string;
  reviewer: {
    id: string;
    name: string;
    profileImage?: string;
  } | string;
  design: {
    id: string;
    title: string;
  } | string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateReviewData {
  design: string;
  rating: number;
  comment?: string;
}

// Admin Types
export type AdminPosition = 'Administrator' | 'Manager';

export interface Admin {
  id: string;
  name: string;
  email: string;
  position: AdminPosition;
  role: 'admin';
  createdAt?: string;
  updatedAt?: string;
}

// Customer Types
export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  errorDetails?: {
    issues: Array<{
      field: string;
      message: string;
    }>;
  };
}

// Theme Types
export type Theme = 'light' | 'dark';

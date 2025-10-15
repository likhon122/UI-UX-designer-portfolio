// Dynamic API Base URL Configuration
// Change this URL in one place to update it across the entire application

export const API_CONFIG = {
  // Base URL for the API - modify this to change the backend URL everywhere
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // API version prefix
  API_VERSION: '/api/v1',
  
  // Get the full API URL
  get API_URL() {
    return `${this.BASE_URL}${this.API_VERSION}`;
  },
  
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 30000,
  
  // Request headers
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/sign-up',
    REGISTER_USER: '/auth/register-user',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forget-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ACCESS_TOKEN: '/auth/access-token',
  },
  
  // Users
  USERS: {
    ME: '/users/me',
    ALL: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
  },
  
  // Admins
  ADMINS: {
    CREATE: '/admins',
    ALL: '/admins',
    BY_ID: (id: string) => `/admins/${id}`,
    CHANGE_POSITION: (id: string) => `/admins/change-admin-position/${id}`,
  },
  
  // Customers
  CUSTOMERS: {
    ALL: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
  },
  
  // Categories
  CATEGORIES: {
    CREATE: '/categories',
    ALL: '/categories',
    BY_ID: (id: string) => `/categories/get-single-category/${id}`,
    UPDATE: (id: string) => `/categories/${id}`,
  },
  
  // Designs
  DESIGNS: {
    CREATE: '/designs',
    ALL: '/designs',
    BY_ID: (id: string) => `/designs/get-single-design/${id}`,
    UPDATE: (id: string) => `/designs/${id}`,
    DELETE: (id: string) => `/designs/${id}`,
  },
  
  // Pricing Plans
  PRICING_PLANS: {
    CREATE: '/pricing-plans',
    ALL: '/pricing-plans',
    BY_ID: (id: string) => `/pricing-plans/${id}`,
    UPDATE: (id: string) => `/pricing-plans/${id}`,
  },
  
  // Purchases
  PURCHASES: {
    CREATE: '/purchase',
    MY_PURCHASES: '/purchase/get-all-my-purchase',
    ALL: '/purchase',
    BY_ID: (id: string) => `/purchase/${id}`,
    UPDATE: (id: string) => `/purchase/${id}`,
    REVENUE: '/purchase/get-revenue',
  },
  
  // Reviews
  REVIEWS: {
    CREATE: '/reviews',
    BY_DESIGN: (designId: string) => `/reviews/design-reviews/${designId}`,
    BY_ID: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },
};

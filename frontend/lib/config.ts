// Dynamic API URL configuration
// You can change this in one place and it will update everywhere
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 30000, // 30 seconds
} as const;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/sign-up',
    REGISTER: '/auth/register-user',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forget-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    GET_ACCESS_TOKEN: '/auth/access-token',
  },
  // User endpoints
  USERS: {
    ME: '/users/me',
    ALL: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
  },
  // Admin endpoints
  ADMINS: {
    CREATE: '/admins/create-admin',
    ALL: '/admins',
    BY_ID: (id: string) => `/admins/${id}`,
    CHANGE_POSITION: (id: string) => `/admins/change-admin-position/${id}`,
  },
  // Customer endpoints
  CUSTOMERS: {
    ALL: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
  },
  // Category endpoints
  CATEGORIES: {
    ALL: '/categories',
    CREATE: '/categories',
    BY_ID: (id: string) => `/categories/get-single-category/${id}`,
    UPDATE: (id: string) => `/categories/${id}`,
  },
  // Design endpoints
  DESIGNS: {
    ALL: '/designs',
    CREATE: '/designs',
    BY_ID: (id: string) => `/designs/get-single-design/${id}`,
    UPDATE: (id: string) => `/designs/${id}`,
    DELETE: (id: string) => `/designs/${id}`,
  },
  // Pricing Plan endpoints
  PRICING_PLANS: {
    ALL: '/pricing-plans',
    CREATE: '/pricing-plans',
    BY_ID: (id: string) => `/pricing-plans/${id}`,
    UPDATE: (id: string) => `/pricing-plans/${id}`,
  },
  // Purchase endpoints
  PURCHASES: {
    CREATE: '/purchase',
    MY_PURCHASES: '/purchase/get-all-my-purchase',
    ALL: '/purchase',
    BY_ID: (id: string) => `/purchase/${id}`,
    UPDATE: (id: string) => `/purchase/${id}`,
    REVENUE: '/purchase/get-revenue',
  },
  // Review endpoints
  REVIEWS: {
    CREATE: '/reviews',
    BY_DESIGN: (id: string) => `/reviews/design-reviews/${id}`,
    BY_ID: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },
} as const;

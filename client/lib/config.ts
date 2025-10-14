/**
 * Dynamic URL Configuration
 * Change API_BASE_URL once and it will update everywhere
 */

// Get API URL from environment variable or use default
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const API_VERSION = '/api/v1';

// Full API endpoint base
export const API_ENDPOINT = `${API_BASE_URL}${API_VERSION}`;

// API Routes
export const API_ROUTES = {
  // Auth endpoints
  auth: {
    login: `${API_ENDPOINT}/auth/login`,
    signup: `${API_ENDPOINT}/auth/sign-up`,
    register: `${API_ENDPOINT}/auth/register-user`,
    logout: `${API_ENDPOINT}/auth/logout`,
    forgetPassword: `${API_ENDPOINT}/auth/forget-password`,
    resetPassword: `${API_ENDPOINT}/auth/reset-password`,
    changePassword: `${API_ENDPOINT}/auth/change-password`,
    getAccessToken: `${API_ENDPOINT}/auth/access-token`,
  },
  // Design endpoints
  designs: {
    getAll: `${API_ENDPOINT}/designs`,
    getSingle: (id: string) => `${API_ENDPOINT}/designs/get-single-design/${id}`,
    create: `${API_ENDPOINT}/designs`,
    update: (id: string) => `${API_ENDPOINT}/designs/${id}`,
    delete: (id: string) => `${API_ENDPOINT}/designs/${id}`,
  },
  // Category endpoints
  categories: {
    getAll: `${API_ENDPOINT}/categories`,
    getSingle: (id: string) => `${API_ENDPOINT}/categories/get-single-category/${id}`,
    create: `${API_ENDPOINT}/categories`,
    update: (id: string) => `${API_ENDPOINT}/categories/${id}`,
  },
  // Pricing Plan endpoints
  pricingPlans: {
    getAll: `${API_ENDPOINT}/pricing-plans`,
    getSingle: (id: string) => `${API_ENDPOINT}/pricing-plans/${id}`,
    create: `${API_ENDPOINT}/pricing-plans`,
    update: (id: string) => `${API_ENDPOINT}/pricing-plans/${id}`,
  },
  // Purchase endpoints
  purchases: {
    getAll: `${API_ENDPOINT}/purchase`,
    getMy: `${API_ENDPOINT}/purchase/get-all-my-purchase`,
    getSingle: (id: string) => `${API_ENDPOINT}/purchase/${id}`,
    create: `${API_ENDPOINT}/purchase`,
    update: (id: string) => `${API_ENDPOINT}/purchase/${id}`,
    getRevenue: `${API_ENDPOINT}/purchase/get-revenue`,
  },
  // Review endpoints
  reviews: {
    getByDesign: (id: string) => `${API_ENDPOINT}/reviews/design-reviews/${id}`,
    getSingle: (id: string) => `${API_ENDPOINT}/reviews/${id}`,
    create: `${API_ENDPOINT}/reviews`,
    delete: (id: string) => `${API_ENDPOINT}/reviews/${id}`,
  },
  // User endpoints
  users: {
    getMe: `${API_ENDPOINT}/users/me`,
    getAll: `${API_ENDPOINT}/users`,
    getSingle: (id: string) => `${API_ENDPOINT}/users/${id}`,
    update: (id: string) => `${API_ENDPOINT}/users/${id}`,
  },
  // Admin endpoints
  admins: {
    getAll: `${API_ENDPOINT}/admins`,
    getSingle: (id: string) => `${API_ENDPOINT}/admins/${id}`,
    create: `${API_ENDPOINT}/admins/create-admin`,
    changePosition: (id: string) => `${API_ENDPOINT}/admins/change-admin-position/${id}`,
  },
  // Customer endpoints
  customers: {
    getAll: `${API_ENDPOINT}/customers`,
    getSingle: (id: string) => `${API_ENDPOINT}/customers/${id}`,
  },
} as const;

// Frontend routes
export const ROUTES = {
  home: '/',
  designs: '/designs',
  designDetail: (id: string) => `/designs/${id}`,
  pricing: '/pricing',
  login: '/auth/login',
  signup: '/auth/signup',
  forgetPassword: '/auth/forget-password',
  resetPassword: '/auth/reset-password',
  dashboard: '/dashboard',
  profile: '/profile',
  adminDashboard: '/dashboard/admin',
} as const;

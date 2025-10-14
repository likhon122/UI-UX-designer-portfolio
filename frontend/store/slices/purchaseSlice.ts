import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/config';

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
  paymentStatus: 'Pending' | 'Paid' | 'Cancelled';
  createdAt: string;
}

interface PurchaseState {
  purchases: Purchase[];
  myPurchases: Purchase[];
  currentPurchase: Purchase | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  revenue: {
    totalRevenue: number;
    paidPurchases: number;
    pendingPurchases: number;
    cancelledPurchases: number;
  } | null;
}

const initialState: PurchaseState = {
  purchases: [],
  myPurchases: [],
  currentPurchase: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  revenue: null,
};

export const createPurchase = createAsyncThunk(
  'purchase/createPurchase',
  async ({ design, pricingPlan }: { design: string; pricingPlan: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.PURCHASES.CREATE, { design, pricingPlan });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create purchase');
    }
  }
);

export const fetchMyPurchases = createAsyncThunk(
  'purchase/fetchMyPurchases',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.PURCHASES.MY_PURCHASES);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchases');
    }
  }
);

export const fetchAllPurchases = createAsyncThunk(
  'purchase/fetchAllPurchases',
  async ({ page = 1, limit = 10, paymentStatus }: { page?: number; limit?: number; paymentStatus?: string }, { rejectWithValue }) => {
    try {
      let url = `${API_ENDPOINTS.PURCHASES.ALL}?page=${page}&limit=${limit}`;
      if (paymentStatus) {
        url += `&paymentStatus=${paymentStatus}`;
      }
      const response: any = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchases');
    }
  }
);

export const fetchPurchaseById = createAsyncThunk(
  'purchase/fetchPurchaseById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.PURCHASES.BY_ID(id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchase');
    }
  }
);

export const updatePurchase = createAsyncThunk(
  'purchase/updatePurchase',
  async ({ id, paymentStatus }: { id: string; paymentStatus: 'Paid' | 'Cancelled' }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.patch(API_ENDPOINTS.PURCHASES.UPDATE(id), { paymentStatus });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update purchase');
    }
  }
);

export const fetchRevenue = createAsyncThunk(
  'purchase/fetchRevenue',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.PURCHASES.REVENUE);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch revenue');
    }
  }
);

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    clearCurrentPurchase: (state) => {
      state.currentPurchase = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create purchase
    builder.addCase(createPurchase.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPurchase.fulfilled, (state, action) => {
      state.loading = false;
      state.myPurchases.unshift(action.payload);
    });
    builder.addCase(createPurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch my purchases
    builder.addCase(fetchMyPurchases.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyPurchases.fulfilled, (state, action) => {
      state.loading = false;
      state.myPurchases = action.payload;
    });
    builder.addCase(fetchMyPurchases.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch all purchases
    builder.addCase(fetchAllPurchases.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPurchases.fulfilled, (state, action) => {
      state.loading = false;
      state.purchases = action.payload.purchases;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchAllPurchases.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch purchase by ID
    builder.addCase(fetchPurchaseById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPurchaseById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPurchase = action.payload;
    });
    builder.addCase(fetchPurchaseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update purchase
    builder.addCase(updatePurchase.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePurchase.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.purchases.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.purchases[index] = action.payload;
      }
    });
    builder.addCase(updatePurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch revenue
    builder.addCase(fetchRevenue.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.revenue = action.payload;
    });
    builder.addCase(fetchRevenue.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentPurchase, clearError } = purchaseSlice.actions;
export default purchaseSlice.reducer;

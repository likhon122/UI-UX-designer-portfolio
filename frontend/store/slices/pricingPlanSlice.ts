import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/config';

export interface PricingPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  features: string[];
  duration: number;
  createdAt?: string;
}

interface PricingPlanState {
  pricingPlans: PricingPlan[];
  currentPricingPlan: PricingPlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: PricingPlanState = {
  pricingPlans: [],
  currentPricingPlan: null,
  loading: false,
  error: null,
};

export const fetchPricingPlans = createAsyncThunk(
  'pricingPlan/fetchPricingPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.PRICING_PLANS.ALL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pricing plans');
    }
  }
);

export const fetchPricingPlanById = createAsyncThunk(
  'pricingPlan/fetchPricingPlanById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.PRICING_PLANS.BY_ID(id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pricing plan');
    }
  }
);

export const createPricingPlan = createAsyncThunk(
  'pricingPlan/createPricingPlan',
  async (planData: Omit<PricingPlan, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.PRICING_PLANS.CREATE, planData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create pricing plan');
    }
  }
);

export const updatePricingPlan = createAsyncThunk(
  'pricingPlan/updatePricingPlan',
  async ({ id, data }: { id: string; data: Partial<PricingPlan> }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.patch(API_ENDPOINTS.PRICING_PLANS.UPDATE(id), data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update pricing plan');
    }
  }
);

const pricingPlanSlice = createSlice({
  name: 'pricingPlan',
  initialState,
  reducers: {
    clearCurrentPricingPlan: (state) => {
      state.currentPricingPlan = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all pricing plans
    builder.addCase(fetchPricingPlans.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPricingPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.pricingPlans = action.payload;
    });
    builder.addCase(fetchPricingPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch pricing plan by ID
    builder.addCase(fetchPricingPlanById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPricingPlanById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPricingPlan = action.payload;
    });
    builder.addCase(fetchPricingPlanById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create pricing plan
    builder.addCase(createPricingPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPricingPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.pricingPlans.push(action.payload);
    });
    builder.addCase(createPricingPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update pricing plan
    builder.addCase(updatePricingPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePricingPlan.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.pricingPlans.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.pricingPlans[index] = action.payload;
      }
      if (state.currentPricingPlan?.id === action.payload.id) {
        state.currentPricingPlan = action.payload;
      }
    });
    builder.addCase(updatePricingPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentPricingPlan, clearError } = pricingPlanSlice.actions;
export default pricingPlanSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/config';

export interface Design {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  } | string;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects: string[];
  price: number;
  process: string;
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  tags: string[];
  status: 'Active' | 'Draft' | 'Archived';
  createdAt: string;
}

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: DesignState = {
  designs: [],
  currentDesign: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const fetchDesigns = createAsyncThunk(
  'design/fetchDesigns',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(`${API_ENDPOINTS.DESIGNS.ALL}?page=${page}&limit=${limit}`);
      // Backend returns array directly in data, not an object with designs property
      const designs = Array.isArray(response.data) ? response.data : [];
      return {
        designs,
        pagination: {
          page,
          limit,
          total: designs.length,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designs');
    }
  }
);

export const fetchDesignById = createAsyncThunk(
  'design/fetchDesignById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.DESIGNS.BY_ID(id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch design');
    }
  }
);

export const createDesign = createAsyncThunk(
  'design/createDesign',
  async (designData: Partial<Design>, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.DESIGNS.CREATE, designData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create design');
    }
  }
);

export const updateDesign = createAsyncThunk(
  'design/updateDesign',
  async ({ id, data }: { id: string; data: Partial<Design> }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.patch(API_ENDPOINTS.DESIGNS.UPDATE(id), data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update design');
    }
  }
);

export const deleteDesign = createAsyncThunk(
  'design/deleteDesign',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(API_ENDPOINTS.DESIGNS.DELETE(id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete design');
    }
  }
);

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    clearCurrentDesign: (state) => {
      state.currentDesign = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all designs
    builder.addCase(fetchDesigns.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDesigns.fulfilled, (state, action) => {
      state.loading = false;
      state.designs = action.payload.designs || [];
      state.pagination = action.payload.pagination || { page: 1, limit: 10, total: 0 };
    });
    builder.addCase(fetchDesigns.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.designs = [];
    });

    // Fetch design by ID
    builder.addCase(fetchDesignById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDesignById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentDesign = action.payload;
    });
    builder.addCase(fetchDesignById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create design
    builder.addCase(createDesign.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createDesign.fulfilled, (state, action) => {
      state.loading = false;
      state.designs.unshift(action.payload);
    });
    builder.addCase(createDesign.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update design
    builder.addCase(updateDesign.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDesign.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.designs.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.designs[index] = action.payload;
      }
      if (state.currentDesign?.id === action.payload.id) {
        state.currentDesign = action.payload;
      }
    });
    builder.addCase(updateDesign.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete design
    builder.addCase(deleteDesign.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDesign.fulfilled, (state, action) => {
      state.loading = false;
      state.designs = state.designs.filter(d => d.id !== action.payload);
    });
    builder.addCase(deleteDesign.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentDesign, clearError } = designSlice.actions;
export default designSlice.reducer;

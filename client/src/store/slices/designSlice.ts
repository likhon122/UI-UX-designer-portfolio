import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Design, CreateDesignData } from '../../types';
import { designService } from '../../services/design.service';

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  } | null;
}

const initialState: DesignState = {
  designs: [],
  currentDesign: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchDesigns = createAsyncThunk(
  'designs/fetchAll',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await designService.getAllDesigns(page, limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch designs');
    }
  }
);

export const fetchDesignById = createAsyncThunk(
  'designs/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await designService.getDesignById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch design');
    }
  }
);

export const createDesign = createAsyncThunk(
  'designs/create',
  async (data: CreateDesignData, { rejectWithValue }) => {
    try {
      const response = await designService.createDesign(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create design');
    }
  }
);

export const updateDesign = createAsyncThunk(
  'designs/update',
  async ({ id, data }: { id: string; data: Partial<CreateDesignData> }, { rejectWithValue }) => {
    try {
      const response = await designService.updateDesign(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update design');
    }
  }
);

export const deleteDesign = createAsyncThunk(
  'designs/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await designService.deleteDesign(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete design');
    }
  }
);

const designSlice = createSlice({
  name: 'designs',
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
      state.designs = action.payload.items;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchDesigns.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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
    builder.addCase(updateDesign.fulfilled, (state, action) => {
      const index = state.designs.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.designs[index] = action.payload;
      }
      if (state.currentDesign?.id === action.payload.id) {
        state.currentDesign = action.payload;
      }
    });

    // Delete design
    builder.addCase(deleteDesign.fulfilled, (state, action) => {
      state.designs = state.designs.filter((d) => d.id !== action.payload);
    });
  },
});

export const { clearCurrentDesign, clearError } = designSlice.actions;
export default designSlice.reducer;

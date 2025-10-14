import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/config';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(`${API_ENDPOINTS.CATEGORIES.ALL}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.CATEGORIES.BY_ID(id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (name: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.CATEGORIES.CREATE, { name });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.patch(API_ENDPOINTS.CATEGORIES.UPDATE(id), { name });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch category by ID
    builder.addCase(fetchCategoryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentCategory = action.payload;
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.unshift(action.payload);
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update category
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      if (state.currentCategory?.id === action.payload.id) {
        state.currentCategory = action.payload;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;

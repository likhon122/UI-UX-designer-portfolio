import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/config';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'superAdmin';
  phone?: string;
  address?: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      apiClient.setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { 
    name: string; 
    email: string; 
    password: string;
    phone?: string;
    address?: string;
    profileImage?: string;
  }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (token: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, { token });
      apiClient.setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      apiClient.clearAccessToken();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const getMyProfile = createAsyncThunk(
  'auth/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.get(API_ENDPOINTS.USERS.ME);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, changedPassword }: { token: string; changedPassword: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        { changedPassword },
        { headers: { Authorization: token } }
      );
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.patch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      apiClient.setAccessToken(action.payload.accessToken);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      apiClient.clearAccessToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    });

    // Get My Profile
    builder.addCase(getMyProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { setCredentials, clearCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;

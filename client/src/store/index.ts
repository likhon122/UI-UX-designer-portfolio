import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import designReducer from './slices/designSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    designs: designReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

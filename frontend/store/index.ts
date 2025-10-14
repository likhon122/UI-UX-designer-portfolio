import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import designReducer from './slices/designSlice';
import categoryReducer from './slices/categorySlice';
import purchaseReducer from './slices/purchaseSlice';
import pricingPlanReducer from './slices/pricingPlanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    design: designReducer,
    category: categoryReducer,
    purchase: purchaseReducer,
    pricingPlan: pricingPlanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

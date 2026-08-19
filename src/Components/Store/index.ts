import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Store/authSlice';
import shoppingReducer from './slices/shoppingSlice';

// Create the global store that combines all our data slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping: shoppingReducer,
  },
});

// Type to understand what the total shape of our store looks like
export type RootState = ReturnType<typeof store.getState>;

// Type to manage sending our actions to the reducers smoothly
export type AppDispatch = typeof store.dispatch;
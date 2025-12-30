import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import restaurantReducer from "./slices/restaurantSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
  },
});

// Types (VERY IMPORTANT for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

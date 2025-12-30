import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface Restaurant {
    _id: string;
    name: string;
    phone: string;
    role: "RESTAURANT";
    isActive: boolean;
    subscriptionStatus: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
  }
  
  interface RestaurantState {
    list: Restaurant[];
    selected: Restaurant | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: RestaurantState = {
    list: [],
    selected: null,
    loading: false,
    error: null,
  };


const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    // 🔄 When fetching all restaurants
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },

    // 👁 View / Edit restaurant
    setSelectedRestaurant: (
      state,
      action: PayloadAction<Restaurant | null>
    ) => {
      state.selected = action.payload;
    },

    // ⏳ Loading state
    setRestaurantLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ❌ Error handling
    setRestaurantError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ➕ Add restaurant (after create)
    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.list.unshift(action.payload);
    },

    // 🗑 Delete restaurant
    removeRestaurant: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(r => r._id !== action.payload);
    },
  },
});

export const {
  setRestaurants,
  setSelectedRestaurant,
  setRestaurantLoading,
  setRestaurantError,
  addRestaurant,
  removeRestaurant,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

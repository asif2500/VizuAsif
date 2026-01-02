import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlanProps } from "@/lib/type";

export interface RestaurantType {
  _id: string;
  name: string;
  phone: string;
  role: "RESTAURANT";
  isActive: boolean;
  subscriptionStatus: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  models?: {
    count: number;
    _id: string;
    isActive: boolean;
    pricePlanID: PlanProps;
  }[];
}

interface RestaurantState {
  list: RestaurantType[];
  selected: RestaurantType | null;
  loading: boolean;
  error: string | null;
  models: { count: number; _id: string }[];
}

const initialState: RestaurantState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  models: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    // 🔄 When fetching all restaurants
    setRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },

    setRestaurantModel: (state, action) => {
      state.models = action.payload;
    },
    // 👁 View / Edit restaurant
    setSelectedRestaurant: (
      state,
      action: PayloadAction<RestaurantType | null>
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
    addRestaurant: (state, action: PayloadAction<RestaurantType>) => {
      state.list.unshift(action.payload);
    },

    // 🗑 Delete restaurant
    removeRestaurant: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((r) => r._id !== action.payload);
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
  setRestaurantModel,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

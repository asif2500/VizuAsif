import {
  addRestaurant,
  setRestaurants,
  removeRestaurant,
  setRestaurantError,
  setRestaurantLoading,
  setSelectedRestaurant,
} from "@/redux/slices/restaurantSlice";

import { api } from ".";
import type { AppDispatch } from "@/redux";
import type { LoginPayload } from "@/lib/interface";
import type { Dispatch, SetStateAction } from "react";
import type {
  DeleteRestaurantProps,
  PlanProps,
  RestaurantFields,
} from "@/lib/type";

export const createRestaurantAPI = (
  payload: RestaurantFields,
  onClose: () => void,
  setForm: Dispatch<SetStateAction<RestaurantFields>>
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.post("/rest/create-restaurant", payload);
      if (data.success) {
        onClose();
        setForm({ name: "", phone: "", password: "" });
        dispatch(addRestaurant(data.data));
      } else {
        dispatch(setRestaurantError(data.error));
      }
      dispatch(setRestaurantLoading(false));
    } catch (error: any) {
      dispatch(setRestaurantError(error?.response?.data?.error));
    }
  };
};

export const restaurantLoginAPI = async (payload: LoginPayload) => {
  try {
    const { data } = await api.post("/rest/login-restaurant", payload);

    if (!data.success) {
      throw new Error(data.error || "Restaurant login failed");
    }

    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("token", data.token);

    return data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Restaurant login failed" };
  }
};

export const updateRestaurantByIdAPI = (id: string, payload: LoginPayload) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.put(`/rest/update-restaurant/${id}`, payload);
      if (data.success) dispatch(getAllRestaurantAPI());
      else dispatch(setRestaurantError(data.error));
    } catch (error) {
      dispatch(setRestaurantError("Failed to fetch restaurants"));
    }
  };
};

export const getAllRestaurantAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.get("/rest/get-all-restaurant");
      dispatch(setRestaurants(data.data));
      dispatch(setRestaurantLoading(false));
    } catch (err: any) {
      dispatch(setRestaurantError("Failed to fetch restaurants"));
    }
  };
};

export const getRestaurantByIdAPI = (_id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.get(`/rest/get-restaurant/${_id}`);
      if (data.success) dispatch(setSelectedRestaurant(data.data));
      dispatch(setRestaurantLoading(false));
    } catch (error: any) {
      dispatch(setRestaurantError("Failed to fetch restaurants"));
      throw error?.response?.data || { message: "Get Restaurant By ID failed" };
    }
  };
};

export const deleteRestaurantAPI = (
  id: string,
  setDeleteRestaurant: Dispatch<SetStateAction<DeleteRestaurantProps>>
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));

      const { data } = await api.delete(`/rest/delete-restaurant/${id}`);

      if (!data.success) {
        throw new Error(data.message || "Delete failed");
      }

      dispatch(removeRestaurant(id));
      dispatch(setRestaurantLoading(false));
      setDeleteRestaurant({
        _id: "",
        visible: false,
      });
      return true;
    } catch (error: any) {
      dispatch(setRestaurantError("Unable to delete restaurant"));
    }
  };
};

export const saveModelForRestaurantAPI = (
  id: string,
  payload: { count: number; pricePlanID: string },
  onClose: () => void,
  setForm: Dispatch<
    SetStateAction<{
      count: number | null;
      pricePlanID: string;
      plans: PlanProps[];
    }>
  >
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.post(`rest/apply-for-model/${id}`, payload);
      if (data.success) {
        dispatch(getAllRestaurantAPI());
        onClose();
        setForm({ count: null, pricePlanID: "", plans: [] });
      } else {
        dispatch(setRestaurantError(data.error));
      }
      dispatch(setRestaurantLoading(false));
    } catch (err: any) {
      console.log("error", err.response.data.error);
      dispatch(setRestaurantError(err.response.data.error));
    }
  };
};

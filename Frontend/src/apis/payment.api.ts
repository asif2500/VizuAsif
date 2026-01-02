import type { AppDispatch } from "@/redux";
import { api } from ".";
import type { Dispatch, SetStateAction } from "react";
import { getAllRestaurantAPI, getRestaurantByIdAPI } from "./restaurant.api";

export const getPricingPlans = async () => {
  const { data } = await api.get("pricing-plan");
  if (data.success) return data.data;
};

export const createPricingPlan = async (payload: any) => {
  await api.post("pricing-plan", payload);
};

export const updatePricingPlan = async (id: string, payload: any) => {
  await api.put(`pricing-plan/${id}`, payload);
};

export const createPaymentAPI = (
  payload: any,
  onClose: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoading(true);
      const { data } = await api.post("/payment", payload);
      if (data.success) {
        onClose();
        setLoading(false);
        getRestaurantByIdAPI(payload.restaurantID)(dispatch);
        getAllRestaurantAPI()(dispatch);
      }
    } catch (error: any) {
      // console.log("error ==>",error);
      console.log("error ==>", error?.response?.data?.error);
      setLoading(false);
    }
  };
};

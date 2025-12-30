import { api } from ".";
import type { LoginPayload } from "@/lib/interface";
import type { Dispatch, SetStateAction } from "react";
import type {  DeleteRestaurantProps, RestaurantFields } from "@/lib/type";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "@/redux";
import {
  addRestaurant,
  removeRestaurant,
  setRestaurantError,
  setRestaurantLoading,
  setRestaurants,
  setSelectedRestaurant,
} from "@/redux/slices/restaurantSlice";

// export const adminRegisterAPI = async (payload: RegisterPayload) => {
//   try {
//     const { data } = await api.post("/admin/register", payload);

//     if (!data.success) {
//       throw new Error(data.error || "Admin registration failed");
//     }

//     return data;
//   } catch (error: any) {
//     throw error?.response?.data || { message: "Admin registration failed" };
//   }
// };

export const adminLoginAPI = async (
  payload: LoginPayload,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  setLoading(true);
  try {
    const { data } = await api.post("/admin/login", payload);
    setLoading(false);
    if (data.success) {
      navigate("/admin/dashboard");
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);
    } else {
      setError(data.error);
    }
  } catch (error: any) {
    setLoading(false);
    throw error?.response?.data || { message: "Admin login failed" };
  }
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

export const logoutAPI = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const createRestaurantAPI = (
  payload: RestaurantFields,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  onClose: () => void,
  setForm: Dispatch<SetStateAction<RestaurantFields>>
) => {
  return async (dispatch: AppDispatch) => {
    setLoading(true);
    try {
      const { data } = await api.post("/rest/create-restaurant", payload);
      setLoading(false);
      if (data.success) {
        onClose();
        setForm({ name: "", phone: "", password: "" });
        // getAllRestaurantAPI()(dispatch);
        dispatch(addRestaurant(data.data))
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setLoading(false);
      throw error?.response?.data || { message: "Admin Register failed" };
    }
  };
};

export const getAllRestaurantAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.get("/rest/get-all-restaurant");
      dispatch(setRestaurants(data.data));
    } catch (err: any) {
      dispatch(setRestaurantError("Failed to fetch restaurants"));
    }
  };
};

export const getRestaurantByIdAPI =  (
  _id: string,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRestaurantLoading(true));
      const { data } = await api.get(`/rest/get-restaurant/${_id}`);
      dispatch(setRestaurantLoading(false));
      if (data.success) dispatch(setSelectedRestaurant(data.data));
    } catch (error: any) {
      dispatch(setRestaurantError("Failed to fetch restaurants"));
      throw error?.response?.data || { message: "Get Restaurant By ID failed" };
    }
  }
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
      dispatch(setRestaurantLoading(false));
      dispatch(setRestaurantError("Unable to delete restaurant"));
      throw error?.response?.data || { message: "Unable to delete restaurant" };
    }
  }
};

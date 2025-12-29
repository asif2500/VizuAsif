import { api } from ".";
import type {
  LoginPayload,
  //  RegisterPayload
} from "@/lib/interface";
import type { Dispatch, SetStateAction } from "react";
import type {
  DeleteRestaurantProps,
  RestaurantArrayProps,
  RestaurantFields,
} from "@/lib/type";
import type { NavigateFunction } from "react-router-dom";

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

export const createRestaurantAPI = async (
  payload: RestaurantFields,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  onClose: () => void,
  setForm: Dispatch<SetStateAction<RestaurantFields>>
) => {
  setLoading(true);
  try {
    const { data } = await api.post("/rest/create-restaurant", payload);
    setLoading(false);
    console.log("==>", data);
    if (data.success) {
      onClose();
      setForm({ name: "", phone: "", password: "" });
    } else {
      setError(data.message);
    }
  } catch (error: any) {
    setLoading(false);
    throw error?.response?.data || { message: "Admin login failed" };
  }
};

export const getAllRestaurantAPI = async (
  setData: Dispatch<SetStateAction<RestaurantArrayProps>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const { data } = await api.get("/rest/get-all-restaurant");
    setData(data.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};

export const getRestaurantByIdAPI = async (
  _id: string,
  setData: any,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const { data } = await api.get(`/rest/get-restaurant/${_id}`);
    setLoading(false);
    if (data.success) setData(data.data);
  } catch (error: any) {
    setLoading(false);
    throw error?.response?.data || { message: "Admin login failed" };
  }
};

export const deleteRestaurantAPI = async (
  _id: string,
  setDeleteRestaurant: Dispatch<SetStateAction<DeleteRestaurantProps>>
) => {
  setDeleteRestaurant((prev) => ({
    ...prev,
    loading: true,
  }));
  try {
    const { data } = await api.delete(`/rest/delete-restaurant/${_id}`);
    setDeleteRestaurant((prev) => ({
      ...prev,
      loading: false,
    }));
    if (data.success) {
      setDeleteRestaurant((prev) => ({
        ...prev,
        visible: false,
      }));
    }
  } catch (error: any) {
    setDeleteRestaurant((prev) => ({
      ...prev,
      loading: false,
    }));
    throw error?.response?.data || { message: "Unable to Delete" };
  }
};

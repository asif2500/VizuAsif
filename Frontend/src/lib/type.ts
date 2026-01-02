import type { RestaurantType } from "@/redux/slices/restaurantSlice";

export type ValidationPrpos = {
  visible: boolean;
  text: string | null;
  variant?: "error" | "success" | "info";
};

export type UrlProps = {
  glbUrl: string;
  usdzUrl: string;
};

export type CreateRestaurantProps = {
  open: boolean;
  onClose: () => void;
};

export type RestaurantFields = {
  name: string;
  phone: string;
  password: string;
};

export type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  title: string;
  description: string;
  isLoading: boolean;
  actionText: string;
};

export type DeleteRestaurantProps = {
  visible: boolean;
  _id: string;
};

export type ViewRestaurantProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export type EditRestaurantProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  data: RestaurantType | null;
};

export type ViewRestaurantModelProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export type ApplyForModelProps = {
  restaurantID: string;
  open: boolean;
  onClose: () => void;
};

export type PlanProps = {
  _id: string;
  name: string;
  monthlyFee: number;
  perModel: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MarkAsPaidDialogProps = {
  open: boolean;
  onClose: () => void;
  restaurantID: string;
  pricePlanID: string;
  restaurant: RestaurantType | null;
  modelID: string;
};

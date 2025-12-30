export type ValidationPrpos = {
  visible: boolean;
  text: string;
  variant?: "error" | "success" | "info";
};

export type UrlProps = {
  glbUrl: string;
  usdzUrl?: string;
};

export type RestaurantProps = {
  _id: string;
  name: string;
  phone: string;
  subscriptionStatus: string;
};

export type RestaurantArrayProps = RestaurantProps[];

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
  loading: boolean,
  visible: boolean,
  _id: string
}

export type ViewRestaurantProps = {
  open: boolean,onClose:() =>void,id: string
}
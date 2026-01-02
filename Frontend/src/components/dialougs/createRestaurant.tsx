import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Validation } from "../ui/validation";
import { Button } from "@/components/ui/button";
import { createRestaurantAPI } from "@/apis/restaurant.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { CreateRestaurantProps, RestaurantFields } from "@/lib/type";
import { setRestaurantError } from "@/redux/slices/restaurantSlice";

export const CreateRestaurant = ({ open, onClose }: CreateRestaurantProps) => {
  const dispatch = useAppDispatch()
  const { loading,error } = useAppSelector((state) => state.restaurant);

  const [form, setForm] = useState<RestaurantFields>({
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit =  () => {
    dispatch(setRestaurantError(""));
    createRestaurantAPI(form,onClose,setForm)(dispatch)}
  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Restaurant</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Restaurant name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              name="phone"
              placeholder="03xxxxxxxxx"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <Validation visible={error !== ""} text={error} />

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Restaurant"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

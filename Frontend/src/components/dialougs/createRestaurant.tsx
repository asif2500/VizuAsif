import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Validation } from "../ui/validation";
import type { CreateRestaurantProps, RestaurantFields } from "@/lib/type";
import { createRestaurantAPI } from "@/apis/auth.api";

export const CreateRestaurant = ({ open, onClose }: CreateRestaurantProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<RestaurantFields>({
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    createRestaurantAPI(form,setLoading,setError,onClose,setForm);

   
  };

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

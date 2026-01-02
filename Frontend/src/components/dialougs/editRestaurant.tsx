import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { updateRestaurantByIdAPI } from "@/apis/restaurant.api";
import type { EditRestaurantProps } from "@/lib/type";
import { Validation } from "../ui/validation";

const EditRestaurant = ({ open, onClose, id, data }: EditRestaurantProps) => {
  const dispatch = useAppDispatch();
  const { loading,error } = useAppSelector((state) => state.restaurant);

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (open && data) {
      setForm({
        phone: data.phone || "",
        password: "********",
      });
    }
  }, [open, data]);

  const handleSubmit = () => {
    updateRestaurantByIdAPI(id, form,)(dispatch);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Restaurant</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* NAME (READ ONLY) */}
            <div className="space-y-1">
              <Label>Name</Label>
              <Input value={data?.name || ""} disabled />
            </div>

            {/* PHONE */}
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* PASSWORD (HIDDEN) */}
            <div className="space-y-1">
              <Label>Password</Label>
              <Input value="••••••••" />
            </div>

            {/* ACTIONS */}
            <Validation visible={error !== ""} text={error} />

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditRestaurant;

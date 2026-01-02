import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getPricingPlans } from "@/apis/payment.api";
import { saveModelForRestaurantAPI } from "@/apis/restaurant.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Validation } from "../ui/validation";
import { setRestaurantError } from "@/redux/slices/restaurantSlice";
import type { ApplyForModelProps, PlanProps } from "@/lib/type";

const ApplyForModel = ({ restaurantID, open, onClose }: ApplyForModelProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.restaurant);
  const [form, setForm] = useState<{
    count: number | null;
    pricePlanID: string;
    plans: PlanProps[];
  }>({
    count: null,
    plans: [],
    pricePlanID: "",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPricingPlans();
      setForm((pre) => ({
        count: pre.count,
        plans: data,
        pricePlanID: pre.pricePlanID,
      }));
    };
    fetchPlans();
  }, []);

  const handleSubmit = () => {
    if (form.count && form.pricePlanID) {
      saveModelForRestaurantAPI(
        restaurantID,
        { count: form.count, pricePlanID: form.pricePlanID },
        onClose,
        setForm
      )(dispatch);
      dispatch(setRestaurantError(""));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Model</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>How many models you want to apply for?</Label>
            <Input
              name="count"
              placeholder="1,2,5,10"
              value={form.count ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  count: e.target.value ? Number(e.target.value) : null,
                  pricePlanID: prev.pricePlanID,
                  plans: prev.plans,
                }))
              }
            />
          </div>
          <Select
            value={form.pricePlanID}
            onValueChange={(value) =>
              setForm((pre) => ({ ...pre, pricePlanID: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price Plans</SelectLabel>
                {form.plans.map((plan) => (
                  <SelectItem key={plan._id} value={plan._id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Validation visible={error !== ""} text={error} />
          <Button onClick={handleSubmit} className="w-full">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyForModel;

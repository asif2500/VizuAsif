import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import {
  getAllRestaurantAPI,
  getRestaurantByIdAPI,
} from "@/apis/restaurant.api";
import { useSearchParams } from "react-router-dom";
import MarkAsPaidDialog from "@/components/dialougs/mark-as-paid-dialog";
import type { RestaurantType } from "@/redux/slices/restaurantSlice";

const AdminRestaurantsPayment = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const restaurantID = searchParams.get("code");
  const [markAsPaidDialog, setMarkAsPaidDialog] = useState<{
    visible: boolean;
    restaurantID: string;
    pricePlanID: string;
    modelID: string;
    restaurant: RestaurantType | null;
  }>({
    visible: false,
    restaurantID: "",
    pricePlanID: "",
    modelID: "",
    restaurant: null,
  });
  const {
    selected,
    loading: restaurantLoading,
    list,
  } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    if (restaurantID) {
      getRestaurantByIdAPI(restaurantID)(dispatch);
      getAllRestaurantAPI()(dispatch);
    }
  }, [restaurantID]);

  return (
    <div className="space-y-6">
      <Label className="text-xl font-semibold">
        {restaurantLoading
          ? "Please Wait..."
          : `${selected?.name ?? "Restaurant"} – Subscription & Payments`}
      </Label>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Models</TableHead>
            <TableHead>One-Time Payment</TableHead>
            <TableHead>Monthly Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.map((restaurant) =>
            (restaurant.models || []).map((model) => {
              const oneTimePayment = model.count * model.pricePlanID.perModel;
              const monthlyPayment = model.pricePlanID.monthlyFee;
              console.log({
                modelID: model._id,
                restaurantID: restaurant._id,
                pricePlanID: model.pricePlanID._id,
              });
              return (
                <TableRow key={model._id}>
                  <TableCell className="font-medium">
                    {model.pricePlanID.name}
                  </TableCell>

                  <TableCell>{model.count}</TableCell>

                  <TableCell>Rs {oneTimePayment.toLocaleString()}</TableCell>

                  <TableCell>
                    Rs {monthlyPayment.toLocaleString()} / month
                  </TableCell>

                  <TableCell>
                    <Badge variant={model.isActive ? "default" : "destructive"}>
                      {model.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-3">
                    {!model.isActive ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          setMarkAsPaidDialog({
                            restaurant,
                            visible: true,
                            modelID: model._id,
                            restaurantID: restaurant._id,
                            pricePlanID: model.pricePlanID._id,
                          })
                        }
                      >
                        Mark as Paid
                      </Button>
                    ) : (
                      <Switch
                        checked={model.isActive}
                        onCheckedChange={(value) => {
                          // 🔥 call API to toggle active/inactive
                          console.log("Toggle:", value);
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <MarkAsPaidDialog
        open={markAsPaidDialog.visible}
        onClose={() =>
          setMarkAsPaidDialog({
            modelID: "",
            visible: false,
            pricePlanID: "",
            restaurantID: "",
            restaurant: null,
          })
        }
        modelID={markAsPaidDialog.modelID}
        restaurantID={markAsPaidDialog.restaurantID}
        pricePlanID={markAsPaidDialog.pricePlanID}
        restaurant={markAsPaidDialog.restaurant}
      />
    </div>
  );
};

export default AdminRestaurantsPayment;

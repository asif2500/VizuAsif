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

  const ddOne = {
    selected: {
      _id: "695d24da6c9b6807032e272d",
      name: "Macdonals",
      phone: "03232327",
      password: "$2b$10$IkqgmXleIKrhaWHcuVgenuApN.hEndOw7RzIShsq3CCQcaM24KqVK",
      role: "RESTAURANT",
      isActive: false,
      subscriptionStatus: "inactive",
      models: [],
      threeDModels: [],
      createdAt: "2026-01-06T15:06:02.411Z",
      updatedAt: "2026-01-06T15:06:02.411Z",
      __v: 0,
    },
  };

  const ddTwo = {
    selected: {
      _id: "695697248caa71bbf036ffed",
      name: "KFC",
      phone: "04648484848",
      password: "$2b$10$ngGYb.OoptTNLRaNbtVD0etaWwOSdXcG2UiWDh8PBw3byk27kGN4m",
      role: "RESTAURANT",
      isActive: true,
      subscriptionStatus: "active",
      models: [
        {
          count: 10,
          pricePlanID: "69566d71b021a90636ec0444",
          isActive: true,
          _id: "6956972b8caa71bbf036fff0",
        },
      ],
      createdAt: "2026-01-01T15:47:48.839Z",
      updatedAt: "2026-01-02T11:38:05.387Z",
      __v: 1,
      threeDModels: [],
    },
  };
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
              if (restaurant._id === selected?._id) {
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
                      <Badge
                        variant={model.isActive ? "default" : "destructive"}
                      >
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
              }
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

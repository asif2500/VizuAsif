import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { KeyValueInfo } from "../common/key-value-info";
import type { ViewRestaurantProps } from "@/lib/type";
import { getRestaurantByIdAPI } from "@/apis/restaurant.api";

const ViewRestaurant = ({ open, onClose, id }: ViewRestaurantProps) => {
  const dispatch = useAppDispatch();
  const { selected, loading } = useAppSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    if (open && id) {
      getRestaurantByIdAPI(id)(dispatch)
    }
  }, [open, id, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Restaurant Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : !selected ? (
          <Label className="text-sm text-muted-foreground text-center">
            No data found
          </Label>
        ) : (
          <div className="space-y-4">
            {/* BASIC INFO */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                BASIC INFORMATION
              </Label>

              <div className="grid grid-cols-2 gap-4">
                <KeyValueInfo label="Name" value={selected.name} />
                <KeyValueInfo label="Phone" value={selected.phone} />
                <KeyValueInfo label="Role" value={selected.role} />
                <KeyValueInfo
                  label="Active"
                  value={
                    <Badge
                      variant={selected.isActive ? "default" : "secondary"}
                    >
                      {selected.isActive ? "Active" : "Inactive"}
                    </Badge>
                  }
                />
              </div>
            </div>

            <Separator />

            {/* SUBSCRIPTION */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                SUBSCRIPTION
              </Label>

              <div className="grid grid-cols-2 gap-4">
                <KeyValueInfo
                  label="Status"
                  value={
                    <Badge
                      variant={
                        selected.subscriptionStatus === "active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {selected.subscriptionStatus}
                    </Badge>
                  }
                />
                <KeyValueInfo
                  label="Created At"
                  value={new Date(
                    selected.createdAt
                  ).toLocaleDateString()}
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewRestaurant;

import { getRestaurantByIdAPI } from "@/apis/auth.api";
import type { ViewRestaurantProps } from "@/lib/type";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KeyValueInfo } from "../common/key-value-info";

type Restaurant = {
  _id: string;
  name: string;
  phone: string;
  role: string;
  isActive: boolean;
  subscriptionStatus: string;
  createdAt: string;
};

const ViewRestaurant = ({ open, onClose, id }: ViewRestaurantProps) => {
  const [data, setData] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && id) {
      setLoading(true);
      getRestaurantByIdAPI(id, setData, setLoading);
    }
  }, [open, id]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Restaurant Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : !data ? (
          <p className="text-sm text-muted-foreground text-center">
            No data found
          </p>
        ) : (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                BASIC INFORMATION
              </Label>

              <div className="grid grid-cols-2 gap-4">
                <KeyValueInfo label="Name" value={data.name} />
                <KeyValueInfo label="Phone" value={data.phone} />
                <KeyValueInfo label="Role" value={data.role} />
                <KeyValueInfo
                  label="Active"
                  value={
                    <Badge variant={data.isActive ? "default" : "secondary"}>
                      {data.isActive ? "Active" : "Inactive"}
                    </Badge>
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Subscription */}
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
                        data.subscriptionStatus === "active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {data.subscriptionStatus}
                    </Badge>
                  }
                />
                <KeyValueInfo
                  label="Created At"
                  value={new Date(data.createdAt).toLocaleDateString()}
                />
              </div>
            </div>

            {/* 🚀 Future Sections */}
            {/* 
              - Payment History
              - Current Plan
              - Model Count
              - Last Login
            */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewRestaurant;

import { useState } from "react";
import type { MarkAsPaidDialogProps } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useAppDispatch } from "@/redux/hook";
import { createPaymentAPI } from "@/apis/payment.api";
import { Loader2 } from "lucide-react";

const MarkAsPaidDialog = ({
  open,
  onClose,
  restaurantID,
  pricePlanID,
  modelID,
}: MarkAsPaidDialogProps) => {
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState<"bank" | "cash" | "cheque">("bank");

  const [transactionId, setTransactionId] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleConfirm = () => {
    const payload = {
      modelID,
      pricingPlanID: pricePlanID,
      restaurantID,
      
      paymentMethod: method,
      transactionId: method === "bank" ? transactionId : null,
      chequeNumber: method === "cheque" ? chequeNumber : null,
    };

    createPaymentAPI(payload, onClose, setLoading)(dispatch);
  };


  const isDisabled =
    (method === "bank" && !transactionId) ||
    (method === "cheque" && !chequeNumber);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Mark as Paid</DialogTitle>
        </DialogHeader>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Payment Method</Label>

          <RadioGroup
            value={method}
            onValueChange={(value) =>
              setMethod(value as "bank" | "cash" | "cheque")
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank Transfer</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cheque" id="cheque" />
              <Label htmlFor="cheque">Cheque</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Bank Transfer */}
        {method === "bank" && (
          <div className="space-y-1">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              id="transactionId"
              placeholder="e.g. TXN-847362"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
        )}

        {/* Cheque */}
        {method === "cheque" && (
          <>
            <div className="space-y-1">
              <Label htmlFor="chequeNumber">Cheque Number</Label>
              <Input
                id="chequeNumber"
                placeholder="e.g. 004587"
                value={chequeNumber}
                onChange={(e) => setChequeNumber(e.target.value)}
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleConfirm}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Mark as Paid"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsPaidDialog;

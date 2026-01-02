import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Validation } from "../ui/validation";

type PricingPlanDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    _id?: string;
    name: string;
    monthlyFee: number;
    perModel: number;
  };
  submitAction: (data: any) => Promise<void>;
  title: string;
};

const PricingPlanDialog = ({
  open,
  onClose,
  onSuccess,
  initialData,
  submitAction,
  title,
}: PricingPlanDialogProps) => {
  const [form, setForm] = useState({
    name: "",
    monthlyFee: 0,
    perModel: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(
        initialData ?? { name: "", monthlyFee: 0, perModel: 0 }
      );
      setError(null);
    }
  }, [open, initialData]);

  const handleChange = (
    key: "name" | "monthlyFee" | "perModel",
    value: string
  ) => {
    setForm({
      ...form,
      [key]: key === "name" ? value : Number(value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await submitAction(form);
      onSuccess();     // refresh table
      onClose();       // close dialog ONLY on success
    } catch (err: any) {
      setError(err.response.data.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2">Monthly Fee</Label>
            <Input
              type="number"
              value={form.monthlyFee}
              onChange={(e) =>
                handleChange("monthlyFee", e.target.value)
              }
            />
          </div>

          <div>
            <Label className="mb-2">Per Model</Label>
            <Input
              type="number"
              value={form.perModel}
              onChange={(e) =>
                handleChange("perModel", e.target.value)
              }
            />
          </div>
<Validation text={error} visible={error !== ""}/>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingPlanDialog;

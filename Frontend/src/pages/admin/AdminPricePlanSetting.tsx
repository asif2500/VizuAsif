import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getPricingPlans,
  createPricingPlan,
  updatePricingPlan,
} from "@/apis/payment.api";
import PricingPlanDialog from "@/components/dialougs/add-edit-Price-Plan";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PricingPlan = {
  _id: string;
  name: string;
  monthlyFee: number;
  perModel: number;
};
const AdminBasePriceSetting = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const loadPlans = async () => {
    const data = await getPricingPlans();
    setPlans(data);
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Pricing Plans</h2>
        <Button
          onClick={() => {
            setEditingPlan(null);
            setOpen(true);
          }}
        >
          Add Plan
        </Button>
      </div>

    {/* Table */}
    <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Monthly Fee</TableHead>
              <TableHead>Per Model</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No plans found
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => (
                <TableRow key={plan._id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.monthlyFee}</TableCell>
                  <TableCell>{plan.perModel}</TableCell>
                  <TableCell className="text-right">
                  <Button
  variant="outline"
  size="sm"
  onClick={() => {
    setEditingPlan(plan); // pass whole plan
    setOpen(true);
  }}
>
  Edit
</Button>

                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PricingPlanDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadPlans}
        title={editingPlan ? "Edit Plan" : "Add Plan"}
        initialData={editingPlan}
        submitAction={(data) =>
          editingPlan
            ? updatePricingPlan(editingPlan._id, data)
            : createPricingPlan(data)
        }
      />
    </div>
  );
};

export default AdminBasePriceSetting;

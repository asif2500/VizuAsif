import { getAllRestaurantAPI } from "@/apis/restaurant.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppSelector,useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { list: restaurants, loading: restaurantLoading } = useAppSelector(
    (state) => state.restaurant
  );

  const totalRestaurants = restaurants.length;
  const activeSubscriptions = restaurants.filter(
    (r) => r.subscriptionStatus === "active"
  ).length;

  const totalModels = restaurants.reduce(
    (sum, r) => sum + (r.models?.length || 0),
    0
  );

  // Mock graph data (replace later with API)
  const chartData = [
    { month: "Aug", restaurants: 2 },
    { month: "Sep", restaurants: 4 },
    { month: "Oct", restaurants: 7 },
    { month: "Nov", restaurants: 12 },
    { month: "Dec", restaurants: totalRestaurants },
  ];

  useEffect(() => {
    getAllRestaurantAPI()(dispatch);

  }, [dispatch])
  

  const StatCard = ({ title, value }: any) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6 p-6">
      <Label className="text-xl font-semibold">Admin Dashboard</Label>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Restaurants" value={totalRestaurants} />
        <StatCard title="Active Subscriptions" value={activeSubscriptions} />
        <StatCard title="Total Models" value={totalModels} />
        <StatCard title="Revenue" value="Manual" />
      </div>

      {/* Graph + Recent Restaurants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Restaurant Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="restaurants"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>{restaurantLoading ? "Loading" : "New Restaurants"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {restaurants.slice(0, 10).map((r) => (
              <div
                key={r._id}
                className="flex justify-between text-sm"
              >
                <span>{r.name}</span>
                <span
                  className={
                    r.subscriptionStatus === "active"
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }
                >
                  {r.subscriptionStatus}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

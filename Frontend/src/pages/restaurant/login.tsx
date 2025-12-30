import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {  restaurantLoginAPI } from "@/apis/auth.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await restaurantLoginAPI({ phone, password });
      navigate("/restaurant/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[360px] space-y-4">
        <Label className="text-xl font-semibold">Restaurant Login</Label>

        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        {error && <Label className="text-red-500">{error}</Label>}

        <Button
        variant={"outline"}
          onClick={handleSubmit}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}

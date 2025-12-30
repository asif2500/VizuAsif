import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "@/apis/auth.api";
import { Validation } from "@/components/ui/validation";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    adminLoginAPI({ phone, password },setLoading,setError,navigate)
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg px-8 py-10 text-white shadow-xl">
        <Label className="mb-8  text-3xl font-semibold">
          Admin Login Form
        </Label>

        {/* Email */}
        <div className="mb-6">
          <Input
            type="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Validation  visible={error !== ""} text={error}/>

        <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full  bg-white text-black hover:bg-white/90 transition"
         > {loading ? "Logging In" :"Log In"}
        </Button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-white/80">
          Don't have an account?{" "}
          <span className="cursor-pointer underline hover:text-white">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

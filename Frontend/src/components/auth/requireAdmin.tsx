import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdmin() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || user?.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

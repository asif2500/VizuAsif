import { useAppSelector } from "@/redux/hook";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: "ADMIN" | "RESTAURANT";
}) {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return children;
}

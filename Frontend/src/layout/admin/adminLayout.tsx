import AdminNavbar from "@/components/admin/adminNavbar";
import AdminSidebar from "@/components/admin/adminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

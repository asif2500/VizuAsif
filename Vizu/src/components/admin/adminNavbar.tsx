import AdminSidebarMobile from "./adminSidebarMobile";

export default function AdminNavbar() {
  return (
    <header className="h-16 border-b flex items-center px-4 gap-4">
      <AdminSidebarMobile />
      <h1 className="font-semibold text-lg">Admin</h1>
    </header>
  );
}

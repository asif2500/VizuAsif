import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Box,
  CreditCard,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Restaurants",
    icon: Store,
    path: "/admin/restaurants",
  },
  {
    label: "3D Models",
    icon: Box,
    path: "/admin/models",
  },
  {
    label: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-background">
      <div className="h-16 flex items-center px-6 font-bold text-lg">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
               ${
                 isActive
                   ? "bg-primary text-primary-foreground"
                   : "text-muted-foreground hover:bg-muted"
               }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

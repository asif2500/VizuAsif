import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Store,
  Box,
  CreditCard,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Restaurants", icon: Store, path: "/admin/restaurants" },
  { label: "3D Models", icon: Box, path: "/admin/models" },
  { label: "Payments", icon: CreditCard, path: "/admin/payments" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden p-2">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0">
        <div className="h-16 px-6 flex items-center font-bold">
          Admin Panel
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm
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
      </SheetContent>
    </Sheet>
  );
}

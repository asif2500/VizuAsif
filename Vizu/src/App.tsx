import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./layout/admin/adminLayout";
import RestaurantLayout from "./layout/restaurant/restaurantLayout";

// Auth Guards
import RequireAdmin from "./components/auth/requireAdmin";
import RequireRestaurant from "./components/auth/requireRestaurant";

// Pages
import UserModelPage from "./pages/UserModelPage";

// Admin Pages
import AdminLogin from "./pages/admin/login";
import AdminSignup from "./pages/admin/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminRestaurants from "./pages/admin/restaurants";

// Restaurant Pages
import RestaurantLogin from "./pages/restaurant/login";
import RestaurantDashboard from "./pages/restaurant/dashboard";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserModelPage />} />

        {/* 👑 Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />

        {/* 👑 Admin Protected */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
          </Route>
        </Route>

        {/* 🍽 Restaurant Auth */}
        <Route path="/restaurant/login" element={<RestaurantLogin />} />

        {/* 🍽 Restaurant Protected */}
        <Route element={<RequireRestaurant />}>
          <Route path="/restaurant" element={<RestaurantLayout />}>
            <Route path="dashboard" element={<RestaurantDashboard />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= GUEST ================= */
import Guest from "./pages/guest/Guest";

/* ================= ADMIN ================= */
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import Dashboard from "./pages/admin/Dashboard";
import Keuangan from "./pages/admin/Keuangan";
import Riwayat from "./pages/admin/Riwayat";
import Penyewa from "./pages/admin/Penyewa";

/* ================= USER ================= */
import LoginUser from "./pages/user/LoginUser";
import RegisterUser from "./pages/user/RegisterUser";

/* ================= LAYOUT & GUARD ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <BrowserRouter>
    <Cursor />
      <Routes>

        {/* ================= GUEST (LANDING PAGE) ================= */}
        <Route path="/" element={<Guest />} />

        {/* ================= USER (PUBLIC / MOBILE) ================= */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* ================= ADMIN (PUBLIC) ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ================= ADMIN (PROTECTED) ================= */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/keuangan" element={<Keuangan />} />
          <Route path="/admin/riwayat" element={<Riwayat />} />
          <Route path="/admin/penyewa" element={<Penyewa />} />
        </Route>

        {/* ================= DEFAULT ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

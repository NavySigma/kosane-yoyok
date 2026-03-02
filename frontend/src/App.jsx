import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= GUEST ================= */
import Guest from "./pages/guest/Guest";

/* ================= MEMBER ================= */
import Member from "./pages/user/Member"; // Halaman utama member setelah login

/* ================= ADMIN ================= */
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import Dashboard from "./pages/admin/Dashboard";
import Keuangan from "./pages/admin/Keuangan";
import Riwayat from "./pages/admin/Riwayat";
import Penyewa from "./pages/admin/Penyewa";

/* ================= USER (AUTH) ================= */
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

        {/* ================= USER / MEMBER (AUTH) ================= */}
        {/* Sesuai referensi gambar login & register member */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* ================= MEMBER (PROTECTED/PRIVATE) ================= */}
        {/* Rute ini untuk user yang sudah login sebagai member */}
        <Route 
          path="/member" 
          element={
            <ProtectedRoute>
              <Member />
            </ProtectedRoute>
          } 
        />

        {/* ================= ADMIN (PUBLIC AUTH) ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ================= ADMIN (PROTECTED DASHBOARD) ================= */}
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

        {/* ================= DEFAULT REDIRECT ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Dashboard from "./pages/admin/Dashboard";
import Pemasukan from "./pages/admin/Pemasukan";
import Pengeluaran from "./pages/admin/Pengeluaran";
import Riwayat from "./pages/admin/Riwayat";
import Kamar from "./pages/admin/Kamar";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED + LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pemasukan" element={<Pemasukan />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/kamar" element={<Kamar />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6">
      <Navbar />
      <Outlet />
    </div>
  );
}

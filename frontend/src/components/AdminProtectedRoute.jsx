import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!isLogin || user?.level_profile !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
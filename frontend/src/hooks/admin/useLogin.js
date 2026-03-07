import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/loginAdminService";

export default function useLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const user = await loginAdmin(formData.username, formData.password);

      setStatus({
        type: "success",
        message: "Login Berhasil! Mengalihkan...",
      });

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Koneksi ke server terputus.",
      });
    }
  };

  return {
    formData,
    status,
    handleChange,
    handleSubmit,
  };
}
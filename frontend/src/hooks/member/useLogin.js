import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginUserService";

export default function useLoginUser() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setStatus({ type: "error", message: "Username dan password wajib diisi." });
      return;
    }

    try {
      const user = await loginUser(formData.username, formData.password);
      
      setStatus({ type: "success", message: "Login berhasil! Mengalihkan..." });

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(user));
      
      setTimeout(() => navigate("/member"), 1500);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Koneksi ke server terputus." });
    }
  };

  return { formData, status, showPassword, handleChange, handleSubmit, togglePasswordVisibility };
}
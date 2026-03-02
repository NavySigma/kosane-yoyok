import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }
<<<<<<< HEAD
    setSuccess("Login berhasil!");
    localStorage.setItem("isLogin", "true");
    setTimeout(() => navigate("/admin/dashboard"), 1200);
=======

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama_profile: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      // Cek apakah user ini member
      if (data.data.level_profile !== 'user') {
        setError('Akun ini bukan member. Silakan login di halaman admin.');
        return;
      }

      setSuccess("Login berhasil!");
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(data.data));
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError("Server error, silakan coba lagi nanti.");
    }
>>>>>>> 5eb6ca029fdd995b2e9f6693b2db7fffd07358be
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1D1C7] font-sans p-4">
      {/* Container Utama */}
      <div className="relative w-[375px] h-[750px] bg-[#EBEBDF] rounded-[55px] shadow-2xl flex flex-col overflow-hidden border-[7px] border-white/20">
        
        {/* --- LAYER BACKGROUND (Sesuai Foto) --- */}
        
        {/* Layer 1: Gundukan Krem Sedikit Gelap (Tengah ke Kanan) */}
        <div 
          className="absolute top-[10%] -right-10 w-[110%] h-[50%] bg-[#E2E2D3] -z-0"
          style={{ clipPath: 'max(0px, 100% - 20px) ellipse(80% 50% at 80% 50%)' }}
        ></div>

        {/* Layer 2: Gundukan Putih (Belakang Ilustrasi) */}
        <div 
          className="absolute top-0 -right-20 w-[120%] h-[40%] bg-white/60 -z-0"
          style={{ clipPath: 'ellipse(70% 50% at 80% 10%)' }}
        ></div>

        {/* --- KONTEN UTAMA --- */}
        <div className="relative z-10 flex-1 px-9 pt-16 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[48px] font-bold text-[#1A1A1A] leading-tight tracking-tight">Login</h1>
            <p className="text-[#666666] text-[15px] leading-snug mt-1 max-w-[220px]">
              Access your account and simplify your stay.
            </p>
          </div>

          {/* Ilustrasi Center */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Glow lembut di bawah HP */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/5 blur-xl rounded-full"></div>
              <img 
                src="/userhp.png" 
                alt="Illustration" 
                className="w-48 h-48 object-contain relative z-10"
                onError={(e) => { e.target.src = "https://placeholder.pics/svg/200x200/DEDEDE/555555/IMG"; }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="space-y-3.5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white rounded-[20px] px-6 py-[19px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm border border-transparent transition-all"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white rounded-[20px] px-6 py-[19px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm border border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Link Register */}
            <div className="mt-5 mb-4">
              <p className="text-[14px] text-[#555555]">
                Don't have an account?{" "}
                <Link to="/register" className="font-extrabold text-black hover:opacity-70 transition-opacity">
                  Register
                </Link>
              </p>
            </div>

            {/* Status Message */}
            <div className="h-6">
              {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
              {success && <p className="text-green-600 text-xs font-semibold">{success}</p>}
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-white text-[#0066FF] py-[18px] rounded-[20px] font-bold text-[22px] shadow-[0_12px_24px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer Area */}
        <div className="h-12"></div>
      </div>
    </div>
  );
}
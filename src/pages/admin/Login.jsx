import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, password } = formData;

    // ❌ VALIDASI
    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    if (username.length < 4) {
      setError("Username minimal 4 karakter.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    // ✅ SUKSES
    setSuccess("Login berhasil! Mengalihkan ke dashboard...");

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify({ nama: username }));

    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#EBEBDF] overflow-hidden font-sans relative">
      
      {/* CSS INTERNAL UNTUK SEMUA ANIMASI */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
          .animate-smooth-in {
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>

      {/* SISI KIRI */}
      <div className="relative w-[55%] h-screen flex flex-col justify-between p-12 z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="relative animate-float -ml-24">
            <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-white/40 overflow-hidden">
              <img src="/logokost.png" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1440 1024" preserveAspectRatio="none" className="w-full h-full">
          <path d="M650 0C750 200 600 400 680 600C750 800 850 1024 850 1024H1440V0H650Z" fill="#1E1B6D" />
        </svg>
      </div>

      {/* FORM */}
      <div className="relative w-[45%] h-screen flex items-center justify-center z-20 pr-20">
        <div className="w-full max-w-md ml-auto">
          <h1 className="text-5xl font-extrabold text-white mb-10 animate-fade-left">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-smooth-in" style={{ animationDelay: "0.2s" }}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none"
              />
            </div>

            <div className="animate-smooth-in" style={{ animationDelay: "0.4s" }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="text-red-300 text-sm font-semibold animate-smooth-in">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="text-green-300 text-sm font-bold animate-smooth-in">
                {success}
              </div>
            )}

            <div className="text-white text-sm animate-smooth-in" style={{ animationDelay: "0.6s" }}>
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>

            <div className="animate-smooth-in" style={{ animationDelay: "0.8s" }}>
              <button
                type="submit"
                className="w-full bg-[#EBEBDF] text-[#1E1B6D] py-4 rounded-full font-bold text-xl hover:bg-white active:scale-95 transition-all shadow-xl"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

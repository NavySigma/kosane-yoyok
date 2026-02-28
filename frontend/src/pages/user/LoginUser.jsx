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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 font-sans p-4">
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-smooth-in {
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
          }
          .wave-top {
            clip-path: url(#waveTopPath);
          }
          .wave-bottom {
            clip-path: url(#waveBottomPath);
          }
        `}
      </style>

      {/* SVG Path Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="waveTopPath" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.75 C0.7,0.95 0.3,0.65 0,0.85 V0 Z" />
          </clipPath>
          <clipPath id="waveBottomPath" clipPathUnits="objectBoundingBox">
            <path d="M0,0.3 C0.3,0.1 0.7,0.4 1,0.2 V1 H0 V0.3 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* MAIN CONTAINER */}
      <div className="relative w-[380px] h-[780px] bg-[#EBEBDF] overflow-hidden rounded-[45px] shadow-2xl flex flex-col">
        {/* ===== HEADER SECTION (BIRU 1A1265) ===== */}
        <div className="wave-top relative h-[42%] bg-[#1A1265] flex flex-col items-center pt-14">
          {/* Ornamen Lingkaran */}
          <div className="absolute top-[-30px] left-[-30px] w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-[-20px] w-36 h-36 bg-white/5 rounded-full blur-xl"></div>

          {/* Logo Container */}
          <div className="relative z-10 w-32 h-32 bg-[#EBEBDF] rounded-full border-[8px] border-white/20 flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/logokost.png"
              alt="Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* ===== FORM SECTION (PUTIH/EBEBDF) ===== */}
        <div className="flex-1 px-10 -mt-4 relative z-20 text-center">
          <h2 className="text-3xl font-bold text-[#1A1265] mb-8 animate-smooth-in">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.2s" }}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-3 text-[#1A1265] placeholder-[#1A1265]/60 outline-none transition-all"
              />
            </div>

            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.3s" }}
            >
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-3 text-[#1A1265] placeholder-[#1A1265]/60 outline-none transition-all"
              />
            </div>

            <p
              className="text-center text-sm text-[#1A1265] animate-smooth-in"
              style={{ animationDelay: "0.4s" }}
            >
              Don't have an account?{" "}
              <Link to="/register" className="font-bold underline">
                Register
              </Link>
            </p>

            {error && (
              <p className="text-red-600 text-center text-[11px] font-bold">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-700 text-center text-[11px] font-bold">
                {success}
              </p>
            )}

            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.5s" }}
            >
              <button
                type="submit"
                className="w-full bg-[#1A1265] text-[#EBEBDF] py-3 rounded-full font-bold text-lg active:scale-95 transition-all shadow-md mt-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* ===== FOOTER SECTION (BIRU 1A1265) ===== */}
        <div className="wave-bottom relative h-[28%] bg-[#1A1265] flex flex-col justify-end p-8 pb-10 text-[#EBEBDF]">
          <div className="mb-3 w-12 h-12 bg-[#EBEBDF] rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20 opacity-90">
            <img 
              src="/logokost.png" 
              alt="Logo Kost" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>

          <div className="text-[10px] leading-tight space-y-2 opacity-90">
            <div className="flex items-start gap-2">
              <img src="/lokasi.png" alt="Lokasi" className="w-3 h-3 mt-0.5" />
              <p>
                Kost Pak Yoyok, Putuk Rejo, Kemantren, Kec. Jabung, Kabupaten
                Malang, Jawa Timur 65155
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/telp.png" alt="Telepon" className="w-3 h-3" />
              <p>+62 813-3121-7162</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

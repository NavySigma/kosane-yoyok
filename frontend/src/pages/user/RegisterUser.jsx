import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.phone || !form.password || !form.confirm) {
      setError("Semua field wajib diisi");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Password tidak sama");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama_profile: form.username,
          no_telp_profile: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          setError(firstError || data.message || "Validasi gagal, cek kembali data Anda.");
        } else {
          setError(data.message || "Register gagal");
        }
        return;
      }

      // sukses
      navigate("/login");
    } catch (err) {
      setError("Server error, coba lagi nanti.");
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

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="waveTopPath" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.75 C0.7,0.95 0.3,0.65 0,0.85 V0 Z" />
          </clipPath>
          <clipPath id="waveBottomPath" clipPathUnits="objectBoundingBox">
            <path d="M0,0.25 C0.3,0.05 0.7,0.35 1,0.15 V1 H0 V0.25 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* MAIN CONTAINER */}
      <div className="relative w-[380px] h-[780px] bg-[#EBEBDF] overflow-hidden rounded-[45px] shadow-2xl flex flex-col">
        
        {/* ===== HEADER SECTION - Dibuat lebih tinggi agar form terdorong ke bawah ===== */}
        <div className="wave-top relative h-[42%] bg-[#1A1265] flex flex-col items-center pt-12">
          <div className="absolute top-[-30px] left-[-30px] w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-32 h-32 bg-[#EBEBDF] rounded-full border-[8px] border-white/20 flex items-center justify-center shadow-lg overflow-hidden">
            <img 
              src="/logokost.png" 
              alt="Logo" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
        </div>

        {/* ===== FORM SECTION - Sekarang lebih pendek karena distribusi h-% lainnya ===== */}
        <div className="flex-1 px-10 -mt-6 relative z-20 text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#1A1265] mb-5 animate-smooth-in">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-2 text-[#1A1265] placeholder-[#1A1265]/60 outline-none animate-smooth-in"
              style={{ animationDelay: "0.1s" }}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-2 text-[#1A1265] placeholder-[#1A1265]/60 outline-none animate-smooth-in"
              style={{ animationDelay: "0.2s" }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-2 text-[#1A1265] placeholder-[#1A1265]/60 outline-none animate-smooth-in"
              style={{ animationDelay: "0.3s" }}
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              className="w-full border-2 border-[#1A1265] bg-transparent rounded-full px-6 py-2 text-[#1A1265] placeholder-[#1A1265]/60 outline-none animate-smooth-in"
              style={{ animationDelay: "0.4s" }}
            />

            <p className="text-sm text-[#1A1265] animate-smooth-in" style={{ animationDelay: "0.5s" }}>
              Have an account? <Link to="/login" className="font-bold underline">Login</Link>
            </p>

            {error && <p className="text-red-600 text-[11px] font-bold">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#1A1265] text-[#EBEBDF] py-3 rounded-full font-bold text-lg active:scale-95 transition-all shadow-md mt-1 animate-smooth-in"
              style={{ animationDelay: "0.6s" }}
            >
              Register
            </button>
          </form>
        </div>

        {/* ===== FOOTER SECTION - Dibuat sedikit lebih tinggi (28%) agar logo aman ===== */}
        <div className="wave-bottom relative h-[28%] bg-[#1A1265] flex flex-col justify-end p-8 pb-8 text-[#EBEBDF]">
          <div className="mb-4 w-12 h-12 bg-[#EBEBDF] rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-sm">
            <img 
              src="/logokost.png" 
              alt="Logo Kost" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          
          <div className="text-[10px] leading-tight space-y-2 opacity-95">
            <div className="flex items-start gap-2">
              <img src="/lokasi.png" alt="Lokasi" className="w-3 h-3 mt-0.5" />
              <p>Kost Pak Yoyok, Putuk Rejo, Kemantren, Kec. Jabung, Kabupaten Malang, Jawa Timur 65155</p>
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
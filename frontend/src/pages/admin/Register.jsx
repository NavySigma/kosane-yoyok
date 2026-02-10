import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "", // Field baru
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
const [serverError, setServerError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setServerError("");

  if (formData.password !== formData.confirmPassword) {
    setErrors({ confirmPassword: ["Password tidak sama"] });
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nama_profile: formData.username,
        no_telp_profile: formData.phoneNumber,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        setErrors(data.errors); // validasi Laravel
      } else {
        setServerError(data.message || "Register gagal");
      }
      return;
    }

    // sukses
    navigate("/login");
  } catch (err) {
    setServerError("Server error, coba lagi");
  }
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

          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
          .animate-smooth-in { 
            opacity: 0; 
            animation: fadeInUp 0.6s ease-out forwards; 
          }
        `}
      </style>

      {/* --- SISI KIRI (LOGO & IDENTITY) --- */}
      <div className="relative w-[55%] h-screen flex flex-col justify-between p-12 z-10">
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#8C89B6] to-transparent rounded-full blur-3xl opacity-60 -z-10" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-gradient-to-tr from-[#B5B2D2] to-transparent rounded-full blur-2xl opacity-40 -z-10" />

        <div className="flex-1 flex items-center justify-center">
          <div className="relative animate-float -ml-24">
            <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-white/40 overflow-hidden">
              <img
                src="/logokost.png"
                alt="Kost Pak Yoyok"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-[13px] text-[#1E1B6D] font-bold leading-snug tracking-wide">
          3P4X+JQ8, Putuk Rejo, Kemanten, Kec. Jabung,
          <br />
          Kabupaten Malang, Jawa Timur 65155
        </div>
      </div>

      {/* --- SVG LENGKUNGAN DINAMIS --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M650 0C750 200 600 400 680 600C750 800 850 1024 850 1024H1440V0H650Z"
            fill="#1E1B6D"
          />
        </svg>
      </div>

      {/* --- SISI KANAN (FORM REGISTER) --- */}
      <div className="relative w-[45%] h-screen flex items-center justify-center z-20 pr-20">
        <div className="w-full max-w-md ml-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight animate-fade-left">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username - Delay 0.2s */}
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.2s" }}
            >
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-white/50"
              />
              {errors.nama_profile && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.nama_profile[0]}
                </p>
              )}

            </div>

            {/* Phone Number - Delay 0.3s */}
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.3s" }}
            >
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-white/50"
              />
              {errors.no_telp_profile && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.no_telp_profile[0]}
                </p>
              )}
            </div>

            {/* Password - Delay 0.4s */}
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.4s" }}
            >
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-white/50"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Confirm Password - Delay 0.5s */}
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.5s" }}
            >
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-white/50"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword[0]}
                </p>
              )}
            </div>

            {/* Link - Delay 0.6s */}
            <div
              className="text-white text-sm font-medium animate-smooth-in"
              style={{ animationDelay: "0.6s" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline hover:text-[#EBEBDF] transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Submit Button - Delay 0.7s */}
            <div
              className="animate-smooth-in"
              style={{ animationDelay: "0.7s" }}
            >
              <button
                type="submit"
                className="w-full bg-[#EBEBDF] text-[#1E1B6D] py-4 rounded-full font-bold text-xl hover:bg-white active:scale-95 transition-all shadow-xl shadow-black/20 mt-2"
              >
                Register
              </button>
              {serverError && (
                <div className="text-red-400 text-sm font-medium text-center">
                  {serverError}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

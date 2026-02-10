import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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

    const { username, phoneNumber, password, confirmPassword } = formData;

    if (!username || !phoneNumber || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (username.length < 4) {
      setError("Username minimal 4 karakter.");
      return;
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Nomor HP harus berupa angka dan minimal 10 digit.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    // ✅ SUKSES
    setSuccess("Registrasi berhasil! Mengalihkan ke halaman login...");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#EBEBDF] overflow-hidden font-sans relative">
      {/* CSS ANIMASI */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideSuccess {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
          .animate-success { animation: slideSuccess 0.5s ease-out forwards; }
        `}
      </style>

      {/* KIRI */}
      <div className="relative w-[55%] h-screen flex flex-col justify-between p-12 z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="relative animate-float -ml-24">
            <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-white/40 overflow-hidden">
              <img src="/logokost.png" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="text-[13px] text-[#1E1B6D] font-bold leading-snug tracking-wide">
          3P4X+JQ8, Putuk Rejo, Kemanten, Kec. Jabung,
          <br />
          Kabupaten Malang, Jawa Timur 65155
        </div>

      </div>

      {/* BACKGROUND SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1440 1024" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M650 0C750 200 600 400 680 600C750 800 850 1024 850 1024H1440V0H650Z"
            fill="#1E1B6D"
          />
        </svg>
      </div>

      {/* FORM */}
      <div className="relative w-[45%] h-screen flex items-center justify-center z-20 pr-20">
        <div className="w-full max-w-md ml-auto">
          <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-left">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none placeholder:text-white/50"
            />

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none placeholder:text-white/50"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none placeholder:text-white/50"
            />

            {/* ✅ CONFIRM PASSWORD TERSENSOR */}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-3.5 text-white outline-none placeholder:text-white/50"
            />

            {error && (
              <div className="text-red-300 text-sm font-semibold animate-success">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-300 text-sm font-bold animate-success">
                {success}
              </div>
            )}

            <div className="text-white text-sm">
              Already have an account?{" "}
              <Link to="/admin/login" className="underline">
                Login
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EBEBDF] text-[#1E1B6D] py-4 rounded-full font-bold text-xl hover:bg-white active:scale-95 transition-all shadow-xl"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

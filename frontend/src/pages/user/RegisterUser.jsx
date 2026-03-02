import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterUser() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirm: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
        setError(data.message || "Register gagal");
        return;
      }
      navigate("/login");
    } catch (err) {
      setError("Server error, coba lagi nanti.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1D1C7] font-sans p-4">
      <div className="relative w-[375px] h-[750px] bg-[#EBEBDF] rounded-[55px] shadow-2xl flex flex-col overflow-hidden border-[8px] border-white/20">
        
        {/* BACKGROUND LAYERS */}
        <div className="absolute -top-10 -left-10 w-[80%] h-[40%] bg-white/50 -z-0" style={{ clipPath: 'ellipse(60% 50% at 30% 30%)' }}></div>
        <div className="absolute top-[15%] -right-16 w-[100%] h-[45%] bg-[#E2E2D3] -z-0" style={{ clipPath: 'ellipse(75% 55% at 85% 50%)' }}></div>

        {/* CONTENT */}
        <div className="relative z-10 flex-1 px-8 pt-12 flex flex-col">
          <div className="mb-4 ml-2">
            <h1 className="text-[44px] font-bold text-[#1A1A1A] leading-tight tracking-tight">Register</h1>
            <p className="text-[#666666] text-[14px] leading-tight mt-1 max-w-[210px]">
              Create your account for easy booking and more.
            </p>
          </div>

          {/* ILUSTRASI GESER KIRI */}
          <div className="flex justify-start items-center mb-4 relative py-2 pl-4">
            <div className="absolute w-36 h-36 bg-white/40 blur-3xl rounded-full left-2"></div>
            <img 
              src="/userhp.png" 
              alt="Illustration" 
              className="w-40 h-40 object-contain relative z-10"
              onError={(e) => { e.target.src = "https://placeholder.pics/svg/200x200/DEDEDE/555555/IMG"; }}
            />
          </div>

          {/* FORM SECTION (Rapat ke Atas) */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5"> {/* Gap dikurangi agar lebih naik */}
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-white rounded-[18px] px-6 py-[14px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-white rounded-[18px] px-6 py-[14px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-white rounded-[18px] px-6 py-[14px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                className="w-full bg-white rounded-[18px] px-6 py-[14px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mt-1 ml-1">
              <p className="text-[13px] text-gray-600">
                Already have an account? <Link to="/login" className="font-bold text-black">Login</Link>
              </p>
            </div>

            {/* Error Message Space */}
            <div className="h-4 flex items-center">
              {error && <p className="text-red-500 text-[11px] font-bold">{error}</p>}
            </div>

            {/* TOMBOL REGISTER - Sekarang Lebih Ke Atas */}
            <button
              type="submit"
              className="w-full bg-white text-[#0066FF] py-[15px] rounded-[18px] font-bold text-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all"
            >
              Register
            </button>
          </form>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
}
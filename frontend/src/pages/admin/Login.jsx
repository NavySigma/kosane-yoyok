import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react"; // Opsional: Tambahkan icon agar lebih manis

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" }); // State baru untuk validasi
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Efek untuk menghilangkan notifikasi otomatis setelah 3 detik
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama_profile: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.message || "Login gagal" });
        return;
      }

      if (data.data.level_profile !== "admin") {
        setStatus({ type: "error", message: "Akun ini bukan admin!" });
        return;
      }

      // Berhasil Login
      setStatus({ type: "success", message: "Login Berhasil! Mengalihkan..." });
      
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(data.data));

      // Beri jeda sedikit agar user bisa melihat pesan sukses
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (err) {
      setStatus({ type: "error", message: "Koneksi ke server terputus." });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#EBEBDF] overflow-hidden font-sans relative">
      
      {/* ALERT NOTIFIKASI BERANIMASI */}
      {status.message && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold animate-toast ${
          status.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {status.type === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {status.message}
        </div>
      )}

      <style>
        {`
          @keyframes toastIn {
            0% { transform: translate(-50%, -100px); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }
          .animate-toast { animation: toastIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

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
          .animate-smooth-in { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
        `}
      </style>

      {/* --- SISI KIRI (LOGO) --- */}
      <div className="relative w-[55%] h-screen flex flex-col justify-between p-12 z-10">
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#8C89B6] to-transparent rounded-full blur-3xl opacity-60 -z-10" />
        <div className="flex-1 flex items-center justify-center">
          <div className="relative animate-float -ml-24">
            <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-white/40 overflow-hidden">
              <img src="/logokost.png" alt="Kost Pak Yoyok" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="text-[13px] text-[#1E1B6D] font-bold leading-snug tracking-wide">
          3P4X+JQ8, Putuk Rejo, Kemanten, Kec. Jabung,<br />
          Kabupaten Malang, Jawa Timur 65155
        </div>
      </div>

      {/* --- SVG LENGKUNGAN --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg viewBox="0 0 1440 1024" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path d="M650 0C750 200 600 400 680 600C750 800 850 1024 850 1024H1440V0H650Z" fill="#1E1B6D" />
        </svg>
      </div>

      {/* --- SISI KANAN (FORM) --- */}
      <div className="relative w-[45%] h-screen flex items-center justify-center z-20 pr-20">
        <div className="w-full max-w-md ml-auto">
          <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tight animate-fade-left">
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
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all"
                required
              />
            </div>

            <div className="animate-smooth-in" style={{ animationDelay: "0.4s" }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all"
                required
              />
            </div>

            <div className="animate-smooth-in" style={{ animationDelay: "0.6s" }}>
              <button
                type="submit"
                className="w-full bg-[#EBEBDF] text-[#1E1B6D] py-4 rounded-full font-bold text-xl hover:bg-white active:scale-95 transition-all shadow-xl shadow-black/20"
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
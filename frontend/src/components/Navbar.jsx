import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [userName, setUserName] = useState("Admin");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.nama || "Admin");
      setNama(userData.nama || "");
    }
  }, []);

  // SIMPAN PROFIL
  const handleSaveProfile = () => {
    if (password && password !== confirmPassword) {
      alert("Konfirmasi password tidak sama");
      return;
    }

    const oldUser = JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...oldUser,
      nama,
      password: password || oldUser.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserName(nama);
    setPassword("");
    setConfirmPassword("");
    setShowProfile(false);
  };

  return (
    <div className="fixed top-6 left-0 w-full px-8 z-50">
      {/* ANIMASI SAPAAN */}
      <style>
        {`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-sapaan {
            animation: slideFadeIn 0.8s ease-out forwards;
          }
        `}
      </style>

      <div className="flex items-center justify-between w-full">
        {/* SAPAAN */}
        <div
          key={location.pathname}
          className="bg-[#1E1B6D] text-white px-5 py-1.5 rounded-full shadow-lg flex items-center gap-3 animate-sapaan"
        >
          <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white/80">
            <img src="/logokost.png" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-semibold">Selamat Datang,</span>
            <span className="text-[12px] italic lowercase first-letter:uppercase">
              {userName}
            </span>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl flex items-center gap-2 border border-white/50">
          <NavLink to="/admin/dashboard" className={navClass}>
            <img src="/home.png" className="w-5 h-5" /> Beranda
          </NavLink>
          <NavLink to="/admin/kamar" className={navClass}>
            <img src="/kamaricon.png" className="w-5 h-5" /> Kamar
          </NavLink>
          <NavLink to="/admin/pemasukan" className={navClass}>
            <img src="/pemasukan.png" className="w-5 h-5" /> Pemasukan
          </NavLink>
          <NavLink to="/admin/pengeluaran" className={navClass}>
            <img src="/pengeluaran.png" className="w-5 h-5" /> Pengeluaran
          </NavLink>
          <NavLink to="/admin/riwayat" className={navClass}>
            <img src="/history.png" className="w-5 h-5" /> Riwayat
          </NavLink>

          {/* DOT MENU */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={`w-9 h-9 rounded-full bg-[#f1f1f1] flex items-center justify-center transition
                ${open ? "rotate-90 scale-110" : ""}`}
            >
              •••
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl p-2">
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#1E1B6D]"
                >
                  Profil
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/admin/login");
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-[200px] hidden lg:block"></div>
      </div>

      {/* PANEL PROFIL */}
      {showProfile && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="absolute top-28 right-64 bg-white w-80 rounded-2xl shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-[#1E1B6D] mb-4">
              Profil
            </h3>

            <div className="space-y-3">
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                className="w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Baru"
                className="w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi Password"
                className="w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="mt-4 w-full bg-[#1E1B6D] text-white py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const navClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all
  ${
    isActive
      ? "bg-[#f1f1f1] text-[#1E1B6D] font-semibold shadow-sm scale-105"
      : "text-[#1E1B6D]/70 hover:bg-white/40"
  }`;

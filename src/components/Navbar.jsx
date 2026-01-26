import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Penting untuk trigger animasi sapaan

  // Mengambil nama user dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      const userData = JSON.parse(storedUser);

      // Prioritas nama
      setUserName(
        userData.nama_profile ||
        userData.username ||
        userData.name ||
        "Pengguna"
      );
    } catch (error) {
      console.error("Gagal parsing data user:", error);
    }
  }, []);

  return (
    /* Container fixed agar tetap di atas saat scroll */
    <div className="fixed top-6 left-0 w-full px-8 z-50">
      {/* CSS INTERNAL UNTUK ANIMASI SLIDE-IN SAPAAN */}
      <style>
        {`
          @keyframes slideFadeIn {
            0% {
              opacity: 0;
              transform: translateX(-40px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-sapaan {
            animation: slideFadeIn 0.8s ease-out forwards;
          }
        `}
      </style>

      <div className="flex items-center justify-between w-full">
        {/* --- WIDGET SAPAAN (DI POJOK KIRI) --- */}
        {/* key={location.pathname} memaksa elemen di-render ulang & animasi jalan tiap pindah halaman */}
        <div
          key={location.pathname}
          className="bg-[#1E1B6D] text-white px-5 py-1.5 rounded-full shadow-lg flex items-center gap-3 border border-[#1E1B6D] shrink-0 animate-sapaan"
        >
          {/* Lingkaran Logo */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/80 shrink-0 shadow-sm">
            <img
              src="/logokost.png"
              className="w-full h-full object-cover"
              alt="Logo"
            />
          </div>

          {/* Teks Sapaan Dinamis */}
          <div className="flex flex-col leading-tight pr-2">
            <span className="text-[12px] font-semibold text-white">
              Selamat Datang,
            </span>
            <span className="text-[12px] font-light italic text-white/90 lowercase first-letter:uppercase">
              {userName}
            </span>
          </div>
        </div>

        {/* --- NAVBAR (EFEK BLUR DI TENGAH) --- */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-[#F7F5EC]/70 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl flex items-center gap-2 border border-white/50">
          <div className="flex items-center gap-1">
            <NavLink to="/dashboard" className={navClass}>
              <img src="/home.png" className="w-5 h-5" alt="Home" />
              Beranda
            </NavLink>

            <NavLink to="/pemasukan" className={navClass}>
              <img src="/pemasukan.png" className="w-5 h-5" alt="Pemasukan" />
              Pemasukan
            </NavLink>

            <NavLink to="/pengeluaran" className={navClass}>
              <img
                src="/pengeluaran.png"
                className="w-5 h-5"
                alt="Pengeluaran"
              />
              Pengeluaran
            </NavLink>

            <NavLink to="/riwayat" className={navClass}>
              <img src="/history.png" className="w-5 h-5" alt="Riwayat" />
              Riwayat
            </NavLink>

            <NavLink to="/kamar" className={navClass}>
              <img src="/kamaricon.png" className="w-5 h-5" alt="Kamar" />
              Kamar
            </NavLink>
          </div>

          {/* DOT MENU DENGAN ANIMASI ROTASI */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={`w-9 h-9 rounded-full bg-[#E6E4D8] flex items-center justify-center hover:bg-[#D8D6C8] transition-all duration-300 text-xs font-bold
                ${open ? "rotate-90 scale-110 shadow-inner" : "rotate-0"}`}
            >
              •••
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl p-2 border border-gray-100 z-50 animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => {
                    navigate("/profil");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#1E1B6D]"
                >
                  Profil
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Spacer agar Navbar tetap di tengah secara visual pada layar besar */}
        <div className="w-[200px] hidden lg:block"></div>
      </div>
    </div>
  );
}

// Fungsi helper untuk class NavLink
const navClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200
  ${
    isActive
      ? "bg-[#E6E4D8] text-[#1E1B6D] font-semibold shadow-sm scale-105"
      : "text-[#1E1B6D]/70 hover:bg-white/40"
  }`;

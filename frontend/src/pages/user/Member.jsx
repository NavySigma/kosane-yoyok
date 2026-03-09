import React, { useEffect, useState, useRef } from "react";

// 1. Perbaikan Path Import (Relative Path)
import { translations } from "../../utils/translations"; 
import { useLang } from "../../context/LanguageContext";

import {
  ChevronDown,
  Calendar,
  Plus,
  Bed,
  Wifi,
  Zap,
  Utensils,
  Bell,
  Globe,
  Shield,
  Bath,
  Menu,
  X,
  History,
  Clock,
  CheckCircle2,
  Sun,
  Moon,
  MessageCircle,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function MemberPage() {
  // 2. Inisialisasi Hook Language
  const { lang, setLang, t } = useLang();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("booking");
  const [activeDot, setActiveDot] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const scrollRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'settings' | null

  const [formSurvei, setFormSurvei] = useState({
    nama_pesurvei: "",
    tgl_survei: "",
    catatan: "",
  });

  // 3. Update Fungsi Logout dengan Terjemahan
  const handleLogout = () => {
    const confirmLogout = window.confirm(t('logout_confirm'));
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }
  };

  const handleChange = (e) => {
    setFormSurvei({
      ...formSurvei,
      [e.target.name]: e.target.value,
    });
  };

  const waNumber = "6285708128392";
  const waMessage = encodeURIComponent(
    "Halo Admin Kost Pak Yoyok,\n\nSaya Member atas nama: \nIngin konfirmasi mengenai: (Pembayaran/Kendala Fasilitas/Lainnya)\n\nTerima kasih.",
  );

  const galleryImages = [
    "/image10.jpeg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/image4.jpeg",
    "/image5.jpeg",
    "/image6.jpeg",
    "/image8.jpeg",
    "/image9.jpeg",
  ];

  const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];

  const bookingHistory = [
    {
      id: "BK-8821",
      date: "12 Oct 2025",
      room: "Room 03",
      status: "Confirmed",
      price: "Rp450.000",
    },
    {
      id: "BK-9012",
      date: "15 Nov 2025",
      room: "Room 03",
      status: "Pending",
      price: "Rp450.000",
    },
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    if (scrollLeft <= 5) {
      scrollRef.current.scrollLeft = singleSetWidth + 5;
    } else if (scrollLeft + offsetWidth >= scrollWidth - 5) {
      scrollRef.current.scrollLeft = singleSetWidth;
    }

    const relativeScroll = scrollLeft % singleSetWidth;
    const index = Math.round(relativeScroll / (offsetWidth * 0.8));
    setActiveDot(index % galleryImages.length);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth / 3;
    }

    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [galleryImages.length]);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const submitSurvei = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/survei", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_profile_survei: 1,
          status_survei: "pending",
          ...formSurvei,
        }),
      });

      if (response.ok) {
        alert("Request visit berhasil dikirim!");
        setFormSurvei({ nama_pesurvei: "", tgl_survei: "", catatan: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --- Bagian Return akan lanjut setelah ini ---

  return (
    <div
      className={`${
        darkMode ? "bg-[#121212] text-white" : "bg-white text-[#333]"
      } font-sans overflow-x-hidden transition-colors duration-500 scroll-smooth`}
    >
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .gallery-container-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}
      </style>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={`https://wa.me/${waNumber}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[1000] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4">
        <div
          className={`${
            darkMode
              ? "bg-black/60 border-white/10"
              : "bg-white/80 border-white/40"
          } backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 py-3 rounded-full flex justify-between items-center gap-6 shadow-lg border transition-all duration-500`}
        >
          <span className="md:hidden font-black italic text-[12px] tracking-tighter uppercase">
            Member Area
          </span>

          <div className="hidden md:flex gap-8 items-center">
            {["home", "features", "tour", "booking"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[11px] font-black uppercase tracking-widest hover:text-[#B6FF40] transition"
              >
                {item}
              </a>
            ))}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? "bg-white/10 text-yellow-400"
                  : "bg-black/5 text-gray-600 hover:bg-black/10"
              }`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                }`}
              >
                <div className="w-5 h-5 bg-[#B6FF40] rounded-full flex items-center justify-center text-[9px] font-black text-black">
                  M
                </div>
                <span className="text-[10px] font-bold tracking-tight uppercase">
                  Member
                </span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${
                    showProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileDropdown && (
                <div
                  className={`absolute right-0 mt-4 w-56 rounded-[24px] shadow-2xl border p-2 animate-in fade-in zoom-in-95 duration-200 z-[110] ${
                    darkMode
                      ? "bg-[#1A1A1A] border-white/10 shadow-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="px-4 py-3 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Signed in as
                    </p>
                    <p className="text-xs font-black truncate">member</p>
                  </div>
                  <div
                    className={`h-[1px] mb-1 ${darkMode ? "bg-white/5" : "bg-gray-100"}`}
                  ></div>

                  <button
                    onClick={() => {
                      setActiveModal("profile");
                      setShowProfileDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition ${
                      darkMode
                        ? "hover:bg-white/5 text-white"
                        : "hover:bg-gray-50 text-black"
                    }`}
                  >
                    <User size={14} className="text-[#B6FF40]" /> My Profile
                  </button>

                  <button
                    onClick={() => {
                      setActiveModal("settings");
                      setShowProfileDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition ${
                      darkMode
                        ? "hover:bg-white/5 text-white"
                        : "hover:bg-gray-50 text-black"
                    }`}
                  >
                    <Settings size={14} /> Settings
                  </button>

                  <div
                    className={`h-[1px] my-1 ${darkMode ? "bg-white/5" : "bg-gray-100"}`}
                  ></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2">
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div
            className={`absolute top-20 left-4 right-4 ${
              darkMode
                ? "bg-[#1A1A1A] border-white/10 text-white"
                : "bg-white border-gray-100"
            } rounded-3xl p-6 shadow-2xl flex flex-col gap-2 md:hidden animate-in fade-in zoom-in-95 z-[110]`}
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-4 mb-2">
              {["home", "features", "tour", "booking"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-bold border-b pb-2 uppercase text-xs tracking-[0.2em] ${
                    darkMode
                      ? "border-white/5 text-gray-300"
                      : "border-gray-50 text-gray-600"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* User Section (Profile & Settings) */}
            <div className={`mt-2 pt-2 flex flex-col gap-1`}>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">
                Account Actions
              </p>

              <button
                onClick={() => {
                  setActiveModal("profile");
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 font-bold uppercase text-sm tracking-widest p-3 rounded-2xl transition ${
                  darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
                }`}
              >
                <User size={18} className="text-[#B6FF40]" />
                My Profile
              </button>

              <button
                onClick={() => {
                  setActiveModal("settings");
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 font-bold uppercase text-sm tracking-widest p-3 rounded-2xl transition ${
                  darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
                }`}
              >
                <Settings size={18} />
                Settings
              </button>

              <div
                className={`h-[1px] my-2 ${darkMode ? "bg-white/5" : "bg-gray-100"}`}
              ></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 font-bold text-red-500 uppercase text-sm tracking-widest p-3 rounded-2xl hover:bg-red-500/10 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative h-[85vh] w-full flex items-center justify-center"
      >
        <img
          src="/image2.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero Interior Kost"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 text-white text-left px-8 md:px-20 w-full max-w-7xl fade-up">
          <h1 className="text-5xl md:text-9xl font-black leading-[0.85] mb-6 tracking-tighter uppercase">
            Find your <br />
            <span className="text-[#B6FF40]">perfect</span> stay
          </h1>
          <p className="text-sm md:text-xl opacity-90 max-w-md font-medium">
            Welcome back to your member dashboard. Manage your stay and bookings
            easily.
          </p>
        </div>
        <div
          className={`absolute bottom-10 right-8 ${
            darkMode ? "bg-black/80 text-white" : "bg-white/95 text-[#1A1A1A]"
          } backdrop-blur-md p-6 rounded-[32px] shadow-2xl border ${
            darkMode ? "border-white/10" : "border-white"
          } fade-up`}
        >
          <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-1">
            Starting from
          </p>
          <p className="text-2xl md:text-3xl font-black">
            Rp450.000
            <span className="text-sm font-bold text-gray-400">/mo</span>
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`${
              darkMode
                ? "bg-white/5 border border-white/5 text-white"
                : "bg-[#F9F9F7] text-black"
            } rounded-[40px] p-10 fade-up`}
          >
            <Bed
              className={`${darkMode ? "text-[#B6FF40]" : "text-black"} mb-6`}
              size={24}
            />
            <h3 className="text-2xl font-black mb-6 italic tracking-tight uppercase">
              Room Features
            </h3>
            <ul
              className={`${darkMode ? "text-gray-400" : "text-gray-500"} space-y-4 font-bold text-sm`}
            >
              <li>✦ Bed (2m x 1.5m)</li>
              <li>✦ Comfortable Pillow & Bolster</li>
              <li>✦ Private Cupboard</li>
            </ul>
          </div>
          <div
            className={`${
              darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"
            } rounded-[40px] p-10 fade-up`}
          >
            <Wifi
              className={`${darkMode ? "text-black" : "text-[#B6FF40]"} mb-6`}
              size={24}
            />
            <h3 className="text-2xl font-black mb-6 italic tracking-tight uppercase">
              Shared Facilities
            </h3>
            <ul
              className={`${darkMode ? "text-black/70" : "text-gray-400"} space-y-4 font-bold text-sm`}
            >
              <li className="flex items-center gap-2">
                <Zap size={14} /> High-speed Wi-Fi
              </li>
              <li className="flex items-center gap-2">
                <Utensils size={14} /> Shared Clean Kitchen
              </li>
              <li className="flex items-center gap-2">
                <Bath size={14} /> Maintained Bathroom
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= INFINITE TOUR ================= */}
      <section
        id="tour"
        className={`py-20 ${
          darkMode ? "bg-[#0A0A0A]" : "bg-[#F9F9F7]"
        } overflow-hidden transition-colors`}
      >
        <div className="max-w-6xl mx-auto px-6 mb-10 fade-up">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">
            Take a tour
          </h2>
          <p className="text-gray-400 font-medium">
            Explore our rooms and shared spaces.
          </p>
        </div>
        <div className="relative gallery-container-mask">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 pb-4"
          >
            {infiniteImages.map((img, i) => (
              <div
                key={i}
                className={`w-[85vw] md:w-[500px] h-[450px] flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-2xl ${
                  darkMode ? "bg-white/5" : "bg-gray-200"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover pointer-events-none"
                  alt={`Tour gallery ${i}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {galleryImages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === i
                    ? darkMode
                      ? "w-10 bg-[#B6FF40]"
                      : "w-10 bg-black"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACTIONS & HISTORY ================= */}
      <section id="booking" className="max-w-2xl mx-auto px-6 py-24 space-y-2">
        {/* Accordion 1: Visit */}
        <div
          className={`border-b ${darkMode ? "border-white/5" : "border-gray-100"}`}
        >
          <button
            onClick={() => toggleAccordion("visit")}
            className="w-full flex justify-between items-center py-6 group"
          >
            <span
              className={`font-bold text-lg ${
                darkMode
                  ? "group-hover:text-[#B6FF40]"
                  : "group-hover:text-blue-600"
              } transition-colors uppercase`}
            >
              Book a site visit
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${
                activeAccordion === "visit" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "visit" && (
            <div className="pb-8 space-y-4 animate-in slide-in-from-top-2 duration-300">
              <input
                type="text"
                name="nama_pesurvei"
                placeholder="Full Name"
                value={formSurvei.nama_pesurvei}
                onChange={handleChange}
                className={`w-full border rounded-2xl p-4 text-sm outline-none transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#B6FF40]"
                    : "bg-white border-gray-200 focus:border-black"
                }`}
              />
              <input
                type="date"
                name="tgl_survei"
                value={formSurvei.tgl_survei}
                onChange={handleChange}
                className={`w-full border rounded-2xl p-4 text-sm outline-none ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-gray-200"
                }`}
              />
              <textarea
                name="catatan"
                placeholder="Additional Notes..."
                rows="4"
                value={formSurvei.catatan}
                onChange={handleChange}
                className={`w-full border rounded-2xl p-4 text-sm outline-none resize-none transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#B6FF40]"
                    : "bg-white border-gray-200 focus:border-black"
                }`}
              />
              <button
                onClick={submitSurvei}
                className={`w-full py-4 font-bold rounded-2xl text-sm transition active:scale-[0.98] ${
                  darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"
                }`}
              >
                Request Visit
              </button>
            </div>
          )}
        </div>

        {/* Accordion 2: Make It Yours */}
        <div
          className={`border-b ${darkMode ? "border-white/5" : "border-gray-100"}`}
        >
          <button
            onClick={() => toggleAccordion("booking")}
            className="w-full flex justify-between items-center py-6 group"
          >
            <span
              className={`font-bold text-lg ${
                darkMode
                  ? "group-hover:text-[#B6FF40]"
                  : "group-hover:text-blue-600"
              } transition-colors uppercase`}
            >
              Make it yours
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${
                activeAccordion === "booking" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "booking" && (
            <div className="pb-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
              <div
                className={`border rounded-[30px] p-6 ${
                  darkMode
                    ? "bg-white/5 border-white/5"
                    : "bg-[#F9F9F7] border-gray-100"
                }`}
              >
                <p className="text-[11px] font-black uppercase tracking-tighter mb-4 text-gray-400">
                  Room Availability
                </p>
                <div className="space-y-3">
                  {[
                    "Room 01",
                    "Room 02",
                    "Room 03 — Available",
                    "Room 04 — Available",
                  ].map((room, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-[12px] font-bold"
                    >
                      <span
                        className={
                          room.includes("Available")
                            ? darkMode
                              ? "text-white"
                              : "text-black"
                            : "text-gray-500 opacity-50"
                        }
                      >
                        {room}
                      </span>
                      <button
                        onClick={() =>
                          room.includes("Available") && setSelectedRoom(room)
                        }
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${
                          room.includes("Available")
                            ? selectedRoom === room
                              ? "bg-white text-black scale-110"
                              : "bg-[#B6FF40] text-black hover:scale-105"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {room.includes("Available")
                          ? selectedRoom === room
                            ? "Selected"
                            : "Select"
                          : "Full"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={`w-full py-4 font-bold rounded-2xl text-sm transition active:scale-[0.98] ${
                  darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"
                }`}
              >
                Submit Booking
              </button>
            </div>
          )}
        </div>

        {/* Accordion 3: History */}
        <div
          className={`border-b ${darkMode ? "border-white/5" : "border-gray-100"}`}
        >
          <button
            onClick={() => toggleAccordion("history")}
            className="w-full flex justify-between items-center py-6 group"
          >
            <span
              className={`font-bold text-lg ${
                darkMode
                  ? "group-hover:text-[#B6FF40]"
                  : "group-hover:text-blue-600"
              } transition-colors uppercase`}
            >
              Booking history
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${
                activeAccordion === "history" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "history" && (
            <div className="pb-8 space-y-4 animate-in slide-in-from-top-2 duration-300">
              {bookingHistory.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-[30px] border flex flex-col md:flex-row justify-between gap-4 ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-[#F9F9F7] border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? "bg-white/10" : "bg-white shadow-sm"}`}
                    >
                      <History size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {item.id}
                      </p>
                      <h4 className="font-black text-sm uppercase">
                        {item.room}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6 text-[11px]">
                    <div>
                      <p className="text-gray-400 font-bold uppercase mb-1">
                        Date
                      </p>
                      <p className="font-black">{item.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase mb-1">
                        Status
                      </p>
                      <span
                        className={`flex items-center gap-1 font-black ${item.status === "Confirmed" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {item.status === "Confirmed" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}{" "}
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= MODAL PROFILE & SETTINGS ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setActiveModal(null)}
          ></div>
          <div
            className={`relative w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${
              darkMode
                ? "bg-[#121212] border border-white/10 text-white"
                : "bg-white text-black"
            }`}
          >
            <div className="px-8 pt-8 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
                  {activeModal === "profile" ? "My Profile" : "Settings"}
                </h2>
                <div className="h-1 w-12 bg-[#B6FF40] mt-2 rounded-full"></div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className={`p-3 rounded-2xl transition-all ${darkMode ? "hover:bg-white/10 bg-white/5" : "hover:bg-gray-100 bg-gray-50"}`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 pb-10 pt-4">
              {activeModal === "profile" && (
                <div className="space-y-6">
                  <div
                    className={`flex items-center gap-5 p-5 rounded-[32px] ${darkMode ? "bg-white/5 border border-white/5" : "bg-gray-50 border border-gray-100"}`}
                  >
                    <div className="w-20 h-20 bg-[#B6FF40] rounded-3xl flex items-center justify-center text-3xl font-black text-black shadow-lg shadow-[#B6FF40]/20">
                      M
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#B6FF40] uppercase tracking-[0.2em] mb-1">
                        Platinum Member
                      </p>
                      <p className="text-xl font-black tracking-tight uppercase">
                        Member Kost
                      </p>
                      <p className="text-xs font-medium opacity-50">
                        Since January 2024
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Full Name", value: "Member Kost Pak Yoyok" },
                      { label: "Email Address", value: "member@kostyoyok.com" },
                      { label: "Room Number", value: "A-03 (2nd Floor)" },
                      { label: "Phone Number", value: "+62 812-3456-7890" },
                    ].map((info, i) => (
                      <div key={i} className="group">
                        <p className="text-[10px] font-bold text-gray-500 uppercase ml-1 mb-1.5 tracking-widest">
                          {info.label}
                        </p>
                        <div
                          className={`p-4 rounded-2xl border text-[13px] font-bold tracking-wide transition-all ${darkMode ? "bg-white/5 border-white/5 group-hover:border-white/20" : "bg-gray-50 border-gray-100 group-hover:border-gray-200"}`}
                        >
                          {info.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-[#B6FF40] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-transform active:scale-95">
                    Edit Profile
                  </button>
                </div>
              )}

              {activeModal === "settings" && (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase ml-1 mb-4 tracking-widest">
                    General Preferences
                  </p>
                  <button
                    className={`w-full flex justify-between items-center p-5 rounded-2xl border transition-all ${darkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-gray-50 border-gray-100 hover:bg-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <Shield size={18} />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider">
                        Change Password
                      </span>
                    </div>
                    <ChevronDown size={16} className="-rotate-90 opacity-30" />
                  </button>
                  <div
                    className={`flex justify-between items-center p-5 rounded-2xl border ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <Bell size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider">
                          WhatsApp Alerts
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Payment & Maintenance reminders
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-[#B6FF40] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                    </div>
                  </div>
                  <button
                    className={`w-full flex justify-between items-center p-5 rounded-2xl border transition-all ${darkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-gray-50 border-gray-100 hover:bg-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                        <Globe size={18} />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider">
                        Language (ID)
                      </span>
                    </div>
                    <ChevronDown size={16} className="-rotate-90 opacity-30" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer
        className={`${darkMode ? "bg-[#121212] border-t border-white/5" : "bg-white border-t border-gray-100"} pt-16 pb-12`}
      >
        <div
          className={`w-full border-y mb-16 px-6 py-4 ${darkMode ? "border-white/5" : "border-gray-200"}`}
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#home" className="hover:text-[#B6FF40]">
                Home
              </a>
              <a href="#features" className="hover:text-[#B6FF40]">
                About
              </a>
            </div>
            <span
              className={`italic font-black text-[14px] uppercase tracking-tighter ${darkMode ? "text-white" : "text-black"}`}
            >
              Kost Pak Yoyok
            </span>
            <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#tour" className="hover:text-[#B6FF40]">
                Visit
              </a>
              <a
                href="#booking"
                className={darkMode ? "text-[#B6FF40]" : "text-black"}
              >
                Booking
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p
            className={`text-[13px] font-semibold opacity-70 ${darkMode ? "text-gray-400" : "text-black"}`}
          >
            Kemantren, Jabung, Malang Regency, East Java 65155.
          </p>
          <p
            className={`text-[18px] font-bold ${darkMode ? "text-[#B6FF40]" : "text-black"}`}
          >
            +62 813-3121-7162
          </p>
        </div>
        <div className="mt-24 text-center text-[10px] text-gray-400 font-medium tracking-tight uppercase">
          © 2026 Kost Pak Yoyok. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

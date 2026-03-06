import React, { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  Calendar,
  Plus,
  Bed,
  Box,
  Wifi,
  Zap,
  Utensils,
  Bath,
  Menu,
  X,
  History,
  Clock,
  CheckCircle2,
  Sun,
  Moon,
  MessageCircle,
} from "lucide-react";

export default function MemberPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State Dark Mode
  const [activeAccordion, setActiveAccordion] = useState("booking");
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);

  // Template PesAN WA untuk Member
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

  return (
    <div
      className={`${darkMode ? "bg-[#121212] text-white" : "bg-white text-[#333]"} font-sans overflow-x-hidden transition-colors duration-500 scroll-smooth`}
    >
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)); }
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
          className={`${darkMode ? "bg-black/40 border-white/10" : "bg-white/80 border-white/40"} backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 py-3 rounded-full flex justify-between items-center gap-6 shadow-lg border transition-colors duration-500`}
        >
          <span className="md:hidden font-black italic text-[12px] tracking-tighter uppercase">
            Member Area
          </span>

          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#home"
              className="text-[11px] font-black uppercase tracking-widest hover:text-[#B6FF40] transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-[11px] font-black uppercase tracking-widest hover:text-[#B6FF40] transition"
            >
              About
            </a>
            <a
              href="#tour"
              className="text-[11px] font-black uppercase tracking-widest hover:text-[#B6FF40] transition"
            >
              Visit
            </a>
            <a
              href="#booking"
              className="text-[11px] font-black uppercase tracking-widest hover:text-[#B6FF40] transition"
            >
              Booking
            </a>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-white/10 text-yellow-400" : "bg-black/5 text-gray-600 hover:bg-black/10"}`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}
            >
              <div className="w-5 h-5 bg-[#B6FF40] rounded-full flex items-center justify-center text-[9px] font-black text-black">
                M
              </div>
              <span className="text-[10px] font-bold">Member</span>
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

        {isMenuOpen && (
          <div
            className={`absolute top-16 left-4 right-4 ${darkMode ? "bg-[#1A1A1A] border-white/10 text-white" : "bg-white border-gray-100"} rounded-3xl p-6 shadow-2xl flex flex-col gap-4 md:hidden`}
          >
            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold border-b border-gray-100 pb-2"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold border-b border-gray-100 pb-2"
            >
              About
            </a>
            <a
              href="#booking"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold"
            >
              Booking
            </a>
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
          alt="Hero"
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
          className={`absolute bottom-10 right-8 ${darkMode ? "bg-black/80 text-white" : "bg-white/95 text-[#1A1A1A]"} backdrop-blur-md p-6 rounded-[32px] shadow-2xl border ${darkMode ? "border-white/10" : "border-white"} fade-up`}
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
            className={`${darkMode ? "bg-white/5 border border-white/5 text-white" : "bg-[#F9F9F7] text-black"} rounded-[40px] p-10 fade-up`}
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
            className={`${darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"} rounded-[40px] p-10 fade-up`}
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
        className={`py-20 ${darkMode ? "bg-[#0A0A0A]" : "bg-[#F9F9F7]"} overflow-hidden transition-colors`}
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
                className={`w-[85vw] md:w-[500px] h-[450px] flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-2xl ${darkMode ? "bg-white/5" : "bg-gray-200"}`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover pointer-events-none"
                  alt="tour"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {galleryImages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeDot === i ? (darkMode ? "w-10 bg-[#B6FF40]" : "w-10 bg-black") : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section
        className={`py-24 ${darkMode ? "bg-[#121212]" : "bg-white"} text-center px-6`}
      >
        <h2 className="text-3xl font-black italic mb-10 tracking-tighter fade-up uppercase">
          Visit Our Space
        </h2>
        <div
          className={`max-w-6xl mx-auto rounded-[50px] overflow-hidden shadow-2xl border-[12px] ${darkMode ? "border-[#1A1A1A]" : "border-white"} h-[400px] md:h-[600px] fade-up`}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.868123456789!2d112.7!3d-7.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTQnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: darkMode ? "invert(90%) hue-rotate(180deg)" : "none",
            }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* ================= ACTIONS & HISTORY ================= */}
      <section id="booking" className="max-w-2xl mx-auto px-6 pb-24 space-y-2">
        {/* Accordion 1: Visit */}
        <div
          className={`border-b ${darkMode ? "border-white/5" : "border-gray-100"}`}
        >
          <button
            onClick={() => toggleAccordion("visit")}
            className="w-full flex justify-between items-center py-6 group"
          >
            <span
              className={`font-bold text-lg ${darkMode ? "group-hover:text-[#B6FF40]" : "group-hover:text-blue-600"} transition-colors uppercase`}
            >
              Book a site visit
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${activeAccordion === "visit" ? "rotate-180" : ""}`}
            />
          </button>
          {activeAccordion === "visit" && (
            <div className="pb-8 space-y-4 animate-in slide-in-from-top-2">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full border rounded-2xl p-4 text-sm outline-none ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-200"}`}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Preferred Date"
                  className={`w-full border rounded-2xl p-4 text-sm outline-none ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-200"}`}
                />
                <Calendar
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <textarea
                placeholder="Additional Notes (e.g. jam kedatangan spesifik, jumlah orang, atau pertanyaan lainnya...)"
                rows="4"
                className={`w-full border rounded-2xl p-4 text-sm outline-none resize-none transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#B6FF40]"
                    : "bg-white border-gray-200 focus:border-black"
                }`}
              />
              <button
                className={`w-full py-4 font-bold rounded-2xl text-sm transition ${darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"}`}
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
              className={`font-bold text-lg ${darkMode ? "group-hover:text-[#B6FF40]" : "group-hover:text-blue-600"} transition-colors uppercase`}
            >
              Make it yours
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${activeAccordion === "booking" ? "rotate-180" : ""}`}
            />
          </button>
          {activeAccordion === "booking" && (
            <div className="pb-8 space-y-6 animate-in slide-in-from-top-2">
              <div
                className={`border rounded-[30px] p-6 ${darkMode ? "bg-white/5 border-white/5" : "bg-[#F9F9F7] border-gray-100"}`}
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
                            : "text-gray-500"
                        }
                      >
                        {room}
                      </span>
                      <button
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${room.includes("Available") ? "bg-[#B6FF40] text-black" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                      >
                        {room.includes("Available") ? "Select" : "Full"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`border rounded-[30px] p-6 shadow-sm space-y-4 ${darkMode ? "bg-black border-white/10" : "bg-white border-gray-100"}`}
              >
                <p className="font-bold italic text-sm">Payment Details</p>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between text-gray-400">
                    Bank:{" "}
                    <span
                      className={`${darkMode ? "text-white" : "text-black"} font-bold`}
                    >
                      BRI
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    Account:{" "}
                    <span
                      className={`${darkMode ? "text-white" : "text-black"} font-bold`}
                    >
                      629801065602534
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    Name:{" "}
                    <span
                      className={`${darkMode ? "text-white" : "text-black"} font-bold uppercase`}
                    >
                      A.A Made Kusumawati
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                  <p className="text-[11px] font-bold italic mb-3">
                    Upload Receipt
                  </p>
                  <div
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${darkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                  >
                    <Plus size={20} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-[10px] font-bold text-gray-400">
                      Tap to upload
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={`w-full py-4 font-bold rounded-2xl text-sm ${darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"}`}
              >
                Submit Booking
              </button>
            </div>
          )}
        </div>

        {/* Accordion 3: Booking History */}
        <div
          className={`border-b ${darkMode ? "border-white/5" : "border-gray-100"}`}
        >
          <button
            onClick={() => toggleAccordion("history")}
            className="w-full flex justify-between items-center py-6 group"
          >
            <span
              className={`font-bold text-lg ${darkMode ? "group-hover:text-[#B6FF40]" : "group-hover:text-blue-600"} transition-colors uppercase`}
            >
              Booking history
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-300 transition-transform ${activeAccordion === "history" ? "rotate-180" : ""}`}
            />
          </button>
          {activeAccordion === "history" && (
            <div className="pb-8 space-y-4 animate-in slide-in-from-top-2">
              {bookingHistory.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-[30px] border flex flex-col md:flex-row justify-between gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-[#F9F9F7] border-gray-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${darkMode ? "bg-white/10" : "bg-white"}`}
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

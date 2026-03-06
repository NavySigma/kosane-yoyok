import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Bed,
  Wifi,
  Utensils,
  Bath,
  ChevronRight,
  Menu,
  X,
  Zap,
  Sun,
  Moon,
  MessageCircle,
} from "lucide-react";

export default function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  // Template Pesan WhatsApp
  const waNumber = "6285708128392";
  const waMessage = encodeURIComponent(
    "Halo Admin Kost Pak Yoyok, saya ingin tanya ketersediaan kamar.\n\n" +
    "Nama: \n" +
    "Rencana Masuk: \n" +
    "Durasi Sewa: (Bulan/Tahun)\n" +
    "Apakah masih ada kamar yang kosong?"
  );

  const galleryImages = [
    "/image10.jpeg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/image4.jpeg",
    "/image5.jpeg",
    "/image6.jpeg",
    "/image9.jpeg",
    "/image8.jpeg",
  ];

  const faqs = [
    {
      q: "Apakah harga sudah termasuk listrik?",
      a: "Harga sewa sudah termasuk air dan WiFi, namun untuk listrik menggunakan sistem token (pulsa) masing-masing penghuni agar lebih hemat dan adil.",
    },
    {
      q: "Bagaimana sistem kunci dan jam malam?",
      a: "Setiap penghuni dibekali kunci gerbang sendiri. Tidak ada jam malam kaku, namun kami mewajibkan penghuni menjaga ketenangan di atas jam 10 malam.",
    },
    {
      q: "Apakah ada lahan parkir mobil?",
      a: "Saat ini fasilitas parkir kami prioritaskan untuk kendaraan roda dua (motor) agar area tetap luas dan sirkulasi udara terjaga.",
    },
    {
      q: "Boleh membawa teman menginap?",
      a: "Tamu diperbolehkan berkunjung. Untuk menginap, harap melapor kepada pengelola dan maksimal hanya untuk 2 malam demi kenyamanan penghuni lain.",
    },
  ];

  const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];

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

  return (
    <div
      className={`${darkMode ? "bg-[#121212] text-white" : "bg-white text-[#333]"} font-sans overflow-x-hidden transition-colors duration-500 scroll-smooth`}
    >
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .gallery-container-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}
      </style>

      {/* ================= FLOATING WHATSAPP (WITH PRE-FILLED MESSAGE) ================= */}
      <a
        href={`https://wa.me/${waNumber}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[1000] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div
          className={`${darkMode ? "bg-black/40 border-white/10" : "bg-white/70 border-white/40"} backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 md:px-8 py-3 rounded-3xl md:rounded-full flex justify-between items-center gap-6 shadow-lg border transition-colors duration-500`}
        >
          <span className="md:hidden font-black italic text-sm tracking-tighter uppercase">
            KOST PAK YOYOK
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

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-white/10 text-yellow-400" : "bg-black/5 text-gray-600 hover:bg-black/10"}`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              to="/login"
              className="bg-[#B6FF40] text-black px-6 py-2 rounded-full text-[10px] font-black hover:scale-105 transition flex items-center gap-2"
            >
              LOGIN <ChevronRight size={14} />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2">
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button className="p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`absolute top-20 left-4 right-4 ${darkMode ? "bg-[#1A1A1A] border-white/10 text-white" : "bg-white border-gray-100"} rounded-3xl p-6 shadow-2xl border flex flex-col gap-4 md:hidden`}
          >
            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold"
            >
              About
            </a>
            <a
              href="#tour"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold"
            >
              Visit
            </a>
            <Link
              to="/login"
              className="bg-[#B6FF40] text-black text-center py-4 rounded-2xl font-black text-sm uppercase"
            >
              LOGIN
            </Link>
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
            Modern living space at an affordable price. Experience comfort like
            never before.
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

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`${darkMode ? "bg-white/5 border border-white/5 text-white" : "bg-[#F9F9F7] text-black"} rounded-[40px] p-10 md:p-14 fade-up`}
          >
            <div
              className={`w-12 h-12 ${darkMode ? "bg-white/10 text-[#B6FF40]" : "bg-white text-black"} rounded-2xl flex items-center justify-center shadow-sm mb-8`}
            >
              <Bed size={24} />
            </div>
            <h3 className="text-2xl font-black mb-6 italic tracking-tight uppercase">
              Room Features
            </h3>
            <ul
              className={`space-y-4 ${darkMode ? "text-gray-400" : "text-gray-500"} font-bold text-sm`}
            >
              <li>✦ Bed (2m x 1.5m)</li>
              <li>✦ Comfortable Pillow & Bolster</li>
              <li>✦ Private Cupboard</li>
            </ul>
          </div>
          <div
            className={`${darkMode ? "bg-[#B6FF40] text-black" : "bg-black text-white"} rounded-[40px] p-10 md:p-14 fade-up`}
          >
            <div
              className={`w-12 h-12 ${darkMode ? "bg-black/10" : "bg-white/10"} rounded-2xl flex items-center justify-center mb-8`}
            >
              <Wifi
                size={24}
                className={darkMode ? "text-black" : "text-[#B6FF40]"}
              />
            </div>
            <h3 className="text-2xl font-black mb-6 italic tracking-tight uppercase">
              Shared Facilities
            </h3>
            <ul
              className={`space-y-4 ${darkMode ? "text-black/70" : "text-gray-400"} font-bold text-sm`}
            >
              <li className="flex items-center gap-4">
                <Zap size={16} /> High-speed Wi-Fi
              </li>
              <li className="flex items-center gap-4">
                <Utensils size={16} /> Shared Clean Kitchen
              </li>
              <li className="flex items-center gap-4">
                <Bath size={16} /> Maintained Bathroom
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MOVING GALLERY ================= */}
      <section
        id="tour"
        className={`py-24 ${darkMode ? "bg-[#0A0A0A]" : "bg-[#F9F9F7]"} overflow-hidden transition-colors duration-500`}
      >
        <div className="max-w-6xl mx-auto px-6 mb-12 fade-up text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase">
            Take a tour
          </h2>
          <p className="text-gray-400 font-medium">
            Explore our premium rooms and common areas.
          </p>
        </div>
        <div className="relative gallery-container-mask">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 px-6"
          >
            {infiniteImages.map((img, index) => (
              <div
                key={index}
                className={`w-[85vw] md:w-[500px] h-[400px] md:h-[600px] flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-xl ${darkMode ? "shadow-black/50" : ""}`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`tour-${index}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-10">
            {galleryImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeDot === index ? (darkMode ? "w-10 bg-[#B6FF40]" : "w-10 bg-black") : darkMode ? "w-2 bg-white/20" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section
        className={`py-24 ${darkMode ? "bg-[#121212]" : "bg-white"} text-center px-6`}
      >
        <h2 className="text-3xl font-black italic mb-10 tracking-tighter fade-up uppercase">
          Visit Our Space
        </h2>
        <div
          className={`max-w-6xl mx-auto rounded-[50px] overflow-hidden shadow-2xl border-[12px] ${darkMode ? "border-[#1A1A1A] shadow-black/40" : "border-white"} h-[400px] md:h-[600px] fade-up`}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=..."
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

      {/* ================= FAQ SECTION ================= */}
      <section
        className={`py-24 px-6 ${darkMode ? "bg-[#0A0A0A]" : "bg-[#F9F9F7]"} transition-colors duration-500`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
              Common Questions
            </h2>
            <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">
              Pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`fade-up ${darkMode ? "bg-[#1A1A1A] border-white/5" : "bg-white border-gray-100"} border rounded-[32px] overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full p-6 md:p-8 text-left flex justify-between items-center group"
                >
                  <span
                    className={`font-black text-sm md:text-base uppercase tracking-tight ${darkMode ? "text-gray-200" : "text-black"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all ${openFaqIndex === index ? "bg-[#B6FF40] text-black rotate-90" : "bg-gray-100 text-gray-400"}`}
                  >
                    <ChevronRight size={18} />
                  </div>
                </button>
                <div
                  className={`px-6 md:px-8 transition-all duration-300 ease-in-out ${openFaqIndex === index ? "max-h-60 pb-8 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                >
                  <p
                    className={`text-sm md:text-base leading-relaxed font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className={`${darkMode ? "bg-[#121212] border-t border-white/5" : "bg-white"} pt-16 pb-12 transition-colors duration-500`}
      >
        <div className="w-full">
          <div
            className={`w-full border-y ${darkMode ? "border-white/5" : "border-gray-200"} mb-16`}
          >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
              <div className="flex gap-6 md:gap-12 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <a href="#home" className="hover:text-[#B6FF40] transition">
                  Home
                </a>
                <a href="#features" className="hover:text-[#B6FF40] transition">
                  About
                </a>
              </div>
              <span
                className={`italic font-black text-[13px] md:text-[16px] uppercase tracking-tighter ${darkMode ? "text-white" : "text-black"}`}
              >
                Kost Pak Yoyok
              </span>
              <div className="flex gap-6 md:gap-12 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <a href="#tour" className="hover:text-[#B6FF40] transition">
                  Visit
                </a>
                <a
                  href="#booking"
                  className={`hover:text-[#B6FF40] transition ${darkMode ? "text-white" : "text-black"}`}
                >
                  Booking
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
            <div
              className={`text-[13px] md:text-[15px] leading-relaxed font-semibold opacity-90 ${darkMode ? "text-gray-400" : "text-black"}`}
            >
              Kemantren, Jabung, <br /> Malang Regency, East Java <br /> 65155.
            </div>
            <div
              className={`text-[16px] md:text-[20px] font-bold tracking-tight ${darkMode ? "text-[#B6FF40]" : "text-black"}`}
            >
              +62 813-3121-7162
            </div>
          </div>
          <div className="mt-24 text-center text-[10px] md:text-[11px] text-gray-400 font-medium tracking-tight uppercase">
            © 2026 Kost Pak Yoyok. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Bed, Box, Wifi, Utensils, Bath, ChevronRight, Menu, X, Zap } from "lucide-react";

export default function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const galleryImages = [
    "/image10.jpeg", "/image2.jpeg", "/image3.jpeg", "/image4.jpeg",
    "/image5.jpeg", "/image6.jpeg", "/image9.jpeg", "/image8.jpeg",
  ];

  // Duplikasi array gambar (3x) untuk menciptakan efek infinite scroll
  const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];

  // Logika Scroll: Mendeteksi dots dan melakukan "Seamless Jump"
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    // 1. Seamless Jump Logic
    // Jika scroll mendekati ujung kiri, lompat ke set tengah
    if (scrollLeft <= 5) {
      scrollRef.current.scrollLeft = singleSetWidth + 5;
    } 
    // Jika scroll mendekati ujung kanan, lompat kembali ke set tengah
    else if (scrollLeft + offsetWidth >= scrollWidth - 5) {
      scrollRef.current.scrollLeft = singleSetWidth;
    }

    // 2. Update Dots Logic
    // Menghitung index berdasarkan posisi scroll terhadap lebar satu set gambar
    const relativeScroll = scrollLeft % singleSetWidth;
    const index = Math.round(relativeScroll / (offsetWidth * 0.8));
    setActiveDot(index % galleryImages.length);
  };

  useEffect(() => {
    // Mulai dari set gambar kedua (tengah) agar bisa scroll ke kiri & kanan langsung
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth / 3;
    }

    // Intersection Observer untuk animasi Fade Up
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [galleryImages.length]);

  return (
    <div className="bg-white font-sans overflow-x-hidden text-[#333] scroll-smooth">
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)); }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Fade halus di sisi kanan dan kiri gallery */
        .gallery-container-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}
      </style>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-white/70 backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 md:px-8 py-3 rounded-3xl md:rounded-full flex justify-between items-center gap-10 shadow-lg border border-white/40">
          <span className="md:hidden font-black italic text-sm tracking-tighter">KOST PAK YOYOK</span>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition">Home</a>
            <a href="#features" className="text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition">About</a>
            <a href="#tour" className="text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition">Visit</a>
            <Link to="/login" className="bg-[#B6FF40] text-black px-6 py-2 rounded-full text-[10px] font-black hover:scale-105 transition flex items-center gap-2">
              LOGIN <ChevronRight size={14} />
            </Link>
          </div>

          <button className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 md:hidden">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">About</a>
            <a href="#tour" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Visit</a>
            <Link to="/login" className="bg-[#B6FF40] text-center py-4 rounded-2xl font-black text-sm">LOGIN</Link>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative h-[85vh] w-full flex items-center justify-center">
        <img src="/image2.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 hero-gradient"></div>

        <div className="relative z-10 text-white text-left px-8 md:px-20 w-full max-w-7xl fade-up">
          <h1 className="text-5xl md:text-9xl font-black leading-[0.85] mb-6 tracking-tighter">
            Find your <br /><span className="text-[#B6FF40]">perfect</span> stay
          </h1>
          <p className="text-sm md:text-xl opacity-90 max-w-md font-medium">Modern living space at an affordable price. Experience comfort like never before.</p>
        </div>

        <div className="absolute bottom-10 right-8 bg-white/95 backdrop-blur-md p-6 rounded-[32px] shadow-2xl border border-white fade-up">
          <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-1">Starting from</p>
          <p className="text-2xl md:text-3xl font-black text-[#1A1A1A]">Rp450.000<span className="text-sm font-bold text-gray-400">/mo</span></p>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F9F9F7] rounded-[40px] p-10 md:p-14 fade-up">
            
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
              <Bed size={24} />
            </div>
            <h3 className="text-2xl font-black mb-6 italic tracking-tight">Room Features</h3>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li className="flex items-center gap-4">✦ Bed (2m x 1.5m)</li>
              <li className="flex items-center gap-4">✦ Comfortable Pillow & Bolster</li>
              <li className="flex items-center gap-4">✦ Private Cupboard</li>
            </ul>
          </div>
          <div className="bg-black text-white rounded-[40px] p-10 md:p-14 fade-up">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Wifi size={24} className="text-[#B6FF40]" />
            </div>
            <h3 className="text-2xl font-black mb-6 italic tracking-tight">Shared Facilities</h3>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="flex items-center gap-4"><Zap size={16} className="text-[#B6FF40]"/> High-speed Wi-Fi</li>
              <li className="flex items-center gap-4"><Utensils size={16} className="text-[#B6FF40]"/> Shared Clean Kitchen</li>
              <li className="flex items-center gap-4"><Bath size={16} className="text-[#B6FF40]"/> Maintained Bathroom</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MOVING GALLERY ================= */}
      <section id="tour" className="py-24 bg-[#F9F9F7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 fade-up text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic">Take a tour</h2>
          <p className="text-gray-400 font-medium">Explore our premium rooms and common areas.</p>
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
                className="w-[85vw] md:w-[500px] h-[400px] md:h-[600px] flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-xl"
              >
                <img src={img} className="w-full h-full object-cover" alt={`tour-${index}`} />
              </div>
            ))}
          </div>

          {/* DOTS */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {galleryImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === index ? "w-10 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-24 bg-white text-center px-6">
        <h2 className="text-3xl font-black italic mb-10 tracking-tighter fade-up">Visit Our Space</h2>
        <div className="max-w-6xl mx-auto rounded-[50px] overflow-hidden shadow-2xl border-[12px] border-white h-[400px] md:h-[600px] fade-up">
          <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.2139!2d112.6326!3d-7.9839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTknMDIuMCJTIDExMsKwMzcnNTcuNCJF!5e0!3m2!1sen!2sid!4v1625123456789" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
<footer className="bg-white pt-16 pb-12 px-0"> {/* Px-0 agar garis bisa full ke pinggir */}
  <div className="w-full">
    
    {/* Navigasi Tengah dengan Garis Full Width */}
    <div className="w-full border-y border-gray-200 mb-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Link Kiri */}
        <div className="flex gap-6 md:gap-12 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <a href="#home" className="hover:text-black transition">Home</a>
          <a href="#about" className="hover:text-black transition">About</a>
        </div>

        {/* Logo Tengah */}
        <span className="text-black italic font-black text-[13px] md:text-[16px] uppercase tracking-tighter">
          Kost Pak Yoyok
        </span>

        {/* Link Kanan */}
        <div className="flex gap-6 md:gap-12 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <a href="#tour" className="hover:text-black transition">Visit</a>
          <a href="#booking" className="hover:text-black transition text-black">Booking</a>
        </div>
      </div>
    </div>

    {/* Baris Alamat & Kontak */}
    <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
      <div className="text-[13px] md:text-[15px] leading-relaxed font-semibold text-black opacity-90">
        Kemantren, Jabung,<br />
        Malang Regency, East Java<br />
        65155.
      </div>
      <div className="text-[16px] md:text-[20px] font-bold text-black tracking-tight">
        +62 813-3121-7162
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-24 text-center text-[10px] md:text-[11px] text-gray-400 font-medium tracking-tight">
      © 2026 Kost Pak Yoyok. All rights reserved.
    </div>
  </div>
</footer>
    </div>
  );
}
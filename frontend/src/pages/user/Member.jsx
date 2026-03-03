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
} from "lucide-react";

export default function MemberPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("booking"); // Default buka 'Make it yours'
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);

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

  // Fungsi scroll untuk gallery dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const scrollPosition = scrollRef.current.scrollLeft;
      const index = Math.round(scrollPosition / width);
      setActiveDot(index);
    }
  };

  // Efek Fade Up
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="bg-white font-sans overflow-x-hidden text-[#333] scroll-smooth">
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}
      </style>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-white/80 backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 py-3 rounded-full flex justify-between items-center gap-8 shadow-lg border border-white/40">
          <span className="md:hidden font-black italic text-[12px] tracking-tighter uppercase">
            Kost Pak Yoyok
          </span>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-xs font-bold hover:text-blue-600">Home</a>
            <a href="#features" className="text-xs font-bold hover:text-blue-600">About</a>
            <a href="#tour" className="text-xs font-bold hover:text-blue-600">Visit</a>
            <a href="#booking" className="text-xs font-bold hover:text-blue-600">Booking</a>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              <div className="w-5 h-5 bg-[#B6FF40] rounded-full flex items-center justify-center text-[9px] font-black">M</div>
              <span className="text-[10px] font-bold">Member</span>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 md:hidden">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="font-bold border-b pb-2">Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="font-bold border-b pb-2">About</a>
            <a href="#booking" onClick={() => setIsMenuOpen(false)} className="font-bold">Booking</a>
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

      {/* ================= TOUR ================= */}
      <section id="tour" className="py-20 bg-[#F9F9F7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 fade-up">
          <h2 className="text-4xl font-black italic tracking-tighter">Take a tour</h2>
          <p className="text-gray-400 font-medium">Explore our rooms and shared spaces.</p>
        </div>
        <div className="relative">
          <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="w-[85vw] md:w-[500px] h-[450px] flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-2xl">
                <img src={img} className="w-full h-full object-cover" alt="tour" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {galleryImages.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${activeDot === i ? "w-8 bg-black" : "w-1.5 bg-gray-300"}`} />
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

      {/* ================= MEMBER ACTIONS ================= */}
      <section id="booking" className="max-w-2xl mx-auto px-6 pb-24 space-y-2">
        {/* Accordion 1 */}
        <div className="border-b border-gray-100">
          <button onClick={() => toggleAccordion("visit")} className="w-full flex justify-between items-center py-6">
            <span className="font-bold text-lg">Book a site visit</span>
            <ChevronDown size={20} className={`text-gray-300 transition-transform ${activeAccordion === "visit" ? "rotate-180" : ""}`} />
          </button>
          {activeAccordion === "visit" && (
            <div className="pb-8 space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded-xl p-4 text-sm outline-none focus:border-black" />
              <div className="relative">
                <input type="text" placeholder="Preferred Date" className="w-full border rounded-xl p-4 text-sm outline-none focus:border-black" />
                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button className="w-full py-4 bg-gray-100 text-blue-600 font-bold rounded-xl text-sm">Confirm</button>
            </div>
          )}
        </div>

        {/* Accordion 2: Make It Yours */}
        <div className="border-b border-gray-100">
          <button onClick={() => toggleAccordion("booking")} className="w-full flex justify-between items-center py-6">
            <span className="font-bold text-lg">Make it yours</span>
            <ChevronDown size={20} className={`text-gray-300 transition-transform ${activeAccordion === "booking" ? "rotate-180" : ""}`} />
          </button>
          {activeAccordion === "booking" && (
            <div className="pb-8 space-y-6">
              <div className="border border-gray-100 rounded-[30px] p-6 bg-white shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-tighter mb-4">Room Availability</p>
                <div className="space-y-3">
                  {["Room 01", "Room 02", "Room 03 — Available", "Room 04 — Available", "Room 05"].map((room, i) => (
                    <div key={i} className="flex justify-between items-center text-[12px] font-bold">
                      <span className={room.includes("Available") ? "text-green-500" : "text-gray-300"}>{room}</span>
                      <button className={`px-4 py-1 rounded-full text-[9px] ${room.includes("Available") ? "bg-[#B6FF40]" : "bg-gray-100 text-gray-400"}`}>
                        {room.includes("Available") ? "Book Now" : "Unavailable"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Full Name" className="w-full border rounded-xl p-4 text-sm outline-none focus:border-black" />
                <div className="relative">
                  <input type="text" placeholder="Preferred Date" className="w-full border rounded-xl p-4 text-sm outline-none focus:border-black" />
                  <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="pt-2 space-y-4">
                <p className="font-bold italic">Pay & Confirm</p>
                <div className="border border-gray-100 rounded-[30px] p-6 space-y-3 bg-white shadow-sm text-[13px]">
                  <div className="flex justify-between"> <span className="text-gray-400">Bank:</span> <span className="font-bold">BRI</span> </div>
                  <div className="flex justify-between"> <span className="text-gray-400">Account:</span> <span className="font-bold">629801065602534</span> </div>
                  <div className="flex justify-between"> <span className="text-gray-400">Name:</span> <span className="font-bold text-right uppercase">A.A Made Kusumawati</span> </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-[11px] font-bold italic mb-3">Upload Transfer Receipt</p>
                    <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-gray-50/50">
                      <Plus size={20} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-[10px] font-bold text-gray-400">Choose File</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-gray-100 text-blue-600 font-bold rounded-xl text-sm">Book Now</button>
              </div>
            </div>
          )}
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
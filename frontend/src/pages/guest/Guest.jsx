import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Phone, Bed, Box, Wifi, Utensils, Bath, ChevronRight, Menu, X, Check, Zap } from "lucide-react";

export default function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const galleryImages = [
    "/image1.jpeg", "/image2.jpeg", "/image3.jpeg", "/image4.jpeg",
    "/image5.jpeg", "/image6.jpeg", "/image9.jpeg", "/image8.jpeg",
  ];

  useEffect(() => {
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
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden text-[#333] scroll-smooth">
      <style>
        {`
        .fade-up { opacity: 0; transform: translateY(30px); transition: all .8s ease-out; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)); }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * 4)); } 
        }
        @media (min-width: 768px) {
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-350px * 4)); } 
          }
        }
        .animate-marquee {
          display: flex;
          animation: scroll 20s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }
      `}
      </style>

      {/* ================= NAVBAR (RESPONSIVE) ================= */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-white/70 backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-6 md:px-8 py-3 rounded-3xl md:rounded-full flex justify-between md:justify-center items-center gap-8 shadow-lg border border-white/40">
          <span className="md:hidden font-black italic text-sm">KOST PAK YOYOK</span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-sm font-bold hover:text-[#0066FF] transition">Home</a>
            <a href="#features" className="text-sm font-bold hover:text-[#0066FF] transition">About</a>
            <a href="#tour" className="text-sm font-bold hover:text-[#0066FF] transition">Visit</a>
            <a href="#booking" className="text-sm font-bold hover:text-[#0066FF] transition">Booking</a>
            <Link to="/login" className="bg-[#B6FF40] text-black px-6 py-2 rounded-full text-xs font-black hover:scale-105 transition flex items-center gap-1">
              LOGIN <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">About</a>
            <a href="#tour" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Visit</a>
            <a href="#booking" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Booking</a>
            <Link to="/login" className="bg-[#B6FF40] text-center py-3 rounded-2xl font-black">LOGIN</Link>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center">
        <img src="/image1.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 hero-gradient"></div>

        <div className="relative z-10 text-white text-center px-6 fade-up">
          <h1 className="text-4xl md:text-8xl font-black leading-tight mb-4 tracking-tighter">
            Find your <span className="text-[#B6FF40]">perfect</span><br />stay
          </h1>
          <p className="text-base md:text-xl opacity-90 max-w-2xl mx-auto font-medium">
            Clean space, friendly price. Right here.
          </p>
        </div>

        {/* Floating Price - Hidden on small mobile to avoid clutter */}
        <div className="absolute bottom-10 md:bottom-12 right-6 md:right-12 bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-[24px] shadow-2xl fade-up border border-white">
          <p className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly</p>
          <p className="text-xl md:text-2xl font-black text-[#1A1A1A]">Rp450.000,00</p>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="flex justify-center mb-10 md:mb-16 fade-up">
          <span className="bg-gray-100 px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black text-gray-500 border border-gray-200 uppercase tracking-widest">
            ✦ Our Space
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-12 shadow-sm border border-gray-100 fade-up">
            <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 tracking-tight">Room Features</h3>
            <ul className="space-y-4 md:space-y-6 text-gray-500 font-bold text-sm md:text-base">
              <li className="flex items-center gap-4"><Bed className="text-black" size={20}/> Bed (2m x 1.5m)</li>
              <li className="flex items-center gap-4"><Box className="text-black" size={20}/> Pillow & Bolster</li>
              <li className="flex items-center gap-4"><Box className="text-black" size={20}/> Cupboard</li>
            </ul>
          </div>

          <div className="bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-12 shadow-sm border border-gray-100 fade-up">
            <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 tracking-tight">Shared Facilities</h3>
            <ul className="space-y-4 md:space-y-6 text-gray-500 font-bold text-sm md:text-base">
              <li className="flex items-center gap-4"><Wifi className="text-black" size={20}/> High-speed Wi-Fi</li>
              <li className="flex items-center gap-3"><Zap size={18} className="text-black"/> Electricity Included</li>
              <li className="flex items-center gap-4"><Utensils className="text-black" size={20}/> Shared Kitchen</li>
              <li className="flex items-center gap-4"><Bath className="text-black" size={20}/> External Bathroom</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MOVING GALLERY ================= */}
      <section id="tour" className="py-16 md:py-24 bg-[#F9F9F7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 md:mb-16 fade-up text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight">Take a tour</h2>
          <p className="text-gray-400 text-sm md:text-lg font-medium">Explore our rooms and shared spaces.</p>
        </div>

        <div className="relative flex overflow-hidden py-4">
          <div className="animate-marquee gap-4 md:gap-8 px-4">
            {galleryImages.concat(galleryImages).map((img, index) => (
              <div 
                key={index} 
                className="w-[280px] md:w-[350px] h-[400px] md:h-[500px] flex-shrink-0 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl"
              >
                <img src={img} className="w-full h-full object-cover" alt="tour" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISIT & MAP ================= */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 fade-up text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-10 md:mb-12 tracking-tight">Visit Our Space</h2>
          <div className="rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-white h-[350px] md:h-[500px]">
            <iframe title="map" src="https://maps.google.com/maps?q=Malang&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }}></iframe>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-100 pt-16 md:pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h2 className="text-xl font-black italic md:order-2">KOST PAK YOYOK</h2>
            <div className="flex gap-6 md:gap-12 font-black text-[10px] uppercase tracking-widest text-gray-400 md:order-1">
              <a href="#home">Home</a>
              <a href="#features">About</a>
            </div>
            <div className="flex gap-6 md:gap-12 font-black text-[10px] uppercase tracking-widest text-gray-400 md:order-3">
              <a href="#tour">Visit</a>
              <a href="#booking">Booking</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
            <div>
              <p className="font-black text-[10px] uppercase tracking-widest mb-2">Location</p>
              <p className="text-gray-500 text-sm">Kemantren, Jabung, Malang Regency, East Java 65155.</p>
            </div>
            <div className="md:text-right">
              <p className="font-black text-[10px] uppercase tracking-widest mb-2">Contact</p>
              <p className="text-2xl md:text-4xl font-black tracking-tighter">+62 813-3121-7162</p>
            </div>
          </div>
          <div className="mt-16 text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.4em]">© 2026 Kost Pak Yoyok.</div>
        </div>
      </footer>
    </div>
  );
}
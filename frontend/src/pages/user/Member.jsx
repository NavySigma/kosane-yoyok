import { useEffect, useState } from "react";
import { 
  ChevronRight, Check, MapPin, Phone, Bed, Box, Wifi, 
  Utensils, Bath, Menu, X, Eye, EyeOff, Calendar, Clipboard, Upload, ChevronDown, ChevronUp, Zap
} from "lucide-react";

export default function Member() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("visit");

  const galleryImages = [
    "/image1.jpeg", "/image2.jpeg", "/image3.jpeg", "/image4.jpeg",
    "/image5.jpeg", "/image6.jpeg", "/image8.jpeg", "/image9.jpeg",
  ];

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
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 6)); } 
        }
        @media (min-width: 768px) {
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-450px * 6)); } 
          }
        }
        .animate-marquee { display: flex; animation: scroll 25s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        /* Efek Fade In/Out Masking untuk Tour Gallery */
        .mask-fade {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}
      </style>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-white/80 backdrop-blur-2xl w-full max-w-[95%] md:max-w-fit px-5 md:px-8 py-3 rounded-2xl md:rounded-full flex justify-between md:justify-center items-center gap-8 shadow-lg border border-white/40">
          <span className="md:hidden font-black italic text-sm tracking-tighter">KOST PAK YOYOK</span>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-sm font-bold hover:text-[#0066FF] transition">Home</a>
            <a href="#features" className="text-sm font-bold hover:text-[#0066FF] transition">About</a>
            <a href="#tour" className="text-sm font-bold hover:text-[#0066FF] transition">Visit</a>
            <a href="#booking" className="text-sm font-bold hover:text-[#0066FF] transition">Booking</a>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200">
               <div className="w-6 h-6 bg-[#B6FF40] rounded-full flex items-center justify-center text-[10px] font-black">M</div>
               <span className="text-xs font-bold">Member</span>
            </div>
          </div>
          <button className="md:hidden p-1 text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold border-b border-gray-50 pb-2">Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold border-b border-gray-50 pb-2">About</a>
            <a href="#tour" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold border-b border-gray-50 pb-2">Visit</a>
            <a href="#booking" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Booking</a>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <img src="/image1.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 text-white text-center px-6 fade-up">
          <h1 className="text-4xl md:text-8xl font-black leading-tight tracking-tighter">
            Find your <span className="text-[#B6FF40]">perfect</span> stay
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg opacity-90 max-w-md mx-auto">Clean space, friendly price. Right here.</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-16 md:py-20 px-6 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8 md:mb-10 fade-up">
          <span className="bg-gray-100 px-6 py-2 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest italic border border-gray-200">✦ Our Space</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm border border-gray-100 fade-up">
            <h3 className="text-xl md:text-2xl font-black mb-6 italic">Room Features</h3>
            <ul className="space-y-4 font-bold text-gray-500 text-sm md:text-base">
              <li className="flex items-center gap-3"><Bed size={18} className="text-black"/> Bed (2m x 1.5m)</li>
              <li className="flex items-center gap-3"><Box size={18} className="text-black"/> Pillow & Bolster</li>
              <li className="flex items-center gap-3"><Box size={18} className="text-black"/> Cupboard</li>
            </ul>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm border border-gray-100 fade-up">
            <h3 className="text-xl md:text-2xl font-black mb-6 italic">Shared Facilities</h3>
            <ul className="space-y-4 font-bold text-gray-500 text-sm md:text-base">
              <li className="flex items-center gap-3"><Wifi size={18} className="text-black"/> High-speed Wi-Fi</li>
              <li className="flex items-center gap-3"><Zap size={18} className="text-black"/> Electricity Included</li>
              <li className="flex items-center gap-3"><Utensils size={18} className="text-black"/> Shared Kitchen</li>
              <li className="flex items-center gap-3"><Bath size={18} className="text-black"/> External Bathroom</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TOUR ================= */}
      <section id="tour" className="py-16 md:py-20 bg-[#F9F9F7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8 md:mb-12 fade-up">
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">Take a tour</h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">Explore our rooms and shared spaces in every detail.</p>
        </div>
        
        {/* Gallery with Fade In/Out Effect */}
        <div className="mask-fade overflow-hidden">
          <div className="animate-marquee gap-4 md:gap-6 px-4">
            {galleryImages.concat(galleryImages).map((img, i) => (
              <div key={i} className="w-[250px] md:w-[450px] h-[350px] md:h-[600px] flex-shrink-0 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl">
                <img src={img} className="w-full h-full object-cover" alt="Gallery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6 fade-up">
          <h2 className="text-3xl md:text-4xl font-black italic mb-8 tracking-tighter">Visit Our Space</h2>
          <div className="rounded-[30px] md:rounded-[60px] overflow-hidden shadow-2xl border-[6px] md:border-[15px] border-white h-[300px] md:h-[550px] mb-8">
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.28548021118!2d112.6317861!3d-7.9784695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6282204403acd%3A0x2aa93d06f1ae001e!2sMalang%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1709360000000!5m2!1sen!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>

        {/* ================= MEMBER ACTIONS ================= */}
        <div id="booking" className="max-w-2xl mx-auto px-4 md:px-6 space-y-4 mb-20 md:mb-32">
          
          {/* ACCORDION 1: VISIT */}
          <div className="border border-gray-200 rounded-[25px] md:rounded-[30px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("visit")}
              className="w-full flex justify-between items-center p-5 md:p-6 bg-white hover:bg-gray-50 transition"
            >
              <span className="font-black text-base md:text-lg italic">Book a site visit</span>
              {activeAccordion === "visit" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {activeAccordion === "visit" && (
              <div className="p-6 md:p-8 bg-white border-t border-gray-100 text-left space-y-4 animate-in slide-in-from-top-2">
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#B6FF40] outline-none" />
                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#B6FF40] outline-none" />
                <textarea placeholder="Additional Notes" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl h-28 text-sm focus:ring-2 focus:ring-[#B6FF40] outline-none"></textarea>
                <button className="w-full py-4 bg-blue-100 text-blue-600 font-black rounded-full hover:bg-blue-200 transition text-sm">Confirm Visit</button>
              </div>
            )}
          </div>

          {/* ACCORDION 2: BOOKING + PAY & CONFIRM */}
          <div className="border border-gray-200 rounded-[25px] md:rounded-[30px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("booking")}
              className="w-full flex justify-between items-center p-5 md:p-6 bg-white hover:bg-gray-50 transition"
            >
              <span className="font-black text-base md:text-lg italic">Make it yours</span>
              {activeAccordion === "booking" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {activeAccordion === "booking" && (
              <div className="p-6 md:p-8 bg-white border-t border-gray-100 text-left space-y-6 animate-in slide-in-from-top-2">
                {/* Room Availability */}
                <div className="space-y-3">
                  <h4 className="font-black italic text-sm uppercase tracking-tighter">Room Availability</h4>
                  <div className="space-y-2">
                    {["Room 01 - Unavailable", "Room 03 - Available", "Room 04 - Available"].map((room, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className={`text-xs font-bold ${room.includes("Available") && !room.includes("Un") ? "text-green-600" : "text-gray-400"}`}>{room.split(' - ')[0]}</span>
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${room.includes("Available") && !room.includes("Un") ? "bg-[#B6FF40] text-black" : "bg-gray-200 text-gray-500"}`}>
                            {room.split(' - ')[1]}
                          </span>
                       </div>
                    ))}
                  </div>
                </div>

                {/* Form Data */}
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm" />
                  <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm" />
                </div>

                {/* ================= PAY & CONFIRM MENU ================= */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h4 className="font-black italic text-sm uppercase tracking-tighter text-blue-600">Pay & Confirm</h4>
                  
                  {/* Bank Details Card */}
                  <div className="bg-gray-900 p-5 md:p-6 rounded-[25px] text-white space-y-3">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bank</span>
                      <span className="text-xs font-black">BRI</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Number</span>
                      <span className="text-xs font-black tracking-widest">1234-5678-9012</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Beneficiary</span>
                      <span className="text-xs font-black uppercase">Pak Yoyok</span>
                    </div>
                  </div>

                  {/* Upload Receipt Area */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Upload Transfer Receipt</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-[25px] p-8 text-center space-y-2 group cursor-pointer hover:border-[#B6FF40] hover:bg-[#B6FF40]/5 transition-all bg-gray-50/50">
                      <div className="flex justify-center">
                        <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                          <Upload size={20} className="text-gray-300 group-hover:text-[#B6FF40]" />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Click or drag to upload receipt</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-black text-[#B6FF40] font-black rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest mt-2">
                    Book & Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 3: HISTORY */}
          <div className="border border-gray-200 rounded-[25px] md:rounded-[30px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("history")}
              className="w-full flex justify-between items-center p-5 md:p-6 bg-white hover:bg-gray-50 transition"
            >
              <span className="font-black text-base md:text-lg italic">Booking History</span>
              {activeAccordion === "history" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {activeAccordion === "history" && (
              <div className="p-6 md:p-8 bg-white border-t border-gray-100 text-left space-y-4 animate-in slide-in-from-top-2">
                <div className="p-5 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
                   <p className="text-[11px] font-bold text-gray-400 uppercase">Status: <span className="text-blue-600 font-black">Confirmed</span></p>
                   <p className="text-xs font-bold text-black">Booking for March 10, 2026</p>
                   <p className="text-[10px] text-gray-500">Room 03 • Payment Verified</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-8 px-6 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-400 font-bold text-[11px] md:text-sm leading-relaxed">
            Kemantren, Jabung, Malang Regency,<br className="hidden md:block" /> East Java 65155.
          </div>
          <h2 className="text-xl font-black italic tracking-tighter text-black uppercase">Kost Pak Yoyok</h2>
          <div className="text-center md:text-right">
            <p className="text-xl md:text-3xl font-black text-black tracking-tighter">+62 813-3121-7162</p>
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2">© 2026 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
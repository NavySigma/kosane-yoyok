import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Guest() {
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
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#EBEBDF] font-sans overflow-hidden">

      <style>
        {`
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all .8s ease;
        }
        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}
      </style>

      {/* ================= HERO ================= */}
      <div className="bg-[#2B207C] text-white pb-32 relative">

        {/* NAVBAR */}
        <div className="flex justify-center pt-6">
          <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full flex gap-6 items-center shadow-lg text-[#2B207C] font-semibold text-sm">
            <span>Beranda</span>
            <span>Tentang</span>
            <span>Survei</span>

            <Link to="/login" className="bg-[#2B207C] text-white px-4 py-1 rounded-full text-xs">
              Login
            </Link>
            <Link to="/register" className="bg-[#2B207C] text-white px-4 py-1 rounded-full text-xs">
              Register
            </Link>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-6xl mx-auto px-6 mt-20 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-md fade-up">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Cari kost nggak<br />perlu pusing.
            </h1>
            <p className="opacity-80 text-sm">
              Lingkungan bersih, harga terjangkau, lokasi strategis.
            </p>
          </div>

          <img
            src="/house.png"
            alt="house"
            className="w-64 md:w-[400px] mt-10 md:mt-0 fade-up"
          />
        </div>

        {/* WAVE */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#EBEBDF"
            fillOpacity="1"
            d="M0,224L80,202.7C160,181,320,139,480,138.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128V320H0Z"
          ></path>
        </svg>
      </div>

      {/* ================= FASILITAS ================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 fade-up">
        <p className="text-[#2B207C] font-bold mb-6">
          Everything you get is here. Cek yuk!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#2B207C] text-white rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold mb-4">Fasilitas Kamar</h3>
            <ul className="space-y-2 text-sm">
              <li>• Kasur</li>
              <li>• Lemari</li>
              <li>• Bantal & Guling</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold mb-4 text-[#2B207C]">Fasilitas Umum</h3>
            <ul className="space-y-2 text-sm text-[#2B207C]">
              <li>• WiFi</li>
              <li>• Dapur</li>
              <li>• Kamar Mandi Luar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="max-w-6xl mx-auto px-6 mt-20 fade-up">
        <h2 className="text-[#2B207C] font-bold mb-6">
          Intip setiap sudutnya!
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((num) => (
            <img
              key={num}
              src={`/gambar${num}.png`}
              alt={`gambar${num}`}
              className="rounded-xl h-32 object-cover shadow-md hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      {/* ================= MAP ================= */}
      <div className="bg-[#2B207C] text-white mt-24 pt-20 pb-32 relative fade-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-10">
            Welcome home!
          </h2>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* WAVE */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#EBEBDF"
            d="M0,256L80,240C160,224,320,192,480,176C640,160,800,160,960,176C1120,192,1280,224,1360,240L1440,256V320H0Z"
          ></path>
        </svg>
      </div>

      {/* ================= FORM ================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10 grid md:grid-cols-2 gap-10 fade-up">

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="font-bold text-[#2B207C] mb-6">
            Mau sewa kost? Yuk, sebutin!
          </h3>

          <div className="space-y-4">
            <input className="w-full border rounded-full px-4 py-2" placeholder="Nama" />
            <input className="w-full border rounded-full px-4 py-2" placeholder="Tanggal" />
            <input className="w-full border rounded-full px-4 py-2" placeholder="Catatan" />
            <button className="bg-[#2B207C] text-white px-6 py-2 rounded-full text-sm">
              Kirim
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="font-bold text-[#2B207C] mb-6">
            Riwayat survei kamu
          </h3>

          <div className="space-y-4">
            <input className="w-full border rounded-full px-4 py-2" placeholder="Nama" />
            <input className="w-full border rounded-full px-4 py-2" placeholder="Tanggal" />
            <input className="w-full border rounded-full px-4 py-2" placeholder="Catatan" />
          </div>
        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-[#2B207C] text-white mt-20 py-10 text-center text-sm">
        © 2026 Kost Pak Yoyok
      </div>

    </div>
  );
}

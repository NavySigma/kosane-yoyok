import { Link } from "react-router-dom";

export default function Guest() {
  return (
    <div className="min-h-screen bg-[#1E1678] text-white flex flex-col">
      {/* ================= NAVBAR ================= */}
      <div className="flex justify-center mt-6">
        <div className="bg-white text-[#1E1678] rounded-full px-6 py-2 flex gap-6 shadow-lg items-center text-sm font-medium">
          <span className="cursor-pointer hover:text-indigo-600">Beranda</span>
          <span className="cursor-pointer hover:text-indigo-600">Tentang</span>
          <span className="cursor-pointer hover:text-indigo-600">Rumah</span>

          <Link
            to="/login"
            className="bg-[#1E1678] text-white px-4 py-1 rounded-full hover:scale-105 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#6C63FF] text-white px-4 py-1 rounded-full hover:scale-105 transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 mt-16">
        {/* Text */}
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Cari kost nggak <br /> perlu pusing.
          </h1>
          <p className="text-sm mt-4 text-gray-300">
            Lingkungan bersih, harga terjangkau, posisi strategis dan nyaman.
          </p>
        </div>

        {/* Illustration SVG */}
        <div className="mt-10 md:mt-0">
          <svg width="220" height="180" viewBox="0 0 200 150">
            <circle cx="100" cy="75" r="60" fill="#6C63FF" opacity="0.2" />
            <rect x="60" y="60" width="80" height="50" fill="#6C63FF" />
            <polygon
              points="60,60 100,30 140,60"
              fill="#4F46E5"
            />
          </svg>
        </div>
      </div>

      {/* Wave */}
      <div className="mt-10">
        <svg viewBox="0 0 1440 200">
          <path
            fill="#ffffff"
            fillOpacity="0.2"
            d="M0,160L80,154.7C160,149,320,139,480,122.7C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96V200H0Z"
          ></path>
        </svg>
      </div>

      {/* ================= FASILITAS ================= */}
      <div className="px-10 mt-10">
        <h2 className="text-center font-semibold text-lg">
          Everything you get is here. Exciting!
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white text-[#1E1678] p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-3">Fasilitas Kamar</h3>
            <ul className="text-sm space-y-1">
              <li>• Kasur & Meja</li>
              <li>• Kamar & Listrik</li>
              <li>• Lemari</li>
            </ul>
          </div>

          <div className="bg-white text-[#1E1678] p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-3">Fasilitas Umum</h3>
            <ul className="text-sm space-y-1">
              <li>• Wi-Fi</li>
              <li>• Dapur Bersama</li>
              <li>• Eksternal Security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= BUTTON CTA ================= */}
      <div className="flex justify-center mt-10">
        <button className="bg-white text-[#1E1678] px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          Kenalan yuk sama Kost Pak Yoyok!
        </button>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="px-10 mt-10">
        <h3 className="text-sm mb-4">Intip setiap sudutnya!</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-300 h-24 rounded-lg"></div>
          <div className="bg-gray-300 h-24 rounded-lg"></div>
          <div className="bg-gray-300 h-24 rounded-lg"></div>
          <div className="bg-gray-300 h-24 rounded-lg"></div>
          <div className="bg-gray-300 h-24 rounded-lg"></div>
          <div className="bg-gray-300 h-24 rounded-lg"></div>
        </div>
      </div>

      {/* ================= MAP ================= */}
      <div className="px-10 mt-12">
        <h2 className="font-bold text-lg">Welcome Home!</h2>
        <div className="bg-white mt-4 rounded-xl overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="200"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-16 bg-[#140f5e] p-6 text-sm text-gray-300">
        <p>Kost Pak Yoyok, Pulik Rejo</p>
        <p>Kecamatan Ruko, Jombang, Kabupaten Malang, Jawa Timur 6955</p>
        <p className="mt-2">+62 851-3521-782</p>
      </div>
    </div>
  );
}

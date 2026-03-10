import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Riwayat() {
  const [activeTab, setActiveTab] = useState("pemilik");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    return user?.token || "";
  };

  const headers = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("http://localhost:8000/api/riwayat", {
      headers: headers(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setRiwayat(Array.isArray(data) ? data : data.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        if (isMounted) {
          setRiwayat([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRiwayat = useMemo(() => {
    if (!Array.isArray(riwayat)) return [];

    return riwayat.filter((item) => {
      // 1. Logika Filter Tab
      const matchesTab = activeTab === "semua" || item.kategori === activeTab;

      // 2. Logika Pencarian
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (item.penyewa?.toLowerCase() || "").includes(q) ||
        (item.kamar?.toLowerCase() || "").includes(q);

      return matchesTab && matchesSearch;
    });
  }, [riwayat, activeTab, searchQuery]);

  // PERBAIKAN: Tambahkan ID "semua" agar filter default berfungsi
  const tabs = [
    { id: "pemilik", label: "Penghuni Aktif" },
    { id: "booking", label: "Daftar Reservasi" },
    { id: "survei", label: "Data Survei" },
    { id: "lama", label: "Penghuni Lama" },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-6 pt-20 font-sans select-none">
      <div className="bg-[#f1f1f1] rounded-[32px] p-8 max-w-7xl mx-auto shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6 gap-4 border-[#1E1B6D]/10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E1B6D]">
              Riwayat & Aktivitas
            </h1>
            <p className="text-sm text-[#1E1B6D]/60 font-medium">
              Manajemen data penghuni aktif, reservasi, dan kunjungan survei.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Cari nama atau kamar..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full md:w-[320px] px-5 py-3 rounded-full bg-white shadow-md outline-none
                         transition-all duration-300 focus:shadow-lg focus:ring-2 focus:ring-[#1E1B6D]/20"
            />
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 bg-white/50 p-2 rounded-[24px] w-fit shadow-inner border border-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#1E1B6D] text-white shadow-lg scale-105"
                    : "text-[#1E1B6D]/60 hover:bg-white hover:text-[#1E1B6D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-2">
            <div className="w-2 h-2 rounded-full bg-[#1E1B6D]"></div>
            <p className="text-sm text-[#1E1B6D]/50 font-bold">
              Total:{" "}
              <span className="text-[#1E1B6D]">{filteredRiwayat.length}</span>{" "}
              Data ditemukan
            </p>
          </div>
        </div>

        {/* LIST DATA */}
        <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-[#1E1B6D] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#1E1B6D] font-bold animate-pulse">
                Memuat data...
              </p>
            </div>
          ) : filteredRiwayat.length > 0 ? (
            filteredRiwayat.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between
                           bg-white rounded-[28px] p-6 shadow-sm border border-transparent
                           hover:border-[#1E1B6D]/10 hover:shadow-md transition-all duration-300 animate-fadeIn"
              >
                <div className="flex gap-6 items-center">
                  <div
                    className={`w-14 h-14 rounded-[20px] flex items-center justify-center font-black text-lg shadow-inner ${
                      item.status === "Check-In"
                        ? "bg-green-50 text-green-700"
                        : item.status === "Booking"
                          ? "bg-blue-50 text-blue-700"
                          : item.status === "Selesai"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-red-50 text-red-700"
                    }`}
                  >
                    {/* Logika penampilan nomor kamar atau inisial survei */}
                    {item.kategori === "survei"
                      ? "S"
                      : item.kamar?.includes("-")
                        ? item.kamar.split("-")[1]
                        : "•"}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#f1f1f1] text-[10px] font-black text-[#1E1B6D]/40 uppercase tracking-wider">
                        {item.kategori || "Umum"}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">
                        {item.tanggal
                          ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </span>
                    </div>
                    <h3 className="font-black text-[#1E1B6D] text-lg leading-tight">
                      {item.penyewa || "Tanpa Nama"}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium opacity-70">
                      {item.keterangan || "Tidak ada catatan tambahan"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <p
                    className={`text-sm font-black px-4 py-1.5 rounded-full ${
                      item.status === "Check-In"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Booking"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
              <div className="text-5xl mb-4">📂</div>
              <p className="text-gray-400 font-black text-lg">
                Wah, datanya kosong...
              </p>
              <p className="text-gray-300 text-sm font-bold">
                Coba cari dengan kata kunci lain atau pindah tab.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animasi tetap sama */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn .4s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E1B6D20; border-radius: 10px; }
      `}</style>
    </div>
  );
}

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Riwayat() {
  const [activeTab, setActiveTab] = useState("semua");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const initialData = [
    {
      id: 1,
      tanggal: "2026-01-18",
      kamar: "Kamar-1",
      penyewa: "Budi Santoso",
      status: "Check-In",
      kategori: "pemilik",
      keterangan: "Sewa bulanan baru",
    },
    {
      id: 2,
      tanggal: "2026-01-15",
      kamar: "Kamar-3",
      penyewa: "Siti Aminah",
      status: "Check-Out",
      kategori: "pemilik",
      keterangan: "Masa sewa berakhir",
    },
    {
      id: 3,
      tanggal: "2026-01-20",
      kamar: "Kamar-5",
      penyewa: "Andi Wijaya",
      status: "Booking",
      kategori: "booking",
      keterangan: "DP sebesar 500rb",
    },
    {
      id: 4,
      tanggal: "2026-01-10",
      kamar: "Kamar-2",
      penyewa: "Rina Permata",
      status: "Booking",
      kategori: "booking",
      keterangan: "Akan masuk tanggal 1 Feb",
    },
  ];

  const filteredRiwayat = useMemo(() => {
    const hariIni = new Date();

    return initialData.filter((item) => {
      if (item.status === "Booking") {
        const selisihHari =
          (hariIni - new Date(item.tanggal)) / (1000 * 3600 * 24);
        if (selisihHari > 2) return false;
      }

      const matchesTab = activeTab === "semua" || item.kategori === activeTab;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.penyewa.toLowerCase().includes(q) ||
        item.kamar.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-20 font-sans select-none">
      <div className="bg-[#EBEBDF] rounded-[32px] p-8 max-w-7xl mx-auto shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6 gap-4 border-[#1E1B6D]/10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E1B6D]">
              Riwayat & Aktivitas
            </h1>
            <p className="text-sm text-[#1E1B6D]/60 font-medium">
              Informasi penghuni dan reservasi sementara (Reservasi maks. 2
              hari)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Cari nama atau kamar..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-[320px] px-5 py-3 rounded-full bg-white shadow-md outline-none
                         transition-all duration-300
                         focus:shadow-lg focus:scale-[5.02]"
            />

            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md
                            transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#1E1B6D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* TAB */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3 bg-white/50 p-1.5 rounded-2xl w-fit">
            {[
              { id: "semua", label: "Semua Data" },
              { id: "pemilik", label: "Penghuni Aktif" },
              { id: "booking", label: "Daftar Reservasi" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#1E1B6D] text-white shadow-lg"
                    : "text-[#1E1B6D]/60 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-[#1E1B6D]/50 font-bold">
            Total:{" "}
            <span className="text-[#1E1B6D]">{filteredRiwayat.length}</span>{" "}
            Data
          </p>
        </div>

        {/* LIST */}
        <div className="grid gap-4 max-h-[550px] overflow-y-auto pr-2">
          {filteredRiwayat.length ? (
            filteredRiwayat.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between
                           bg-white rounded-[24px] p-6 shadow-sm
                           transition-all duration-300 animate-fadeIn"
              >
                <div className="flex gap-6 items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${
                      item.status === "Check-In"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Booking"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.kamar.split("-")[1]}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </span>
                    <h3 className="font-bold text-[#1E1B6D] text-lg">
                      {item.penyewa}
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                      "{item.keterangan}"
                    </p>
                  </div>
                </div>

                <p
                  className={`font-extrabold mt-4 md:mt-0 ${
                    item.status === "Check-In"
                      ? "text-green-600"
                      : item.status === "Booking"
                        ? "text-blue-600"
                        : "text-red-600"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[24px]">
              <p className="text-gray-400 font-bold">
                Tidak ada data ditemukan
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn .3s ease-out;
        }
      `}</style>
    </div>
  );
}

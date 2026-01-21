import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Riwayat() {
  const [activeTab, setActiveTab] = useState("semua");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  // Data Dummy dengan format tanggal ISO agar mudah dihitung (YYYY-MM-DD)
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
      tanggal: "2026-01-20", // Asumsi hari ini adalah 2026-01-20
      kamar: "Kamar-5",
      penyewa: "Andi Wijaya",
      status: "Booking",
      kategori: "booking",
      keterangan: "DP sebesar 500rb",
    },
    {
      id: 4,
      tanggal: "2026-01-10", // Ini akan terhapus otomatis karena sudah > 2 hari
      kamar: "Kamar-2",
      penyewa: "Rina Permata",
      status: "Booking",
      kategori: "booking",
      keterangan: "Akan masuk tanggal 1 Feb",
    },
  ];

  // LOGIKA FILTERING & AUTO-DELETE 2 HARI
  const filteredRiwayat = useMemo(() => {
    const hariIni = new Date();

    return initialData.filter((item) => {
      // 1. Logika Hapus Otomatis untuk Booking > 2 Hari
      if (item.status === "Booking") {
        const tglBooking = new Date(item.tanggal);
        const selisihWaktu = hariIni.getTime() - tglBooking.getTime();
        const selisihHari = selisihWaktu / (1000 * 3600 * 24);

        if (selisihHari > 2) return false; // Jangan tampilkan jika lebih dari 2 hari
      }

      // 2. Filter berdasarkan Tab
      const matchesTab = activeTab === "semua" || item.kategori === activeTab;

      // 3. Filter berdasarkan Pencarian
      const matchesSearch =
        item.penyewa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kamar.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-20 font-sans select-none">
      <div className="bg-[#EBEBDF] rounded-[32px] p-8 max-w-7xl mx-auto shadow-sm">
        
        {/* HEADER */}
        < div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6 gap-4 border-[#1E1B6D]/10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E1B6D] tracking-tight">
              Riwayat & Aktivitas
            </h1>
            <p className="text-sm text-[#1E1B6D]/60 font-medium">
              Informasi penghuni dan reservasi sementara (Reservasi maks. 2 hari)
            </p>
          </div>

          <div className="flex gap-2">

            <input

              type="text"

              placeholder="Cari nama atau kamar..."

              value={searchQuery}

              onChange={handleSearch}

              className="bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D] w-80 shadow-sm transition-all"

            />

          </div>
    
    {/* Icon Search */}
    
  </div>

        {/* TAB KATEGORI */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3 bg-white/50 p-1.5 rounded-2xl w-fit border border-[#1E1B6D]/5">
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
                  : "text-[#1E1B6D]/60 hover:bg-white hover:text-[#1E1B6D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TOTAL DATA */}
          <div className="flex items-center gap-2 px-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#1E1B6D]/40"></div>
            <p className="text-[14px] text-[#1E1B6D]/50 font-bold tracking-wide">
              Total: <span className="text-[#1E1B6D]">{filteredRiwayat.length}</span> Data
            </p>
          </div>
        </div>

        {/* DATA LIST (TANPA HOVER/CLICK) */}
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar">
          {filteredRiwayat.length > 0 ? (
            filteredRiwayat.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between rounded-[24px] p-6 border-2 border-transparent bg-white shadow-sm"
              >
                <div className="flex gap-6 items-center">
                  {/* Icon Kamar */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${
                    item.status === "Check-In" ? "bg-green-100 text-green-700" :
                    item.status === "Booking" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                  }`}>
                    {item.kamar.split("-")[1]}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider ${
                        item.kategori === "pemilik" ? "bg-[#1E1B6D] text-white" : "bg-blue-600 text-white"
                      }`}>
                        {item.kategori === "pemilik" ? "PENGHUNI" : "RESERVASI"}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#1E1B6D] text-lg">{item.penyewa}</h3>
                    <p className="text-sm text-gray-500 font-medium italic">"{item.keterangan}"</p>
                  </div>
                </div>

                {/* Status Section */}
                <div className="mt-4 md:mt-0 flex items-center gap-8">
                  <div className="text-right hidden md:block border-l pl-8 border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</p>
                    <p className={`font-extrabold ${
                      item.status === "Check-In" ? "text-green-600" :
                      item.status === "Booking" ? "text-blue-600" : "text-red-600"
                    }`}>
                      {item.status}
                    </p>
                  </div>
                  
                  {/* Indicator Dot */}
                  <div className={`w-3 h-3 rounded-full ${
                      item.status === "Check-In" ? "bg-green-500" :
                      item.status === "Booking" ? "bg-blue-500" : "bg-red-500"
                  }`}></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[24px] border-2 border-dashed border-gray-200">
               <div className="text-4xl mb-2"></div>
               <p className="text-gray-400 font-bold">Tidak ada riwayat atau masa booking telah berakhir.</p>
            </div>
          )}
        </div>
      </div>
      </div>

  );
}
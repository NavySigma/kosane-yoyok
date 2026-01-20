import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import hook

export default function Riwayat() {
  const [selectedId, setSelectedId] = useState(null);
  
  // Menggunakan Search Params untuk filter
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || ""; // Ambil nilai dari parameter 'q'

  const riwayatKamar = [
    {
      id: 1,
      tanggal: "18-01-2026",
      kamar: "Kamar-1",
      penyewa: "Budi Santoso",
      status: "Check-In",
      keterangan: "Sewa bulanan baru",
    },
    {
      id: 2,
      tanggal: "15-01-2026",
      kamar: "Kamar-3",
      penyewa: "Siti Aminah",
      status: "Check-Out",
      keterangan: "Masa sewa berakhir",
    },
  ];

  // Logika Filtering: Berdasarkan Nama Penyewa atau Nomor Kamar
  const filteredRiwayat = riwayatKamar.filter((item) =>
    item.penyewa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kamar.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk handle perubahan input
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value }); // Set URL menjadi ?q=nama
    } else {
      setSearchParams({}); // Hapus params jika input kosong
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-20">
      <div className="bg-[#EBEBDF] rounded-[32px] p-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-4 gap-4 border-[#1E1B6D]/10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E1B6D] tracking-tight">
              Riwayat Kamar
            </h1>
            <p className="text-sm text-[#1E1B6D]/60 font-medium">
              Log aktivitas dan status hunian kamar kost
            </p>
          </div>

          {/* FILTER / SEARCH INPUT */}
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Cari kamar atau penyewa..." 
              value={searchQuery}
              onChange={handleSearch}
              className="bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D] w-64 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* RIWAYAT LIST */}
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
          {filteredRiwayat.length > 0 ? (
            filteredRiwayat.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex flex-col md:flex-row md:items-center justify-between rounded-[24px] p-6 border-2 transition-all cursor-pointer ${
                  selectedId === item.id 
                  ? "border-[#1E1B6D] bg-[#F1F3FF] shadow-md scale-[1.01]" 
                  : "border-transparent bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {/* INFO UTAMA */}
                <div className="flex gap-6 items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${
                    item.status === "Check-In" ? "bg-green-100 text-green-700" :
                    item.status === "Check-Out" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {item.kamar.split("-")[1]}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] bg-[#1E1B6D] text-white px-2 py-0.5 rounded-full font-bold tracking-wider">
                        {item.kamar}
                      </span>
                      <span className="text-xs font-bold text-gray-400">{item.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-[#1E1B6D] text-lg">{item.penyewa}</h3>
                    <p className="text-sm text-gray-500 font-medium">{item.keterangan}</p>
                  </div>
                </div>

                {/* STATUS BADGE */}
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</p>
                    <p className={`font-extrabold ${
                      item.status === "Check-In" ? "text-green-600" :
                      item.status === "Check-Out" ? "text-red-600" : "text-orange-600"
                    }`}>
                      {item.status}
                    </p>
                  </div>
                  
                  <div className={`w-3 h-3 rounded-full ${
                      item.status === "Check-In" ? "bg-green-500" :
                      item.status === "Check-Out" ? "bg-red-500" : "bg-orange-500"
                  } animate-pulse`}></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-[24px] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Data tidak ditemukan untuk "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end mt-8 gap-4">
          <button className="px-8 py-2.5 rounded-full bg-white border-2 border-[#1E1B6D] text-[#1E1B6D] text-xs font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            Cetak Laporan
          </button>
          <button className="px-8 py-2.5 rounded-full bg-red-700 text-white text-xs font-bold shadow-lg hover:bg-red-900 transition-all active:scale-95">
            Bersihkan Log
          </button>
        </div>
      </div>
    </div>
  );
}
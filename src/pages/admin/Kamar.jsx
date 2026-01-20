import { useState } from "react";

export default function Kamar() {
  const [search, setSearch] = useState("");
  const [kamarList, setKamarList] = useState([
    { id: 1, nama: "Kamar - 1", status: "Tersedia", harga: "800000" },
    { id: 2, nama: "Kamar - 2", status: "Tersedia", harga: "800000" },
    { id: 3, nama: "Kamar - 3", status: "Disewa", harga: "900000" },
    { id: 4, nama: "Kamar - 4", status: "Tersedia", harga: "800000" },
    { id: 5, nama: "Kamar - 5", status: "Tersedia", harga: "800000" },
  ]);

  const [form, setForm] = useState({
    namaPenyewa: "",
    noTelp: "",
    noKamar: "",
    jumlahPenyewa: "",
    metodeBayar: "",
    totalBayar: "",
    catatan: ""
  });

  return (
    <div className="min-h-screen bg-[#EBEBDF] p-6 pt-20 font-sans text-[#1E1B6D]">
      
      {/* SEARCH BAR (STYLING DASHBOARD) */}
      {/* <div className="max-w-7xl mx-auto mb-8 flex justify-end">
        <input
          type="text"
          placeholder="Cari kamar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/70 border border-[#1E1B6D]/20 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E1B6D]/20 w-64 shadow-sm"
        />
      </div> */}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* PANEL KIRI: STATUS KAMAR */}
        <div className="lg:w-1/3 bg-white rounded-[32px] p-8 shadow-xl border border-white/50 h-fit">
          <h2 className="text-xl font-bold mb-6 tracking-tight">Status Kamar</h2>
          
          <div className="space-y-5">
            {kamarList.map((kamar) => (
              <div key={kamar.id} className="flex items-center justify-between font-semibold">
                <span className="text-sm">{kamar.nama}</span>
                <span className={`text-[15px] ${kamar.status === "Disewa" ? "text-red-500" : "text-green-500"}`}>
                  {kamar.status}
                </span>
                <button 
                  className={`px-6 py-1.5 rounded-full text-xs text-white shadow-md transition-transform active:scale-95 ${
                    kamar.status === "Disewa" ? "bg-[#1E1B6D]" : "bg-[#28A745]"
                  }`}
                >
                  {kamar.status === "Disewa" ? "Info" : "Tambah"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL KANAN: INFORMASI DATA PENYEWA */}
        <div className="lg:flex-1 bg-white rounded-[32px] p-8 shadow-xl border border-white/50">
          <h2 className="text-xl font-extrabold mb-8 tracking-tight border-b border-gray-100 pb-4">
            Informasi Data Penyewa
          </h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Kolom Kiri */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">Nama Penyewa</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">No. Telp Penyewa</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">No. Kamar Penyewa</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">Jumlah Penyewa</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">Metode Pembayaran</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">Total Bayar</label>
                <input type="text" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 ml-2 uppercase tracking-wider">Catatan</label>
                <textarea rows="4" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-[24px] px-5 py-4 text-sm outline-none focus:border-[#1E1B6D] resize-none"></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button type="button" className="bg-red-600 text-white font-bold px-8 py-2.5 rounded-full text-xs shadow-lg hover:bg-red-700 transition-all">
                Akhiri Sewa
              </button>
              <button type="submit" className="bg-[#28A745] text-white font-bold px-10 py-2.5 rounded-full text-xs shadow-lg hover:bg-[#218838] transition-all">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
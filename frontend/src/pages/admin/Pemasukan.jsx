import { useState } from "react";

export default function Pemasukan() {
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    kamar: "Kamar-1",
    total: "",
  });

  const transaksi = [
    {
      id: 1,
      nama: "Budi Santoso",
      kamar: "Kamar-1",
      total: 1000000,
    },
    {
      id: 2,
      nama: "Siti Aminah",
      kamar: "Kamar-2",
      total: 1000000,
    },
  ];

  return (
    <div className="min-h-screen bg-[#EBEBDF] p-35 pt-20 ">
      {/* HEADER CONTAINER */}
      <div className="bg-[#EBEBDF] rounded-[32px] p-2 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        
        {/* LEFT PANEL: TOTAL & FORM */}
        <div className="lg:w-[40%] space-y-6">
          {/* TOTAL CARD */}
          <div className="bg-[#0db134] text-white rounded-[24px] p-6 shadow-lg">
            <p className="text-sm opacity-80 font-medium mb-1">Total Pemasukan Bulan Ini</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Rp. 2.000.000</h2>
          </div>

          {/* FORM CARD */}
          <div className="bg-[#F7F5EC] rounded-[24px] p-6 shadow-md border border-gray-100">
            <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg border-b pb-2">
              Tambah Pemasukan
            </h3>

            <div className="space-y-4">
              {/* INPUT NAMA */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">Nama Penyewa</label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </div>

              {/* DROPDOWN KAMAR */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">Pilih Kamar</label>
                <select
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D] appearance-none cursor-pointer"
                  value={form.kamar}
                  onChange={(e) => setForm({ ...form, kamar: e.target.value })}
                >
                  <option value="Kamar-1">Kamar-1</option>
                  <option value="Kamar-2">Kamar-2</option>
                  <option value="Kamar-3">Kamar-3</option>
                  <option value="Kamar-4">Kamar-4</option>
                  <option value="Kamar-5">Kamar-5</option>
                </select>
              </div>

              {/* INPUT TOTAL */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">Total Pembayaran</label>
                <input
                  type="number"
                  placeholder="Rp. 0"
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]"
                  value={form.total}
                  onChange={(e) => setForm({ ...form, total: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 py-2.5 rounded-full bg-[#1E1B6D] text-white text-xs font-bold shadow-md hover:bg-[#161350] transition-all">
                Edit
              </button>
              <button className="flex-1 py-2.5 rounded-full bg-[#0db134] text-white text-xs font-bold shadow-md hover:bg-[#218838] transition-all">
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: DAFTAR TRANSAKSI */}
        <div className="lg:w-[60%] bg-[#F7F5EC] rounded-[32px] p-8 shadow-md border border-gray-100 flex flex-col h-full">
          <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg border-b pb-2 tracking-tight">Riwayat Transaksi</h3>

          <div className="space-y-4 flex-grow overflow-y-auto max-h-[500px] pr-2">
            {transaksi.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-2xl p-3 border-2 transition-all ${
                  selectedId === item.id 
                  ? "border-[#1E1B6D] bg-[#F1F3FF]" 
                  : "border-transparent bg-[#1E1B6D] text-white"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-semibold tracking-widest">
                      {item.kamar}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{item.nama}</p>
                  <p className={`text-xs ${selectedId === item.id ? "text-[#1E1B6D]/70" : "text-white/70"}`}>
                    Total: <span className="font-bold">Rp {item.total.toLocaleString("id-ID")}</span>
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="transaksi_select"
                    checked={selectedId === item.id}
                    onChange={() => setSelectedId(item.id)}
                    className="w-5 h-5 accent-[#29b84a] cursor-pointer shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button className="px-10 py-2.5 rounded-full bg-red-700 text-white text-xs font-bold shadow-lg hover:bg-red-900 transition-all active:scale-95">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
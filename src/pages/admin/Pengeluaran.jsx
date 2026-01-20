import { useState } from "react";

export default function Pengeluaran() {
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    tanggal: "",
    deskripsi: "",
    total: "",
  });

  const [transaksi, setTransaksi] = useState([
    {
      id: 1,
      tanggal: "01-01-2026",
      deskripsi: "Wifi",
      total: 1000000,
    },
    {
      id: 2,
      tanggal: "05-01-2026",
      deskripsi: "Listrik",
      total: 1000000,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#EBEBDF] p-6 pt-20">
      {/* HEADER CONTAINER - Menggunakan styling yang sama dengan Pemasukan */}
      <div className="bg-[#EBEBDF] rounded-[32px] p-8 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* LEFT PANEL: TOTAL & FORM */}
        <div className="lg:w-[40%] space-y-6">
          {/* TOTAL CARD */}
          <div className="bg-red-700 text-white rounded-[24px] p-6 shadow-lg">
            <p className="text-sm opacity-80 font-medium mb-1">
              Total Pengeluaran Bulan Ini
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Rp. 500.000
            </h2>
          </div>

          {/* FORM CARD */}
          <div className="bg-[#F7F5EC] rounded-[24px] p-6 shadow-md border border-gray-100">
            <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg border-b pb-2">
              Tambah Pengeluaran
            </h3>

            <div className="space-y-4">
              {/* INPUT TANGGAL */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">
                  Tanggal
                </label>
                <input
                  type="date"
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]"
                  value={form.tanggal}
                  onChange={(e) =>
                    setForm({ ...form, tanggal: e.target.value })
                  }
                />
              </div>

              {/* INPUT DESKRIPSI */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">
                  Deskripsi
                </label>
                <input
                  type="text"
                  placeholder="Jenis pengeluaran"
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#1E1B6D]"
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                />
              </div>

              {/* INPUT TOTAL */}
              <div>
                <label className="block text-[15px] font-bold text-[#1E1B6D] ml-2 mb-1">
                  Total Biaya
                </label>
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
          <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg border-b pb-2 tracking-tight">
            Riwayat Pengeluaran
          </h3>

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
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-widest ${
                        selectedId === item.id
                          ? "bg-[#1E1B6D] text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {item.tanggal}
                    </span>
                  </div>
                  <p
                    className={`font-semibold text-sm ${selectedId === item.id ? "text-[#1E1B6D]" : "text-white"}`}
                  >
                    {item.deskripsi}
                  </p>
                  <p
                    className={`text-xs ${selectedId === item.id ? "text-[#1E1B6D]/70" : "text-white/70"}`}
                  >
                    Total:{" "}
                    <span className="font-bold">
                      Rp {item.total.toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="pengeluaran_select"
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

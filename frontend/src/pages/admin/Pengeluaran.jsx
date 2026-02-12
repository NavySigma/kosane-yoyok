import { useState } from "react";

export default function Pengeluaran() {
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    tanggal: "",
    deskripsi: "",
    total: "",
  });

  const [transaksi, setTransaksi] = useState([
    { id: 1, tanggal: "2026-01-01", deskripsi: "Wifi", total: 250000 },
    { id: 2, tanggal: "2026-01-05", deskripsi: "Listrik", total: 250000 },
  ]);

  const totalPengeluaran = transaksi.reduce((a, b) => a + b.total, 0);

  const handleSimpan = () => {
    if (!form.tanggal || !form.deskripsi || !form.total)
      return alert("Form belum lengkap");

    setTransaksi([
      ...transaksi,
      { id: Date.now(), ...form, total: Number(form.total) },
    ]);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedId) return alert("Pilih data dulu");
    const data = transaksi.find((t) => t.id === selectedId);
    setForm(data);
    setIsEdit(true);
  };

  const handleUpdate = () => {
    setTransaksi(
      transaksi.map((t) =>
        t.id === selectedId ? { ...t, ...form, total: Number(form.total) } : t
      )
    );
    resetForm();
  };

  const handleHapus = () => {
    if (!selectedId) return alert("Pilih data dulu");
    setTransaksi(transaksi.filter((t) => t.id !== selectedId));
    resetForm();
  };

  const resetForm = () => {
    setForm({ tanggal: "", deskripsi: "", total: "" });
    setSelectedId(null);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] px-20 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-7 text-red-700 shadow-md">
            <p className="text-sm opacity-80">Total Pengeluaran</p>
            <h2 className="text-3xl font-bold mt-1">
              Rp {totalPengeluaran.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow space-y-5">
            <h3 className="font-bold text-[#1E1B6D] text-lg">
              Form Pengeluaran
            </h3>

            <input
              type="date"
              className="w-full rounded-full px-5 py-3 border border-[#1E1B6D] focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            />

            <input
              type="text"
              className="w-full rounded-full px-5 py-3 border border-[#1E1B6D] focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              placeholder="Deskripsi"
              value={form.deskripsi}
              onChange={(e) =>
                setForm({ ...form, deskripsi: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full rounded-full px-5 py-3 border border-[#1E1B6D] focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              placeholder="Total"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
            />

            <button
              onClick={isEdit ? handleUpdate : handleSimpan}
              className="w-full py-3 rounded-full bg-[#109010] text-white font-bold text-lg hover:opacity-90 transition"
            >
              {isEdit ? "Update Data" : "Simpan Data"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
<div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow">
  <h3 className="font-bold text-[#1E1B6D] text-lg mb-6">
    Riwayat Pengeluaran
  </h3>

  <div className="space-y-3">
    {transaksi.map((item) => (
      <div
        key={item.id}
        onClick={() => setSelectedId(item.id)}
        className={`flex justify-between items-center px-5 py-4 rounded-xl cursor-pointer transition border ${
          selectedId === item.id
            ? "border-[#1E1B6D] bg-[#EEF0FF]"
            : "border-gray-200 bg-white hover:border-[#1E1B6D]"
        }`}
      >
        <div>
          <p className="font-semibold text-[#1E1B6D]">
            {item.deskripsi}
          </p>
          <p className="text-xs text-gray-500">
            {item.tanggal}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-bold text-sm text-[#1E1B6D]">
            Rp {item.total.toLocaleString("id-ID")}
          </p>

          {/* CENTANG */}
          {selectedId === item.id && (
            <div className="w-6 h-6 rounded-full bg-[#1E1B6D] flex items-center justify-center text-white text-xs">
              ✓
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-end gap-3 mt-8">
    <button
      onClick={resetForm}
      className="px-6 py-2 rounded-full border border-[#1E1B6D] text-[#1E1B6D] hover:bg-[#EEF0FF] transition"
    >
      Cancel
    </button>

    <button
      onClick={handleEdit}
      className="px-6 py-2 rounded-full bg-[#1E1B6D] text-white hover:opacity-90 transition"
    >
      Edit
    </button>

    <button
      onClick={handleHapus}
      className="px-6 py-2 rounded-full bg-red-600 text-white hover:opacity-90 transition"
    >
      Hapus
    </button>
  </div>
</div>


      </div>
    </div>
  );
}

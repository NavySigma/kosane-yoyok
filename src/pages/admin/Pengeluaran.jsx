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
    { id: 1, tanggal: "2026-01-01", deskripsi: "Wifi", total: 1000000 },
    { id: 2, tanggal: "2026-01-05", deskripsi: "Listrik", total: 1000000 },
  ]);

  const totalPengeluaran = transaksi.reduce((a, b) => a + b.total, 0);

  // SIMPAN
  const handleSimpan = () => {
    if (!form.tanggal || !form.deskripsi || !form.total)
      return alert("Form belum lengkap");

    setTransaksi([
      ...transaksi,
      {
        id: Date.now(),
        tanggal: form.tanggal,
        deskripsi: form.deskripsi,
        total: Number(form.total),
      },
    ]);

    resetForm();
  };

  // EDIT
  const handleEdit = () => {
    if (!selectedId) return alert("Pilih data dulu");

    const data = transaksi.find((t) => t.id === selectedId);
    setForm({
      tanggal: data.tanggal,
      deskripsi: data.deskripsi,
      total: data.total,
    });
    setIsEdit(true);
  };

  // UPDATE
  const handleUpdate = () => {
    setTransaksi(
      transaksi.map((t) =>
        t.id === selectedId ? { ...t, ...form, total: Number(form.total) } : t,
      ),
    );
    resetForm();
  };

  // HAPUS
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
    <div className="min-h-screen bg-[#EBEBDF] p-35 pt-20">
      <div className="bg-[#EBEBDF] rounded-[32px] p-2 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* LEFT PANEL */}
        <div className="lg:w-[40%] space-y-6">
          <div className="bg-red-700 text-white rounded-[24px] p-6 shadow-lg">
            <p className="text-sm opacity-80 font-medium mb-1">
              Total Pengeluaran Bulan Ini
            </p>
            <h2 className="text-3xl font-extrabold">
              Rp. {totalPengeluaran.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-[#F7F5EC] rounded-[24px] p-6 shadow-md">
            <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg">
              Tambah Pengeluaran
            </h3>

            <div className="space-y-4">
              <input
                type="date"
                className="w-full rounded-full px-5 py-2.5"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              />

              <input
                type="text"
                placeholder="Jenis pengeluaran"
                className="w-full rounded-full px-5 py-2.5"
                value={form.deskripsi}
                onChange={(e) =>
                  setForm({ ...form, deskripsi: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Rp. 0"
                className="w-full rounded-full px-5 py-2.5"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleEdit}
                className="flex-1 py-2.5 rounded-full bg-[#1E1B6D] text-white"
              >
                Edit
              </button>

              <button
                onClick={isEdit ? handleUpdate : handleSimpan}
                className="flex-1 py-2.5 rounded-full bg-[#0db134] text-white"
              >
                {isEdit ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-[60%] bg-[#F7F5EC] rounded-[32px] p-8 shadow-md">
          <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg">
            Riwayat Pengeluaran
          </h3>

          <div className="space-y-4">
            {transaksi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex justify-between p-3 rounded-2xl cursor-pointer ${
                  selectedId === item.id
                    ? "bg-[#F1F3FF]"
                    : "bg-[#1E1B6D] text-white"
                }`}
              >
                <div>
                  <span className="text-xs font-semibold">{item.tanggal}</span>
                  <p className="font-semibold">{item.deskripsi}</p>
                  <p className="text-xs font-bold">
                    Rp {item.total.toLocaleString("id-ID")}
                  </p>
                </div>

                <input type="radio" checked={selectedId === item.id} readOnly />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleHapus}
              className="px-10 py-2.5 rounded-full bg-red-700 text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

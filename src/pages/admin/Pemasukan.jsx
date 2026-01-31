import { useState } from "react";

export default function Pemasukan() {
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    kamar: "Kamar 1",
    total: "",
  });

  const [transaksi, setTransaksi] = useState([
    { id: 1, nama: "Budi Santoso", kamar: "Kamar 1", total: 1000000 },
    { id: 2, nama: "Siti Aminah", kamar: "Kamar 2", total: 1000000 },
  ]);

  const totalPemasukan = transaksi.reduce((a, b) => a + b.total, 0);

  // SIMPAN
  const handleSimpan = () => {
    if (!form.nama || !form.total) return alert("Form belum lengkap");

    setTransaksi([
      ...transaksi,
      { id: Date.now(), ...form, total: Number(form.total) },
    ]);
    resetForm();
  };

  // EDIT (baru isi form di sini)
  const handleEdit = () => {
    if (!selectedId) return alert("Pilih data dulu");

    const data = transaksi.find((t) => t.id === selectedId);
    setForm({
      nama: data.nama,
      kamar: data.kamar,
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

  // RESET TOTAL (ini kunci)
  const resetForm = () => {
    setForm({ nama: "", kamar: "Kamar 1", total: "" });
    setSelectedId(null);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#EBEBDF] p-35 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0db134] rounded-2xl p-6 text-white shadow">
            <p className="text-sm opacity-80">Total Pemasukan</p>
            <h2 className="text-3xl font-bold mt-1">
              Rp {totalPemasukan.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-[#F7F5EC] rounded-2xl p-6 shadow space-y-5">
            <h3 className="font-bold text-[#1E1B6D] text-lg">Form Pemasukan</h3>

            <select
              className="w-full rounded-full px-5 py-3"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            >
              <option value="">Pilih Penyewa</option>
              {[...new Set(transaksi.map((t) => t.nama))].map((nama) => (
                <option key={nama}>{nama}</option>
              ))}
            </select>

            <select
              className="w-full rounded-full px-5 py-3"
              value={form.kamar}
              onChange={(e) => setForm({ ...form, kamar: e.target.value })}
            >
              <option>Kamar 1</option>
              <option>Kamar 2</option>
              <option>Kamar 3</option>
            </select>

            <input
              type="number"
              className="w-full rounded-full px-5 py-3"
              placeholder="Total"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
            />

            <button
              onClick={isEdit ? handleUpdate : handleSimpan}
              className="w-full py-3 rounded-full bg-[#0db134] text-white font-bold text-lg"
            >
              {isEdit ? "Update Data" : "Simpan Data"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3 bg-[#F7F5EC] rounded-2xl p-8 shadow">
          <h3 className="font-bold text-[#1E1B6D] text-lg mb-6">
            Riwayat Transaksi
          </h3>

          <div className="space-y-3">
            {transaksi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex justify-between items-center px-5 py-4 rounded-xl cursor-pointer transition ${
                  selectedId === item.id
                    ? "bg-[#E6E8FF]"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div>
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-xs text-gray-500">{item.kamar}</p>
                </div>
                <p className="font-bold text-sm">
                  Rp {item.total.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-full bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-6 py-2 rounded-full bg-[#1E1B6D] text-white"
            >
              Edit
            </button>
            <button
              onClick={handleHapus}
              className="px-6 py-2 rounded-full bg-red-600 text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

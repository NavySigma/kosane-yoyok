import { useState } from "react";

export default function Pemasukan() {
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    kamar: "",
    total: "",
  });

  const [transaksi, setTransaksi] = useState([
    { id: 1, nama: "Budi Santoso", kamar: "Kamar 1", total: 1000000 },
    { id: 2, nama: "Siti Aminah", kamar: "Kamar 2", total: 1000000 },
  ]);

  const totalPemasukan = transaksi.reduce(
    (a, b) => a + Number(b.total),
    0
  );

  const totalPengeluaran = 500000;

  // ================= SIMPAN =================
  const handleSimpan = () => {
    if (!form.nama || !form.total)
      return alert("Form belum lengkap");

    setTransaksi([
      ...transaksi,
      { id: Date.now(), ...form, total: Number(form.total) },
    ]);

    resetForm();
  };

  // ================= EDIT =================
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

  // ================= UPDATE =================
  const handleUpdate = () => {
    setTransaksi(
      transaksi.map((t) =>
        t.id === selectedId
          ? { ...t, ...form, total: Number(form.total) }
          : t
      )
    );

    resetForm();
  };

  // ================= HAPUS =================
  const handleHapus = () => {
    if (!selectedId) return alert("Pilih data dulu");

    setTransaksi(transaksi.filter((t) => t.id !== selectedId));
    resetForm();
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({ nama: "", kamar: "", total: "" });
    setSelectedId(null);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-35 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* SUMMARY */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">

              <div className="flex-1 text-center">
                <p className="text-sm text-gray-500">
                  Total Pemasukan
                </p>
                <h2 className="text-2xl font-bold text-green-600 mt-1">
                  Rp {totalPemasukan.toLocaleString("id-ID")}
                </h2>
              </div>

              <div className="w-px h-16 bg-gray-300 mx-6"></div>

              <div className="flex-1 text-center">
                <p className="text-sm text-gray-500">
                  Pengeluaran
                </p>
                <h2 className="text-2xl font-bold text-red-600 mt-1">
                  - Rp {totalPengeluaran.toLocaleString("id-ID")}
                </h2>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl p-6 shadow space-y-5">
            <h3 className="font-bold text-[#1E1B6D] text-lg">
              Form Pemasukan
            </h3>

            {/* PILIH PENYEWA */}
            <select
              className="w-full rounded-full px-5 py-3 border border-[#1E1B6D] focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              value={form.nama}
              onChange={(e) => {
                const selectedNama = e.target.value;

                const dataPenyewa = transaksi.find(
                  (t) => t.nama === selectedNama
                );

                setForm({
                  ...form,
                  nama: selectedNama,
                  kamar: dataPenyewa ? dataPenyewa.kamar : "",
                });
              }}
            >
              <option value="">Pilih Penyewa</option>
              {[...new Set(transaksi.map((t) => t.nama))].map(
                (nama) => (
                  <option key={nama} value={nama}>
                    {nama}
                  </option>
                )
              )}
            </select>

            {/* KAMAR OTOMATIS (READONLY) */}
            <input
              type="text"
              value={form.kamar}
              readOnly
              placeholder="Kamar otomatis"
              className="w-full rounded-full px-5 py-3 border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            {/* TOTAL */}
            <input
              type="number"
              className="w-full rounded-full px-5 py-3 border border-[#1E1B6D] focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
              placeholder="Total"
              value={form.total}
              onChange={(e) =>
                setForm({ ...form, total: e.target.value })
              }
            />

            <button
              onClick={isEdit ? handleUpdate : handleSimpan}
              className="w-full py-3 rounded-full bg-[#109010] text-white font-bold text-lg hover:opacity-90 transition"
            >
              {isEdit ? "Update Data" : "Simpan Data"}
            </button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow">
          <h3 className="font-bold text-[#1E1B6D] text-lg mb-6">
            Riwayat Transaksi
          </h3>

          <div className="space-y-3">
            {transaksi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex justify-between items-center px-5 py-4 rounded-xl cursor-pointer transition border ${
                  selectedId === item.id
                    ? "bg-[#E6E8FF] border-[#1E1B6D]"
                    : "bg-white border-[#D1D5DB] hover:border-[#1E1B6D]"
                }`}
              >
                <div>
                  <p className="font-semibold text-[#1E1B6D]">
                    {item.nama}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.kamar}
                  </p>
                </div>

                <p className="font-bold text-sm text-[#1E1B6D]">
                  Rp {item.total.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-full border border-[#1E1B6D] text-[#1E1B6D] hover:bg-[#E6E8FF] transition"
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

import { useState } from "react";

export default function Pemasukan() {
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    kamar: "Kamar-1",
    total: "",
  });

  const [transaksi, setTransaksi] = useState([
    { id: 1, nama: "Budi Santoso", kamar: "Kamar-1", total: 1000000 },
    { id: 2, nama: "Siti Aminah", kamar: "Kamar-2", total: 1000000 },
  ]);

  const totalPemasukan = transaksi.reduce((a, b) => a + b.total, 0);

  // SIMPAN
  const handleSimpan = () => {
    if (!form.nama || !form.total) return alert("Form belum lengkap");

    setTransaksi([
      ...transaksi,
      {
        id: Date.now(),
        nama: form.nama,
        kamar: form.kamar,
        total: Number(form.total),
      },
    ]);

    resetForm();
  };

  // EDIT → ISI FORM
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

  const resetForm = () => {
    setForm({ nama: "", kamar: "Kamar-1", total: "" });
    setSelectedId(null);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#EBEBDF] p-35 pt-20 ">
      <div className="bg-[#EBEBDF] rounded-[32px] p-2 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* LEFT PANEL */}
        <div className="lg:w-[40%] space-y-6">
          <div className="bg-[#0db134] text-white rounded-[24px] p-6 shadow-lg">
            <p className="text-sm opacity-80 font-medium mb-1">
              Total Pemasukan Bulan Ini
            </p>
            <h2 className="text-3xl font-extrabold">
              Rp. {totalPemasukan.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-[#F7F5EC] rounded-[24px] p-6 shadow-md">
            <h3 className="font-bold text-[#1E1B6D] mb-6 text-lg">
              Tambah Pemasukan
            </h3>

            <div className="space-y-4">
              <input
                className="w-full rounded-full px-5 py-2.5"
                placeholder="Nama Penyewa"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />

              <select
                className="w-full rounded-full px-5 py-2.5"
                value={form.kamar}
                onChange={(e) => setForm({ ...form, kamar: e.target.value })}
              >
                <option>Kamar-1</option>
                <option>Kamar-2</option>
                <option>Kamar-3</option>
                <option>Kamar-4</option>
                <option>Kamar-5</option>
              </select>

              <input
                type="number"
                className="w-full rounded-full px-5 py-2.5"
                placeholder="Total"
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
            Riwayat Transaksi
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
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-xs">{item.kamar}</p>
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

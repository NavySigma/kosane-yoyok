import { useEffect, useState } from "react";
import { keuanganService } from "../../services/keuanganService";

export default function Pemasukan() {

  const [transaksi, setTransaksi] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    keterangan: "",
    nominal: "",
  });

  // ================= FETCH KEUANGAN =================
  const fetchData = async () => {
    try {
      const res = await keuanganService.getAll();

      // kalau API return {data:[]}
      setTransaksi(res.data || res);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
  try {

    const res = await keuanganService.getDashboard();
    setDashboard(res.data || res);

  } catch (err) {
    console.error(err);
  }
  };

  useEffect(() => {
    fetchData();
    fetchDashboard();
  }, []);

  // ================= TOTAL =================
  const totalPengeluaran = transaksi.reduce(
    (a, b) => a + Number(b.nominal),
    0
  );

  // ================= SIMPAN =================
  const handleSimpan = async () => {

    if (!form.keterangan || !form.nominal)
      return alert("Form belum lengkap");

    try {

      await keuanganService.store({
        keterangan: form.keterangan,
        nominal: Number(form.nominal),
      });

      await fetchData();
      await fetchDashboard();
      resetForm();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = () => {

    if (!selectedId)
      return alert("Pilih data dulu");

    const data = transaksi.find((t) => t.id === selectedId);

    if (!data) return;

    setForm({
      keterangan: data.keterangan,
      nominal: data.nominal,
    });

    setIsEdit(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {

    try {

      await keuanganService.update(selectedId, {
        keterangan: form.keterangan,
        nominal: Number(form.nominal),
      });

      await fetchData();
      await fetchDashboard();
      resetForm();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= RESET =================
  const resetForm = () => {

    setForm({
      keterangan: "",
      nominal: "",
    });

    setSelectedId(null);
    setIsEdit(false);
  };

  const nominal = totalPengeluaran.toLocaleString("id-ID");

  const total =
  Number(dashboard.pemasukan || 0) - Number(totalPengeluaran || 0);

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
              <h2 className="text-2xl font-bold text-green-600 mt-1 whitespace-nowrap">
                Rp {Number(dashboard.pemasukan || 0).toLocaleString("id-ID")}
              </h2>
            </div>

            <div className="flex flex-col items-center mx-6">
              <div className="w-px h-6 bg-gray-400"></div>
              <span className="text-xs text-gray-500 py-1">
                Bulan Ini
              </span>
              <div className="w-px h-6 bg-gray-400"></div>
            </div>

            <div className="flex-1 text-center">
              <p className="text-sm text-gray-500">
                Pengeluaran
              </p>
              <h2 className="text-2xl font-bold text-red-600 mt-1 whitespace-nowrap">
                - Rp {nominal}
              </h2>
            </div>

          </div>

          {/* divider */}
          <div className="border-t border-gray-500 my-4"></div>

          {/* total */}
          <div className="text-center">
            <p className="text-sm font-bold text-gray-500">
              Total
            </p>

            <h2 className={`text-2xl font-bold mt-1 ${
              total >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              Rp {total.toLocaleString("id-ID")}
            </h2>
          </div>
        </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl p-6 shadow space-y-5">
            <h3 className="font-bold text-[#1E1B6D] text-lg">
              Form Pengeluaran
            </h3>

            {/* KAMAR OTOMATIS (READONLY) */}
            <input
            type="text"
            placeholder="Keterangan"
            value={form.keterangan}
            onChange={(e) =>
              setForm({ ...form, keterangan: e.target.value })
            }
            className="w-full rounded-full px-5 py-3 border border-[#1E1B6D]"
          />

          <input
            type="number"
            placeholder="Nominal"
            value={form.nominal}
            onChange={(e) =>
              setForm({ ...form, nominal: e.target.value })
            }
            className="w-full rounded-full px-5 py-3 border border-[#1E1B6D]"
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
        <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow flex flex-col">
          <h3 className="font-bold text-[#1E1B6D] text-lg mb-6">
            Riwayat Pengeluaran
          </h3>

          {transaksi.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            
            <img
              src="../../../public/vite.svg"
              alt="empty"
              className="w-36 mb-4 opacity-80"
            />

            <p className="text-gray-500 text-lg ">
              Belum ada data pengeluaran
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Silakan tambahkan pengeluaran baru
            </p>

          </div>
          ) : (
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
                    {item.keterangan}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                  <p className="font-bold text-sm text-[#1E1B6D]">
                    Rp {item.nominal.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-auto pt-8">
            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-full border border-[#1E1B6D] text-[#1E1B6D] hover:bg-[#E6E8FF] transition"
            >
              Cancel
            </button>

            <button
              onClick={handleEdit}
              className="px-10 py-2 rounded-full bg-[#1E1B6D] text-white hover:opacity-90 transition"
            >
              Edit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

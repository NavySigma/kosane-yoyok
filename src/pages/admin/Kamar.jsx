import { useState } from "react";

export default function Kamar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKamar, setSelectedKamar] = useState(null);

  const [kamarList, setKamarList] = useState([
    { id: 1, nama: "Kamar - 1", status: "Tersedia", harga: "800.000" },
    { id: 2, nama: "Kamar - 2", status: "Tersedia", harga: "800.000" },
    {
      id: 3,
      nama: "Kamar - 3",
      status: "Disewa",
      harga: "900.000",
      penyewa: {
        nama: "Andi",
        telp: "0812345678",
        jumlah: "1",
        metode: "Transfer",
        catatan: "Bayar di awal",
      },
    },
    { id: 4, nama: "Kamar - 4", status: "Tersedia", harga: "800.000" },
    { id: 5, nama: "Kamar - 5", status: "Tersedia", harga: "800.000" },
  ]);

  const [form, setForm] = useState({
    namaPenyewa: "",
    noTelp: "",
    noKamar: "",
    jumlahPenyewa: "",
    metodeBayar: "",
    totalBayar: "",
    catatan: "",
  });

  const [addForm, setAddForm] = useState({
    nama: "",
    noTelp: "",
    tanggalPenyewaan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectKamar = (kamar) => {
    if (kamar.status === "Disewa") {
      setSelectedKamar(kamar);
      setForm({
        namaPenyewa: kamar.penyewa?.nama || "",
        noTelp: kamar.penyewa?.telp || "",
        noKamar: kamar.nama,
        jumlahPenyewa: kamar.penyewa?.jumlah || "",
        metodeBayar: kamar.penyewa?.metode || "",
        totalBayar: kamar.harga,
        catatan: kamar.penyewa?.catatan || "",
      });
    } else {
      setSelectedKamar(null);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-24 text-[#1E1B6D]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* PANEL KIRI */}
        <div className="w-full lg:w-[400px] bg-white rounded-[32px] p-10 shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Status Kamar</h2>

          <div className="space-y-5">
            {kamarList.map((kamar) => (
              <div
                key={kamar.id}
                className="flex justify-between items-center font-semibold"
              >
                <span>{kamar.nama}</span>

                <span
                  className={`text-sm ${
                    kamar.status === "Disewa"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {kamar.status}
                </span>

                <button
                  onClick={() => handleSelectKamar(kamar)}
                  className={`px-5 py-1.5 rounded-full text-xs text-white ${
                    kamar.status === "Disewa" ? "bg-[#1E1B6D]" : "bg-[#28A745]"
                  }`}
                >
                  {kamar.status === "Disewa" ? "Informasi" : "Tambah"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL KANAN */}
        {selectedKamar ? (
          <div className="flex-1 bg-white rounded-[32px] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Informasi Data Penyewa</h2>
              <button
                onClick={() => setSelectedKamar(null)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-bold text-sm">Nama Penyewa</label>
                <input
                  name="namaPenyewa"
                  value={form.namaPenyewa}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-full border px-4 py-2"
                />
              </div>

              <div>
                <label className="font-bold text-sm">No Telp</label>
                <input
                  name="noTelp"
                  value={form.noTelp}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-full border px-4 py-2"
                />
              </div>

              <div>
                <label className="font-bold text-sm">No Kamar</label>
                <input
                  value={form.noKamar}
                  readOnly
                  className="w-full mt-1 rounded-full border px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="font-bold text-sm">Jumlah Penyewa</label>
                <input
                  name="jumlahPenyewa"
                  value={form.jumlahPenyewa}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-full border px-4 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-sm">Catatan</label>
                <textarea
                  name="catatan"
                  value={form.catatan}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-2xl border px-4 py-3"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button className="px-8 py-2 rounded-full bg-red-600 text-white">
                  Akhiri Sewa
                </button>
                <button className="px-10 py-2 rounded-full bg-green-600 text-white">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="hidden lg:flex flex-1 bg-white rounded-[32px] p-8 shadow-xl items-center justify-center">
            <div className="text-center space-y-4">
              <img
                src="/comingsoon.png"
                alt="Coming Soon"
                className="w-64 mx-auto"
              />
              <p className="font-bold text-lg">Belum ada kamar dipilih</p>
              <p className="text-sm text-gray-500">
                Klik <b>Informasi</b> untuk melihat data penyewa <br />
                atau klik <b className="text-green-600">Tambah</b> untuk
                menambahkan penyewa
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-[320px]">
            <h3 className="font-bold mb-4">Tambah Penyewa</h3>

            <input
              placeholder="Nama"
              className="w-full mb-3 rounded-xl border px-3 py-2"
            />
            <input
              placeholder="No Telp"
              className="w-full mb-3 rounded-xl border px-3 py-2"
            />
            <input
              type="date"
              className="w-full mb-4 rounded-xl border px-3 py-2"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="text-sm">
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#1E1B6D] text-white px-6 py-2 rounded-xl"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

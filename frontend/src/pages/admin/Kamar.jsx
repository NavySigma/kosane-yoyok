import { useEffect, useState } from "react";

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="w-8 h-8 border-4 border-[#E5E7EB] border-t-[#1E1B6D] rounded-full animate-spin"></div>
      <span className="text-sm text-gray-400">Memuat data kamar...</span>
    </div>
  );
}

export default function Kamar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKamar, setSelectedKamar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kamarList, setKamarList] = useState([]);

  useEffect(() => {
  setLoading(true);

  fetch("http://localhost:8000/api/kamar")
    .then((res) => res.json())
    .then((data) => {
      setKamarList(data);
    })
    .catch((err) => {
      console.error("Gagal ambil data kamar:", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

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
    nama_penyewa: "",
    no_telp: "",
    tanggal_mulai: "",
    sewa_berapa_bulan: 1,
    metode_pembayaran: "transfer",
    catatan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectKamar = (kamar) => {
  if (kamar.status === "Disewa") {
    setSelectedKamar(kamar);
  } else {
    setSelectedKamar(kamar); // simpan kamar yg diklik
    setIsModalOpen(true);
  }
  };

  const handleAddChange = (e) => {
  const { name, value } = e.target;
  setAddForm((prev) => ({
    ...prev,
    [name]: value,
  }));
  }; 

  const handleSubmitAdd = async () => {
  try {
    await fetch("http://localhost:8000/api/sewa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...addForm,
        id_kamar: selectedKamar.id,
      }),
    });

    setIsModalOpen(false);
    setAddForm({
      nama_penyewa: "",
      no_telp: "",
      tanggal_mulai: "",
      sewa_berapa_bulan: 1,
      metode_pembayaran: "transfer",
      catatan: "",
    });

    fetchKamar(); // refresh list
  } catch (err) {
    console.error(err);
    alert("Gagal menambahkan penyewa");
  }
  };


  return (
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-24 text-[#1E1B6D]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* PANEL KIRI */}
        <div className="w-full lg:w-[400px] bg-white rounded-[32px] p-10 shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Status Kamar</h2>

          <div className="space-y-5">
  {loading && <Spinner />}

  {!loading && kamarList.length === 0 && (
    <div className="text-center text-sm text-gray-400 py-6">
      Tidak ada data kamar
    </div>
  )}

  {!loading &&
    kamarList.map((kamar) => (
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
            kamar.status === "Disewa"
              ? "bg-[#1E1B6D]"
              : "bg-[#28A745]"
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
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-6 w-[340px] space-y-3">
      <h3 className="font-bold text-lg">Tambah Penyewa</h3>

      <input
        name="nama_penyewa"
        placeholder="Nama Penyewa"
        value={addForm.nama_penyewa}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      />

      <input
        name="no_telp"
        placeholder="No Telp"
        value={addForm.no_telp}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      />

      <input
        type="date"
        name="tanggal_mulai"
        value={addForm.tanggal_mulai}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      />

      <input
        type="number"
        name="sewa_berapa_bulan"
        min="1"
        value={addForm.sewa_berapa_bulan}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      />

      <select
        name="metode_pembayaran"
        value={addForm.metode_pembayaran}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      >
        <option value="transfer">Transfer</option>
        <option value="cash">Cash</option>
      </select>

      <textarea
        name="catatan"
        placeholder="Catatan"
        value={addForm.catatan}
        onChange={handleAddChange}
        className="w-full rounded-xl border px-3 py-2"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-sm text-gray-500"
        >
          Batal
        </button>
        <button
          onClick={handleSubmitAdd}
          className="bg-[#1E1B6D] text-white px-6 py-2 rounded-xl"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

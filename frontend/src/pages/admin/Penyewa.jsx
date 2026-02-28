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
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);

  useEffect(() => {
  setLoading(true);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  fetch("http://localhost:8000/api/penyewa", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
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
    jumlahPenyewa: 1,
    metodeBayar: "",
    totalBayar: "",
    cicilan: 0,
    catatan: "",
  });

    const [addForm, setAddForm] = useState({
    nama_penyewa: "",
    no_telp: "",
    tanggal_mulai: new Date().toISOString().split("T")[0],
    sewa_berapa_bulan: 1,
    metode_pembayaran: "transfer",
    catatan: "",
    });

  useEffect(() => {
    setAddForm((prev) => ({
      ...prev,
      tanggal_mulai: new Date().toISOString().split("T")[0],
      metode_pembayaran: "transfer",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTambah = (kamar) => {
  setSelectedKamar(null);
  setIsModalOpen(true);
  };

  const handleInformasi = async (kamar) => {
  setSelectedKamar(kamar);
  setIsModalOpen(false);
  setLoadingDetail(true);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  try {
    const res = await fetch(
      `http://localhost:8000/api/penyewa/kamar/${kamar.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    console.log("DETAIL:", data);

    if (!data || Object.keys(data).length === 0) {
      setForm({
        namaPenyewa: "",
        noTelp: "",
        jumlahPenyewa: "",
        metodeBayar: "",
        totalBayar: "",
        catatan: "",
      });
      return;
    }

    setForm({
      namaPenyewa: data.nama_profile,
      noTelp: data.no_telp_profile,
      jumlahPenyewa: data.sewa_berapa_bulan || 1,
      metodeBayar: data.metode_pembayaran,
      totalBayar: data.total_bayar,
      catatan: data.catatan,
    });

  } catch (error) {
    console.error(error);
  } finally {
    setLoadingDetail(false);
  }
  };

  const showSuccess = () => {
  setShowSuccessNotif(true);
  setTimeout(() => {
    setShowSuccessNotif(false);
  }, 2000);
};

  const handleUpdate = async () => {
  if (!selectedKamar) return;

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  try {
    const res = await fetch(
      `http://localhost:8000/api/penyewa/${selectedKamar.id}`,
      {
        method: "PUT", // atau PATCH
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nama_profile: form.namaPenyewa,
          no_telp_profile: form.noTelp,
          sewa_berapa_bulan: Number(form.jumlahPenyewa),
          metode_pembayaran: form.metodeBayar,
          total_bayar: totalBayar,
          cicilan: Number(form.cicilan),
          catatan: form.catatan,
        }),
      }
    );

    const result = await res.json();
    console.log("UPDATE:", result);
    showSuccess(); // 🔥 munculin animasi
  } catch (error) {
    console.error("Gagal update:", error);
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
  if (!selectedKamar) return;

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  const payload = {
  kamar_id: selectedKamar.id,
  nama_profile: addForm.nama_penyewa,
  no_telp_profile: addForm.no_telp,
  tglsewa_sewa: addForm.tanggal_mulai,
  sewa_berapa_bulan: addForm.sewa_berapa_bulan,
  metode_pembayaran: addForm.metode_pembayaran,
  catatan: addForm.catatan,
  };

  try {
    const res = await fetch("http://localhost:8000/api/penyewa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);

    // update UI
    setKamarList((prev) =>
      prev.map((k) =>
        Number(k.id) === Number(selectedKamar.id)
          ? { ...k, status: "Disewa" }
          : k
      )
    );

    setSelectedKamar((prev) => ({
      ...prev,
      status: "disewa",
    }));

    setForm({
      namaPenyewa: addForm.nama_penyewa,
      noTelp: addForm.no_telp,
      jumlahPenyewa: addForm.sewa_berapa_bulan || 1,
      metodeBayar: addForm.metode_pembayaran,
      catatan: addForm.catatan,
      tanggalMulai: addForm.tanggal_mulai,
      totalBayar: 0,
    });

    setIsModalOpen(false);

  } catch (error) {
    console.error("Gagal simpan:", error);
  }
  };


  useEffect(() => {
  if (selectedKamar) {
    const jumlah = Number(form.jumlahPenyewa) || 1;
    const harga = Number(selectedKamar.harga) || 0;

    const total = jumlah * harga;

    setForm((prev) => ({
      ...prev,
      totalBayar: total,
    }));
  }
  }, [form.jumlahPenyewa, selectedKamar]);

  const totalBayar =
  (Number(form.jumlahPenyewa) || 1) * (Number(selectedKamar?.harga) || 0);


  return (
    <div className="min-h-screen bg-[#f1f1f1] p-6 pt-20 text-[#1E1B6D]">
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

        {(kamar.status === "Disewa" || kamar.status === "disewa") ? (
        <button
            onClick={() => handleInformasi(kamar)}
            className="px-5 py-1.5 rounded-full text-xs text-white bg-[#1E1B6D]"
        >
            Informasi
        </button>
        ) : (
        <button
            onClick={() => handleTambah(kamar)}
            className="px-5 py-1.5 rounded-full text-xs text-white bg-[#28A745]"
        >
            Tambah
        </button>
        )}
      </div>
    ))}
</div>


        </div>

        {/* PANEL KANAN */}
{selectedKamar ? (
  <div className="flex-1 bg-white rounded-2xl p-6 shadow-md">
    {loadingDetail ? (
      <Spinner />
    ) : (
      <>
    {/* HEADER */}
    <h2 className="text-lg font-bold mb-4 border-b pb-3">
      Informasi Data {selectedKamar?.nama}
    </h2>

    <form className="grid md:grid-cols-2 gap-6">

  {/* ================= ROW 1 ================= */}

  {/* NAMA */}
  <div>
    <label className="font-semibold text-xs">Nama Penyewa</label>
    <input
      name="namaPenyewa"
      value={form.namaPenyewa}
      onChange={handleChange}
      className="w-full mt-1 rounded-full border border-[#5E5BA6] px-4 py-1.5 text-sm outline-none"
    />
  </div>

  {/* SEWA BULAN (KANAN ATAS) */}
  <div>
    <label className="font-semibold text-xs">Sewa Berapa Bulan</label>
    <div className="flex items-center gap-2 mt-1">
      <input
        type="number"
        name="jumlahPenyewa"
        value={form.jumlahPenyewa}
        onChange={handleChange}
        className="w-full rounded-full border border-[#5E5BA6] px-4 py-1.5 text-sm outline-none"
      />

      <button
        type="button"
        onClick={() =>
            setForm((prev) => ({
            ...prev,
            jumlahPenyewa: Math.max(1, (parseInt(prev.jumlahPenyewa) || 1) - 1),
            }))
        }
        className="w-10 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-xl"
        >
        –
        </button>

        <button
        type="button"
        onClick={() =>
            setForm((prev) => ({
            ...prev,
            jumlahPenyewa: (parseInt(prev.jumlahPenyewa) || 0) + 1,
            }))
        }
        className="w-10 h-8 flex items-center justify-center rounded-full bg-green-500 text-white text-xl"
        >
        +
        </button>
    </div>
  </div>

  {/* ================= ROW 2 ================= */}

  {/* NO TELP */}
  <div>
    <label className="font-semibold text-xs">No. Telp Penyewa</label>
    <input
      name="noTelp"
      value={form.noTelp}
      onChange={handleChange}
      className="w-full mt-1 rounded-full border border-[#5E5BA6] px-4 py-1.5 text-sm outline-none"
    />
  </div>

  {/* CATATAN (KANAN BAWAH) */}
  <div className="row-span-2">
    <label className="font-semibold text-xs">Catatan</label>
    <textarea
      name="catatan"
      value={form.catatan}
      onChange={handleChange}
      className="w-full mt-1 rounded-xl border border-[#5E5BA6] px-4 py-2 text-sm outline-none h-[130px]"
    />
  </div>

  {/* ================= ROW 3 ================= */}

  {/* TOTAL CICILAN */}
  <div>
    <label className="font-semibold text-xs">Total Cicilan Saat Ini</label>
    <div className="relative">
    <span className="absolute left-3 top-1.5 text-sm text-gray-500">Rp</span>
    <input
        name="cicilan"
        value={form.cicilan || ""}
        onChange={(e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setForm((prev) => ({
            ...prev,
            cicilan: value === "" ? 0 : Number(value),
        }));
        }}
        className="w-full mt-1 rounded-full border border-[#5E5BA6] pl-10 pr-4 py-1.5 text-sm outline-none"
    />
    </div>

    <p className="text-xs mt-1">
      Total yang Harus dibayar :
      <span className="font-bold ml-1">
      Rp {(totalBayar).toLocaleString("id-ID")}
      </span>
    </p>
  </div>

  {/* ================= BUTTON ================= */}

  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
    <button
    type="button"
    className="px-6 py-2 rounded-full bg-red-600 text-white"
    >
    Akhiri Sewa
    </button>

    <button
    type="button"
    onClick={handleUpdate}
    className="px-9 py-2 rounded-full bg-green-600 text-white"
    >
    Simpan
    </button>
  </div>
</form>
   </>
    )}
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
    <div className="bg-white rounded-3xl p-6 w-[380px] space-y-4">
      <h3 className="font-bold text-lg text-[#1E1B6D]">
        Tambah Penyewa - {selectedKamar?.nama}
      </h3>

      {/* Nama Penyewa */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          Nama Penyewa
        </label>
        <input
          name="nama_penyewa"
          value={addForm.nama_penyewa}
          onChange={handleAddChange}
          className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        />
      </div>

      {/* No Telp */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          Nomor Telepon
        </label>
        <input
          name="no_telp"
          value={addForm.no_telp}
          onChange={handleAddChange}
          className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        />
      </div>

      {/* Durasi */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          Sewa Berapa Bulan
        </label>
        <input
          type="number"
          name="sewa_berapa_bulan"
          min="1"
          value={addForm.sewa_berapa_bulan}
          onChange={handleAddChange}
          className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        />
      </div>
      
      {/* Tanggal Mulai */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          Tanggal Mulai Sewa
        </label>
        <input
          type="date"
          name="tanggal_mulai"
          value={addForm.tanggal_mulai || new Date().toISOString().split("T")[0]}
          onChange={handleAddChange}
          className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        />
        <p className="text-xs text-gray-500 mt-1">Tanggal Tersebut Adalah Hari ini</p>
      </div>

      {/* Metode Pembayaran */}
        <div>
        <label className="text-sm font-semibold text-gray-600">
            Metode Pembayaran
        </label>

        <select
            name="metode_pembayaran"
            value={addForm.metode_pembayaran}
            onChange={handleAddChange}
            className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        >
            <option value="transfer">Transfer</option>
            <option value="tunai">Tunai</option>
        </select>
        </div>

      {/* Catatan */}
      <div>
        <label className="text-sm font-semibold text-gray-600">
          Catatan
        </label>
        <textarea
          name="catatan"
          value={addForm.catatan}
          onChange={handleAddChange}
          className="w-full mt-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E1B6D]"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-sm text-gray-500 hover:text-black"
        >
          Batal
        </button>
        <button
          onClick={handleSubmitAdd}
          className="bg-[#1E1B6D] text-white px-6 py-2 rounded-xl hover:opacity-90"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}

{showSuccessNotif && (
  <div className="fixed inset-0 flex items-center justify-center z-[999]">
    <div className="bg-white px-10 py-8 rounded-2xl shadow-xl flex flex-col items-center animate-scaleIn">
      
      {/* ICON CHECK */}
      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center animate-pop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="mt-4 font-semibold text-gray-700">Berhasil disimpan</p>
    </div>
  </div>
)}
    </div>
  );
}

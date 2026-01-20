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
    tanggalPenyewaan: ""
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
    <div className="min-h-screen bg-[#EFEDE2] p-6 pt-24 font-sans text-[#1E1B6D]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* PANEL KIRI: STATUS KAMAR */}
        <div className="w-full lg:w-[400px] shrink-0 bg-white rounded-[32px] p-10 shadow-xl border border-white/50 h-fit">
          <h2 className="text-xl font-bold mb-6 tracking-tight">Status Kamar</h2>
          <div className="space-y-5">
            {kamarList.map((kamar) => (
              <div key={kamar.id} className="flex items-center justify-between font-semibold">
                <span className="text-sm">{kamar.nama}</span>
                <span className={`text-[15px] ${kamar.status === "Disewa" ? "text-red-500" : "text-green-500"}`}>
                  {kamar.status}
                </span>
                <button
                  onClick={() => handleSelectKamar(kamar)}
                  className={`px-6 py-1.5 rounded-full text-xs text-white shadow-md transition-transform active:scale-95 ${
                    kamar.status === "Disewa" ? "bg-[#1E1B6D]" : "bg-[#28A745]"
                  }`}
                >
                  {kamar.status === "Disewa" ? "Informasi" : "Tambah"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL KANAN: INFORMASI DATA PENYEWA */}
        {selectedKamar ? (
          <div className="flex-1 bg-white rounded-[32px] p-8 shadow-xl border border-white/50">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-extrabold tracking-tight">Informasi Data Penyewa</h2>
              <button onClick={() => setSelectedKamar(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Nama Penyewa</label>
                  <input name="namaPenyewa" type="text" value={form.namaPenyewa} onChange={handleChange} className="w-full bg-white border-2 border-[#1E1B6D]/20 rounded-full px-5 py-2 text-sm outline-none focus:border-[#1E1B6D]" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">No. Telp Penyewa</label>
                  <input name="noTelp" type="text" value={form.noTelp} onChange={handleChange} className="w-full bg-white border-2 border-[#1E1B6D]/20 rounded-full px-5 py-2 text-sm outline-none focus:border-[#1E1B6D]" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">No. Kamar Penyewa</label>
                  <input name="noKamar" type="text" value={form.noKamar} onChange={handleChange} className="w-full bg-white border-2 border-[#1E1B6D]/20 rounded-full px-5 py-2 text-sm outline-none focus:border-[#1E1B6D]" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Jumlah Penyewa</label>
                  <input name="jumlahPenyewa" type="text" value={form.jumlahPenyewa} onChange={handleChange} className="w-full bg-white border-2 border-[#1E1B6D]/20 rounded-full px-5 py-2 text-sm outline-none focus:border-[#1E1B6D]" />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 text-gray-500">Metode Pembayaran (Data dari Pemasukan)</label>
                  <input name="metodeBayar" type="text" value={form.metodeBayar} readOnly className="w-full bg-gray-100 border-2 border-gray-200 rounded-full px-5 py-2 text-sm outline-none cursor-not-allowed text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 text-gray-500">Total Bayar (Data dari Pemasukan)</label>
                  <input name="totalBayar" type="text" value={form.totalBayar} readOnly className="w-full bg-gray-100 border-2 border-gray-200 rounded-full px-5 py-2 text-sm outline-none cursor-not-allowed text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Catatan</label>
                  <textarea name="catatan" rows="3" value={form.catatan} onChange={handleChange} className="w-full bg-white border-2 border-[#1E1B6D]/20 rounded-[24px] px-5 py-4 text-sm outline-none focus:border-[#1E1B6D] resize-none"></textarea>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" className="bg-[#FF0000] text-white font-bold px-8 py-2.5 rounded-full text-sm shadow-lg active:scale-95 transition-all">Akhiri Sewa</button>
                <button type="submit" className="bg-[#28A745] text-white font-bold px-10 py-2.5 rounded-full text-sm shadow-lg active:scale-95 transition-all">Simpan</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="hidden lg:block flex-1"></div>
        )}
      </div>

      {/* MODAL TAMBAH PENYEWA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#F9F9F4] w-full max-w-[340px] rounded-[35px] p-8 shadow-2xl relative border border-white z-10 text-[#1E1B6D]">
            <h2 className="text-lg font-extrabold mb-5 tracking-tight">Tambah Penyewa</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1 ml-1">Nama</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-2 border-[#1E1B6D] rounded-xl px-3 py-1.5 text-sm outline-none" 
                  value={addForm.nama}
                  onChange={(e) => setAddForm({...addForm, nama: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold mb-1 ml-1">No. Telp</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-2 border-[#1E1B6D] rounded-xl px-3 py-1.5 text-sm outline-none" 
                  value={addForm.noTelp}
                  onChange={(e) => setAddForm({...addForm, noTelp: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 ml-1">Tanggal Penyewaan</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-2 border-[#1E1B6D] rounded-xl px-3 py-1.5 text-sm outline-none" 
                  value={addForm.tanggalPenyewaan}
                  onChange={(e) => setAddForm({...addForm, tanggalPenyewaan: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#1E1B6D] text-sm font-bold hover:underline"
                >
                  Kembali
                </button>
                <button 
                  type="button" 
                  className="bg-[#1E1B6D] text-white px-8 py-2 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
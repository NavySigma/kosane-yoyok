import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getToken = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  return user?.token || "";
};

const headers = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

const RoomCard = ({ room, isSelected, onEdit }) => {

  const fasilitasKamar = room.fasilitas?.filter(f => f.tipe === "kamar");
  const fasilitasBersama = room.fasilitas?.filter(f => f.tipe === "bersama");

  return (
    <div className={`flex flex-col bg-white rounded-[22px] overflow-hidden drop-shadow-md border-2 p-3.5 transition-all hover:drop-shadow-xl ${isSelected ? 'border-blue-600' : 'border-transparent'}`}>
      
      <div className="relative rounded-xl overflow-hidden mb-3.5">
        <img 
          src={room.foto_kamar}
          alt="Room" 
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-[#1E1B6D] text-white text-[10px] px-2.5 py-1 rounded-lg font-bold">
          {room.nomor_kamar}
        </div>
      </div>

      <p className={`font-bold text-[11px] mb-3 italic ${room.status_kamar === "tersedia" ? "text-green-600" : "text-red-600"}`}>
        Status - {room.status_kamar}
      </p>

      <div className="flex-grow space-y-3">
        <h3 className="font-bold text-black text-[12px] pb-1.5 uppercase tracking-wider">Fasilitas</h3>
        <div className="space-y-3 text-[10px] text-gray-600">
          <div>
            <p className="font-extrabold text-gray-400 uppercase mb-1">Fasilitas Kamar</p>
            <ul className="space-y-1">
              {fasilitasKamar?.map(f => (
                <li key={f.id_fasilitas}>✓ {f.nama_fasilitas}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-extrabold text-gray-400 uppercase mb-1">Fasilitas Bersama</p>
            <ul className="space-y-1">
              {fasilitasBersama?.map(f => (
                <li key={f.id_fasilitas}>✓ {f.nama_fasilitas}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100">
        <div className="mb-3">
          <h3 className="font-bold text-black text-[12px] uppercase opacity-60">Harga</h3>
          <p className="text-green-600 font-extrabold text-2xl leading-tight">
            {new Intl.NumberFormat("id-ID").format(room.harga_kamar_perbulan)}
          </p>
        </div>
        <button 
          onClick={() => onEdit(room)}
          className="w-full bg-[#1E1B6D] hover:bg-gray-400 text-white font-bold py-2.5 rounded-xl text-[11px] transition-all active:scale-95"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
  nomor_kamar: "",
  harga_kamar_perbulan: "",
  fasilitas_kamar: "",
  fasilitas_bersama: ""
});
useEffect(() => {
  if (selectedRoom) {
    const fasilitasKamar = selectedRoom.fasilitas
      ?.filter(f => f.tipe === "kamar")
      .map(f => f.nama_fasilitas)
      .join("\n");

    const fasilitasBersama = selectedRoom.fasilitas
      ?.filter(f => f.tipe === "bersama")
      .map(f => f.nama_fasilitas)
      .join("\n");

    setFormData({
      nomor_kamar: selectedRoom.nomor_kamar,
      harga_kamar_perbulan: selectedRoom.harga_kamar_perbulan,
      fasilitas_kamar: fasilitasKamar || "",
      fasilitas_bersama: fasilitasBersama || ""
    });
  }
}, [selectedRoom]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API}/kamar`, {
        headers: headers(),
      });

      if (!res.ok) {
        throw await res.json();
      }

      const data = await res.json();
      setRooms(data.data);
    } catch (err) {
      console.error("Gagal ambil data kamar", err);
    }
  };

  const handleTambah = async () => {
  try {
    const payload = {
      nomor_kamar: "Kamar " + formData.nomor_kamar,
      harga_kamar_perbulan: Number(formData.harga_kamar_perbulan),
      fasilitas_kamar: formData.fasilitas_kamar
        ? formData.fasilitas_kamar.split(",").map(f => f.trim())
        : [],
      fasilitas_bersama: formData.fasilitas_bersama
        ? formData.fasilitas_bersama.split(",").map(f => f.trim())
        : []
    };

    const res = await fetch(`${API}/kamar`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw await res.json();
    }

    const data = await res.json();
    console.log("Berhasil tambah:", data);

    fetchRooms(); // refresh data
    setIsAddModalOpen(false);

    // reset form
    setFormData({
      nomor_kamar: "",
      harga_kamar_perbulan: "",
      fasilitas_kamar: "",
      fasilitas_bersama: ""
    });

  } catch (err) {
    console.error("Gagal tambah kamar", err);
  }
  };


  const handleUpdate = async () => {
  try {
    const payload = {
      harga_kamar_perbulan: Number(formData.harga_kamar_perbulan),
      fasilitas_kamar: formData.fasilitas_kamar
        ? formData.fasilitas_kamar.split("\n").map(f => f.trim()).filter(f => f !== "")
        : [],
      fasilitas_bersama: formData.fasilitas_bersama
        ? formData.fasilitas_bersama.split("\n").map(f => f.trim()).filter(f => f !== "")
        : []
    };

    const res = await fetch(`${API}/kamar/${selectedRoom.id_kamar}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw await res.json();

    await fetchRooms(); // refresh list
    setIsEditModalOpen(false);
    setSelectedRoom(null);

  } catch (err) {
    console.error("Gagal update kamar", err);
  }
  };


  return (
    <div className="pt-28 pb-12 px-6 max-w-[1400px] mx-auto min-h-screen">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B6D]">Manajemen Kamar</h1>
          <p className="text-xs text-gray-400 font-medium">Daftar kamar yang aktif dikelola</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-[#3ecf73] text-white px-6 py-3 rounded-full font-bold text-xs shadow-md transition-all"
        >
          + Tambah Kamar
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {rooms.map((room, index) => (
          <RoomCard 
            key={room.id_kamar}
            room={room}
            isSelected={index === 0}
            onEdit={(room) => {
              setSelectedRoom(room);
              setIsEditModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* MODAL EDIT */}
{isEditModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
    <div className="bg-white w-[380px] rounded-[25px] shadow-2xl overflow-hidden">
      
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-black">
          Edit {formData.nomor_kamar}
        </h2>
      </div>

      <div className="h-[4px] w-full bg-gray-200"></div>

      <div className="p-6 space-y-4">

        <section>
          <h3 className="text-lg font-bold text-black mb-3">Fasilitas Kamar</h3>
          <textarea
            className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs min-h-[70px] resize-none"
            value={formData.fasilitas_kamar}
            onChange={(e) =>
              setFormData({ ...formData, fasilitas_kamar: e.target.value })
            }
          />

          <h3 className="text-lg font-bold text-black mt-4 mb-3">
            Fasilitas Bersama
          </h3>
          <textarea
            className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs min-h-[90px] resize-none"
            value={formData.fasilitas_bersama}
            onChange={(e) =>
              setFormData({ ...formData, fasilitas_bersama: e.target.value })
            }
          />
        </section>

        <section>
          <h3 className="text-lg font-bold text-black mb-1.5">Harga</h3>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-3 text-xl font-bold text-green-600"
            value={formData.harga_kamar_perbulan}
            onChange={(e) =>
              setFormData({
                ...formData,
                harga_kamar_perbulan: e.target.value,
              })
            }
          />
        </section>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-full text-base"
        >
          Simpan
        </button>
      </div>
    </div>

    <div
      className="absolute inset-0 -z-10"
      onClick={() => setIsEditModalOpen(false)}
    ></div>
  </div>
)}
{/* MODAL TAMBAH */}
{isAddModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
    <div className="bg-white w-[380px] rounded-[30px] shadow-2xl overflow-hidden">

      <div className="px-7 py-5">
        <h2 className="text-xl font-bold text-black">Tambah Kamar</h2>
      </div>

      <div className="h-[1px] w-full bg-gray-200"></div>

      <div className="p-7 space-y-5">

        <section>
          <h3 className="text-lg font-bold text-black mb-3">Nomor Kamar</h3>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-bold">Kamar</span>
            <input
            type="number"
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2"
            value={formData.nomor_kamar}
            onChange={(e) =>
                setFormData({
                ...formData,
                nomor_kamar: e.target.value.replace(/\D/g, "") // hanya angka
                })
            }
            />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-black mb-3">Fasilitas</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 font-bold text-sm mb-1">
                Fasilitas Kamar
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 text-sm"
                value={formData.fasilitas_kamar}
                onChange={(e) =>
                  setFormData({ ...formData, fasilitas_kamar: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold text-sm mb-1">
                Fasilitas Bersama
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 text-sm"
                value={formData.fasilitas_bersama}
                onChange={(e) =>
                  setFormData({ ...formData, fasilitas_bersama: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-black mb-2">Harga</h3>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-green-600"
            value={formData.harga_kamar_perbulan}
            onChange={(e) =>
              setFormData({
                ...formData,
                harga_kamar_perbulan: e.target.value,
              })
            }
          />
        </section>

        <button
          onClick={handleTambah}
          className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-base"
        >
          Tambah Kamar
        </button>
      </div>
    </div>

    <div
      className="absolute inset-0 -z-10"
      onClick={() => setIsAddModalOpen(false)}
    ></div>
  </div>
)}

    </div>
  );
};

export default RoomManagement;
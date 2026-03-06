import React from "react";

const RoomCard = ({ room, isSelected, onEdit }) => {

  const fasilitasKamar = room.fasilitas?.filter(f => f.tipe === "kamar");
  const fasilitasBersama = room.fasilitas?.filter(f => f.tipe === "bersama");

  return (
    <div
      className={`flex flex-col bg-white rounded-[22px] overflow-hidden drop-shadow-md border-2 p-3.5 transition-all hover:drop-shadow-xl ${
        isSelected ? "border-blue-600" : "border-transparent"
      }`}
    >
      {/* Foto kamar */}
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

      {/* Status */}
      <p
        className={`font-bold text-[11px] mb-3 italic ${
          room.status_kamar === "tersedia"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        Status - {room.status_kamar}
      </p>

      {/* Fasilitas */}
      <div className="flex-grow space-y-3">
        <h3 className="font-bold text-black text-[12px] pb-1.5 uppercase tracking-wider">
          Fasilitas
        </h3>

        <div className="space-y-3 text-[10px] text-gray-600">
          {/* Fasilitas kamar */}
          <div>
            <p className="font-extrabold text-gray-400 uppercase mb-1">
              Fasilitas Kamar
            </p>
            <ul className="space-y-1">
              {fasilitasKamar?.map((f) => (
                <li key={f.id_fasilitas}>✓ {f.nama_fasilitas}</li>
              ))}
            </ul>
          </div>

          {/* Fasilitas bersama */}
          <div>
            <p className="font-extrabold text-gray-400 uppercase mb-1">
              Fasilitas Bersama
            </p>
            <ul className="space-y-1">
              {fasilitasBersama?.map((f) => (
                <li key={f.id_fasilitas}>✓ {f.nama_fasilitas}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Harga + tombol */}
      <div className="mt-5 pt-3 border-t border-gray-100">
        <div className="mb-3">
          <h3 className="font-bold text-black text-[12px] uppercase opacity-60">
            Harga
          </h3>

          <p className="text-green-600 font-extrabold text-2xl leading-tight">
            {new Intl.NumberFormat("id-ID").format(
              room.harga_kamar_perbulan
            )}
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

export default RoomCard;
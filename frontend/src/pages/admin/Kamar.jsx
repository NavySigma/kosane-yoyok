import React from "react";
import { useKamar } from "../../hooks/admin/useKamar";
import RoomCard from "../../components/RoomCard";

const Kamar = () => {

  const {
    rooms,
    loading,

    selectedRoom,
    isEditModalOpen,
    isAddModalOpen,

    formData,
    setFormData,

    currentPage,
    setCurrentPage,
    currentData,
    totalPages,

    openAddModal,
    openEditModal,
    closeModal,

    addRoom,
    updateRoom

  } = useKamar();

  return (
  <div className="pt-20 pb-12 px-6 max-w-[1400px] mx-auto min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1B6D]">Manajemen Kamar</h1>
        <p className="text-xs text-gray-400 font-medium">
          Daftar kamar yang aktif dikelola
        </p>
      </div>

      <button
        onClick={openAddModal}
        className="bg-green-600 hover:bg-[#3ecf73] text-white px-6 py-3 rounded-full font-bold text-xs shadow-md transition-all"
      >
        + Tambah Kamar
      </button>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1E1B6D] rounded-full animate-spin"></div>
      </div>
    ) : (
      <>
      <div className="grid grid-cols-5 gap-4">
        {currentData.map((room) => (
          <RoomCard
            key={room.id_kamar}
            room={room}
            isSelected={selectedRoom?.id_kamar === room.id_kamar}
            onEdit={openEditModal}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === i + 1
                ? "bg-[#1E1B6D] text-white"
                : "bg-white text-[#1E1B6D] border-[#1E1B6D]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </>
    )}

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
              <h3 className="text-lg font-bold text-black mb-3">
                Fasilitas Kamar
              </h3>
              <textarea
                className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs min-h-[70px] resize-none"
                value={formData.fasilitas_kamar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fasilitas_kamar: e.target.value
                  })
                }
              />

              <h3 className="text-lg font-bold text-black mt-4 mb-3">
                Fasilitas Bersama
              </h3>
              <textarea
                className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs min-h-[90px] resize-none"
                value={formData.fasilitas_bersama}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fasilitas_bersama: e.target.value
                  })
                }
              />
            </section>

            <section>
              <h3 className="text-lg font-bold text-black mb-1.5">Harga</h3>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-3 text-xl font-bold text-green-600"
                value={formData.harga_kamar_perbulan ? `Rp ${formData.harga_kamar_perbulan}` : ""}
                placeholder="Rp 0"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const formatted = new Intl.NumberFormat("id-ID").format(value);

                  setFormData({
                    ...formData,
                    harga_kamar_perbulan: formatted
                  });
                }}
              />
            </section>

            <button
              onClick={updateRoom}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-full text-base"
            >
              Simpan
            </button>
          </div>
        </div>

        <div
          className="absolute inset-0 -z-10"
          onClick={closeModal}
        ></div>
      </div>
    )}

    {/* MODAL TAMBAH */}
    {isAddModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
        <div className="bg-white w-[380px] rounded-[30px] shadow-2xl overflow-hidden">

          <div className="px-7 py-5">
            <h2 className="text-xl font-bold text-black">
              Tambah Kamar
            </h2>
          </div>

          <div className="h-[1px] w-full bg-gray-200"></div>

          <div className="p-7 space-y-5">

            {/* Nomor kamar */}
            <section>
              <h3 className="text-lg font-bold text-black mb-3">
                Nomor Kamar
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold">Kamar</span>
                <input
                  type="number"
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2"
                  value={formData.nomor_kamar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomor_kamar: e.target.value.replace(/\D/g, "")
                    })
                  }
                />
              </div>
            </section>

            {/* Fasilitas */}
            <section>
              <h3 className="text-lg font-bold text-black mb-3">
                Fasilitas
              </h3>

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
                      setFormData({
                        ...formData,
                        fasilitas_kamar: e.target.value
                      })
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
                      setFormData({
                        ...formData,
                        fasilitas_bersama: e.target.value
                      })
                    }
                  />
                </div>

              </div>
            </section>

            {/* Harga */}
            <section>
              <h3 className="text-lg font-bold text-black mb-2">
                Harga
              </h3>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-green-600"
                value={formData.harga_kamar_perbulan ? `Rp ${formData.harga_kamar_perbulan}` : ""}
                placeholder="Rp 0"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  const formatted = new Intl.NumberFormat("id-ID").format(value);

                  setFormData({
                    ...formData,
                    harga_kamar_perbulan: formatted
                  });
                }}
              />
            </section>

            <button
              onClick={addRoom}
              className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-base"
            >
              Tambah Kamar
            </button>

          </div>
        </div>

        <div
          className="absolute inset-0 -z-10"
          onClick={closeModal}
        ></div>
      </div>
    )}

  </div>
);
};

export default Kamar;
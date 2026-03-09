import { useEffect, useState } from "react";
import { getKamar, tambahKamar, updateKamar } from "../../services/kamarService";

export const useKamar = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

// ================= PAGINATION =================
  const indexLast = currentPage * dataPerPage;
  const indexFirst = indexLast - dataPerPage;
  const currentData = rooms.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(rooms.length / dataPerPage);

  const [formData, setFormData] = useState({
    nomor_kamar: "",
    harga_kamar_perbulan: "",
    fasilitas_kamar: "",
    fasilitas_bersama: ""
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getKamar();
      setRooms(data);
    } catch (err) {
      console.error("Gagal ambil kamar", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= MODAL =================

  const openAddModal = () => {
    setFormData({
      nomor_kamar: "",
      harga_kamar_perbulan: "",
      fasilitas_kamar: "",
      fasilitas_bersama: ""
    });

    setIsAddModalOpen(true);
  };

  const openEditModal = (room) => {

    const fasilitasKamar = room.fasilitas
      ?.filter(f => f.tipe === "kamar")
      .map(f => f.nama_fasilitas)
      .join("\n");

    const fasilitasBersama = room.fasilitas
      ?.filter(f => f.tipe === "bersama")
      .map(f => f.nama_fasilitas)
      .join("\n");

    setSelectedRoom(room);

    setFormData({
      nomor_kamar: room.nomor_kamar,
      harga_kamar_perbulan: new Intl.NumberFormat("id-ID").format(room.harga_kamar_perbulan),
      fasilitas_kamar: fasilitasKamar || "",
      fasilitas_bersama: fasilitasBersama || ""
    });

    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  // ================= CRUD =================

  const addRoom = async () => {

    const payload = {
      nomor_kamar: "Kamar " + formData.nomor_kamar,
      harga_kamar_perbulan: Number(
        formData.harga_kamar_perbulan.replace(/\./g, "")
      ),
      fasilitas_kamar: formData.fasilitas_kamar
        ? formData.fasilitas_kamar.split(",").map(f => f.trim())
        : [],
      fasilitas_bersama: formData.fasilitas_bersama
        ? formData.fasilitas_bersama.split(",").map(f => f.trim())
        : []
    };

    await tambahKamar(payload);
    closeModal();
    fetchRooms();
  };

  const updateRoom = async () => {

    const payload = {
      harga_kamar_perbulan: Number(
        formData.harga_kamar_perbulan.replace(/\./g, "")
      ),
      fasilitas_kamar: formData.fasilitas_kamar
        ? formData.fasilitas_kamar.split("\n").map(f => f.trim()).filter(f => f)
        : [],
      fasilitas_bersama: formData.fasilitas_bersama
        ? formData.fasilitas_bersama.split("\n").map(f => f.trim()).filter(f => f)
        : []
    };

    await updateKamar(selectedRoom.id_kamar, payload);
    closeModal();
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {

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

  };
};
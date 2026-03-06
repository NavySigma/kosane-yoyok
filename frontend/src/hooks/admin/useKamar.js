import { useEffect, useState } from "react";
import { getKamar, tambahKamar, updateKamar } from "../../services/kamarService";

export const useKamar = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const addRoom = async (formData) => {
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

    await tambahKamar(payload);
    fetchRooms();
  };

  const editRoom = async (id, formData) => {

    const payload = {
      harga_kamar_perbulan: Number(formData.harga_kamar_perbulan),
      fasilitas_kamar: formData.fasilitas_kamar
        ? formData.fasilitas_kamar.split("\n").map(f => f.trim()).filter(f => f)
        : [],
      fasilitas_bersama: formData.fasilitas_bersama
        ? formData.fasilitas_bersama.split("\n").map(f => f.trim()).filter(f => f)
        : []
    };

    await updateKamar(id, payload);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    fetchRooms,
    addRoom,
    editRoom
  };
};
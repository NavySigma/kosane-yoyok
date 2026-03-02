import { useEffect, useState } from "react";
import { penyewaService } from "../../services/penyewaService";

export default function usePenyewa() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKamar, setSelectedKamar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kamarList, setKamarList] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [endingLoading, setEndingLoading] = useState(false);
  const [showEndSuccess, setShowEndSuccess] = useState(false);

  const defaultAddForm = {
    nama_penyewa: "",
    no_telp: "",
    tanggal_mulai: new Date().toISOString().split("T")[0],
    sewa_berapa_bulan: 1,
    metode_pembayaran: "transfer",
    catatan: "",
  };

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

  const [addForm, setAddForm] = useState(defaultAddForm);

  const fetchKamar = async () => {
    setLoading(true);
    try {
      const data = await penyewaService.getKamar();
      setKamarList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKamar();
  }, []);

  const handleTambah = (kamar) => {
    setSelectedKamar(kamar);
    setAddForm(defaultAddForm);
    setIsModalOpen(true);
  };

  const handleInformasi = async (kamar) => {
    setSelectedKamar(kamar);
    setIsModalOpen(false);
    setLoadingDetail(true);

    try {
      const data = await penyewaService.getDetailKamar(kamar.id);

      if (!data || Object.keys(data).length === 0) {
        setForm({
          namaPenyewa: "",
          noTelp: "",
          jumlahPenyewa: "",
          metodeBayar: "",
          cicilan: 0,
          catatan: "",
        });
        return;
      }

      setForm({
        namaPenyewa: data.nama_profile,
        noTelp: data.no_telp_profile,
        jumlahPenyewa: data.sewa_berapa_bulan || 1,
        metodeBayar: data.metode_pembayaran,
        cicilan: data.cicilan || 0,
        catatan: data.catatan,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const showSuccess = () => {
    setShowSuccessNotif(true);
    setTimeout(() => setShowSuccessNotif(false), 2000);
  };

  const handleUpdate = async () => {
    if (!selectedKamar) return;

    try {
      await penyewaService.update(selectedKamar.id, {
        nama_profile: form.namaPenyewa,
        no_telp_profile: form.noTelp,
        sewa_berapa_bulan: Number(form.jumlahPenyewa),
        metode_pembayaran: form.metodeBayar,
        total_bayar: totalBayar,
        cicilan: Number(form.cicilan),
        catatan: form.catatan,
      });

      showSuccess();
      fetchKamar();
      await handleInformasi(selectedKamar);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = async () => {
    if (!selectedKamar) return;

    try {
      await penyewaService.tambah({
        kamar_id: selectedKamar.id,
        nama_profile: addForm.nama_penyewa,
        no_telp_profile: addForm.no_telp,
        tglsewa_sewa: addForm.tanggal_mulai,
        sewa_berapa_bulan: addForm.sewa_berapa_bulan,
        metode_pembayaran: addForm.metode_pembayaran,
        catatan: addForm.catatan,
      });

      await fetchKamar();
      await handleInformasi(selectedKamar);

      setIsModalOpen(false);
      setAddForm(defaultAddForm);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAkhiriSewa = async () => {
    if (!selectedKamar) return;

    setEndingLoading(true);

    try {
      await penyewaService.akhiri(selectedKamar.id);

      setShowConfirmEnd(false);
      setShowEndSuccess(true);

      await fetchKamar();
      setSelectedKamar(null);

      setTimeout(() => setShowEndSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setEndingLoading(false);
    }
  };

  const totalBayar =
    (Number(form.jumlahPenyewa) || 1) *
    (Number(selectedKamar?.harga) || 0);

  const sisaBayar = (totalBayar || 0) - (form.cicilan || 0);

  return {
    // state
    isModalOpen, setIsModalOpen,
    selectedKamar, setSelectedKamar,
    loading, kamarList,
    loadingDetail,
    showSuccessNotif,
    showConfirmEnd, setShowConfirmEnd,
    endingLoading,
    showEndSuccess,

    // form
    form, setForm,
    addForm,
    totalBayar,
    sisaBayar,

    // handler
    handleTambah,
    handleInformasi,
    handleUpdate,
    handleAddChange,
    handleSubmitAdd,
    handleAkhiriSewa,
    fetchKamar,
    setAddForm,
  };
}
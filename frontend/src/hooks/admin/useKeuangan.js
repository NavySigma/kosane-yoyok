import { useEffect, useState } from "react";
import { keuanganService } from "../../services/keuanganService";

export default function useKeuangan() {

  const [transaksi, setTransaksi] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 3;

  const [form, setForm] = useState({
    keterangan: "",
    nominal: "",
  });

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoadingData(true);
      const res = await keuanganService.getAll();
      setTransaksi(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      setLoadingDashboard(true);
      const res = await keuanganService.getDashboard();
      setDashboard(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDashboard();
  }, []);

  // ================= TOTAL =================
  const totalPengeluaran = transaksi.reduce(
    (a, b) => a + Number(b.nominal),
    0
  );

  const total =
    Number(dashboard.pemasukan || 0) - Number(totalPengeluaran || 0);

  // ================= PAGINATION =================
  const indexLast = currentPage * dataPerPage;
  const indexFirst = indexLast - dataPerPage;

  const currentData = transaksi.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(transaksi.length / dataPerPage);

  // ================= CRUD =================
  const handleSimpan = async () => {
    if (!form.keterangan || !form.nominal) {
      alert("Form belum lengkap");
      return;
    }

    try {
      await keuanganService.store({
        keterangan: form.keterangan,
        nominal: Number(form.nominal.replace(/\./g, "")),
      });

      await fetchData();
      await fetchDashboard();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {

    if (selectedId === null) {
      alert("Pilih data dulu");
      return;
    }

    const data = transaksi.find((t) => t.id_keuangan === selectedId);

    if (!data) return;

    setForm({
      keterangan: data.keterangan,
      nominal: new Intl.NumberFormat("id-ID").format(data.nominal),
    });

    setIsEdit(true);
  };

  const handleUpdate = async () => {
    try {
      await keuanganService.update(selectedId, {
        keterangan: form.keterangan,
        nominal: Number(form.nominal.replace(/\./g, "")),
      });

      await fetchData();
      await fetchDashboard();
      resetForm();

    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      keterangan: "",
      nominal: "",
    });

    setSelectedId(null);
    setIsEdit(false);
  };

  const selectTransaksi = (item) => {
    setSelectedId(item.id_keuangan);
  };

  return {
    transaksi,
    dashboard,
    selectedId,
    isEdit,
    loadingData,
    loadingDashboard,
    currentPage,
    setCurrentPage,
    form,
    setForm,

    currentData,
    totalPages,
    totalPengeluaran,
    total,

    handleSimpan,
    handleEdit,
    handleUpdate,
    resetForm,
    selectTransaksi,
  };
}
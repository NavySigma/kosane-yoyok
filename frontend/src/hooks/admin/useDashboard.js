import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState({
    pemasukan: 0,
    pengeluaran: 0,
    kamar_tersedia: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      setDashboard({
        pemasukan: res.pemasukan ?? 0,
        pengeluaran: res.pengeluaran ?? 0,
        kamar_tersedia: res.kamar_tersedia ?? 0,
      });
    } catch (err) {
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboard,
    loading,
  };
}
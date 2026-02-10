import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import LineChart from "../../components/LineChart";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    pemasukan: 0,
    pengeluaran: 0,
    kamar_tersedia: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(res => {
        setDashboard({
          pemasukan: res.pemasukan ?? 0,
          pengeluaran: res.pengeluaran ?? 0,
          kamar_tersedia: res.kamar_tersedia ?? 0,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard API error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 pt-20">
      {/* CHART */}
      <div className="bg-[#F7F5EC] rounded-2xl p-6 shadow">
        <div className="flex flex-col items-start mb-4 gap-1">
          <h2 className="font-bold text-[#1E1B6D]">Sewa Aktif</h2>
          <span className="px-4 py-1 text-xs bg-[#1E1B6D] text-white rounded-lg">
            Tahun Ini
          </span>
        </div>
        <LineChart />
      </div>

      {/* STAT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatCard
          title="Pemasukan"
          value={
            loading
              ? "Loading..."
              : `Rp ${dashboard.pemasukan.toLocaleString("id-ID")}`
          }
        />
        <StatCard
          title="Pengeluaran"
          value={
            loading
              ? "Loading..."
              : `Rp ${dashboard.pengeluaran.toLocaleString("id-ID")}`
          }
        />
        <StatCard
          title="Kamar Tersedia"
          value={loading ? "Loading..." : dashboard.kamar_tersedia}
        />
      </div>
    </div>
  );
}

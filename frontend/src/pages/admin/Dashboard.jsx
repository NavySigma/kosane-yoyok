import StatCard from "../../components/StatCard";
import LineChart from "../../components/LineChart";
import useDashboard from "../../hooks/admin/useDashboard";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();

  return (
    <div className="p-6 pt-20">
      {/* CHART */}
      <div className="bg-white rounded-2xl p-6 drop-shadow-lg h-[380px]">
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
          title="Pemasukan Bulan Ini"
          value={
            loading
              ? "Loading..."
              : `Rp ${Number(dashboard.pemasukan).toLocaleString("id-ID")}`
          }
        />

        <StatCard
          title="Pengeluaran Bulan Ini"
          value={
            loading
              ? "Loading..."
              : `Rp ${Number(dashboard.pengeluaran).toLocaleString("id-ID")}`
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
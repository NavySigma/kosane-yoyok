import StatCard from "../../components/StatCard";
import LineChart from "../../components/LineChart";

export default function Dashboard() {
  return (
    /* PERUBAHAN DI SINI: 
       Tambahkan 'pt-32' (Padding Top) atau 'mt-32' agar konten turun. 
       Angka 32 bisa kamu sesuaikan (pt-24, pt-28, pt-32) tergantung tinggi Navbarmu.
    */
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
        <StatCard title="Pemasukan" value="Rp. 2.000.000" />
        <StatCard title="Pengeluaran" value="Rp. 500.000" />
        <StatCard title="Kamar Tersedia" value="2" />
      </div>
      
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Template 12 bulan (SELALU ADA)
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export default function LineChart() {
  const [data, setData] = useState(
    MONTHS.map(month => ({ month, value: 0 }))
  );

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(res => {
        const apiData = res.sewa_aktif || [];

        // Clone template
        const baseData = MONTHS.map(month => ({
          month,
          value: 0
        }));

        // Timpa data dari API
        apiData.forEach(item => {
          const index = baseData.findIndex(
            m => m.month === item.bulan
          );
          if (index !== -1) {
            baseData[index].value = item.total;
          }
        });

        setData(baseData);
      })
      .catch(err => console.error("LineChart error:", err));
  }, []);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[800px] h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E6E4D8"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1E1B6D"
              strokeWidth={3}
              dot={{ r: 6, fill: "#1E1B6D", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
            />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

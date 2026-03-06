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
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  fetch("http://localhost:8000/api/dashboard", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("API error");
      return res.json();
    })
    .then(res => {
      const formatted = res.sewa_aktif.map(item => ({
        month: MONTHS[item.bulan - 1],
        value: item.total
      }));
      setData(formatted);
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
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
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

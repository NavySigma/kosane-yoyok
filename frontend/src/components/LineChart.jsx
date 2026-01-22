import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 1 },
  { month: "Feb", value: 2 },
  { month: "Mar", value: 1 },
  { month: "Apr", value: 3 },
  { month: "Mei", value: 4 },
  { month: "Jun", value: 2 },
  { month: "Jul", value: 3 },
  { month: "Agu", value: 5 },
  { month: "Sep", value: 4 },
  { month: "Okt", value: 3 },
  { month: "Nov", value: 5 },
  { month: "Des", value: 4 },
];

export default function LineChart() {
  return (
    /* 1. Tambahkan overflow-x-auto di sini agar bisa di-scroll */
    <div className="w-full overflow-x-auto scrollbar-hide">
      
      {/* 2. Berikan min-width yang lebih besar dari layar agar muncul scrollbar */}
      <div className="min-w-[800px] h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E4D8" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              domain={[0, 5]} 
              ticks={[1, 2, 3, 4, 5]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1E1B6D"
              strokeWidth={3}
              dot={{ r: 6, fill: '#1E1B6D', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8 }}
            />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
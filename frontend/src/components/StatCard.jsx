export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <p className="text-sm text-[#1E1B6D] mb-2">{title}</p>
      <h3 className="text-xl font-bold text-[#1E1B6D]">{value}</h3>
    </div>
  );
}

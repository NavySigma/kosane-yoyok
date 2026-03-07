import { CheckCircle, XCircle } from "lucide-react";
import useLogin from "../../hooks/admin/useLogin";

export default function Login() {
  const { formData, status, handleChange, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen w-full flex bg-[#EBEBDF] overflow-hidden font-sans relative">
      
      {/* ALERT */}
      {status.message && (
        <div
          className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold animate-toast ${
            status.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle size={24} />
          ) : (
            <XCircle size={24} />
          )}
          {status.message}
        </div>
      )}

      {/* LEFT SIDE */}
      <div className="relative w-[55%] h-screen flex flex-col justify-between p-12 z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-white/40 overflow-hidden">
            <img
              src="/logokost.png"
              alt="Kost Pak Yoyok"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-[13px] text-[#1E1B6D] font-bold leading-snug tracking-wide">
          3P4X+JQ8, Putuk Rejo, Kemanten, Kec. Jabung,
          <br />
          Kabupaten Malang, Jawa Timur 65155
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-[45%] h-screen flex items-center justify-center z-20 pr-20">
        <div className="w-full max-w-md ml-auto">
          <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tight">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent border-2 border-white/80 rounded-full px-8 py-4 text-white text-lg placeholder:text-white/60 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#EBEBDF] text-[#1E1B6D] py-4 rounded-full font-bold text-xl hover:bg-white transition-all shadow-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useLoginUser from "../../hooks/member/useLogin";

export default function Login() {
  const { formData, status, showPassword, handleChange, handleSubmit, togglePasswordVisibility } = useLoginUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1D1C7] font-sans p-4">
      {/* Container Utama - Mockup Device */}
      <div className="relative w-[375px] h-[750px] bg-[#EBEBDF] rounded-[55px] shadow-2xl flex flex-col overflow-hidden border-[8px] border-white/20">
        
        {/* --- LAYER BACKGROUND (Presisi Foto) --- */}
        
        {/* Layer Putih (Kiri Atas) */}
        <div 
          className="absolute -top-10 -left-10 w-[80%] h-[40%] bg-white/50 -z-0"
          style={{ clipPath: 'ellipse(60% 50% at 30% 30%)' }}
        ></div>

        {/* Layer Krem Gelap (Gundukan Kanan) */}
        <div 
          className="absolute top-[15%] -right-16 w-[100%] h-[45%] bg-[#E2E2D3] -z-0"
          style={{ clipPath: 'ellipse(75% 55% at 85% 50%)' }}
        ></div>

        {/* --- KONTEN UTAMA --- */}
        <div className="relative z-10 flex-1 px-8 pt-16 flex flex-col">
          {/* Header */}
          <div className="mb-6 ml-2"> {/* Sedikit padding kiri agar sejajar */}
            <h1 className="text-[44px] font-bold text-[#1A1A1A] leading-tight tracking-tight">Login</h1>
            <p className="text-[#666666] text-[14px] leading-tight mt-1 max-w-[210px]">
              Access your account and simplify your stay.
            </p>
          </div>

          {/* Ilustrasi Center dengan Glow - DIGESER LEBIH KE KIRI */}
          <div className="flex justify-start items-center mb-6 relative py-4 pl-4"> {/* pl-4 untuk geser lebih jauh */}
            <div className="absolute w-40 h-40 bg-white/40 blur-3xl rounded-full left-2"></div> {/* Glow ikut geser */}
            <img 
              src="/userhp.png" 
              alt="Illustration" 
              className="w-44 h-44 object-contain relative z-10"
              onError={(e) => { e.target.src = "https://placeholder.pics/svg/200x200/DEDEDE/555555/IMG"; }}
            />
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Input Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-white rounded-[18px] px-6 py-[17px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
            />

            {/* Input Password - DENGAN EYE ICON BERFUNGSI */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Tipe input berubah berdasarkan state
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white rounded-[18px] px-6 py-[17px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Fungsi untuk toggle state
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 opacity-80 hover:text-gray-600 transition-colors"
              >
                {/* Ikon berubah berdasarkan state */}
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2} />
                ) : (
                  <Eye size={20} strokeWidth={2} />
                )}
              </button>
            </div>

            {/* Link Text */}
            <div className="mt-1 ml-1">
              <p className="text-[13px] text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-black hover:underline">
                  Register
                </Link>
              </p>
            </div>

            {/* Feedback Message */}
            <div className="h-4 flex items-center justify-center">
              {status.message && (
                <p className={`text-[11px] font-bold text-center ${status.type === "error" ? "text-red-500" : "text-green-600"}`}>
                  {status.message}
                </p>
              )}
            </div>

            {/* Tombol Login */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-white text-[#0066FF] py-[16px] rounded-[18px] font-bold text-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Space Bawah */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}
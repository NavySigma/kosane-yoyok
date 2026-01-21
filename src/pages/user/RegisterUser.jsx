import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterUser() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#1E1B6D] flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-xl">

        {/* HEADER */}
        <div className="relative h-56 bg-[#1E1B6D] flex justify-center items-center">
          <div className="absolute w-52 h-52 bg-white/10 rounded-full top-6" />
          <div className="absolute w-40 h-40 bg-white/10 rounded-full top-16 left-10" />

          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
            <img src="/Logo Kost.png" alt="logo" className="w-20" />
          </div>

          {/* Wave */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 375 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C80,90 300,0 375,40 L375,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* FORM */}
        <form className="px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-[#1E1B6D] mb-6">
            Register
          </h2>

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full mb-3 px-4 py-3 border rounded-full text-sm"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full mb-3 px-4 py-3 border rounded-full text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-3 px-4 py-3 border rounded-full text-sm"
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full mb-5 px-4 py-3 border rounded-full text-sm"
          />

          <p className="text-xs text-gray-500 mb-5">
            Have an account?{" "}
            <Link to="/login-user" className="text-[#1E1B6D] font-medium">
              Login
            </Link>
          </p>

          <button className="w-full bg-[#1E1B6D] text-white py-3 rounded-full font-medium">
            Register
          </button>
        </form>

        {/* FOOTER */}
        <div className="bg-[#1E1B6D] text-white text-[10px] px-6 py-4">
          <p>📍 Putuk Rejo, Jabung, Malang</p>
          <p>📞 0823-xxxx-xxxx</p>
        </div>
      </div>
    </div>
  );
}

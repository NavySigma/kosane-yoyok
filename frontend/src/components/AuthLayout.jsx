export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#545E6A] flex items-center justify-center">
      <div className="relative w-[1020px] h-[540px] bg-white rounded-[24px] overflow-hidden flex shadow-2xl">
        {/* LEFT */}
        <div className="w-1/2 bg-[#1E1B6D] relative">
          <div className="absolute w-72 h-72 bg-[#2A275F] rounded-full -top-20 -left-20" />
          <div className="absolute w-56 h-56 bg-[#35327A] rounded-full top-44 left-28" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center">
              <img src="/Logo Kost.png" className="w-20" />
            </div>
          </div>

          <p className="absolute bottom-6 left-6 text-xs text-white/80">
            3P4X+JQ8, Putuk Rejo, Kemanten, Kec. Jabung
            <br />
            Kabupaten Malang, Jawa Timur 65155
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 flex items-center justify-center px-16">
          {children}
        </div>
      </div>
    </div>
  );
}

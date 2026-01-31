export default function ProfileModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-[#1E1B6D] mb-4">Profil</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama"
            className="w-full border rounded-lg px-4 py-2 focus:outline-[#1E1B6D]"
          />

          <input
            type="password"
            placeholder="Password Baru"
            className="w-full border rounded-lg px-4 py-2 focus:outline-[#1E1B6D]"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password Baru"
            className="w-full border rounded-lg px-4 py-2 focus:outline-[#1E1B6D]"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Batal
          </button>

          <button className="px-4 py-2 rounded-lg bg-[#1E1B6D] text-white">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

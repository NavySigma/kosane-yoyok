const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getToken = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  return user?.token || "";
};

const headers = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

export const penyewaService = {
  async getKamar() {
    const res = await fetch(`${API}/penyewa`, {
      headers: headers(),
    });
    return res.json();
  },

  async getDetailKamar(id) {
    const res = await fetch(`${API}/penyewa/kamar/${id}`, {
      headers: headers(),
    });
    return res.json();
  },

  async tambah(payload) {
    const res = await fetch(`${API}/penyewa`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async update(id, payload) {
    const res = await fetch(`${API}/penyewa/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async akhiri(id) {
    const res = await fetch(`${API}/penyewa/akhiri/${id}`, {
      method: "PUT",
      headers: headers(),
    });
    return res.json();
  }
};
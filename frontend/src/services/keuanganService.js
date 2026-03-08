import Dashboard from "../pages/admin/Dashboard";

const API = "http://localhost:8000/api";

const getToken = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  return user?.token || "";
};

  const headers = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`
  });

export const keuanganService = {

  async getAll() {

    const res = await fetch(`${API}/keuangan`, {
      method: "GET",
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil data keuangan");
    }

    return await res.json();
  },

  async store(data) {

    const res = await fetch(`${API}/keuangan`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Gagal menyimpan data");
    }

    return await res.json();
  },

  async update(id, data) {

    const res = await fetch(`${API}/keuangan/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Gagal update data");
    }

    return await res.json();
  },

  async getDashboard() {
     const res = await fetch(`${API}/dashboard`, {
      method: "GET",
      headers: headers(),
    });
    
    if (!res.ok) {
      throw new Error("Gagal mengambil data dashboard");
    }

    return await res.json();
  }
};
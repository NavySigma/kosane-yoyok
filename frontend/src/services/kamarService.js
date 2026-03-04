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

export const kamarService = {
  async getAll() {
    const res = await fetch(`${API}/kamar`, {
      headers: headers(),
    });

    if (!res.ok) {
      throw await res.json();
    }

    return res.json();
  }
};
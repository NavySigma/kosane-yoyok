const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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

export const getKamar = async () => {
  const res = await fetch(`${API}/kamar`, {
    headers: headers()
  });

  if (!res.ok) throw await res.json();

  const data = await res.json();
  return data.data;
};

export const tambahKamar = async (payload) => {
  const res = await fetch(`${API}/kamar`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw await res.json();

  return await res.json();
};

export const updateKamar = async (id, payload) => {
  const res = await fetch(`${API}/kamar/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw await res.json();

  return await res.json();
};
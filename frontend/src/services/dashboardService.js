export const getDashboard = async () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token || "";

  const res = await fetch("http://localhost:8000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};
export const loginUser = async (username, password) => {
  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      nama_profile: username,
      password: password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login gagal");
  }

  if (data.data.level_profile !== "user") {
    throw new Error("Akun ini bukan member.");
  }

  return {
    token: data.token,
    ...data.data
  };
};
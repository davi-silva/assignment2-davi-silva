export const postItem = async (data) => {
  const res = await fetch("http://localhost:4001/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create item");
  }
  return res.json();
};

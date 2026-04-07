export async function fetchMyEditorials(token) {
  const response = await fetch("/api/editorials/mine", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch your editorials.");
  }

  return data;
}

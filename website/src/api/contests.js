export async function fetchContests() {
  const response = await fetch("/api/contests");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch contests.");
  }

  return data;
}

export async function fetchContestBySlug(slug) {
  const response = await fetch(`/api/contests/${slug}/editorials`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch contest editorials.");
  }

  return data;
}

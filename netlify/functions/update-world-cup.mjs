import { getStore } from "@netlify/blobs";

export default async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026--usa/worldcup.json"
  );
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const raw = await res.json();

  const store = getStore("world-cup-data");
  await store.setJSON("fixtures", {
    updatedAt: new Date().toISOString(),
    matches: raw.matches || [],
  });

  return new Response(
    JSON.stringify({ ok: true, count: (raw.matches || []).length }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
};

export const config = { schedule: "*/15 * * * *" };
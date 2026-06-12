import { getStore } from "@netlify/blobs";

const API_URL = "https://v3.football.api-sports.io";
const WORLD_CUP_LEAGUE_ID = "1";

export default async () => {
  const apiKey = Netlify.env.get("API_FOOTBALL_KEY");
  if (!apiKey) throw new Error("API_FOOTBALL_KEY is not configured in Netlify.");

  // Free API-Football plans cannot query season=2026, but they can query
  // fixtures by dates between yesterday and tomorrow.
  const today = new Date().toISOString().slice(0, 10);
  const response = await fetch(
    `${API_URL}/fixtures?league=${WORLD_CUP_LEAGUE_ID}&date=${today}`,
    { headers: { "x-apisports-key": apiKey } },
  );
  const data = await response.json();

  if (!response.ok || data.errors?.length || Object.keys(data.errors || {}).length) {
    throw new Error(`The football data provider returned an error: ${JSON.stringify(data.errors)}`);
  }

  const store = getStore("world-cup-data");
  await store.setJSON("fixtures", {
    updatedAt: new Date().toISOString(),
    date: today,
    fixtures: data.response || [],
  });
};

export const config = {
  schedule: "*/15 * * * *",
};

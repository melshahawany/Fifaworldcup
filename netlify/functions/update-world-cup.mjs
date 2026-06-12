import { getStore } from "@netlify/blobs";

const API_URL = "https://v3.football.api-sports.io";
const WORLD_CUP_LEAGUE_ID = "1";
const WORLD_CUP_SEASON = "2026";

export default async () => {
  const apiKey = Netlify.env.get("API_FOOTBALL_KEY");
  if (!apiKey) throw new Error("API_FOOTBALL_KEY is not configured in Netlify.");

  const response = await fetch(
    `${API_URL}/fixtures?league=${WORLD_CUP_LEAGUE_ID}&season=${WORLD_CUP_SEASON}`,
    { headers: { "x-apisports-key": apiKey } },
  );
  const data = await response.json();

  if (!response.ok || data.errors?.length || Object.keys(data.errors || {}).length) {
    throw new Error(`The football data provider returned an error: ${JSON.stringify(data.errors)}`);
  }

  const store = getStore("world-cup-data");
  await store.setJSON("fixtures", {
    updatedAt: new Date().toISOString(),
    fixtures: data.response || [],
  });
};

export const config = {
  schedule: "*/15 * * * *",
};

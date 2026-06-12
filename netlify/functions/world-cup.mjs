import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("world-cup-data");
  let cached;

  try {
    cached = await store.get("fixtures", { type: "json" });
  } catch { cached = null; }

  if (!cached) {
    const res = await fetch(
      "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026--usa/worldcup.json"
    );
    if (!res.ok) return json({ error: "Data unavailable" }, 503);
    const raw = await res.json();
    cached = { updatedAt: new Date().toISOString(), matches: raw.matches || [] };
  }

  const fixtures = (cached.matches || []).map((m, i) => {
    const hasScore = m.score1 != null && m.score2 != null;
    const dateStr = m.date && m.time
      ? (() => {
          const timePart = m.time.replace(/\s*UTC.*/i, "").trim();
          const offset = (m.time.match(/UTC([+-]\d+)/i) || [])[1] || "0";
          const d = new Date(`${m.date}T${timePart}:00`);
          d.setHours(d.getHours() - parseInt(offset));
          return d.toISOString();
        })()
      : `${m.date || "2026-06-11"}T20:00:00Z`;

    return {
      fixture: {
        id: i + 1,
        date: dateStr,
        status: { short: hasScore ? "FT" : "NS", elapsed: null },
        venue: { name: m.ground || "", city: m.ground || "" },
      },
      league: {
        round: m.group ? `Group Stage - ${m.group}` : (m.round || "World Cup"),
      },
      teams: {
        home: { name: m.team1, logo: "" },
        away: { name: m.team2, logo: "" },
      },
      goals: { home: m.score1 ?? null, away: m.score2 ?? null },
      events: [],
    };
  });

  return json({ updatedAt: cached.updatedAt, fixtures }, 200);
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
      "access-control-allow-origin": "*",
    },
  });
}

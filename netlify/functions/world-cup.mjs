import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("world-cup-data");
  const cached = await store.get("fixtures", { type: "json" });

  if (!cached) {
    return json({
      error: "Official match data is being prepared. Run the scheduled update function once from the Netlify dashboard.",
    }, 503);
  }

  return json(cached, 200);
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=60",
      "netlify-cdn-cache-control": "public, max-age=60",
    },
  });
}

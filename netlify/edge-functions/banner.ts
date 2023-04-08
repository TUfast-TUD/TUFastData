import { Redis } from "https://deno.land/x/upstash_redis@v1.3.2/mod.ts";

/** Name of the variable inside redis for keeping track of how many people clicked the banner. */
const bannerCounter = "banner";

export default async (req: Request) => {
  const redisUrl = Deno.env.get("UPSTASH_REDIS_REST_URL");
  const redisToken = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");
  const apiToken = Deno.env.get("API_TOKEN");

  if (!redisUrl || !redisToken || !apiToken) {
    return new Response("", { status: 500 });
  }

  // return unauthorized of no api token in request
  const body = await req.json();
  console.log("body: ", body);
  if (body["api-token"] !== apiToken) {
    return new Response("", { status: 401 });
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });
  try {
    await redis.incr(bannerCounter);
  } catch {
    return new Response("", { status: 500 });
  }
  return new Response();
};
export const config = { path: "/api/banner" };

import { Redis } from "https://deno.land/x/upstash_redis@v1.3.2/mod.ts"

export default async () => {
  const redis = Redis.fromEnv()
  const counter = await redis.incr("edge_counter")
  return new Response(
    JSON.stringify({
      counter,
    })
  )
}
export const config = { path: "/test" }
// export const handler: Handler = async (
//   _event: HandlerEvent,
//   _context: HandlerContext
// ) => {
//   const redisUrl = process.env.UPSTASH_REDIS_REST_URL
//   const redisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN
//   if (!redisUrl || !redisRestToken)
//     return {
//       statusCode: 500,
//       error:
//         "There was an error with the server configuration. \
// Please contact the TUfast-Team about this at frage@tu-fast.de",
//     }
//   console.log("has env vars")
//   const redis = new Redis({
//     url: redisUrl,
//     token: redisRestToken,
//   })
//   console.log("created redis connection")
//   redis.incr("counter")
//   console.log("incremented counter")
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Hello, world!",
//       // counter: newCounter,
//     }),
//   }
// }

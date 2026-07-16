import { Redis } from "@upstash/redis";

let client: Redis | null = null;

// Lazy singleton: only throws/connects when an invite or admin route is
// actually hit, so the site keeps working before Redis is provisioned.
export function getRedis(): Redis {
  if (client) return client;

  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing Redis credentials. Set KV_REST_API_URL/KV_REST_API_TOKEN " +
        "(or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN) in your environment."
    );
  }

  client = new Redis({ url, token });
  return client;
}

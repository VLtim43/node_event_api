import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/redis-client";

export async function fetchGlobalRank() {
  const globalRank = await redis.zrevrange(
    "referral:ranking",
    0,
    2,
    "WITHSCORES"
  );

  const subscriberStats: Record<string, number> = {};

  for (let i = 0; i < globalRank?.length; i += 2) {
    subscriberStats[globalRank[i]] = Number.parseInt(globalRank[i + 1]);
  }

  const subscribers = await db
    .select({ id: subscriptions.id, name: subscriptions.name })
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberStats)));

  const ranking = subscribers
    .map((user) => ({
      id: user.id,
      name: user.name,
      score: subscriberStats[user.id],
    }))
    .sort((a, b) => b.score - a.score); //

  return ranking;
}

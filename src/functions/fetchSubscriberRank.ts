import { redis } from "../redis/redis-client";

type fetchSubscriberRank = {
  subscriberId: string;
};

export async function fetchSubscriberRank({
  subscriberId,
}: fetchSubscriberRank) {
  const rank = await redis.zrevrank("referral:ranking", subscriberId);

  if (rank === null) {
    return { position: null };
  }

  return { position: rank + 1 };
}

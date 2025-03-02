import { redis } from "../redis/redis-client";

type fetchSubscriberClicks = {
  subscriberId: string;
};

export async function fetchSubscriberClicks({
  subscriberId,
}: fetchSubscriberClicks) {
  const count = await redis.hget("referral:access-count", subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}

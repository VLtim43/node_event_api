import { redis } from "../redis/redis-client";

type getSubscriberClicks = {
  subscriberId: string;
};

export async function getSubscriberClicks({
  subscriberId,
}: getSubscriberClicks) {
  const count = await redis.hget("referral:access-count", subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}

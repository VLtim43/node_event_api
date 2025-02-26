import { redis } from "../redis/client";

type getSubscronerClicks = {
  subscriberId: string;
};

export async function getSubscronerClicks({
  subscriberId,
}: getSubscronerClicks) {
  const count = await redis.hget("referral:access-count", subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}

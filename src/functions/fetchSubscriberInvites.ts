import { redis } from "../redis/redis-client";

type fetchSubscriberInvites = {
  subscriberId: string;
};

export async function fetchSubscriberInvites({
  subscriberId,
}: fetchSubscriberInvites) {
  const invites = await redis.zscore("referral:ranking", subscriberId);

  return { invites: invites ? Number.parseInt(invites) : 0 };
}

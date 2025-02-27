import { redis } from "../redis/redis-client";

type accessInviteLinkParams = {
  subscriberId: string;
};

export async function accessInviteLink({
  subscriberId,
}: accessInviteLinkParams) {
  await redis.hincrby("referral:access-count", subscriberId, 1);
}

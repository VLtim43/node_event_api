import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/redis-client";

type subscriptionsParams = {
  name: string;
  email: string;
  referral?: string | null;
};

export async function subscribeToEvent({
  name,
  email,
  referral,
}: subscriptionsParams) {
  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .onConflictDoNothing()
    .returning();

  if (referral) {
    await redis.zincrby("referral:ranking", 1, referral);
  }

  if (result.length > 0) {
    return { subscriberId: result[0].id, message: "Subscription successful" };
  }

  // If the email already exists, fetch the existing subscriber's ID
  const existingSubscriber = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.email, email));

  return {
    subscriberId: existingSubscriber[0].id,
    message: "User are already subscribed",
  };
}

import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

type subscriptionsParams = {
  name: string;
  email: string;
};

export async function subscribeToEvent({ name, email }: subscriptionsParams) {
  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .onConflictDoNothing()
    .returning();

  //if the user tries to subscribe with the same email, we just return his id
  if (result.length > 0) {
    return { subscriberId: result[0].id };
  }

  const existingSubscriber = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.email, email));

  return {
    subscriberId: existingSubscriber[0].id,
  };
}

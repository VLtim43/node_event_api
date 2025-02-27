import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/createSubscription";

const schema = {
  body: zod.object({
    name: zod.string(),
    email: zod.string().email(),
    referral: zod.string().nullable().optional(),
  }),
  response: {
    201: zod.object({
      subscriberId: zod.string().optional(),
      message: zod.string(),
    }),
  },
};

export const postSubscribeRoute: FastifyPluginAsyncZod = async (app) => {
  app.post("/subscriptions", { schema: schema }, async (request, reply) => {
    const { name, email, referral } = request.body;

    const { subscriberId, message } = await subscribeToEvent({
      name,
      email,
      referral: referral,
    });

    return reply.status(201).send({ subscriberId, message });
  });
};

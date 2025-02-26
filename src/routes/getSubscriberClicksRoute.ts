import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribeToEvent";

const schema = {
  body: zod.object({
    name: zod.string(),
    email: zod.string().email(),
  }),
  response: {
    201: zod.object({
      subscriberId: zod.string().optional(),
      message: zod.string(),
    }),
  },
};

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post("/subscriptions", { schema: schema }, async (request, reply) => {
    const { name, email } = request.body;

    const { subscriberId } = await subscribeToEvent({ name, email });

    return reply
      .status(201)
      .send({ subscriberId, message: "Successful request" });
  });
};

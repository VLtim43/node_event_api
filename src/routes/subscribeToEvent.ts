import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const subscriptionSchema = {
  body: zod.object({
    name: zod.string(),
    email: zod.string().email(),
  }),
  response: {
    201: zod.object({
      name: zod.string().optional(),
      email: zod.string().optional(),
      message: zod.string(),
    }),
  },
};

export const subscribeToEvent: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    { schema: subscriptionSchema },
    async (request, reply) => {
      const { name, email } = request.body;
      return reply
        .status(201)
        .send({ name, email, message: "Successful request" });
    }
  );
};

import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribeToEvent";
import { env } from "../env";

const inviteLinkSchema = {
  params: zod.object({
    subscriberId: zod.string(),
  }),
  response: {
    201: zod.object({
      subscriberId: zod.string().optional(),
      message: zod.string(),
    }),
  },
};

export const inviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/invites/:subscriberId",
    { schema: inviteLinkSchema },
    async (request, reply) => {
      const { subscriberId } = request.params;

      const redirectUrl = new URL(env.WEB_URL);

      return reply.redirect("");
    }
  );
};

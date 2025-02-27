import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { fetchSubscriberInvites } from "../functions/fetchSubscriberInvites";

const schema = {
  params: zod.object({
    subscriberId: zod.string(),
  }),
  response: {
    200: zod.object({
      invites: zod.number(),
    }),
  },
};

export const getSubscriberInvitesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/subscribers/:subscriberId/ranking/invites",
    { schema: schema },
    async (request) => {
      const { subscriberId } = request.params;
      const { invites } = await fetchSubscriberInvites({ subscriberId });

      return { invites };
    }
  );
};

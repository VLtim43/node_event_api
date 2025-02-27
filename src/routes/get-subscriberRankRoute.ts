import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { fetchSubscriberRank } from "../functions/fetchSubscriberRank";

const schema = {
  params: zod.object({
    subscriberId: zod.string(),
  }),
  response: {
    200: zod.object({
      position: zod.number().nullable(),
    }),
  },
};

export const getSubscriberRankRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/subscribers/:subscriberId/ranking/position",
    { schema: schema },

    async (request) => {
      const { subscriberId } = request.params;
      const { position } = await fetchSubscriberRank({ subscriberId });

      return { position };
    }
  );
};

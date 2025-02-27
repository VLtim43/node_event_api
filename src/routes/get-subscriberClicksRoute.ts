import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberClicks } from "../functions/fetchSubscriberClicks";

const schema = {
  params: zod.object({
    subscriberId: zod.string(),
  }),
  response: {
    200: zod.object({
      count: zod.number(),
    }),
  },
};

export const getSubscriberClicksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/subscribers/:subscriberId/ranking/clicks",
    { schema: schema },
    async (request) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscriberClicks({ subscriberId });

      return { count };
    }
  );
};

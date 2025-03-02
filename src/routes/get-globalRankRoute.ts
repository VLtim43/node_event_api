import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/handleInviteAccess";
import { fetchGlobalRank } from "../functions/fetchGlobalTank";

const schema = {
  response: {
    200: zod.object({
      ranking: zod.array(
        zod.object({
          id: zod.string(),
          name: zod.string(),
          score: zod.number(),
        })
      ),
    }),
  },
};

export const getGlobalRankRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/ranking", { schema: schema }, async () => {
    const ranking = await fetchGlobalRank();
    return { ranking };
  });
};

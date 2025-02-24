import { z as zod } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/accessInviteLink";
import { redis } from "../redis/client";

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

      await accessInviteLink({ subscriberId });

      const redirectUrl = new URL(env.WEB_URL);

      redirectUrl.searchParams.set("referrer", subscriberId);

      return reply.redirect(redirectUrl.toString(), 302);
    }
  );
};

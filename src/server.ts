import { env } from "./env";

import { cirno } from "./cirno";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { postSubscribeRoute } from "./routes/post-subscribeRoute";
import { getInviteLinkRoute } from "./routes/get-inviteLinkRoute";
import { getSubscriberClicksRoute } from "./routes/get-subscriberClicksRoute";

import { getSwaggerDocsRoute } from "./routes/get-swaggerDocsRoute";
import { getSubscriberInvitesRoute } from "./routes/get-susbcriberInvitesRoute";
import { getSubscriberRankRoute } from "./routes/get-subscriberRankRoute";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running ");
});

app.register(postSubscribeRoute);
app.register(getInviteLinkRoute);
app.register(getSubscriberClicksRoute);
app.register(getSubscriberInvitesRoute);
app.register(getSubscriberRankRoute);

app.register(getSwaggerDocsRoute);

app.get("/cirno", () => {
  return cirno;
});

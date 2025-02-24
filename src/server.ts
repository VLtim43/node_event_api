import { env } from "./env";

import { cirno } from "./cirno";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { subscribeToEventRoute } from "./routes/subscribeToEventRoute";
import { swaggerDocsRoute } from "./routes/swaggerDocsRoute";
import { inviteLinkRoute } from "./routes/inviteLinkRoute";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running ");
});

app.register(subscribeToEventRoute);

app.register(swaggerDocsRoute);

app.register(inviteLinkRoute);

app.get("/cirno", () => {
  return cirno;
});

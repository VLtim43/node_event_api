import { cirno } from "./cirno";

import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { subscribeToEvent } from "./routes/subscribeToEvent";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(subscribeToEvent);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running ");
});

app.get("/cirno", () => {
  return cirno;
});

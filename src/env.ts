import { z as zod } from "zod";

const envSchema = zod.object({
  PORT: zod.coerce.number().default(3333),
  POSTGRES_URL: zod.string(),
  REDIS_URL: zod.string(),
  WEB_URL: zod.string().url(),
});

export const env = envSchema.parse(process.env);

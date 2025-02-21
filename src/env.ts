import { z as zod } from "zod";

const envSchema = zod.object({
  PORT: zod.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);

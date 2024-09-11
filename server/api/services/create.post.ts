import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name_de: z.coerce.string(),
  name_fr: z.coerce.string(),
  description_de: z.coerce.string(),
  description_fr: z.coerce.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.service.create({
    data,
  });
});

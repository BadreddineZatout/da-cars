import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.coerce.string(),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.feature.create({
    data: {
      ...data,
      vehicleId: parseInt(id),
    },
  });
});

import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.coerce.string(),
  price: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.item.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      price: data.price,
    },
  });
});

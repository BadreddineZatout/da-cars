import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z
  .object({
    id: z.coerce.number().optional(),
    name: z.coerce.string().optional(),
    value: z.coerce.string(),
  })
  .refine(
    (schema) => {
      if ((!schema.id && !schema.name) || (schema.id && schema.name)) {
        return false;
      }
      return true;
    },
    {
      message: "You should choose an existing tag or add a new one",
    },
  );

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
  let tag;

  if (data.name) {
    tag = await prisma.tag.create({
      data: {
        name: data.name,
      },
    });
  } else {
    tag = await prisma.tag.findFirstOrThrow({
      where: {
        id: data.id,
      },
    });
  }

  return await prisma.tagsOnVehicles.create({
    data: {
      tagId: tag.id,
      vehicleId: parseInt(id),
      value: data.value,
    },
  });
});

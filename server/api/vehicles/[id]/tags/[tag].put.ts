import { z } from "zod";
import prisma from "~/prisma";

const bodySchema = z.object({
  value: z.coerce.string(),
});
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const tag = getRouterParam(event, "tag");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }
  if (!tag) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tag ID is required",
    });
  }

  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.tagsOnVehicles.update({
    where: {
      vehicleId_tagId: {
        tagId: parseInt(tag),
        vehicleId: parseInt(id),
      },
    },
    data: {
      value: data.value,
    },
  });
});

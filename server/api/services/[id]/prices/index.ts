import { z } from "zod";
import prisma from "~/prisma";

const querySchema = z.object({
  take: z.coerce.number().default(10),
  skip: z.coerce.number().default(0),
  search: z.string().optional(),
});
export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (params) =>
    querySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const query = result.data;
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  return await prisma.item.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: {
      serviceId: parseInt(id),
      name: {
        contains: query.search,
      },
    },
  });
});

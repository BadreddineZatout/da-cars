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

  return await prisma.service.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: {
      name: {
        contains: query.search,
      },
    },
  });
});

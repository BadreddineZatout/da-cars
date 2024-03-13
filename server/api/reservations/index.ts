import prisma from "~/prisma";
import { z } from "zod";

const querySchema = z.object({
  take: z.coerce.number().default(20),
  skip: z.coerce.number().default(0),
  search: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (params) =>
    querySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const query = result.data;
  return await prisma.reservation.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: {
      first_name: {
        contains: query.search,
      },
      last_name: {
        contains: query.search,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      service: true,
      item: true,
    },
  });
});
